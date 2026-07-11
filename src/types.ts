/**
 * Shared Type Definitions for De l'Ange & Joverlin's Cameroonian Wedding Website
 */

export interface StoryMilestone {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  location: string;
}

export interface RegistryItem {
  id: string;
  title: string;
  category: 'Honeymoon' | 'Home Essentials' | 'Experiences' | 'Traditional & Culture';
  description: string;
  price: number;
  targetAmount?: number; // For cash/contribution funds
  raisedAmount?: number; // For cash/contribution funds
  imageUrl: string;
  reserved: boolean;
  reservedBy?: string;
  allowCustomContribution: boolean;
}

export interface GuestBlessing {
  id: string;
  senderName: string;
  email: string;
  relationship: 'Family' | 'Friend' | 'Colleague' | 'Well-wisher';
  message: string;
  date: string;
  cardDesign: 'Gold-Filigree' | 'Rose-Petals' | 'Cameroon-Emerald' | 'Ivory-Classic';
  pledgedItemTitle?: string;
}

export interface CeremonyEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venueName: string;
  address: string;
  description: string;
  imageUrl: string;
  mapEmbedUrl?: string;
  dressCode: string;
  dressCodeDescription: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Travel & Location' | 'Gifts & Registry' | 'RSVP & Access' | 'Culture & Attire';
}
