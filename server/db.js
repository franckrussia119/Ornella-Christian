import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

// Persisted DB file — mount this directory as a volume in Coolify so data
// survives redeploys and container restarts.
const DB_PATH = process.env.DB_PATH || '/app/data/wedding.db';

fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS registry_items (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    price REAL NOT NULL,
    target_amount REAL,
    raised_amount REAL,
    image_url TEXT NOT NULL,
    reserved INTEGER NOT NULL DEFAULT 0,
    reserved_by TEXT,
    allow_custom_contribution INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS rsvps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    guest_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    attendance TEXT NOT NULL,
    guest_count TEXT,
    dietary TEXT,
    hotel_needed TEXT,
    note TEXT,
    table_number TEXT DEFAULT '',
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS pledges (
    id TEXT PRIMARY KEY,
    sender_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    item_name TEXT NOT NULL,
    amount REAL NOT NULL,
    is_contribution INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS blessings (
    id TEXT PRIMARY KEY,
    sender_name TEXT NOT NULL,
    email TEXT,
    relationship TEXT,
    message TEXT NOT NULL,
    card_design TEXT,
    pledged_item_title TEXT,
    created_at TEXT NOT NULL
  );
`);

// ---- Seed default registry items on first run only ----
const seedRegistryItems = [
  {
    id: 'r1', title: 'Dream Honeymoon in Kribi Resort', category: 'Honeymoon',
    description: 'Help us enjoy a luxurious 5-night stay at a beachfront bungalow in Kribi, complete with fresh seafood dining, relaxing sea views, and ocean excursions.',
    price: 1500, targetAmount: 1500, raisedAmount: 650,
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    reserved: false, allowCustomContribution: true
  },
  {
    id: 'r2', title: 'Traditional Toghu Handcrafted Living Room Suite', category: 'Traditional & Culture',
    description: 'A bespoke living room accent set incorporating traditional North-West Cameroonian hand-carved mahogany wood and vibrant Toghu embroidered textiles.',
    price: 850, imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
    reserved: false, allowCustomContribution: false
  },
  {
    id: 'r3', title: 'Gourmet Kitchen Suite & Cookware', category: 'Home Essentials',
    description: 'A high-end multi-cooker, premium stand mixer, and professional culinary knife set to help us cook delicious Cameroonian meals (Ndolé, Achu, Poulet DG!) in our new home.',
    price: 450, imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
    reserved: true, reservedBy: 'Maman Jacqueline & Papa Robert', allowCustomContribution: false
  },
  {
    id: 'r4', title: 'Honeymoon Flight Fund', category: 'Honeymoon',
    description: 'Contributing towards our flight tickets for our dream honeymoon escape and travel adventures together.',
    price: 1200, targetAmount: 1200, raisedAmount: 400,
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80',
    reserved: false, allowCustomContribution: true
  },
  {
    id: 'r5', title: 'Smart Home Living Room Audio & Projector', category: 'Home Essentials',
    description: 'A cinematic home projector and wireless sound system for our cozy Friday movie nights and hosting family gatherings.',
    price: 600, imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80',
    reserved: false, allowCustomContribution: false
  },
  {
    id: 'r6', title: 'Authentic Cameroonian Fine Art Canvas', category: 'Traditional & Culture',
    description: 'A customized masterpiece painting by an elite local Cameroonian painter celebrating love, ancestry, and modern Cameroonian scenery to hang in our entryway.',
    price: 350, imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    reserved: false, allowCustomContribution: true
  },
  {
    id: 'r7', title: 'Premium Linen & Cozy Bedroom Essentials', category: 'Home Essentials',
    description: 'Luxury organic cotton sheet sets, plush pillows, and a hand-knitted coverlet to make our new master bedroom a peaceful sanctuary.',
    price: 250, imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80',
    reserved: false, allowCustomContribution: false
  },
  {
    id: 'r8', title: 'Romantic Sunset Cruise & Dinner in Limbé', category: 'Experiences',
    description: 'An elegant private seaside candlelit dinner and boat cruise at Limbé beach where we spent our first romantic trip together.',
    price: 200, imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    reserved: false, allowCustomContribution: false
  }
];

const countRow = db.prepare('SELECT COUNT(*) AS n FROM registry_items').get();
if (countRow.n === 0) {
  const insert = db.prepare(`
    INSERT INTO registry_items (id, title, category, description, price, target_amount, raised_amount, image_url, reserved, reserved_by, allow_custom_contribution, created_at)
    VALUES (@id, @title, @category, @description, @price, @targetAmount, @raisedAmount, @imageUrl, @reserved, @reservedBy, @allowCustomContribution, @createdAt)
  `);
  const insertMany = db.transaction((items) => {
    for (const item of items) {
      insert.run({
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
    }
  });
  insertMany(seedRegistryItems);
}

export default db;
