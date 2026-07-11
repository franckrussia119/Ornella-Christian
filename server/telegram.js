// Sends a message to a Telegram group via a bot. Notifications never block
// or fail the API request that triggered them — if Telegram is unreachable
// or unconfigured, we just log it and move on.

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function sendTelegramMessage(text) {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.log('[telegram] Not configured (TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID missing) — skipping notification.');
    return;
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      })
    });
    if (!res.ok) {
      const body = await res.text();
      console.error('[telegram] Failed to send message:', res.status, body);
    }
  } catch (err) {
    console.error('[telegram] Error sending message:', err);
  }
}

export function formatRsvpMessage(rsvp) {
  const attendanceLabel = {
    both: 'Both ceremonies (Baham & Nkongsamba)',
    dotation: 'Baham only (Traditional)',
    white: 'Nkongsamba only (Civil & Religious)',
    declined: 'Declined'
  }[rsvp.attendance] || rsvp.attendance;

  return (
    `🎉 <b>New RSVP received</b>\n\n` +
    `<b>Name:</b> ${escapeHtml(rsvp.guestName)}\n` +
    `<b>Email:</b> ${escapeHtml(rsvp.email)}\n` +
    `<b>Phone:</b> ${escapeHtml(rsvp.phone)}\n` +
    `<b>Attending:</b> ${escapeHtml(attendanceLabel)}\n` +
    `<b>Guests:</b> ${escapeHtml(String(rsvp.guestCount || '1'))}\n` +
    `<b>Meal:</b> ${escapeHtml(rsvp.dietary || '—')}\n` +
    (rsvp.note ? `<b>Note:</b> ${escapeHtml(rsvp.note)}\n` : '')
  );
}

export function formatPledgeMessage(pledge) {
  return (
    `🎁 <b>New gift order</b>\n\n` +
    `<b>From:</b> ${escapeHtml(pledge.senderName)}\n` +
    `<b>Item:</b> ${escapeHtml(pledge.itemName)}\n` +
    `<b>Amount:</b> $${pledge.amount}${pledge.isContribution ? ' (contribution)' : ''}\n` +
    (pledge.phone ? `<b>WhatsApp:</b> ${escapeHtml(pledge.phone)}\n` : '') +
    (pledge.email ? `<b>Email:</b> ${escapeHtml(pledge.email)}\n` : '')
  );
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
