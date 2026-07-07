import React, { useState, useEffect } from 'react';
import { RegistryItem, GuestBlessing } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { Shield, Gift, ClipboardList, PlusCircle, Trash2, X, Check, Save, Table, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RsvpRecord {
  guestName: string;
  email: string;
  phone: string;
  attendance: 'both' | 'dotation' | 'white' | 'declined';
  guestCount: string;
  dietary: string;
  hotelNeeded: string;
  note: string;
  date: string;
  tableNumber?: string;
}

interface GiftPledgeRecord {
  id: string;
  senderName: string;
  email: string;
  itemName: string;
  amount: number;
  isContribution: boolean;
  date: string;
}

export default function AdminDashboard({
  isOpen,
  onClose,
  storeItems,
  onAddStoreItem,
  onUpdateStoreItem,
  blessings,
  onDeleteBlessing,
}: {
  isOpen: boolean;
  onClose: () => void;
  storeItems: RegistryItem[];
  onAddStoreItem: (newItem: RegistryItem) => void;
  onUpdateStoreItem: (updated: RegistryItem[]) => void;
  blessings: GuestBlessing[];
  onDeleteBlessing: (id: string) => void;
}) {
  const { language, t } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  
  const [activeTab, setActiveTab] = useState<'rsvps' | 'pledges' | 'addItem'>('rsvps');

  // Admin states
  const [rsvps, setRsvps] = useState<RsvpRecord[]>([]);
  const [pledges, setPledges] = useState<GiftPledgeRecord[]>([]);
  
  // Table edit states
  const [editingRsvpIndex, setEditingRsvpIndex] = useState<number | null>(null);
  const [tableInput, setTableInput] = useState('');

  // Add store item form states
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Honeymoon' | 'Home Essentials' | 'Experiences' | 'Traditional & Culture'>('Honeymoon');
  const [newPrice, setNewPrice] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newImg, setNewImg] = useState('');
  const [newAllowCustom, setNewAllowCustom] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);

  // Load RSVPs and Pledges on open
  useEffect(() => {
    if (isOpen) {
      loadRsvps();
      loadPledges();
    }
  }, [isOpen]);

  const loadRsvps = () => {
    const saved = localStorage.getItem('christian_ornella_rsvps');
    if (saved) {
      try {
        setRsvps(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      setRsvps([]);
    }
  };

  const loadPledges = () => {
    // We can extract pledges from blessings that have pledgedItemTitle, and also local pledge records
    const saved = localStorage.getItem('christian_ornella_pledges');
    if (saved) {
      try {
        setPledges(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Reconstruct from preloaded blessings with gifts
      const preseeded: GiftPledgeRecord[] = blessings
        .filter(b => b.pledgedItemTitle)
        .map((b, idx) => ({
          id: `pledge_${idx}`,
          senderName: b.senderName,
          email: b.email,
          itemName: b.pledgedItemTitle || '',
          amount: b.pledgedItemTitle?.includes('Kribi') ? 650 : b.pledgedItemTitle?.includes('Flight') ? 400 : 450,
          isContribution: b.pledgedItemTitle?.includes('Kribi') || b.pledgedItemTitle?.includes('Flight'),
          date: b.date
        }));
      setPledges(preseeded);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '2026') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError(language === 'fr' ? 'Mot de passe incorrect (Indice: l\'année du mariage)' : 'Incorrect password (Hint: the wedding year)');
    }
  };

  const handleSaveTable = (index: number) => {
    const updated = [...rsvps];
    updated[index].tableNumber = tableInput.trim();
    setRsvps(updated);
    localStorage.setItem('christian_ornella_rsvps', JSON.stringify(updated));
    setEditingRsvpIndex(null);
    setTableInput('');
  };

  const handleDeleteRsvp = (index: number) => {
    if (window.confirm(language === 'fr' ? 'Voulez-vous vraiment supprimer ce RSVP ?' : 'Are you sure you want to delete this RSVP?')) {
      const updated = rsvps.filter((_, idx) => idx !== index);
      setRsvps(updated);
      localStorage.setItem('christian_ornella_rsvps', JSON.stringify(updated));
    }
  };

  const handleDeletePledge = (id: string) => {
    if (window.confirm(language === 'fr' ? 'Voulez-vous vraiment supprimer cette promesse de cadeau ?' : 'Are you sure you want to delete this gift pledge?')) {
      const updated = pledges.filter(p => p.id !== id);
      setPledges(updated);
      localStorage.setItem('christian_ornella_pledges', JSON.stringify(updated));
    }
  };

  const handleAddGiftSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice || !newDesc) return;

    const priceNum = parseFloat(newPrice);
    if (isNaN(priceNum)) return;

    const defaultImages = {
      'Honeymoon': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
      'Home Essentials': 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
      'Experiences': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
      'Traditional & Culture': 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    };

    const imageUrl = newImg.trim() || defaultImages[newCategory];

    const newItem: RegistryItem = {
      id: `custom_item_${Date.now()}`,
      title: newTitle,
      category: newCategory,
      description: newDesc,
      price: priceNum,
      imageUrl,
      reserved: false,
      allowCustomContribution: newAllowCustom,
      ...(newAllowCustom ? { targetAmount: priceNum, raisedAmount: 0 } : {})
    };

    onAddStoreItem(newItem);
    setAddSuccess(true);

    // Reset Form
    setNewTitle('');
    setNewPrice('');
    setNewDesc('');
    setNewImg('');
    setNewAllowCustom(false);

    setTimeout(() => {
      setAddSuccess(false);
    }, 3000);
  };

  const getAttendanceLabel = (val: typeof rsvps[0]['attendance']) => {
    switch (val) {
      case 'both': return language === 'fr' ? 'Yaoundé & Douala' : 'Both Rites';
      case 'dotation': return language === 'fr' ? 'Yaoundé Coutumier' : 'Yaoundé Dotation';
      case 'white': return language === 'fr' ? 'Douala Mariage Blanc' : 'Douala White Wedding';
      case 'declined': return language === 'fr' ? 'Décliné' : 'Declined';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-charcoal/80 z-50 flex items-center justify-center p-4 backdrop-blur-md overflow-y-auto">
      <div className="bg-cream max-w-6xl w-full rounded-2xl shadow-2xl overflow-hidden border border-gold/30 flex flex-col max-h-[90vh] relative">
        
        {/* Header bar */}
        <div className="bg-charcoal text-ivory p-6 border-b border-gold/20 flex justify-between items-center shrink-0">
          <div className="flex items-center space-x-3">
            <Shield className="h-6 w-6 text-gold" />
            <div>
              <h2 className="font-serif text-xl sm:text-2xl tracking-wide font-bold">{t.adminTitle}</h2>
              <p className="text-[10px] sm:text-xs text-ivory/60 font-light font-sans">{t.adminSubtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-ivory/50 hover:text-white bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="flex-grow p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-6">
            <div className="w-16 h-16 bg-gold/10 text-gold rounded-full flex items-center justify-center">
              <Shield className="h-8 w-8" />
            </div>
            <div>
              <h3 className="font-serif text-lg text-charcoal font-semibold">{language === 'fr' ? 'Connexion Coordinateur' : 'Coordinator Authentication'}</h3>
              <p className="text-xs text-warm-gray leading-relaxed font-sans font-light mt-1">
                {language === 'fr' 
                  ? 'Entrez le mot de passe de sécurité pour accéder à la liste des invités, aux cadeaux et aux tables.'
                  : 'Enter the security passcode to access guest lists, gifts registry tracking, and table seating coordinates.'}
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-3">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={language === 'fr' ? 'Mot de passe d\'accès' : 'Access passcode'}
                className="w-full bg-ivory border border-cream rounded-lg py-3 px-4 text-center text-sm focus:outline-none focus:border-gold text-charcoal tracking-widest font-bold"
              />
              {authError && <p className="text-red-500 text-[10px] font-bold">{authError}</p>}
              <button
                type="submit"
                className="w-full py-3 bg-charcoal text-ivory text-xs uppercase tracking-widest font-bold rounded-lg hover:bg-gold hover:text-charcoal transition-all cursor-pointer shadow"
              >
                {language === 'fr' ? 'Déverrouiller le Panel' : 'Unlock Access'}
              </button>
            </form>

            <span className="text-[9px] uppercase tracking-widest text-warm-gray">Hint: 2026</span>
          </div>
        ) : (
          /* Main Dashboard Content */
          <>
            {/* Tabs Selector */}
            <div className="bg-ivory border-b border-cream p-3 flex flex-wrap gap-2 shrink-0">
              <button
                onClick={() => setActiveTab('rsvps')}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-2 ${
                  activeTab === 'rsvps'
                    ? 'bg-charcoal text-ivory shadow'
                    : 'bg-cream text-charcoal hover:bg-gold/10'
                }`}
              >
                <ClipboardList className="h-4 w-4" />
                <span>{t.adminTabRsvps} ({rsvps.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('pledges')}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-2 ${
                  activeTab === 'pledges'
                    ? 'bg-charcoal text-ivory shadow'
                    : 'bg-cream text-charcoal hover:bg-gold/10'
                }`}
              >
                <Gift className="h-4 w-4" />
                <span>{t.adminTabPledges} ({pledges.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('addItem')}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-2 ${
                  activeTab === 'addItem'
                    ? 'bg-charcoal text-ivory shadow'
                    : 'bg-cream text-charcoal hover:bg-gold/10'
                }`}
              >
                <PlusCircle className="h-4 w-4" />
                <span>{t.adminTabAddGift}</span>
              </button>
            </div>

            {/* Scrollable View Area */}
            <div className="flex-grow p-6 overflow-y-auto">
              <AnimatePresence mode="wait">
                
                {/* TAB 1: RSVPs & Table Management */}
                {activeTab === 'rsvps' && (
                  <motion.div
                    key="rsvps-panel"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    {rsvps.length === 0 ? (
                      <div className="text-center py-12 text-warm-gray italic font-sans text-xs">
                        {t.adminNoRsvps}
                      </div>
                    ) : (
                      <div className="overflow-x-auto rounded-xl border border-cream shadow-sm bg-ivory">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-cream text-charcoal/80 uppercase tracking-wider font-sans text-[10px] font-bold border-b border-cream">
                              <th className="py-3.5 px-4">{t.adminColGuest}</th>
                              <th className="py-3.5 px-4">{t.adminColAttendance}</th>
                              <th className="py-3.5 px-4 text-center">{t.adminColPasses}</th>
                              <th className="py-3.5 px-4">{t.adminColFood}</th>
                              <th className="py-3.5 px-4">{t.adminColTable}</th>
                              <th className="py-3.5 px-4 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-cream/60">
                            {rsvps.map((rsvp, idx) => (
                              <tr key={idx} className="hover:bg-cream/10 font-sans text-charcoal">
                                <td className="py-3 px-4">
                                  <div className="font-bold">{rsvp.guestName}</div>
                                  <div className="text-[10px] text-warm-gray font-light">{rsvp.email} &bull; {rsvp.phone}</div>
                                  {rsvp.note && (
                                    <div className="text-[10px] text-gold-dark italic mt-1 font-light max-w-xs truncate">
                                      "{rsvp.note}"
                                    </div>
                                  )}
                                </td>
                                <td className="py-3 px-4">
                                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                                    rsvp.attendance === 'declined'
                                      ? 'bg-red-100 text-red-700'
                                      : 'bg-emerald-100 text-emerald-800'
                                  }`}>
                                    {getAttendanceLabel(rsvp.attendance)}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-center font-bold">{rsvp.guestCount}</td>
                                <td className="py-3 px-4 text-warm-gray">{rsvp.dietary || 'N/A'}</td>
                                
                                {/* Table assignment cell */}
                                <td className="py-3 px-4">
                                  {editingRsvpIndex === idx ? (
                                    <div className="flex items-center space-x-1.5">
                                      <input
                                        type="text"
                                        value={tableInput}
                                        onChange={(e) => setTableInput(e.target.value)}
                                        placeholder={t.adminTablePlaceholder}
                                        className="bg-cream border border-gold/30 rounded px-2 py-1 text-xs w-28 text-charcoal focus:outline-none"
                                      />
                                      <button
                                        onClick={() => handleSaveTable(idx)}
                                        className="p-1 bg-emerald-600 text-white rounded hover:bg-emerald-700 cursor-pointer"
                                        title={language === 'fr' ? 'Sauvegarder' : 'Save'}
                                      >
                                        <Save className="h-3 w-3" />
                                      </button>
                                      <button
                                        onClick={() => setEditingRsvpIndex(null)}
                                        className="p-1 bg-warm-gray text-white rounded hover:bg-charcoal cursor-pointer"
                                        title={language === 'fr' ? 'Annuler' : 'Cancel'}
                                      >
                                        <X className="h-3 w-3" />
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="flex items-center space-x-2">
                                      <span className={`font-serif font-bold ${rsvp.tableNumber ? 'text-gold-dark' : 'text-warm-gray/60 italic'}`}>
                                        {rsvp.tableNumber || (language === 'fr' ? 'Non attribuée' : 'Unassigned')}
                                      </span>
                                      <button
                                        onClick={() => {
                                          setEditingRsvpIndex(idx);
                                          setTableInput(rsvp.tableNumber || '');
                                        }}
                                        className="p-1 text-charcoal/40 hover:text-gold cursor-pointer"
                                        title={t.adminTableAction}
                                      >
                                        <Table className="h-3.5 w-3.5" />
                                      </button>
                                    </div>
                                  )}
                                </td>

                                <td className="py-3 px-4 text-right">
                                  <button
                                    onClick={() => handleDeleteRsvp(idx)}
                                    className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* TAB 2: Gift Pledges & Orders */}
                {activeTab === 'pledges' && (
                  <motion.div
                    key="pledges-panel"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    {pledges.length === 0 ? (
                      <div className="text-center py-12 text-warm-gray italic font-sans text-xs">
                        {t.adminNoPledges}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {pledges.map((pledge) => (
                          <div
                            key={pledge.id}
                            className="bg-ivory border border-cream rounded-xl p-5 shadow-sm relative flex flex-col justify-between"
                          >
                            <button
                              onClick={() => handleDeletePledge(pledge.id)}
                              className="absolute top-4 right-4 text-red-300 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50 cursor-pointer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>

                            <div className="space-y-2">
                              <span className={`inline-block px-2 py-0.5 rounded text-[8px] font-bold uppercase ${
                                pledge.isContribution
                                  ? 'bg-gold/15 text-gold-dark border border-gold/35'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}>
                                {pledge.isContribution ? t.adminPledgeFund : t.adminPledgeReserved}
                              </span>

                              <h4 className="font-serif text-sm font-bold text-charcoal">{pledge.itemName}</h4>
                              
                              <div className="font-sans text-xs text-warm-gray space-y-1">
                                <p><span className="font-semibold text-charcoal">{language === 'fr' ? 'Donateur :' : 'By:'}</span> {pledge.senderName} ({pledge.email})</p>
                                <p><span className="font-semibold text-charcoal">{language === 'fr' ? 'Valeur estimée :' : 'Est. Value:'}</span> ${pledge.amount}</p>
                                <p><span className="font-semibold text-charcoal">{language === 'fr' ? 'Date de promesse :' : 'Date:'}</span> {new Date(pledge.date).toLocaleString(language === 'fr' ? 'fr-FR' : 'en-US')}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* TAB 3: Add Gift Store Item Form */}
                {activeTab === 'addItem' && (
                  <motion.div
                    key="add-item-panel"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="max-w-2xl mx-auto bg-ivory border border-cream p-6 sm:p-8 rounded-2xl shadow-sm"
                  >
                    <h3 className="font-serif text-lg text-charcoal font-semibold mb-6 flex items-center space-x-2">
                      <PlusCircle className="h-5 w-5 text-gold" />
                      <span>{t.adminAddTitle}</span>
                    </h3>

                    <form onSubmit={handleAddGiftSubmit} className="space-y-4 font-sans text-xs text-charcoal">
                      {/* Item title */}
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-warm-gray font-bold mb-1">
                          {t.adminAddItemTitle}
                        </label>
                        <input
                          type="text"
                          required
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          placeholder="e.g. Premium Kribi Seafood Dinner Suite"
                          className="w-full bg-cream border border-cream rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold text-charcoal"
                        />
                      </div>

                      {/* Row splitting */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-warm-gray font-bold mb-1">
                            {t.adminAddItemCategory}
                          </label>
                          <select
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value as any)}
                            className="w-full bg-cream border border-cream rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold text-charcoal"
                          >
                            <option value="Honeymoon">Honeymoon</option>
                            <option value="Home Essentials">Home Essentials</option>
                            <option value="Experiences">Experiences</option>
                            <option value="Traditional & Culture">Traditional & Culture</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-warm-gray font-bold mb-1">
                            {t.adminAddItemPrice}
                          </label>
                          <input
                            type="number"
                            required
                            min="1"
                            value={newPrice}
                            onChange={(e) => setNewPrice(e.target.value)}
                            placeholder="e.g. 250"
                            className="w-full bg-cream border border-cream rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold text-charcoal"
                          />
                        </div>
                      </div>

                      {/* Image link */}
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-warm-gray font-bold mb-1">
                          {t.adminAddItemImage}
                        </label>
                        <input
                          type="url"
                          value={newImg}
                          onChange={(e) => setNewImg(e.target.value)}
                          placeholder="e.g. https://images.unsplash.com/photo-..."
                          className="w-full bg-cream border border-cream rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold text-charcoal"
                        />
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-warm-gray font-bold mb-1">
                          {t.adminAddItemDesc}
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={newDesc}
                          onChange={(e) => setNewDesc(e.target.value)}
                          placeholder="Write key benefits and beauty of this registry choice..."
                          className="w-full bg-cream border border-cream rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold text-charcoal"
                        />
                      </div>

                      {/* Allow custom contribution (Fund progress bar) */}
                      <label className="flex items-start space-x-3 bg-cream p-3 rounded-lg border border-cream/50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newAllowCustom}
                          onChange={(e) => setNewAllowCustom(e.target.checked)}
                          className="mt-0.5 accent-gold"
                        />
                        <span className="text-xs text-charcoal/80 leading-relaxed">
                          {t.adminAddItemAllowCustom}
                        </span>
                      </label>

                      {/* Submit */}
                      <button
                        type="submit"
                        className="w-full py-3 bg-gold hover:bg-gold-dark text-charcoal text-xs uppercase tracking-widest font-bold rounded-lg transition-all flex items-center justify-center space-x-2 cursor-pointer shadow font-sans"
                      >
                        <PlusCircle className="h-4 w-4" />
                        <span>{t.adminAddItemBtn}</span>
                      </button>

                      {addSuccess && (
                        <p className="text-emerald-600 font-bold text-center mt-2 animate-pulse text-xs">
                          {t.adminAddItemSuccess}
                        </p>
                      )}
                    </form>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
