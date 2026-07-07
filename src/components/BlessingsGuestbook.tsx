import React, { useState } from 'react';
import { GuestBlessing } from '../types';
import { Heart, MessageSquare, Sparkles, User, Calendar, Smile } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export default function BlessingsGuestbook({
  blessings,
  onAddBlessing,
}: {
  blessings: GuestBlessing[];
  onAddBlessing: (newBlessing: GuestBlessing) => void;
}) {
  const { language, t } = useLanguage();

  // Direct Guestbook writing states
  const [showSignForm, setShowSignForm] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [email, setEmail] = useState('');
  const [relationship, setRelationship] = useState<'Family' | 'Friend' | 'Colleague' | 'Well-wisher'>('Family');
  const [message, setMessage] = useState('');
  const [cardDesign, setCardDesign] = useState<'Gold-Filigree' | 'Rose-Petals' | 'Cameroon-Emerald' | 'Ivory-Classic'>('Gold-Filigree');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitGuestbook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !email || !message) {
      alert(language === 'fr' ? 'Veuillez remplir tous les champs obligatoires.' : 'Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newBlessing: GuestBlessing = {
        id: 'direct_b_' + Date.now(),
        senderName,
        email,
        relationship,
        message,
        date: new Date().toISOString(),
        cardDesign,
      };

      onAddBlessing(newBlessing);
      setIsSubmitting(false);
      setShowSignForm(false);
      
      // Reset form
      setSenderName('');
      setEmail('');
      setMessage('');
    }, 1200);
  };

  // Map design classes
  const getDesignCardClasses = (design: typeof cardDesign) => {
    switch (design) {
      case 'Gold-Filigree':
        return {
          card: 'bg-gradient-to-br from-[#FAF6EE] to-[#EFE4D3] text-charcoal border-2 border-gold/70 shadow-lg',
          header: 'border-b border-gold/10 text-gold-dark',
          tag: 'bg-gold/15 text-gold-dark',
          text: 'text-charcoal/90 font-serif',
          seal: 'bg-gold text-charcoal font-bold',
          badge: 'bg-gold/25 border border-gold/40 text-gold-dark',
        };
      case 'Rose-Petals':
        return {
          card: 'bg-gradient-to-br from-[#FFF5F3] to-[#F5D8D4] text-charcoal border-2 border-blush-dark/70 shadow-lg',
          header: 'border-b border-blush-dark/20 text-blush-dark',
          tag: 'bg-blush text-charcoal',
          text: 'text-charcoal/90',
          seal: 'bg-blush-dark text-charcoal font-bold',
          badge: 'bg-blush border border-blush-dark text-charcoal',
        };
      case 'Cameroon-Emerald':
        return {
          card: 'bg-gradient-to-br from-[#064e3b] to-[#022c22] text-ivory border-2 border-gold-dark shadow-2xl',
          header: 'border-b border-white/10 text-gold',
          tag: 'bg-white/10 text-gold border border-white/10',
          text: 'text-white/95 leading-relaxed font-light',
          seal: 'bg-gold text-charcoal font-bold',
          badge: 'bg-white/15 border border-white/20 text-gold',
        };
      case 'Ivory-Classic':
      default:
        return {
          card: 'bg-ivory text-charcoal border border-cream shadow-md',
          header: 'border-b border-cream text-charcoal/70',
          tag: 'bg-cream text-charcoal',
          text: 'text-charcoal/80',
          seal: 'bg-charcoal text-ivory font-bold',
          badge: 'bg-cream border border-charcoal/10 text-charcoal',
        };
    }
  };

  const getRelationshipLabel = (rel: string) => {
    if (language === 'fr') {
      switch (rel) {
        case 'Family': return 'Famille';
        case 'Friend': return 'Ami';
        case 'Colleague': return 'Collègue';
        case 'Well-wisher': return 'Bienfaiteur';
      }
    }
    return rel;
  };

  return (
    <section id="blessings" className="py-24 bg-ivory relative border-t border-cream">
      {/* Absolute decorative backdrops */}
      <div className="absolute left-1/2 top-10 -translate-x-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-script text-4xl text-gold mb-3 block">{t.guestbookSubtitle}</span>
          <h2 className="font-serif text-3xl sm:text-5xl text-charcoal tracking-wide mb-4">{t.guestbookTitle}</h2>
          <div className="w-16 h-[1px] bg-gold mx-auto mb-6" />
          <p className="font-sans text-xs tracking-widest uppercase text-warm-gray leading-relaxed mb-8">
            {t.guestbookHeadingDesc}
          </p>

          {/* Call to action to sign guestbook */}
          <button
            onClick={() => setShowSignForm(true)}
            className="px-8 py-3.5 bg-charcoal text-ivory text-[11px] uppercase tracking-widest font-bold rounded-lg hover:bg-gold hover:text-charcoal transition-all cursor-pointer shadow-md flex items-center justify-center space-x-2 mx-auto"
          >
            <Smile className="h-4 w-4 shrink-0" />
            <span>{t.guestbookBtnWrite}</span>
          </button>
        </div>

        {/* Direct Guestbook Blessing card designer Overlay */}
        <AnimatePresence>
          {showSignForm && (
            <div className="fixed inset-0 bg-charcoal/60 z-50 overflow-y-auto flex items-center justify-center p-4 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="bg-cream max-w-lg w-full rounded-2xl shadow-2xl overflow-hidden border border-gold/20 p-6 sm:p-8 relative"
              >
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <span className="font-sans text-[9px] uppercase tracking-widest text-gold font-bold block">Digital Card Designer</span>
                    <h3 className="font-serif text-2xl text-charcoal tracking-wide font-bold">{t.guestbookCardTitle}</h3>
                  </div>
                  <button
                    onClick={() => setShowSignForm(false)}
                    className="p-1.5 text-charcoal/50 hover:text-charcoal bg-ivory rounded-full text-xs font-sans uppercase font-bold cursor-pointer"
                  >
                    Close &times;
                  </button>
                </div>

                <form onSubmit={handleSubmitGuestbook} className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-warm-gray font-bold mb-1">{t.formLabelName} *</label>
                    <input
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Cousin Franck"
                      className="w-full bg-ivory border border-cream rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold text-charcoal"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-warm-gray font-bold mb-1">{t.formLabelEmail} *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. franck@gmail.com"
                      className="w-full bg-ivory border border-cream rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold text-charcoal"
                    />
                  </div>

                  {/* Relationship */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-warm-gray font-bold mb-1">{t.guestbookLabelRelationship}</label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {(['Family', 'Friend', 'Colleague', 'Well-wisher'] as const).map((rel) => (
                        <button
                          key={rel}
                          type="button"
                          onClick={() => setRelationship(rel)}
                          className={`py-1.5 text-[9px] uppercase tracking-wider font-bold rounded border text-center transition-all cursor-pointer ${
                            relationship === rel
                              ? 'bg-charcoal text-ivory border-charcoal'
                              : 'bg-ivory text-charcoal border-cream hover:border-gold'
                          }`}
                        >
                          {getRelationshipLabel(rel)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Design selector */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-warm-gray font-bold mb-1">{t.guestbookLabelCardStyle}</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { id: 'Gold-Filigree', name: 'Gold Filigree' },
                        { id: 'Rose-Petals', name: 'Rose Petals' },
                        { id: 'Cameroon-Emerald', name: 'Emerald Gold' },
                        { id: 'Ivory-Classic', name: 'Ivory Classic' },
                      ].map((design) => (
                        <button
                          key={design.id}
                          type="button"
                          onClick={() => setCardDesign(design.id as any)}
                          className={`py-1.5 text-[10px] font-semibold rounded border text-center transition-all cursor-pointer ${
                            cardDesign === design.id
                              ? 'bg-gold text-charcoal border-gold shadow'
                              : 'bg-ivory text-charcoal border-cream hover:border-gold'
                          }`}
                        >
                          {design.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Blessing message */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-warm-gray font-bold mb-1">{t.formLabelBlessing} *</label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t.guestbookPlaceholderMessage}
                      className="w-full bg-ivory border border-cream rounded-lg py-2.5 px-3.5 text-sm focus:outline-none focus:border-gold text-charcoal placeholder:text-warm-gray/50"
                    />
                  </div>

                  {/* Submit direct */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-gold text-charcoal text-xs uppercase tracking-widest font-bold rounded-lg hover:bg-gold-dark transition-all flex items-center justify-center space-x-2 cursor-pointer shadow font-sans"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-charcoal border-t-transparent rounded-full animate-spin shrink-0" />
                        <span>{t.guestbookBtnPublishActive}</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        <span>{t.guestbookBtnPublish}</span>
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Grid display of Blessings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {blessings.map((bless, idx) => {
            const styles = getDesignCardClasses(bless.cardDesign);
            const dateStr = new Date(bless.date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });

            return (
              <motion.div
                key={bless.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: Math.min(idx * 0.05, 0.3) }}
                className={`p-6 sm:p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden h-[320px] transition-transform duration-300 hover:-translate-y-1.5 ${styles.card}`}
              >
                {/* Wax seal watermark in corner */}
                <div className={`absolute -right-3 -bottom-3 w-16 h-16 rounded-full flex items-center justify-center text-[11px] font-serif font-extrabold rotate-12 opacity-80 shadow-inner ${styles.seal}`}>
                  C &amp; O
                </div>

                {/* Card Header details */}
                <div className="space-y-4">
                  <div className={`pb-3 flex justify-between items-center ${styles.header}`}>
                    <span className={`text-[8px] uppercase tracking-widest font-bold px-3 py-1 rounded-full ${styles.tag}`}>
                      {getRelationshipLabel(bless.relationship)}
                    </span>
                    <div className="flex items-center space-x-1.5 text-[10px] text-warm-gray/70">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{dateStr}</span>
                    </div>
                  </div>

                  {/* Message body */}
                  <div className="overflow-y-auto max-h-36 pr-1 custom-scrollbar">
                    <p className={`text-xs leading-relaxed italic ${styles.text}`}>
                      "{bless.message}"
                    </p>
                  </div>
                </div>

                {/* Footer signatory details */}
                <div className="pt-4 border-t border-charcoal/5 flex items-center justify-between relative z-10">
                  <div className="flex items-center space-x-2.5">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${styles.badge}`}>
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block font-serif text-xs font-bold">{bless.senderName}</span>
                      <span className="block text-[8px] uppercase tracking-widest text-warm-gray font-light">
                        {t.guestbookCardFooterPrefix}
                      </span>
                    </div>
                  </div>

                  {/* Gift Tag Badge if they pledged an item in the store! */}
                  {bless.pledgedItemTitle && (
                    <div className="flex items-center space-x-1 bg-gold/15 text-gold-dark text-[8px] font-bold uppercase tracking-wider py-1 px-2.5 rounded-full border border-gold/30 shrink-0">
                      <Heart className="h-2.5 w-2.5 fill-current text-gold" />
                      <span className="max-w-[70px] truncate" title={bless.pledgedItemTitle}>
                        Gift Pledged
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
