import { RegistryItem } from './types';

const BASE = '/api';

async function request(path: string, options: RequestInit = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

function adminHeaders(adminKey: string) {
  return { 'x-admin-key': adminKey };
}

// ---- Registry (gift store) ----
export const getRegistry = (): Promise<RegistryItem[]> => request('/registry');

export const addRegistryItem = (item: RegistryItem, adminKey: string): Promise<RegistryItem[]> =>
  request('/registry', { method: 'POST', headers: adminHeaders(adminKey), body: JSON.stringify(item) });

export const updateRegistryItem = (id: string, item: RegistryItem, adminKey: string): Promise<RegistryItem[]> =>
  request(`/registry/${id}`, { method: 'PUT', headers: adminHeaders(adminKey), body: JSON.stringify(item) });

export const deleteRegistryItem = (id: string, adminKey: string): Promise<RegistryItem[]> =>
  request(`/registry/${id}`, { method: 'DELETE', headers: adminHeaders(adminKey) });

export const submitGiftPledge = (
  itemId: string,
  payload: {
    senderName: string;
    email: string;
    phone: string;
    amount: number;
    blessingMessage: string;
    relationship: string;
    cardDesign: string;
  }
): Promise<{ item: RegistryItem; blessing: any }> =>
  request(`/registry/${itemId}/pledge`, { method: 'POST', body: JSON.stringify(payload) });

// ---- RSVPs ----
export const getRsvps = (adminKey: string) => request('/rsvps', { headers: adminHeaders(adminKey) });

export const searchRsvp = (name: string) => request(`/rsvps/search?name=${encodeURIComponent(name)}`);

export const submitRsvp = (payload: {
  guestName: string;
  email: string;
  phone: string;
  attendance: string;
  guestCount: string;
  dietary: string;
  hotelNeeded?: string;
  note: string;
}) => request('/rsvps', { method: 'POST', body: JSON.stringify(payload) });

export const updateRsvpTable = (id: number, tableNumber: string, adminKey: string) =>
  request(`/rsvps/${id}`, { method: 'PUT', headers: adminHeaders(adminKey), body: JSON.stringify({ tableNumber }) });

export const deleteRsvp = (id: number, adminKey: string) =>
  request(`/rsvps/${id}`, { method: 'DELETE', headers: adminHeaders(adminKey) });

// ---- Pledges (admin view) ----
export const getPledges = (adminKey: string) => request('/pledges', { headers: adminHeaders(adminKey) });

export const deletePledge = (id: string, adminKey: string) =>
  request(`/pledges/${id}`, { method: 'DELETE', headers: adminHeaders(adminKey) });

// ---- Blessings (guestbook) ----
export const getBlessings = () => request('/blessings');

export const addBlessingApi = (payload: {
  senderName: string;
  email: string;
  relationship: string;
  message: string;
  cardDesign: string;
}) => request('/blessings', { method: 'POST', body: JSON.stringify(payload) });

export const deleteBlessingApi = (id: string, adminKey: string) =>
  request(`/blessings/${id}`, { method: 'DELETE', headers: adminHeaders(adminKey) });
