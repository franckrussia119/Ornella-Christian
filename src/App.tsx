import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import StoryTimeline from './components/StoryTimeline';
import CeremonyDetails from './components/CeremonyDetails';
import WeddingStore from './components/WeddingStore';
import BlessingsGuestbook from './components/BlessingsGuestbook';
import TravelAndFaq from './components/TravelAndFaq';
import GoogleMapsSection from './components/GoogleMapsSection';
import ContactSection from './components/ContactSection';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';

import { GuestBlessing, RegistryItem } from './types';
import { initialBlessings } from './data';
import { getRegistry, getBlessings, addBlessingApi } from './api';

export default function App() {
  const [blessings, setBlessings] = useState<GuestBlessing[]>([]);
  const [registryItems, setRegistryItems] = useState<RegistryItem[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const loadBlessings = () => {
    getBlessings()
      .then((apiBlessings: GuestBlessing[]) => {
        // Real guest blessings first (newest), then the curated starter set
        setBlessings([...apiBlessings, ...initialBlessings]);
      })
      .catch((e) => {
        console.error('Failed to load blessings', e);
        setBlessings(initialBlessings);
      });
  };

  const loadRegistry = () => {
    getRegistry()
      .then(setRegistryItems)
      .catch((e) => console.error('Failed to load registry', e));
  };

  useEffect(() => {
    loadBlessings();
    loadRegistry();
  }, []);

  // Called by both the gift-pledge flow (WeddingStore) and the standalone
  // guestbook form (BlessingsGuestbook) once the API call has already
  // succeeded server-side — this just updates what's shown on screen.
  const handleAddBlessing = (newBlessing: GuestBlessing) => {
    setBlessings((prev) => [newBlessing, ...prev]);
  };

  // Called by the standalone guestbook form — actually performs the API call.
  const handleSubmitStandaloneBlessing = async (payload: {
    senderName: string;
    email: string;
    relationship: string;
    message: string;
    cardDesign: string;
  }) => {
    const created = await addBlessingApi(payload);
    handleAddBlessing(created);
    return created;
  };

  const handleRegistryUpdated = (newItems: RegistryItem[]) => {
    setRegistryItems(newItems);
  };

  const handleDeleteBlessing = (id: string) => {
    setBlessings((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="min-h-screen bg-ivory font-sans text-charcoal selection:bg-blush selection:text-charcoal relative">
      {/* Sticky Header */}
      <Header onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Main Sections Composition */}
      <main>
        {/* Section 1: Hero Banner with Cameroon Countdown Timer */}
        <Hero />

        {/* Section 2: Story Timeline */}
        <StoryTimeline />

        {/* Section 3: Ceremony Details */}
        <CeremonyDetails />

        {/* Section 4: Interactive Wedding Registry Boutique Storefront */}
        <WeddingStore
          onAddBlessing={handleAddBlessing}
          registryItems={registryItems}
          onRegistryUpdated={handleRegistryUpdated}
        />

        {/* Section 5: Live Guest Blessings greeting cards Wall */}
        <BlessingsGuestbook blessings={blessings} onSubmitBlessing={handleSubmitStandaloneBlessing} />

        {/* Section 6: Travel Advisories, Airport guides, and collapsed FAQs */}
        <TravelAndFaq />

        {/* Section 7: Google Map Venue Locations */}
        <GoogleMapsSection />

        {/* Section 8: RSVP Confirmation Pass Generator */}
        <ContactSection />
      </main>

      {/* Section 9: Monogram Footer with news subscription forms */}
      <Footer />

      {/* Admin Dashboard overlay modal */}
      {isAdminOpen && (
        <AdminDashboard
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          storeItems={registryItems}
          onRegistryUpdated={handleRegistryUpdated}
          blessings={blessings}
          onDeleteBlessing={handleDeleteBlessing}
        />
      )}
    </div>
  );
}
