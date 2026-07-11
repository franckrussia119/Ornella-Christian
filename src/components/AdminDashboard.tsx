import React, { useState, useEffect } from 'react';
import { RegistryItem, GuestBlessing } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { Shield, Gift, ClipboardList, PlusCircle, Trash2, X, Check, Save, Table, UserCheck, Phone, Pencil } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  getRsvps, updateRsvpTable, deleteRsvp,
  getPledges, deletePledge,
  addRegistryItem, updateRegistryItem, deleteRegistryItem
} from '../api';

interface RsvpRecord {
  id: number;
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
  phone?: string;
  itemName: string;
  amount: number;
  isContribution: boolean;
  date: string;
}

export default function AdminDashboard({
  isOpen,
  onClose,
  storeItems,
  onRegistryUpdated,
  blessings,
  onDeleteBlessing,
}: {
  isOpen: boolean;
  onClose: () => void;
  storeItems: RegistryItem[];
  onRegistryUpdated: (updated: RegistryItem[]) => void;
  blessings: GuestBlessing[];
  onDeleteBlessing: (id: string) => void;
}) {
  const { language, t } = useLanguage();
  const getWhatsAppLink = (phone: string, guestName: string, context: 'rsvp' | 'gift', itemTitle?: string) => {
    let cleanPhone = phone.replace(/[^\d+]/g, '');
    if (!cleanPhone.startsWith('+') && !cleanPhone.startsWith('237')) {
      if (cleanPhone.length === 9) {
        cleanPhone = '237' + cleanPhone;
      }
    } else if (cleanPhone.startsWith('+')) {
      cleanPhone = cleanPhone.substring(1);
    }
    const text = context === 'rsvp'
      ? (language === 'fr'
          ? `Bonjour ${guestName}, nous confirmons la réception de votre RSVP pour le mariage de De l'Ange & Joverlin ! 💖`
          : `Hello ${guestName}, we confirm receipt of your RSVP for De l'Ange & Joverlin's wedding! 💖`)
      : (language === 'fr'
          ? `Bonjour ${guestName}, merci infiniment pour votre magnifique cadeau : "${itemTitle}" pour le mariage de De l'Ange & Joverlin ! 🎁`
          : `Hello ${guestName}, thank you so much for your wonderful gift: "${itemTitle}" for De l'Ange & Joverlin's wedding! 🎁`);
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  };
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  
  const [activeTab, setActiveTab] = useState<'rsvps' | 'pledges' | 'addItem'>('rsvps');

  // Admin states
  const [rsvps, setRsvps] = useState<RsvpRecord[]>([]);
  const [pledges, setPledges] = useState<GiftPledgeRecord[]>([]);
  
  // Table edit states
  const [editingRsvpId, setEditingRsvpId] = useState<number | null>(null);
  const [tableInput, setTableInput] = useState('');

  // Add store item form states
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Honeymoon' | 'Home Essentials' | 'Experiences' | 'Traditional & Culture'>('Honeymoon');
  const [newPrice, setNewPrice] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newImg, setNewImg] = useState('');
  const [newAllowCustom, setNewAllowCustom] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const [previousReadTimestamp, setPreviousReadTimestamp] = useState('0');

  // Load RSVPs and Pledges once authenticated and open
  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadRsvps();
      loadPledges();
      const prev = localStorage.getItem('christian_ornella_previous_read_admin_timestamp') || '0';
      setPreviousReadTimestamp(prev);
    }
  }, [isOpen, isAuthenticated]);

  const loadRsvps = () => {
    getRsvps(password)
      .then(setRsvps)
      .catch((e) => console.error('Failed to load RSVPs', e));
  };

  const loadPledges = () => {
    getPledges(password)
      .then(setPledges)
      .catch((e) => console.error('Failed to load pledges', e));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    // Validate the entered password directly against the server by
    // attempting an admin-only request — this way the client never needs
    // to know or hardcode the real key, it just mirrors whatever ADMIN_KEY
    // is set to on the backend.
    getRsvps(password)
      .then(() => {
        setIsAuthenticated(true);
      })
      .catch(() => {
        setAuthError(language === 'fr' ? 'Mot de passe incorrect' : 'Incorrect password');
      });
  };

  const handleSaveTable = (id: number) => {
    updateRsvpTable(id, tableInput.trim(), password)
      .then(() => {
        setRsvps((prev) => prev.map((r) => (r.id === id ? { ...r, tableNumber: tableInput.trim() } : r)));
        setEditingRsvpId(null);
        setTableInput('');
      })
      .catch((e) => console.error('Failed to save table', e));
  };

  const handleDeleteRsvp = (id: number) => {
    if (window.confirm(language === 'fr' ? 'Voulez-vous vraiment supprimer ce RSVP ?' : 'Are you sure you want to delete this RSVP?')) {
      deleteRsvp(id, password)
        .then(() => setRsvps((prev) => prev.filter((r) => r.id !== id)))
        .catch((e) => console.error('Failed to delete RSVP', e));
    }
  };

  const handleDeletePledge = (id: string) => {
    if (window.confirm(language === 'fr' ? 'Voulez-vous vraiment supprimer cette promesse de cadeau ?' : 'Are you sure you want to delete this gift pledge?')) {
      deletePledge(id, password)
        .then(() => setPledges((prev) => prev.filter((p) => p.id !== id)))
        .catch((e) => console.error('Failed to delete pledge', e));
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

    if (editingItemId) {
      // ---- Update existing item ----
      const existingItem = storeItems.find((i) => i.id === editingItemId);
      const updatedItem: RegistryItem = {
        ...(existingItem as RegistryItem),
        title: newTitle,
        category: newCategory,
        description: newDesc,
        price: priceNum,
        imageUrl,
        allowCustomContribution: newAllowCustom,
        ...(newAllowCustom
          ? { targetAmount: priceNum, raisedAmount: existingItem?.raisedAmount || 0 }
          : { targetAmount: undefined, raisedAmount: undefined }),
      };
      updateRegistryItem(editingItemId, updatedItem, password)
        .then((updatedList) => {
          onRegistryUpdated(updatedList);
          setUpdateSuccess(true);
          setEditingItemId(null);
          setTimeout(() => setUpdateSuccess(false), 3000);
        })
        .catch((e) => console.error('Failed to update gift item', e));
    } else {
      // ---- Add new item ----
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
      addRegistryItem(newItem, password)
        .then((updatedList) => {
          onRegistryUpdated(updatedList);
          setAddSuccess(true);
          setTimeout(() => setAddSuccess(false), 3000);
        })
        .catch((e) => console.error('Failed to add gift item', e));
    }

    // Reset Form
    setNewTitle('');
    setNewPrice('');
    setNewDesc('');
    setNewImg('');
    setNewAllowCustom(false);
  };

  const handleEditItemClick = (item: RegistryItem) => {
    setEditingItemId(item.id);
    setNewTitle(item.title);
    setNewCategory(item.category as any);
    setNewPrice(String(item.price));
    setNewDesc(item.description);
    setNewImg(item.imageUrl);
    setNewAllowCustom(!!item.allowCustomContribution);
    setActiveTab('addItem');
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
    setNewTitle('');
    setNewPrice('');
    setNewDesc('');
    setNewImg('');
    setNewAllowCustom(false);
  };

  const handleDeleteItemClick = (id: string) => {
    if (window.confirm(t.adminDeleteItemConfirm)) {
      deleteRegistryItem(id, password)
        .then((updatedList) => {
          onRegistryUpdated(updatedList);
          if (editingItemId === id) {
            handleCancelEdit();
          }
        })
        .catch((e) => console.error('Failed to delete gift item', e));
    }
  };

  const getAttendanceLabel = (val: typeof rsvps[0]['attendance']) => {
    switch (val) {
      case 'both': return language === 'fr' ? 'Baham & Nkongsamba' : 'Both Rites';
      case 'dotation': return language === 'fr' ? 'Baham Coutumier' : 'Baham Dotation';
      case 'white': return language === 'fr' ? 'Nkongsamba Civil & Religieux' : 'Nkongsamba Civil & Religious';
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
                            {rsvps.map((rsvp) => {
                              const isNew = rsvp.date && new Date(rsvp.date).getTime() > new Date(previousReadTimestamp).getTime();
                              return (
                                <tr key={rsvp.id} className={`font-sans text-charcoal transition-all ${isNew ? 'bg-gold/10 hover:bg-gold/15' : 'hover:bg-cream/10'}`}>
                                  <td className="py-3 px-4">
                                    <div className="flex items-center space-x-2">
                                      <span className="font-bold">{rsvp.guestName}</span>
                                      {isNew && (
                                        <span className="px-1.5 py-0.5 rounded text-[8px] bg-gold text-charcoal font-extrabold tracking-widest uppercase animate-pulse">
                                          NEW
                                        </span>
                                      )}
                                    </div>
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
                                  {editingRsvpId === rsvp.id ? (
                                    <div className="flex items-center space-x-1.5">
                                      <input
                                        type="text"
                                        value={tableInput}
                                        onChange={(e) => setTableInput(e.target.value)}
                                        placeholder={t.adminTablePlaceholder}
                                        className="bg-cream border border-gold/30 rounded px-2 py-1 text-xs w-28 text-charcoal focus:outline-none"
                                      />
                                      <button
                                        onClick={() => handleSaveTable(rsvp.id)}
                                        className="p-1 bg-emerald-600 text-white rounded hover:bg-emerald-700 cursor-pointer"
                                        title={language === 'fr' ? 'Sauvegarder' : 'Save'}
                                      >
                                        <Save className="h-3 w-3" />
                                      </button>
                                      <button
                                        onClick={() => setEditingRsvpId(null)}
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
                                          setEditingRsvpId(rsvp.id);
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
                                  <div className="flex items-center justify-end space-x-1.5">
                                    {rsvp.phone && (
                                      <a
                                        href={getWhatsAppLink(rsvp.phone, rsvp.guestName, 'rsvp')}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="p-1.5 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-full transition-colors inline-block cursor-pointer"
                                        title={language === 'fr' ? 'Contacter via WhatsApp' : 'Contact via WhatsApp'}
                                      >
                                        <Phone className="h-3.5 w-3.5" />
                                      </a>
                                    )}
                                    <button
                                      onClick={() => handleDeleteRsvp(rsvp.id)}
                                      className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                                      title={language === 'fr' ? 'Supprimer' : 'Delete'}
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
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
                        {pledges.map((pledge) => {
                          const isNew = pledge.date && new Date(pledge.date).getTime() > new Date(previousReadTimestamp).getTime();
                          return (
                            <div
                              key={pledge.id}
                              className={`bg-ivory border rounded-xl p-5 shadow-sm relative flex flex-col justify-between transition-all ${
                                isNew ? 'border-gold bg-gold/10 ring-1 ring-gold/20 shadow-md' : 'border-cream'
                              }`}
                            >
                              <div className="absolute top-4 right-4 flex items-center space-x-2">
                                {isNew && (
                                  <span className="px-1.5 py-0.5 rounded text-[8px] bg-gold text-charcoal font-extrabold tracking-widest uppercase animate-pulse">
                                    NEW
                                  </span>
                                )}
                                <button
                                  onClick={() => handleDeletePledge(pledge.id)}
                                  className="text-red-300 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50 cursor-pointer"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>

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
                                {pledge.phone && (
                                  <p className="flex items-center space-x-1.5 flex-wrap">
                                    <span className="font-semibold text-charcoal">{language === 'fr' ? 'WhatsApp :' : 'WhatsApp:'}</span>
                                    <span>{pledge.phone}</span>
                                    <a
                                      href={getWhatsAppLink(pledge.phone, pledge.senderName, 'gift', pledge.itemName)}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-emerald-700 hover:text-emerald-900 transition-colors inline-flex items-center space-x-1 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer"
                                    >
                                      <Phone className="h-2.5 w-2.5" />
                                      <span>WhatsApp</span>
                                    </a>
                                  </p>
                                )}
                                <p><span className="font-semibold text-charcoal">{language === 'fr' ? 'Valeur estimée :' : 'Est. Value:'}</span> ${pledge.amount}</p>
                                <p><span className="font-semibold text-charcoal">{language === 'fr' ? 'Date de promesse :' : 'Date:'}</span> {new Date(pledge.date).toLocaleString(language === 'fr' ? 'fr-FR' : 'en-US')}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
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
                      <span>{editingItemId ? t.adminUpdateItemBtn : t.adminAddTitle}</span>
                    </h3>

                    {editingItemId && (
                      <div className="mb-5 flex items-center justify-between bg-gold/10 border border-gold/30 rounded-lg px-4 py-3">
                        <span className="text-[11px] text-gold-dark font-semibold leading-snug">
                          {t.adminEditingBanner}
                        </span>
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="ml-3 shrink-0 text-[10px] uppercase tracking-widest font-bold text-warm-gray hover:text-charcoal border border-cream px-3 py-1.5 rounded-lg cursor-pointer"
                        >
                          {t.adminCancelEditBtn}
                        </button>
                      </div>
                    )}

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

                      {/* Image Source Selection */}
                      <div className="bg-cream/40 p-4 rounded-xl border border-cream space-y-3">
                        <div className="flex justify-between items-center mb-1">
                          <label className="block text-[10px] uppercase tracking-widest text-warm-gray font-bold">
                            {t.adminAddItemImage}
                          </label>
                          <span className="text-[9px] text-gold-dark font-semibold uppercase">{language === 'fr' ? 'Lien ou Fichier' : 'Link or File'}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <span className="block text-[10px] text-warm-gray mb-1 font-semibold">{language === 'fr' ? 'Option A : Coller un lien d\'image' : 'Option A: Paste image URL'}</span>
                            <input
                              type="url"
                              value={newImg.startsWith('data:image/') ? '' : newImg}
                              onChange={(e) => setNewImg(e.target.value)}
                              placeholder="e.g. https://images.unsplash.com/photo-..."
                              className="w-full bg-ivory border border-cream rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-gold text-charcoal"
                            />
                          </div>

                          <div>
                            <span className="block text-[10px] text-warm-gray mb-1 font-semibold">{language === 'fr' ? 'Option B : Télécharger un fichier' : 'Option B: Upload photo file'}</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    if (typeof reader.result === 'string') {
                                      setNewImg(reader.result);
                                    }
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="w-full bg-ivory border border-cream rounded-lg py-1.5 px-3 text-xs focus:outline-none text-charcoal file:mr-3 file:py-1 file:px-2 file:rounded file:border-0 file:text-[10px] file:font-semibold file:bg-gold file:text-charcoal cursor-pointer"
                            />
                          </div>
                        </div>

                        {newImg && (
                          <div className="mt-2 flex items-center space-x-3 bg-ivory p-2 rounded-lg border border-cream">
                            <img
                              src={newImg}
                              alt="Preview"
                              className="w-12 h-12 rounded object-cover border border-cream"
                            />
                            <div className="text-[10px] text-warm-gray truncate flex-1">
                              <span className="font-bold text-charcoal block">{language === 'fr' ? 'Image sélectionnée :' : 'Selected Image:'}</span>
                              {newImg.startsWith('data:image/') ? 'Direct file upload (Base64)' : newImg}
                            </div>
                            <button
                              type="button"
                              onClick={() => setNewImg('')}
                              className="text-red-500 hover:text-red-700 font-bold text-[10px] uppercase tracking-wider px-2 py-1 rounded hover:bg-red-50"
                            >
                              {language === 'fr' ? 'Effacer' : 'Clear'}
                            </button>
                          </div>
                        )}
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
                        <span>{editingItemId ? t.adminUpdateItemBtn : t.adminAddItemBtn}</span>
                      </button>

                      {addSuccess && (
                        <p className="text-emerald-600 font-bold text-center mt-2 animate-pulse text-xs">
                          {t.adminAddItemSuccess}
                        </p>
                      )}
                      {updateSuccess && (
                        <p className="text-emerald-600 font-bold text-center mt-2 animate-pulse text-xs">
                          {t.adminUpdateItemSuccess}
                        </p>
                      )}
                    </form>

                    {/* ---- Manage Existing Gift Items ---- */}
                    <div className="mt-10 pt-8 border-t border-cream">
                      <h3 className="font-serif text-lg text-charcoal font-semibold mb-5 flex items-center space-x-2">
                        <Gift className="h-5 w-5 text-gold" />
                        <span>{t.adminManageItemsTitle}</span>
                      </h3>

                      {storeItems.length === 0 ? (
                        <p className="text-xs text-warm-gray font-sans">{t.adminManageItemsEmpty}</p>
                      ) : (
                        <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                          {storeItems.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-3 bg-cream/40 border border-cream rounded-xl p-3"
                            >
                              <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-14 h-14 rounded-lg object-cover border border-cream shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-serif text-sm text-charcoal font-semibold truncate">
                                    {item.title}
                                  </span>
                                  {item.reserved && (
                                    <span className="text-[9px] uppercase tracking-widest font-bold bg-charcoal text-ivory px-2 py-0.5 rounded shrink-0">
                                      {t.adminReservedBadge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[10px] text-warm-gray font-sans uppercase tracking-wider mt-0.5">
                                  {item.category} &bull; ${item.price}
                                </p>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => handleEditItemClick(item)}
                                  title={t.adminEditItemBtn}
                                  className="p-2 rounded-lg border border-cream text-warm-gray hover:text-charcoal hover:border-gold transition-colors cursor-pointer"
                                >
                                  <Pencil className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteItemClick(item.id)}
                                  title={t.adminDeleteItemBtn}
                                  className="p-2 rounded-lg border border-cream text-red-400 hover:text-red-600 hover:border-red-300 transition-colors cursor-pointer"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
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
