import React, { useState } from 'react';
import { Mail, MapPin, Heart, Loader2, CheckCircle2, ShieldCheck, Ticket, Search, Printer } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { submitRsvp, searchRsvp } from '../api';

export default function ContactSection() {
  const { language, t } = useLanguage();

  // Mode: 'submit' (Default RSVP Form) or 'lookup' (Find existing RSVP & Print)
  const [activeFormTab, setActiveFormTab] = useState<'submit' | 'lookup'>('submit');

  // Form State
  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [attendance, setAttendance] = useState<'both' | 'dotation' | 'white' | 'declined'>('both');
  const [guestCount, setGuestCount] = useState('1');
  const [dietary, setDietary] = useState('Ndolé (Crayfish & Peanut Stew)');
  const [note, setNote] = useState('');

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');
  const [submitError, setSubmitError] = useState('');

  // Search State
  const [searchName, setSearchName] = useState('');
  const [foundRsvp, setFoundRsvp] = useState<any | null>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!guestName.trim()) {
      errors.guestName = language === 'fr' ? 'Veuillez entrer votre nom complet.' : 'Please provide your full name.';
    }
    
    if (!email.trim()) {
      errors.email = language === 'fr' ? 'Veuillez entrer une adresse email.' : 'Please provide an email address.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = language === 'fr' ? 'Veuillez entrer un email valide.' : 'Please enter a valid email address.';
    }

    if (!phone.trim()) {
      errors.phone = language === 'fr' ? 'Veuillez entrer un numéro WhatsApp.' : 'Please provide a WhatsApp contact phone number.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError('');

    submitRsvp({ guestName, email, phone, attendance, guestCount, dietary, note })
      .then(() => {
        setIsSubmitting(false);
        setSubmitStatus('success');
      })
      .catch((err) => {
        console.error(err);
        setIsSubmitting(false);
        setSubmitError(
          language === 'fr'
            ? "Une erreur s'est produite lors de l'envoi. Veuillez réessayer."
            : 'Something went wrong submitting your RSVP. Please try again.'
        );
      });
  };

  const handleLookupSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchAttempted(true);
    if (!searchName.trim()) return;

    searchRsvp(searchName.trim())
      .then((match) => setFoundRsvp(match))
      .catch((err) => {
        console.error(err);
        setFoundRsvp(null);
      });
  };

  const handlePrint = () => {
    // Elegant custom print trigger
    window.print();
  };

  const getAttendanceLabel = (val: typeof attendance) => {
    switch (val) {
      case 'both': return t.rsvpTicketRegistered + ': ' + (language === 'fr' ? 'Yaoundé & Douala' : 'Traditional & White Wedding');
      case 'dotation': return language === 'fr' ? 'Yaoundé uniquement (Dotation Coutumière)' : 'Yaoundé Customary Only';
      case 'white': return language === 'fr' ? 'Douala uniquement (Mariage Blanc & Banquet)' : 'Douala White Wedding Only';
      case 'declined': return language === 'fr' ? 'Absence confirmée (Vœux envoyés)' : 'Declined (Blessings Sent)';
    }
  };

  return (
    <section id="rsvp" className="py-24 bg-ivory relative border-t border-cream">
      {/* Absolute backdrop glow lines */}
      <div className="absolute right-1/4 bottom-10 w-96 h-96 bg-blush/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT SIDE: Invitation Context, Address Details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="font-sans text-[10px] uppercase tracking-widest text-gold font-bold block mb-2">{t.rsvpSubtitle}</span>
              <h2 className="font-serif text-3xl sm:text-5xl text-charcoal tracking-wide mb-4 leading-tight">
                {t.rsvpTitle}
              </h2>
              <div className="w-12 h-[1px] bg-gold mb-6" />
              <p className="font-sans text-xs sm:text-sm text-warm-gray leading-relaxed font-light">
                {t.rsvpHeadingDesc}
              </p>
            </div>

            {/* Quick logistics notes */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-2.5 bg-cream rounded-xl text-gold-dark shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <span className="block font-serif text-base text-charcoal font-semibold mb-1">
                    {language === 'fr' ? 'Lieu de la Dotation Traditionnelle' : 'Traditional Dotation Venue'}
                  </span>
                  <span className="block font-sans text-xs text-warm-gray leading-relaxed">
                    {t.rsvpVenueDotation}
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2.5 bg-cream rounded-xl text-gold-dark shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <span className="block font-serif text-base text-charcoal font-semibold mb-1">
                    {language === 'fr' ? 'Lieu du Mariage Blanc' : 'White Wedding Venue'}
                  </span>
                  <span className="block font-sans text-xs text-warm-gray leading-relaxed">
                    {t.rsvpVenueWhite}
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2.5 bg-cream rounded-xl text-gold-dark shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="block font-serif text-base text-charcoal font-semibold mb-1">
                    {language === 'fr' ? 'Contact Coordinateur' : 'Coordinator Hotline'}
                  </span>
                  <span className="block font-sans text-xs text-warm-gray leading-relaxed">
                    {t.rsvpCoordinator}
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Route */}
            <div className="bg-cream rounded-2xl p-6 border border-cream/50 shadow-inner relative overflow-hidden">
              <div className="absolute top-2 right-2 rounded-full bg-gold/10 p-1">
                <Heart className="h-3 w-3 text-gold fill-gold" />
              </div>
              <h4 className="font-serif text-sm font-bold text-charcoal mb-2">{t.rsvpRouteTitle}</h4>
              <p className="font-sans text-[11px] text-warm-gray leading-relaxed font-light mb-4">
                {t.rsvpRouteDesc}
              </p>
              <div className="h-28 bg-charcoal/5 rounded-lg border border-charcoal/10 flex items-center justify-center font-sans text-[10px] font-bold text-gold uppercase tracking-widest bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80')]">
                <div className="bg-charcoal/60 backdrop-blur-sm p-3 rounded text-center">
                  <span>Yaoundé &bull; Douala</span>
                  <span className="block text-[8px] text-white/70 font-light mt-0.5">{t.rsvpRouteBadge}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: RSVP Form / Lookup Ticket */}
          <div className="lg:col-span-7 bg-cream rounded-2xl p-6 sm:p-10 shadow-xl border border-cream/50 relative">
            
            {/* Form Switcher tabs */}
            <div className="flex border-b border-charcoal/10 mb-6 font-sans text-xs font-bold uppercase tracking-wider">
              <button
                onClick={() => { setActiveFormTab('submit'); setSubmitStatus('idle'); }}
                className={`pb-3 pr-4 border-b-2 transition-all cursor-pointer ${
                  activeFormTab === 'submit' ? 'border-gold text-charcoal' : 'border-transparent text-warm-gray/60'
                }`}
              >
                1. {language === 'fr' ? 'Saisir RSVP' : 'Submit RSVP'}
              </button>
              <button
                onClick={() => { setActiveFormTab('lookup'); setSearchAttempted(false); setFoundRsvp(null); }}
                className={`pb-3 px-4 border-b-2 transition-all cursor-pointer ${
                  activeFormTab === 'lookup' ? 'border-gold text-charcoal' : 'border-transparent text-warm-gray/60'
                }`}
              >
                2. {language === 'fr' ? 'Trouver & Imprimer Carte' : 'Find & Print Ticket'}
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeFormTab === 'submit' ? (
                submitStatus === 'idle' ? (
                  <motion.form
                    key="rsvp-submit-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleRsvpSubmit}
                    className="space-y-5 text-charcoal"
                  >
                    <div>
                      <h3 className="font-serif text-xl font-bold">{t.rsvpFormHeader}</h3>
                      <p className="font-sans text-[10px] uppercase tracking-widest text-warm-gray">{t.rsvpFormSubheader}</p>
                    </div>

                    {/* Name field */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-warm-gray font-bold mb-1">{t.formLabelName}</label>
                      <input
                        type="text"
                        required
                        value={guestName}
                        onChange={(e) => {
                          setGuestName(e.target.value);
                          if (formErrors.guestName) setFormErrors(prev => ({ ...prev, guestName: '' }));
                        }}
                        placeholder="e.g. Marie-Laure Mbanga"
                        className={`w-full bg-ivory border ${formErrors.guestName ? 'border-red-400' : 'border-cream'} rounded-lg py-2.5 px-3.5 text-sm focus:outline-none focus:border-gold`}
                      />
                      {formErrors.guestName && (
                        <span className="text-red-500 text-[10px] font-bold mt-1 block">{formErrors.guestName}</span>
                      )}
                    </div>

                    {/* Contact details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-warm-gray font-bold mb-1">{t.formLabelEmail}</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (formErrors.email) setFormErrors(prev => ({ ...prev, email: '' }));
                          }}
                          placeholder="e.g. marie.laure@gmail.com"
                          className={`w-full bg-ivory border ${formErrors.email ? 'border-red-400' : 'border-cream'} rounded-lg py-2.5 px-3.5 text-sm focus:outline-none focus:border-gold`}
                        />
                        {formErrors.email && (
                          <span className="text-red-500 text-[10px] font-bold mt-1 block">{formErrors.email}</span>
                        )}
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-warm-gray font-bold mb-1">WhatsApp *</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (formErrors.phone) setFormErrors(prev => ({ ...prev, phone: '' }));
                          }}
                          placeholder="e.g. +237 6XX XX XX XX"
                          className={`w-full bg-ivory border ${formErrors.phone ? 'border-red-400' : 'border-cream'} rounded-lg py-2.5 px-3.5 text-sm focus:outline-none focus:border-gold`}
                        />
                        {formErrors.phone && (
                          <span className="text-red-500 text-[10px] font-bold mt-1 block">{formErrors.phone}</span>
                        )}
                      </div>
                    </div>

                    {/* Attendance selection */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-warm-gray font-bold mb-2">
                        {language === 'fr' ? 'Participerez-vous ? *' : 'Will you attend? *'}
                      </label>
                      <div className="space-y-2">
                        {[
                          { id: 'both', label: language === 'fr' ? 'Oui ! Je serai présent aux DEUX cérémonies (Yaoundé & Douala)' : 'Yes! I will attend BOTH Ceremonies (Yaoundé & Douala)' },
                          { id: 'dotation', label: language === 'fr' ? 'Uniquement Yaoundé (La Dot - 11 déc)' : 'Yaoundé Only (Traditional Customary - Dec 11)' },
                          { id: 'white', label: language === 'fr' ? 'Uniquement Douala (Mariage Blanc & Banquet - 12 déc)' : 'Douala Only (White Wedding & Reception - Dec 12)' },
                          { id: 'declined', label: language === 'fr' ? 'Je ne pourrai malheureusement pas être présent' : 'Regretfully, I cannot attend but wish to send prayers' },
                        ].map((item) => (
                          <label
                            key={item.id}
                            className={`flex items-start p-3 rounded-lg border transition-all cursor-pointer ${
                              attendance === item.id
                                ? 'bg-gold/10 border-gold text-charcoal'
                                : 'bg-ivory border-cream hover:border-gold/30 text-charcoal/80'
                            }`}
                          >
                            <input
                              type="radio"
                              name="attendance"
                              checked={attendance === item.id}
                              onChange={() => setAttendance(item.id as any)}
                              className="mt-0.5 mr-3 accent-gold animate-none"
                            />
                            <span className="text-xs font-sans leading-relaxed">{item.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {attendance !== 'declined' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Passes count */}
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-warm-gray font-bold mb-1">{t.rsvpFormPasses}</label>
                          <select
                            value={guestCount}
                            onChange={(e) => setGuestCount(e.target.value)}
                            className="w-full bg-ivory border border-cream rounded-lg py-2.5 px-3.5 text-sm focus:outline-none focus:border-gold text-charcoal"
                          >
                            <option value="1">{language === 'fr' ? '1 Place (Soi-même)' : '1 Pass (Self Only)'}</option>
                            <option value="2">{language === 'fr' ? '2 Places (Couple / Plus un)' : '2 Passes (Couple / Plus One)'}</option>
                            <option value="3">{language === 'fr' ? '3 Places (Suite Familiale)' : '3 Passes (Family Suite)'}</option>
                          </select>
                        </div>

                        {/* Menu selection */}
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-warm-gray font-bold mb-1">{t.rsvpFormFood}</label>
                          <select
                            value={dietary}
                            onChange={(e) => setDietary(e.target.value)}
                            className="w-full bg-ivory border border-cream rounded-lg py-2.5 px-3.5 text-sm focus:outline-none focus:border-gold text-charcoal"
                          >
                            <option value="Ndolé (Crayfish & Peanut Stew)">{language === 'fr' ? 'Ndolé Traditionnel (Écrevisses & Viande)' : 'Traditional Ndolé Course'}</option>
                            <option value="Poulet DG (Plantain & Chicken)">{language === 'fr' ? 'Poulet DG (Plantains Frits & Légumes)' : 'Poulet DG Course'}</option>
                            <option value="Achu with Yellow Soup">{language === 'fr' ? 'Achu avec Sauce Jaune Impériale' : 'Traditional Achu Course'}</option>
                            <option value="Vegetarian Delicacy">{language === 'fr' ? 'Menu Gourmand Végétarien' : 'Vegetarian Gourmet Course'}</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Note */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-warm-gray font-bold mb-1">{t.rsvpFormNote}</label>
                      <textarea
                        rows={2}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Share a short note..."
                        className="w-full bg-ivory border border-cream rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold text-charcoal placeholder:text-warm-gray/50"
                      />
                    </div>

                    {submitError && (
                      <p className="text-red-500 text-xs text-center font-semibold">{submitError}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-charcoal hover:bg-gold hover:text-charcoal text-ivory text-xs uppercase tracking-widest font-bold rounded-lg transition-all flex items-center justify-center space-x-2 cursor-pointer shadow disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin shrink-0" />
                          <span>{t.rsvpConfirmBtnActive}</span>
                        </>
                      ) : (
                        <>
                          <Heart className="h-4 w-4 shrink-0 fill-current" />
                          <span>{t.rsvpConfirmBtn}</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  /* RSVP Success message */
                  <motion.div
                    key="rsvp-submit-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6 px-4 flex flex-col items-center justify-center space-y-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <CheckCircle2 className="h-8 w-8 stroke-[3]" />
                    </div>
                    <h3 className="font-serif text-3xl text-charcoal font-bold tracking-wide">
                      {language === 'fr' ? 'Présence Enregistrée !' : 'RSVP Confirmed!'}
                    </h3>
                    <p className="font-sans text-xs text-warm-gray max-w-md mx-auto leading-relaxed font-light">
                      {language === 'fr' 
                        ? 'Votre présence a été enregistrée avec succès. Vous pouvez maintenant rechercher votre nom dans l\'onglet "Trouver & Imprimer" pour imprimer votre pass avec votre numéro de table !' 
                        : 'Your attendance record has been secured. You can now lookup your name in the "Find & Print" tab to print your ticket containing your table assignment!'}
                    </p>
                    <button
                      onClick={() => { setActiveFormTab('lookup'); setSearchName(guestName); setSearchAttempted(false); }}
                      className="px-6 py-3 bg-gold text-charcoal text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-gold-dark transition-all cursor-pointer shadow flex items-center space-x-2"
                    >
                      <Ticket className="h-4 w-4" />
                      <span>{language === 'fr' ? 'Voir Mon Pass d\'Invitation' : 'View My Invitation Pass'}</span>
                    </button>
                  </motion.div>
                )
              ) : (
                /* LOOKUP / TICKET SEARCH FORM */
                <motion.div
                  key="rsvp-lookup-panel"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="border-b border-charcoal/10 pb-4">
                    <h3 className="font-serif text-xl font-bold">
                      {language === 'fr' ? 'Imprimer Votre Carte d\'Invitation' : 'Print Your Invitation Pass'}
                    </h3>
                    <p className="font-sans text-[10px] uppercase tracking-widest text-warm-gray">
                      {language === 'fr' ? 'Entrez votre nom pour récupérer votre table' : 'Enter your name to retrieve table assignments'}
                    </p>
                  </div>

                  <form onSubmit={handleLookupSearch} className="flex gap-2">
                    <div className="relative flex-grow">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-warm-gray" />
                      <input
                        type="text"
                        required
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        placeholder={language === 'fr' ? 'Ex: Marie-Laure Mbanga' : 'Search by your full name...'}
                        className="w-full bg-ivory border border-cream rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-gold text-charcoal"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-charcoal text-ivory text-xs uppercase tracking-widest font-bold rounded-lg hover:bg-gold hover:text-charcoal transition-all cursor-pointer"
                    >
                      {language === 'fr' ? 'Chercher' : 'Search'}
                    </button>
                  </form>

                  {/* Search Result Display */}
                  {searchAttempted && (
                    foundRsvp ? (
                      /* Display found ticket */
                      <div className="space-y-6 animate-fadeIn">
                        <div className="bg-white border-2 border-dashed border-gold rounded-2xl p-6 shadow-lg relative overflow-hidden font-sans text-xs text-charcoal text-left print:border-solid print:shadow-none">
                          {/* Ticket tear cuts */}
                          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-cream border-r border-charcoal/10 print:hidden" />
                          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-cream border-l border-charcoal/10 print:hidden" />

                          <div className="flex justify-between items-center border-b border-charcoal/10 pb-3 mb-4">
                            <div>
                              <span className="text-[8px] uppercase tracking-widest text-gold-dark font-bold block">{t.rsvpTicketHeader}</span>
                              <span className="font-serif text-sm font-semibold text-charcoal">{t.rsvpTicketTitle}</span>
                            </div>
                            <Ticket className="h-5 w-5 text-gold shrink-0" />
                          </div>

                          <div className="space-y-3 pb-4 border-b border-dashed border-charcoal/10">
                            <div>
                              <span className="text-[8px] uppercase tracking-wider text-warm-gray">{t.rsvpTicketName}</span>
                              <span className="block font-bold text-sm text-charcoal">{foundRsvp.guestName}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <span className="text-[8px] uppercase tracking-wider text-warm-gray">{t.rsvpTicketPasses}</span>
                                <span className="block font-semibold text-charcoal">{foundRsvp.guestCount} {language === 'fr' ? 'Pass d\'invitation(s)' : 'Guest Pass(es)'}</span>
                              </div>
                              <div>
                                <span className="text-[8px] uppercase tracking-wider text-warm-gray">{t.rsvpTicketFood}</span>
                                <span className="block font-semibold text-charcoal truncate">{foundRsvp.dietary}</span>
                              </div>
                            </div>

                            <div className="py-2.5 px-3 bg-cream/30 rounded-lg border border-cream">
                              <span className="text-[8px] uppercase tracking-wider text-gold-dark font-bold block">{t.rsvpTicketTable}</span>
                              <span className="block font-serif text-sm font-bold text-gold-dark mt-0.5">
                                {foundRsvp.tableNumber ? (
                                  foundRsvp.tableNumber
                                ) : (
                                  <span className="text-warm-gray/60 italic font-sans font-normal text-xs">{t.rsvpTicketTableNotAssigned}</span>
                                )}
                              </span>
                            </div>

                            <div>
                              <span className="text-[8px] uppercase tracking-wider text-warm-gray">{language === 'fr' ? 'Cérémonie Enregistrée :' : 'Event Passes:'}</span>
                              <span className="block font-semibold text-charcoal/80 text-[11px]">
                                {getAttendanceLabel(foundRsvp.attendance)}
                              </span>
                            </div>
                          </div>

                          <div className="pt-3 text-[9px] text-center text-warm-gray italic">
                            {t.rsvpTicketFooter}
                          </div>
                        </div>

                        {/* Print Actions */}
                        <div className="flex gap-2">
                          <button
                            onClick={handlePrint}
                            className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs uppercase tracking-widest font-bold rounded-lg transition-all flex items-center justify-center space-x-2 cursor-pointer shadow"
                          >
                            <Printer className="h-4 w-4 shrink-0" />
                            <span>{language === 'fr' ? 'Imprimer l\'invitation' : 'Print Invitation'}</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Not found alert */
                      <div className="text-center py-8 bg-red-50 rounded-xl border border-red-100 text-red-700 space-y-2">
                        <p className="font-serif font-bold text-sm">
                          {language === 'fr' ? 'Aucune invitation trouvée !' : 'No Invitation Found!'}
                        </p>
                        <p className="font-sans text-[11px] text-red-600 max-w-sm mx-auto leading-relaxed">
                          {language === 'fr' 
                            ? 'Veuillez vérifier l\'orthographe de votre nom ou remplissez l\'onglet "Saisir RSVP" pour vous enregistrer.' 
                            : 'Please verify the spelling of your name or fill out the "Submit RSVP" tab to register your attendance.'}
                        </p>
                      </div>
                    )
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Print Styling injected inline for print screen simplicity */}
            <style dangerouslySetInnerHTML={{ __html: `
              @media print {
                body * {
                  visibility: hidden;
                }
                #rsvp, #rsvp * {
                  visibility: visible;
                }
                #rsvp {
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 100%;
                }
                .print\\:hidden {
                  display: none !important;
                }
              }
            `}} />

          </div>

        </div>
      </div>
    </section>
  );
}
