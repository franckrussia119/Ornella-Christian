import React, { useState } from 'react';
import { RegistryItem, GuestBlessing } from '../types';
import { Heart, Gift, Sparkles, Filter, Check, ShieldCheck, HelpCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { submitGiftPledge } from '../api';

export default function WeddingStore({
  onAddBlessing,
  registryItems,
  onRegistryUpdated
}: {
  onAddBlessing: (newBlessing: GuestBlessing) => void;
  registryItems: RegistryItem[];
  onRegistryUpdated: (items: RegistryItem[]) => void;
}) {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeGiftItem, setActiveGiftItem] = useState<RegistryItem | null>(null);

  // Form states for Blessing & Gift Pledge
  const [senderName, setSenderName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState<'Family' | 'Friend' | 'Colleague' | 'Well-wisher'>('Family');
  const [blessingMessage, setBlessingMessage] = useState('');
  const [cardDesign, setCardDesign] = useState<'Gold-Filigree' | 'Rose-Petals' | 'Cameroon-Emerald' | 'Ivory-Classic'>('Gold-Filigree');
  const [contributionAmount, setContributionAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const categories = ['All', 'Honeymoon', 'Home Essentials', 'Experiences', 'Traditional & Culture'];

  const getCategoryLabel = (cat: string) => {
    if (language === 'fr') {
      switch (cat) {
        case 'All': return 'Tous';
        case 'Honeymoon': return 'Lune de miel';
        case 'Home Essentials': return 'Maison & Équipement';
        case 'Experiences': return 'Activités & Expériences';
        case 'Traditional & Culture': return 'Tradition & Culture';
      }
    }
    return cat;
  };

  const filteredItems = selectedCategory === 'All'
    ? registryItems
    : registryItems.filter(item => item.category === selectedCategory);

  const handleOpenGiftModal = (item: RegistryItem) => {
    setActiveGiftItem(item);
    setContributionAmount(item.targetAmount ? Math.min(250, item.targetAmount - (item.raisedAmount || 0)).toString() : item.price.toString());
    setSenderName('');
    setEmail('');
    setPhone('');
    setBlessingMessage('');
    setShowSuccess(false);
  };

  const handleCloseModal = () => {
    setActiveGiftItem(null);
  };

  const handleSubmitPledge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !email || !phone || !blessingMessage) {
      alert(language === 'fr' 
        ? 'Veuillez remplir tous les champs obligatoires (Nom, Email, WhatsApp, et Message).' 
        : 'Please fill out all required fields (Name, Email, WhatsApp, and Message).');
      return;
    }
    if (!activeGiftItem) return;

    setIsSubmitting(true);
    setSubmitError('');

    const amount = activeGiftItem.targetAmount
      ? parseFloat(contributionAmount) || 0
      : activeGiftItem.price;

    submitGiftPledge(activeGiftItem.id, {
      senderName,
      email,
      phone,
      amount,
      blessingMessage,
      relationship,
      cardDesign
    })
      .then(({ item, blessing }) => {
        // Update just the one changed item within the current list
        const updatedItems = registryItems.map((i) => (i.id === item.id ? item : i));
        onRegistryUpdated(updatedItems);
        onAddBlessing(blessing);
        setIsSubmitting(false);
        setShowSuccess(true);
      })
      .catch((err) => {
        console.error(err);
        setIsSubmitting(false);
        setSubmitError(
          language === 'fr'
            ? "Une erreur s'est produite. Veuillez réessayer."
            : 'Something went wrong. Please try again.'
        );
      });
  };

  // Helper formatting for currency
  const formatCurrency = (usdAmount: number) => {
    const fcfa = Math.round(usdAmount * 600);
    return {
      usd: `$${usdAmount.toLocaleString()}`,
      fcfa: `${fcfa.toLocaleString()} FCFA`
    };
  };

  const getCardDesignStyles = (design: typeof cardDesign) => {
    switch (design) {
      case 'Gold-Filigree':
        return {
          wrapper: 'bg-gradient-to-br from-[#FAF6EE] to-[#EFE4D3] text-charcoal border-4 border-gold',
          badge: 'bg-gold/20 text-gold-dark border-gold/30',
          seal: 'bg-gold text-charcoal'
        };
      case 'Rose-Petals':
        return {
          wrapper: 'bg-gradient-to-br from-[#FFF5F3] to-[#F5D8D4] text-charcoal border-4 border-blush-dark',
          badge: 'bg-blush text-charcoal border-blush-dark/30',
          seal: 'bg-blush-dark text-charcoal'
        };
      case 'Cameroon-Emerald':
        return {
          wrapper: 'bg-gradient-to-br from-[#064e3b] to-[#022c22] text-ivory border-4 border-gold-dark',
          badge: 'bg-white/10 text-gold border-white/20',
          seal: 'bg-gold text-charcoal'
        };
      case 'Ivory-Classic':
      default:
        return {
          wrapper: 'bg-ivory text-charcoal border-2 border-cream shadow-inner',
          badge: 'bg-cream text-charcoal border-charcoal/10',
          seal: 'bg-charcoal text-ivory'
        };
    }
  };

  return (
    <section id="store" className="py-24 bg-cream relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-script text-4xl text-gold mb-3 block">{t.storeSubtitle}</span>
          <h2 className="font-serif text-3xl sm:text-5xl text-charcoal tracking-wide mb-4">{t.storeTitle}</h2>
          <div className="w-16 h-[1px] bg-gold mx-auto mb-6" />
          <p className="font-sans text-xs tracking-widest uppercase text-warm-gray leading-relaxed mb-6">
            {t.storeHeadingDesc}
          </p>
          <div className="inline-flex items-center space-x-2 bg-ivory py-2 px-4 rounded-full border border-cream shadow-sm text-[11px] font-medium text-gold-dark font-sans uppercase">
            <ShieldCheck className="h-4 w-4 text-gold shrink-0" />
            <span>{t.storeSecureBadge}</span>
          </div>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-300 border cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gold border-gold text-charcoal shadow-md scale-105'
                  : 'bg-ivory border-cream text-charcoal hover:border-gold hover:bg-cream/55'
              }`}
            >
              {getCategoryLabel(cat)}
            </button>
          ))}
        </div>

        {/* Wedding Store Items Catalog */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredItems.map((item) => {
            const pricing = formatCurrency(item.price);
            const isFund = item.targetAmount !== undefined && item.raisedAmount !== undefined;
            const percentRaised = isFund ? Math.round(((item.raisedAmount || 0) / (item.targetAmount || 1)) * 100) : 0;

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-ivory rounded-2xl overflow-hidden shadow-md border border-cream hover:shadow-xl transition-shadow duration-300 flex flex-col h-full relative group"
              >
                {/* Image block */}
                <div className="relative h-48 md:h-52 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-charcoal/75 backdrop-blur-md text-gold px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-bold z-10">
                    {getCategoryLabel(item.category)}
                  </div>
                </div>

                {/* Body details */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg text-charcoal mb-2 group-hover:text-gold transition-colors duration-300 tracking-wide font-semibold line-clamp-1">
                      {item.title}
                    </h3>
                    
                    <p className="font-sans text-xs text-warm-gray leading-relaxed font-light mb-4 line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Pricing and Action */}
                  <div className="border-t border-cream pt-4 mt-4">
                    {/* If Fund, show progress bars */}
                    {isFund ? (
                      <div className="mb-4">
                        <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-gold-dark mb-1">
                          <span>{t.storeContributionFund}</span>
                          <span>{percentRaised}% {t.storeGifted}</span>
                        </div>
                        <div className="w-full bg-cream rounded-full h-2 overflow-hidden mb-1.5 border border-cream">
                          <div
                            className="bg-gold h-full rounded-full transition-all duration-1000"
                            style={{ width: `${percentRaised}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-warm-gray">
                          <span>{t.storeRaised}: {formatCurrency(item.raisedAmount || 0).usd} ({formatCurrency(item.raisedAmount || 0).fcfa})</span>
                          <span>{t.storeGoal}: {pricing.usd}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] uppercase tracking-widest text-warm-gray font-bold">{t.storeGiftPrice}</span>
                        <div className="text-right">
                          <span className="block font-serif text-lg font-bold text-charcoal">{pricing.usd}</span>
                          <span className="block font-mono text-[10px] text-warm-gray">{pricing.fcfa}</span>
                        </div>
                      </div>
                    )}

                    {/* Button action */}
                    {item.reserved ? (
                      <div className="w-full py-3 bg-cream text-warm-gray/60 text-[10px] uppercase tracking-widest font-bold rounded-lg border border-dashed border-charcoal/10 text-center flex items-center justify-center space-x-2">
                        <Check className="h-4 w-4 text-gold-dark" />
                        <span>{t.storeGiftedBy} {item.reservedBy}</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleOpenGiftModal(item)}
                        className="w-full py-3 bg-charcoal hover:bg-gold hover:text-charcoal text-ivory text-[10px] uppercase tracking-widest font-bold rounded-lg transition-all duration-300 flex items-center justify-center space-x-1.5 cursor-pointer"
                      >
                        <Gift className="h-4 w-4" />
                        <span>{isFund ? t.storeContributeBtn : t.storeGiftBtn}</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Promo details */}
        <div className="mt-16 bg-ivory rounded-2xl p-8 border border-cream shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif text-xl font-bold text-charcoal">{t.storePromoHeading}</h3>
            <p className="font-sans text-xs text-warm-gray leading-relaxed max-w-xl font-light">
              {t.storePromoDesc}
            </p>
          </div>
          <div className="text-center font-mono text-xs font-bold text-gold-dark bg-cream px-6 py-4 rounded-xl border border-cream shadow-inner shrink-0 min-w-48">
            <p className="uppercase tracking-widest text-[9px] text-warm-gray mb-1">{t.storePromoNote}</p>
            <p className="text-sm">OM &amp; MOMO AVAILABLE</p>
            <p className="text-[10px] mt-0.5 text-charcoal">+237 6XX XX XX XX</p>
          </div>
        </div>
      </div>

      {/* Gift Reservation & Blessing Form Modal */}
      <AnimatePresence>
        {activeGiftItem && (
          <div className="fixed inset-0 bg-charcoal/70 z-50 flex items-center justify-center p-4 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-cream max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden border border-gold/20 flex flex-col max-h-[90vh]"
            >
              <div className="bg-charcoal text-ivory p-6 border-b border-gold/10 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Gift className="h-5 w-5 text-gold" />
                  <h3 className="font-serif text-lg tracking-wide font-semibold">
                    {activeGiftItem.targetAmount !== undefined ? t.storeContributeBtn : t.storeGiftBtn}
                  </h3>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="text-ivory/50 hover:text-white transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>

              <div className="p-6 md:p-8 overflow-y-auto flex-grow space-y-6">
                {!showSuccess ? (
                  <form onSubmit={handleSubmitPledge} className="space-y-4 text-xs font-sans text-charcoal">
                    {/* Item Preview Card */}
                    <div className="bg-ivory rounded-xl p-4 border border-cream flex items-center space-x-4">
                      <img
                        src={activeGiftItem.imageUrl}
                        alt={activeGiftItem.title}
                        className="w-16 h-16 rounded-lg object-cover border border-cream shrink-0"
                      />
                      <div>
                        <h4 className="font-serif text-sm font-bold text-charcoal">{activeGiftItem.title}</h4>
                        <p className="text-[10px] text-warm-gray mt-0.5 line-clamp-2">{activeGiftItem.description}</p>
                        <p className="text-[10px] font-bold text-gold-dark mt-1 font-mono">
                          {t.storeGiftPrice}: {formatCurrency(activeGiftItem.price).usd} ({formatCurrency(activeGiftItem.price).fcfa})
                        </p>
                      </div>
                    </div>

                    {/* Contribution Input (If Fund) */}
                    {activeGiftItem.targetAmount !== undefined && (
                      <div className="bg-gold/5 p-4 rounded-xl border border-gold/20">
                        <label className="block text-[10px] uppercase tracking-widest text-gold-dark font-bold mb-1.5">
                          {language === 'fr' ? 'Montant de votre contribution (USD) *' : 'Your Contribution Amount (USD) *'}
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold font-serif text-charcoal">$</span>
                          <input
                            type="number"
                            required
                            min="10"
                            max={activeGiftItem.targetAmount - (activeGiftItem.raisedAmount || 0)}
                            value={contributionAmount}
                            onChange={(e) => setContributionAmount(e.target.value)}
                            className="w-full bg-ivory border border-gold/30 rounded-lg py-2.5 pl-8 pr-4 text-sm font-semibold focus:outline-none focus:border-gold-dark text-charcoal"
                          />
                        </div>
                        <p className="text-[10px] text-warm-gray mt-1.5 leading-relaxed">
                          {language === 'fr' 
                            ? `Entrez le montant que vous souhaitez promettre. Équivalent en FCFA : ~${(parseFloat(contributionAmount || '0') * 600).toLocaleString()} FCFA.`
                            : `Enter the specific amount you wish to contribute. FCFA equivalent: ~${(parseFloat(contributionAmount || '0') * 600).toLocaleString()} FCFA.`}
                        </p>
                      </div>
                    )}

                    {/* Basic Info Split */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-warm-gray font-bold mb-1">
                          {t.formLabelName} *
                        </label>
                        <input
                          type="text"
                          required
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                          placeholder="e.g. Papa Robert"
                          className="w-full bg-ivory border border-cream rounded-lg py-2.5 px-3.5 text-sm focus:outline-none focus:border-gold text-charcoal"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-warm-gray font-bold mb-1">
                          {t.formLabelEmail} *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. robert@gmail.com"
                          className="w-full bg-ivory border border-cream rounded-lg py-2.5 px-3.5 text-sm focus:outline-none focus:border-gold text-charcoal"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-warm-gray font-bold mb-1">
                          {language === 'fr' ? 'Numéro WhatsApp *' : 'WhatsApp Number *'}
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. +237 6XX XX XX XX"
                          className="w-full bg-ivory border border-cream rounded-lg py-2.5 px-3.5 text-sm focus:outline-none focus:border-gold text-charcoal"
                        />
                      </div>
                    </div>

                    {/* Relationship Selection */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-warm-gray font-bold mb-1">
                        {t.formLabelRelationship} *
                      </label>
                      <select
                        value={relationship}
                        onChange={(e) => setRelationship(e.target.value as any)}
                        className="w-full bg-ivory border border-cream rounded-lg py-2.5 px-3.5 text-sm focus:outline-none focus:border-gold text-charcoal"
                      >
                        <option value="Family">{language === 'fr' ? 'Famille' : 'Family'}</option>
                        <option value="Friend">{language === 'fr' ? 'Ami' : 'Friend'}</option>
                        <option value="Colleague">{language === 'fr' ? 'Collègue' : 'Colleague'}</option>
                        <option value="Well-wisher">{language === 'fr' ? 'Bienfaiteur' : 'Well-wisher'}</option>
                      </select>
                    </div>

                    {/* Card design selection */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-warm-gray font-bold mb-1">
                        {t.formLabelCardDesign}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1.5">
                        {[
                          { id: 'Gold-Filigree', label: 'Gold Filigree' },
                          { id: 'Rose-Petals', label: 'Rose Petals' },
                          { id: 'Cameroon-Emerald', label: 'Cameroon Emerald' },
                          { id: 'Ivory-Classic', label: 'Classic Ivory' },
                        ].map((item) => (
                          <button
                            type="button"
                            key={item.id}
                            onClick={() => setCardDesign(item.id as any)}
                            className={`p-2.5 rounded-lg border text-[10px] font-medium transition-all text-center cursor-pointer ${
                              cardDesign === item.id
                                ? 'bg-gold/15 border-gold text-gold-dark font-bold'
                                : 'bg-ivory border-cream text-charcoal hover:border-gold/30'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Blessing message */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-warm-gray font-bold mb-1">
                        {t.formLabelBlessing} *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={blessingMessage}
                        onChange={(e) => setBlessingMessage(e.target.value)}
                        placeholder={t.formPlaceholderBlessing}
                        className="w-full bg-ivory border border-cream rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold text-charcoal"
                      />
                    </div>

                    {submitError && (
                      <p className="text-red-500 text-xs text-center font-semibold">{submitError}</p>
                    )}

                    {/* Actions button */}
                    <div className="pt-2 flex space-x-3">
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        className="flex-1 py-3 border border-charcoal/20 text-charcoal text-xs uppercase tracking-widest font-bold rounded-lg hover:bg-cream transition-colors cursor-pointer"
                      >
                        {t.formBtnCancel}
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-3 bg-charcoal hover:bg-gold hover:text-charcoal text-ivory text-xs uppercase tracking-widest font-bold rounded-lg transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span>{t.formBtnSubmitActive}</span>
                        ) : (
                          <>
                            <Heart className="h-4 w-4 shrink-0 fill-current" />
                            <span>{t.formBtnSubmit}</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[10px] text-warm-gray text-center leading-relaxed italic pt-2">
                      {t.formSecureNote}
                    </p>
                  </form>
                ) : (
                  /* Success Screen state */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6 flex flex-col items-center justify-center space-y-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <Check className="h-8 w-8 stroke-[3]" />
                    </div>

                    <div>
                      <h4 className="font-serif text-2xl text-charcoal font-bold tracking-wide">
                        {t.formSuccessTitle}
                      </h4>
                      <p className="font-sans text-xs text-warm-gray leading-relaxed max-w-sm mx-auto mt-2 font-light">
                        {t.formSuccessDesc}
                      </p>
                    </div>

                    {/* Live Greeting Card Mockup */}
                    <div className="w-full max-w-md p-1">
                      <span className="block text-[10px] uppercase font-bold tracking-widest text-warm-gray text-left mb-2">
                        {t.storePreviewTitle}
                      </span>
                      <div className={`p-6 rounded-2xl text-left shadow-lg space-y-3 relative overflow-hidden ${getCardDesignStyles(cardDesign).wrapper}`}>
                        {/* Golden wax seal accent */}
                        <div className={`absolute -right-2 -bottom-2 w-12 h-12 rounded-full flex items-center justify-center text-[10px] font-bold font-serif rotate-12 shadow-md ${getCardDesignStyles(cardDesign).seal}`}>
                          C &amp; O
                        </div>

                        <div className="flex justify-between items-start">
                          <span className={`text-[8px] uppercase tracking-widest px-2.5 py-0.5 rounded-full border font-bold ${getCardDesignStyles(cardDesign).badge}`}>
                            {relationship}
                          </span>
                          <span className="font-mono text-[9px] text-warm-gray">{t.storePreviewSignature}</span>
                        </div>

                        <div>
                          <p className="font-serif text-sm font-semibold mb-0.5">{senderName}</p>
                          <p className="font-sans text-[10px] text-gold-dark italic">
                            {language === 'fr' ? 'A offert :' : 'Pledged Gift:'} {activeGiftItem.title}
                          </p>
                        </div>

                        <p className="font-sans text-xs leading-relaxed italic pt-1.5 border-t border-charcoal/10 font-light text-charcoal/90">
                          "{blessingMessage}"
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleCloseModal}
                      className="px-8 py-3 bg-charcoal hover:bg-gold hover:text-charcoal text-ivory text-xs uppercase tracking-widest font-bold rounded-lg transition-all shadow cursor-pointer font-sans"
                    >
                      {t.formReturnBtn}
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
