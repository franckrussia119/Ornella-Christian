import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './db.js';
import { sendTelegramMessage, formatRsvpMessage, formatPledgeMessage } from './telegram.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Shared secret the admin panel sends on mutating requests. Defaults to the
// same '2026' the admin login already uses, but you should override this
// with a real secret via the ADMIN_KEY environment variable in Coolify.
const ADMIN_KEY = process.env.ADMIN_KEY || '2026';

app.use(express.json({ limit: '8mb' })); // generous limit: base64 image uploads from the admin panel

function requireAdmin(req, res, next) {
  const key = req.header('x-admin-key');
  if (key !== ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// ---------------------------------------------------------------------------
// Registry (gift store) items
// ---------------------------------------------------------------------------

function rowToRegistryItem(row) {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    description: row.description,
    price: row.price,
    ...(row.target_amount !== null ? { targetAmount: row.target_amount } : {}),
    ...(row.raised_amount !== null ? { raisedAmount: row.raised_amount } : {}),
    imageUrl: row.image_url,
    reserved: !!row.reserved,
    ...(row.reserved_by ? { reservedBy: row.reserved_by } : {}),
    allowCustomContribution: !!row.allow_custom_contribution
  };
}

app.get('/api/registry', (req, res) => {
  const rows = db.prepare('SELECT * FROM registry_items ORDER BY created_at ASC').all();
  res.json(rows.map(rowToRegistryItem));
});

app.post('/api/registry', requireAdmin, (req, res) => {
  const item = req.body;
  db.prepare(`
    INSERT INTO registry_items (id, title, category, description, price, target_amount, raised_amount, image_url, reserved, reserved_by, allow_custom_contribution, created_at)
    VALUES (@id, @title, @category, @description, @price, @targetAmount, @raisedAmount, @imageUrl, @reserved, @reservedBy, @allowCustomContribution, @createdAt)
  `).run({
    id: item.id,
    title: item.title,
    category: item.category,
    description: item.description,
    price: item.price,
    targetAmount: item.targetAmount ?? null,
    raisedAmount: item.raisedAmount ?? null,
    imageUrl: item.imageUrl,
    reserved: item.reserved ? 1 : 0,
    reservedBy: item.reservedBy ?? null,
    allowCustomContribution: item.allowCustomContribution ? 1 : 0,
    createdAt: new Date().toISOString()
  });
  const rows = db.prepare('SELECT * FROM registry_items ORDER BY created_at ASC').all();
  res.status(201).json(rows.map(rowToRegistryItem));
});

app.put('/api/registry/:id', requireAdmin, (req, res) => {
  const item = req.body;
  db.prepare(`
    UPDATE registry_items SET
      title = @title,
      category = @category,
      description = @description,
      price = @price,
      target_amount = @targetAmount,
      raised_amount = @raisedAmount,
      image_url = @imageUrl,
      reserved = @reserved,
      reserved_by = @reservedBy,
      allow_custom_contribution = @allowCustomContribution
    WHERE id = @id
  `).run({
    id: req.params.id,
    title: item.title,
    category: item.category,
    description: item.description,
    price: item.price,
    targetAmount: item.targetAmount ?? null,
    raisedAmount: item.raisedAmount ?? null,
    imageUrl: item.imageUrl,
    reserved: item.reserved ? 1 : 0,
    reservedBy: item.reservedBy ?? null,
    allowCustomContribution: item.allowCustomContribution ? 1 : 0
  });
  const rows = db.prepare('SELECT * FROM registry_items ORDER BY created_at ASC').all();
  res.json(rows.map(rowToRegistryItem));
});

app.delete('/api/registry/:id', requireAdmin, (req, res) => {
  db.prepare('DELETE FROM registry_items WHERE id = ?').run(req.params.id);
  const rows = db.prepare('SELECT * FROM registry_items ORDER BY created_at ASC').all();
  res.json(rows.map(rowToRegistryItem));
});

// A guest orders / pledges towards a gift. Updates the item's reserved /
// raised state, records the pledge, records the accompanying blessing card,
// and notifies the Telegram group — all in one request.
app.post('/api/registry/:id/pledge', async (req, res) => {
  const { senderName, email, phone, amount, blessingMessage, relationship, cardDesign } = req.body;
  const itemRow = db.prepare('SELECT * FROM registry_items WHERE id = ?').get(req.params.id);
  if (!itemRow) return res.status(404).json({ error: 'Gift item not found' });

  const isContribution = itemRow.target_amount !== null && itemRow.raised_amount !== null;
  let updatedRaised = itemRow.raised_amount;
  let reserved = !!itemRow.reserved;
  let reservedBy = itemRow.reserved_by;

  if (isContribution) {
    const added = parseFloat(amount) || 0;
    updatedRaised = Math.min(itemRow.target_amount, itemRow.raised_amount + added);
    if (updatedRaised >= itemRow.target_amount) {
      reserved = true;
      reservedBy = senderName;
    }
  } else {
    reserved = true;
    reservedBy = senderName;
  }

  db.prepare(`
    UPDATE registry_items SET raised_amount = ?, reserved = ?, reserved_by = ? WHERE id = ?
  `).run(updatedRaised, reserved ? 1 : 0, reservedBy, req.params.id);

  const pledgeId = `pledge_${Date.now()}`;
  const pledgeAmount = isContribution ? (parseFloat(amount) || 0) : itemRow.price;
  const nowIso = new Date().toISOString();
  db.prepare(`
    INSERT INTO pledges (id, sender_name, email, phone, item_name, amount, is_contribution, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(pledgeId, senderName, email, phone || null, itemRow.title, pledgeAmount, isContribution ? 1 : 0, nowIso);

  const blessingId = `blessing_${Date.now()}`;
  db.prepare(`
    INSERT INTO blessings (id, sender_name, email, relationship, message, card_design, pledged_item_title, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(blessingId, senderName, email || null, relationship || null, blessingMessage || '', cardDesign || null, itemRow.title, nowIso);

  const updatedItemRow = db.prepare('SELECT * FROM registry_items WHERE id = ?').get(req.params.id);
  const blessingRow = db.prepare('SELECT * FROM blessings WHERE id = ?').get(blessingId);

  sendTelegramMessage(formatPledgeMessage({
    senderName, itemName: itemRow.title, amount: pledgeAmount, isContribution, phone, email
  }));

  res.status(201).json({
    item: rowToRegistryItem(updatedItemRow),
    blessing: rowToBlessing(blessingRow)
  });
});

// ---------------------------------------------------------------------------
// RSVPs
// ---------------------------------------------------------------------------

function rowToRsvp(row) {
  return {
    id: row.id,
    guestName: row.guest_name,
    email: row.email,
    phone: row.phone,
    attendance: row.attendance,
    guestCount: row.guest_count,
    dietary: row.dietary,
    hotelNeeded: row.hotel_needed,
    note: row.note,
    tableNumber: row.table_number || '',
    date: row.created_at
  };
}

app.get('/api/rsvps', requireAdmin, (req, res) => {
  const rows = db.prepare('SELECT * FROM rsvps ORDER BY created_at DESC').all();
  res.json(rows.map(rowToRsvp));
});

app.get('/api/rsvps/search', (req, res) => {
  const name = (req.query.name || '').toString().trim().toLowerCase();
  if (!name) return res.json(null);
  const row = db.prepare('SELECT * FROM rsvps WHERE LOWER(guest_name) LIKE ? ORDER BY created_at DESC LIMIT 1')
    .get(`%${name}%`);
  res.json(row ? rowToRsvp(row) : null);
});

app.post('/api/rsvps', (req, res) => {
  const { guestName, email, phone, attendance, guestCount, dietary, hotelNeeded, note } = req.body;
  if (!guestName || !email || !phone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const info = db.prepare(`
    INSERT INTO rsvps (guest_name, email, phone, attendance, guest_count, dietary, hotel_needed, note, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(guestName, email, phone, attendance, guestCount || '1', dietary || '', hotelNeeded || '', note || '', new Date().toISOString());

  const row = db.prepare('SELECT * FROM rsvps WHERE id = ?').get(info.lastInsertRowid);
  const rsvp = rowToRsvp(row);

  sendTelegramMessage(formatRsvpMessage(rsvp));

  res.status(201).json(rsvp);
});

app.put('/api/rsvps/:id', requireAdmin, (req, res) => {
  const { tableNumber } = req.body;
  db.prepare('UPDATE rsvps SET table_number = ? WHERE id = ?').run(tableNumber || '', req.params.id);
  const row = db.prepare('SELECT * FROM rsvps WHERE id = ?').get(req.params.id);
  res.json(row ? rowToRsvp(row) : null);
});

app.delete('/api/rsvps/:id', requireAdmin, (req, res) => {
  db.prepare('DELETE FROM rsvps WHERE id = ?').run(req.params.id);
  res.status(204).end();
});

// ---------------------------------------------------------------------------
// Gift pledges (admin view/delete — creation happens via /api/registry/:id/pledge)
// ---------------------------------------------------------------------------

function rowToPledge(row) {
  return {
    id: row.id,
    senderName: row.sender_name,
    email: row.email,
    phone: row.phone,
    itemName: row.item_name,
    amount: row.amount,
    isContribution: !!row.is_contribution,
    date: row.created_at
  };
}

app.get('/api/pledges', requireAdmin, (req, res) => {
  const rows = db.prepare('SELECT * FROM pledges ORDER BY created_at DESC').all();
  res.json(rows.map(rowToPledge));
});

app.delete('/api/pledges/:id', requireAdmin, (req, res) => {
  db.prepare('DELETE FROM pledges WHERE id = ?').run(req.params.id);
  res.status(204).end();
});

// ---------------------------------------------------------------------------
// Blessings (guestbook)
// ---------------------------------------------------------------------------

function rowToBlessing(row) {
  return {
    id: row.id,
    senderName: row.sender_name,
    email: row.email,
    relationship: row.relationship,
    message: row.message,
    cardDesign: row.card_design,
    date: row.created_at,
    ...(row.pledged_item_title ? { pledgedItemTitle: row.pledged_item_title } : {})
  };
}

app.get('/api/blessings', (req, res) => {
  const rows = db.prepare('SELECT * FROM blessings ORDER BY created_at DESC').all();
  res.json(rows.map(rowToBlessing));
});

app.post('/api/blessings', (req, res) => {
  const { senderName, email, relationship, message, cardDesign } = req.body;
  if (!senderName || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const id = `blessing_${Date.now()}`;
  db.prepare(`
    INSERT INTO blessings (id, sender_name, email, relationship, message, card_design, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(id, senderName, email || null, relationship || null, message, cardDesign || null, new Date().toISOString());
  const row = db.prepare('SELECT * FROM blessings WHERE id = ?').get(id);
  res.status(201).json(rowToBlessing(row));
});

app.delete('/api/blessings/:id', requireAdmin, (req, res) => {
  db.prepare('DELETE FROM blessings WHERE id = ?').run(req.params.id);
  res.status(204).end();
});

// ---------------------------------------------------------------------------
// Public stats (unread notification badge) — counts only, no guest details
// ---------------------------------------------------------------------------

app.get('/api/stats', (req, res) => {
  const since = req.query.since ? String(req.query.since) : '1970-01-01T00:00:00.000Z';
  const newRsvps = db.prepare('SELECT COUNT(*) AS n FROM rsvps WHERE created_at > ?').get(since).n;
  const newPledges = db.prepare('SELECT COUNT(*) AS n FROM pledges WHERE created_at > ?').get(since).n;
  res.json({ newRsvps, newPledges });
});

// ---------------------------------------------------------------------------
// Serve the built frontend (production)
// ---------------------------------------------------------------------------

const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

// SPA fallback: any non-API route serves index.html so client-side routing/hashes work
app.get(/^(?!\/api\/).*/, (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
