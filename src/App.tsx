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
import { initialBlessings, registryItems as dataRegistryItems } from './data';

export default function App() {
  const [blessings, setBlessings] = useState<GuestBlessing[]>([]);
  const [registryItems, setRegistryItems] = useState<RegistryItem[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Load merged initial data and custom user blessings from localStorage
  useEffect(() => {
    const savedUserBlessings = localStorage.getItem('christian_ornella_user_blessings');
    let parsedUserBlessings: GuestBlessing[] = [];
    
    if (savedUserBlessings) {
      try {
        parsedUserBlessings = JSON.parse(savedUserBlessings);
      } catch (e) {
        console.error('Failed to parse user blessings', e);
      }
    }

    // Combine: User custom blessings first (newest), followed by beautiful pre-seeded initials
    setBlessings([...parsedUserBlessings, ...initialBlessings]);
  }, []);

  // Load registry items state
  useEffect(() => {
    const savedRegistry = localStorage.getItem('christian_ornella_registry');
    if (savedRegistry) {
      try {
        setRegistryItems(JSON.parse(savedRegistry));
      } catch (e) {
        setRegistryItems(dataRegistryItems);
      }
    } else {
      setRegistryItems(dataRegistryItems);
      localStorage.setItem('christian_ornella_registry', JSON.stringify(dataRegistryItems));
    }
  }, []);

  const handleAddBlessing = (newBlessing: GuestBlessing) => {
    // 1. Update localStorage of custom user blessings
    const savedUserBlessings = localStorage.getItem('christian_ornella_user_blessings');
    let parsedUserBlessings: GuestBlessing[] = [];
    
    if (savedUserBlessings) {
      try {
        parsedUserBlessings = JSON.parse(savedUserBlessings);
      } catch (e) {
        parsedUserBlessings = [];
      }
    }

    const updatedUserBlessings = [newBlessing, ...parsedUserBlessings];
    localStorage.setItem('christian_ornella_user_blessings', JSON.stringify(updatedUserBlessings));

    // 2. Update reactive state of combined list
    setBlessings([newBlessing, ...blessings]);
  };

  const handleUpdateRegistry = (newItems: RegistryItem[]) => {
    setRegistryItems(newItems);
    localStorage.setItem('christian_ornella_registry', JSON.stringify(newItems));
  };

  const handleAddStoreItem = (newItem: RegistryItem) => {
    const updated = [...registryItems, newItem];
    handleUpdateRegistry(updated);
  };

  const handleDeleteBlessing = (id: string) => {
    // 1. Update reactive state
    const updatedBlessings = blessings.filter(b => b.id !== id);
    setBlessings(updatedBlessings);

    // 2. Update custom user blessings stored in localStorage
    const savedUserBlessings = localStorage.getItem('christian_ornella_user_blessings');
    if (savedUserBlessings) {
      try {
        const parsed: GuestBlessing[] = JSON.parse(savedUserBlessings);
        const filtered = parsed.filter(b => b.id !== id);
        localStorage.setItem('christian_ornella_user_blessings', JSON.stringify(filtered));
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Keep registry state synchronized when admin panel modifies it
  const handleRefreshRegistryFromStorage = () => {
    const savedRegistry = localStorage.getItem('christian_ornella_registry');
    if (savedRegistry) {
      try {
        setRegistryItems(JSON.parse(savedRegistry));
      } catch (e) {
        // Fallback
      }
    }
  };

  return (
    <div className="min-h-screen bg-ivory font-sans text-charcoal selection:bg-blush selection:text-charcoal relative">
      {/* Sticky Header */}
      <Header onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Main Sections Composition */}
      <main>
        {/* Section 1: Hero Banner with Cameroon Countdown Timer */}
        <Hero />

        {/* Section 2: Story Timeline of Christian & Ornella in Cameroon */}
        <StoryTimeline />

        {/* Section 3: Ceremony Details (Dotation in Yaoundé, White Wedding in Douala) */}
        <CeremonyDetails />

        {/* Section 4: Interactive Wedding Registry Boutique Storefront */}
        <WeddingStore
          onAddBlessing={handleAddBlessing}
          registryItems={registryItems}
          onUpdateRegistry={handleUpdateRegistry}
        />

        {/* Section 5: Live Guest Blessings greeting cards Wall */}
        <BlessingsGuestbook blessings={blessings} onAddBlessing={handleAddBlessing} />

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
          onClose={() => {
            setIsAdminOpen(false);
            handleRefreshRegistryFromStorage(); // Refresh state if items were added/modified in admin
          }}
          storeItems={registryItems}
          onAddStoreItem={handleAddStoreItem}
          onUpdateStoreItem={handleUpdateRegistry}
          blessings={blessings}
          onDeleteBlessing={handleDeleteBlessing}
        />
      )}
    </div>
  );
}
