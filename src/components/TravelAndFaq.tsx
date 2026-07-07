import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Plane, Hotel, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export default function TravelAndFaq() {
  const { language, t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const handleToggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const faqCategories = ['All', 'Gifts & Registry', 'Travel & Location', 'Culture & Attire', 'RSVP & Access'];

  const getCategoryLabel = (cat: string) => {
    if (language === 'fr') {
      switch (cat) {
        case 'All': return 'Tous';
        case 'Gifts & Registry': return 'Cadeaux & Boutique';
        case 'Travel & Location': return 'Voyage & Lieux';
        case 'Culture & Attire': return 'Culture & Tenues';
        case 'RSVP & Access': return 'RSVP & Accès';
      }
    }
    return cat;
  };

  // Local Translated FAQ Data
  const localFaqItems = [
    {
      id: 'f1',
      question: language === 'fr' 
        ? 'Comment fonctionne la boutique de mariage / liste de cadeaux ?' 
        : 'How do I use the Wedding Store / Gift Registry?',
      answer: language === 'fr'
        ? 'Notre boutique de mariage en ligne vous permet de parcourir et de choisir des cadeaux pré-sélectionnés pour notre nouveau foyer. Vous pouvez : 1) Réserver un article physique et l\'apporter le jour J, ou 2) Faire une contribution financière libre en ligne (Momo, OM, ou virement). Lors de votre réservation, vous pourrez rédiger une magnifique carte de bénédictions numérique qui apparaîtra sur notre mur des vœux !'
        : 'Our Wedding Store allows you to browse and pick gift concepts we have curated for our new home and honeymoon. You can either: 1) Reserve/Pledge a physical item and purchase it from your retailer of choice to bring to the ceremony, or 2) Contribute any amount to our Honeymoon/Home funds directly on the site. When you place an order or contribution, you will also be able to write an elegant Digital Gift Card and Blessing that will appear on our blessings wall!',
      category: 'Gifts & Registry'
    },
    {
      id: 'f2',
      question: language === 'fr'
        ? 'Y a-t-il des recommandations de voyage pour les invités internationaux ?'
        : 'Are there travel recommendations for international guests?',
      answer: language === 'fr'
        ? 'Absolument ! Les invités venant de l\'étranger doivent réserver un vol à destination de l\'Aéroport International de Yaoundé Nsimalen (NSI) pour la Dotation, ou de l\'Aéroport International de Douala (DLA) pour le mariage civil/religieux. Nous avons négocié des tarifs spéciaux au Hilton Yaoundé et au Pullman Douala. Veuillez vous assurer d\'obtenir votre visa de tourisme camerounais et votre carnet de vaccination fièvre jaune au moins un mois à l\'avance.'
        : 'Yes! International guests should fly into Douala International Airport (DLA) or Yaoundé Nsimalen International Airport (NSI). We have blocked hotel rooms with special rates at the Hilton Yaoundé and the Pullman Douala Rabingha. Please secure your Cameroonian tourist visa and yellow fever vaccination card at least 1 month prior to departure.',
      category: 'Travel & Location'
    },
    {
      id: 'f3',
      question: language === 'fr'
        ? 'Quel est le code vestimentaire pour chaque cérémonie ?'
        : 'What is the dress code for each ceremony?',
      answer: language === 'fr'
        ? 'Pour le mariage coutumier (La Dot) à Yaoundé, la tenue traditionnelle d\'apparat est de mise (Toghu, Ndop, Kaba Ngondo ou imprimés africains avec des touches dorées). Pour le mariage blanc à Douala, nous exigeons un style très élégant : Smoking/Costume noir chic pour les hommes, et robe longue de soirée d\'une des couleurs du thème (Ivoire, Or, Champagne) pour les femmes.'
        : 'The Traditional Customary Wedding in Yaoundé is Traditional Elegance & Royal African prints (Toghu, Ndop, Kaba, or Dashiki). The White Wedding in Douala is high-fashion Black-Tie & Evening Glamour (Tuxedos for men, long elegant gowns for ladies) themed in Ivory, Champagne, and Gold.',
      category: 'Culture & Attire'
    },
    {
      id: 'f4',
      question: language === 'fr'
        ? 'Comment et quand dois-je confirmer mon RSVP ?'
        : 'How and when should I RSVP?',
      answer: language === 'fr'
        ? 'Veuillez confirmer votre présence en remplissant le formulaire de RSVP sur ce site web avant le 1er novembre 2026. Cela permettra à notre équipe de traiteurs de planifier avec précision les menus typiques et de dresser les tables de réception pour Yaoundé et Douala.'
        : 'Please complete the RSVP form on this website by November 1st, 2026. This allows our catering team in Yaoundé and Douala to accurately finalize the traditional Cameroonian menu courses and seating charts.',
      category: 'RSVP & Access'
    }
  ];

  const filteredFaqs = selectedCategory === 'All'
    ? localFaqItems
    : localFaqItems.filter(item => item.category === selectedCategory);

  return (
    <section id="faq" className="py-24 bg-cream relative">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-script text-4xl text-gold mb-3 block">{t.faqSubtitle}</span>
          <h2 className="font-serif text-3xl sm:text-5xl text-charcoal tracking-wide mb-4">{t.faqTitle}</h2>
          <div className="w-16 h-[1px] bg-gold mx-auto mb-6" />
          <p className="font-sans text-xs tracking-widest uppercase text-warm-gray leading-relaxed">
            {t.faqHeadingDesc}
          </p>
        </div>

        {/* Info Grid (Hotels, Flight, Transport) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          
          {/* Card 1: Flights & Airports */}
          <div className="bg-ivory p-8 rounded-2xl border border-cream shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-gold/10 text-gold-dark rounded-full flex items-center justify-center mb-6">
                <Plane className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-xl text-charcoal font-semibold mb-3 tracking-wide">{t.faqFlightTitle}</h3>
              <p className="font-sans text-xs text-warm-gray leading-relaxed mb-4 font-light">
                {t.faqFlightDesc}
              </p>
              <ul className="text-xs text-charcoal/90 space-y-2 font-sans">
                <li>&bull; <span className="font-bold">{language === 'fr' ? 'Transit inter-villes :' : 'Intercity transit:'}</span> Trains (Camrail) ou navettes privées.</li>
                <li>&bull; <span className="font-bold">{language === 'fr' ? 'Visa d\'entrée :' : 'Entry Visa:'}</span> Le visa de tourisme est obligatoire.</li>
                <li>&bull; <span className="font-bold">{language === 'fr' ? 'Santé :' : 'Health:'}</span> Le vaccin contre la fièvre jaune est obligatoire.</li>
              </ul>
            </div>
            <span className="text-[9px] uppercase tracking-widest text-gold font-bold font-sans mt-6 block">NSI &bull; DLA &bull; {t.faqFlightAirportCode}</span>
          </div>

          {/* Card 2: Hotel Blockings */}
          <div className="bg-ivory p-8 rounded-2xl border border-cream shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-gold/10 text-gold-dark rounded-full flex items-center justify-center mb-6">
                <Hotel className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-xl text-charcoal font-semibold mb-3 tracking-wide">{t.faqHotelTitle}</h3>
              <p className="font-sans text-xs text-warm-gray leading-relaxed mb-4 font-light">
                {t.faqHotelDesc}
              </p>
              <div className="space-y-3 font-sans text-xs text-charcoal/90">
                <div>
                  <span className="font-bold block text-[10px] uppercase text-gold-dark tracking-wider">Yaoundé (10 - 11 déc):</span>
                  <span>Hilton Hotel Yaoundé (Proche Bastos)</span>
                </div>
                <div>
                  <span className="font-bold block text-[10px] uppercase text-gold-dark tracking-wider">Douala (12 - 13 déc):</span>
                  <span>Pullman Douala Rabingha / Krystal Palace</span>
                </div>
              </div>
            </div>
            <span className="text-[9px] uppercase tracking-widest text-gold font-bold font-sans mt-6 block">{t.faqHotelQuoteCode} "C&amp;O Wedding"</span>
          </div>

          {/* Card 3: Culture & Attire etiquette */}
          <div className="bg-ivory p-8 rounded-2xl border border-cream shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-gold/10 text-gold-dark rounded-full flex items-center justify-center mb-6">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-xl text-charcoal font-semibold mb-3 tracking-wide">{t.faqCultureTitle}</h3>
              <p className="font-sans text-xs text-warm-gray leading-relaxed mb-4 font-light">
                {t.faqCultureDesc}
              </p>
              <ul className="text-xs text-charcoal/90 space-y-2 font-sans">
                <li>&bull; <span className="font-bold">{language === 'fr' ? 'Qu\'est-ce que le Toghu ?' : 'What is Toghu?'}</span> {language === 'fr' ? 'Somptueux velours brodé à la main, symbole d\'autorité et d\'unité royale.' : 'Hand-woven majestic heavy velvet fabric representing power and unity.'}</li>
                <li>&bull; <span className="font-bold">{language === 'fr' ? 'Qu\'est-ce que le Ndop ?' : 'What is Ndop?'}</span> {language === 'fr' ? 'Tissu traditionnel bleu indigo frappé de symboles géométriques rituels.' : 'Deep indigo blue royal fabric printed with traditional geometric tribal signs.'}</li>
              </ul>
            </div>
            <span className="text-[9px] uppercase tracking-widest text-gold font-bold font-sans mt-6 block">{t.faqCultureQuoteCode}</span>
          </div>

        </div>

        {/* Expandable FAQs Accordion Row */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {faqCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-charcoal text-ivory border-charcoal'
                    : 'bg-ivory border-cream text-charcoal hover:border-gold'
                }`}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-ivory border border-cream rounded-xl overflow-hidden transition-shadow duration-300 shadow-sm"
                >
                  <button
                    onClick={() => handleToggleFaq(faq.id)}
                    className="w-full text-left py-5 px-6 md:px-8 flex items-center justify-between space-x-4 cursor-pointer hover:bg-cream/20 transition-colors"
                  >
                    <div className="flex items-center space-x-3 text-charcoal">
                      <HelpCircle className="h-4.5 w-4.5 text-gold shrink-0" />
                      <span className="font-serif text-sm sm:text-base font-semibold tracking-wide">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 text-warm-gray transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-gold' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 md:px-8 pb-6 border-t border-cream pt-4 text-xs sm:text-sm text-warm-gray leading-relaxed font-light whitespace-pre-line">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
