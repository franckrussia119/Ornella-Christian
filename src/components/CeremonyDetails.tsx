import React from 'react';
import { Calendar, Clock, MapPin, Shirt, Map } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import coupleImage from '../assets/images/christian_ornella_wedding_1783429710497.jpg';

export default function CeremonyDetails() {
  const { language, t } = useLanguage();

  const handleOpenMap = (address: string) => {
    const encoded = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encoded}`, '_blank');
  };

  const localEvents = [
    {
      id: 'c1',
      badge: language === 'fr' ? 'La Coutume' : 'Customary',
      title: language === 'fr' ? 'Rites de Mariage Traditionnel (La Dotation)' : 'Traditional Marriage Rites (La Dotation)',
      date: language === 'fr' ? 'Samedi, 8 Août 2026' : 'Saturday, August 8, 2026',
      time: '2:00 PM - 8:00 PM',
      venueName: language === 'fr' ? '{{Nom du lieu, à confirmer}}' : '{{Venue Name — to be confirmed}}',
      address: 'Baham, West Region, Cameroon',
      description: language === 'fr' 
        ? 'La cérémonie formelle du mariage coutumier traditionnel où nos deux familles s\'unissent selon les coutumes ancestrales du Cameroun, au cœur du royaume bamiléké de Baham. Elle sera rythmée par des rites coutumiers, des présentations de dots, des danses culturelles et un grand banquet de mets camerounais.'
        : 'The formal traditional customary wedding ceremony where our two families unite according to traditional Cameroon customs, held in the heart of the Bamileke chiefdom of Baham. It will feature customary rites, negotiation presentations, tribal blessings, traditional music, and an exquisite Cameroonian buffet feast.',
      dressCode: language === 'fr' ? 'Élégance Traditionnelle Royale Camerounaise' : 'Royal Cameroonian Traditional Elegance',
      dressCodeDescription: language === 'fr'
        ? 'Les invités sont chaleureusement encouragés à porter des tenues traditionnelles camerounaises. Des motifs colorés en Toghu (Nord-Ouest), Ndop (Ouest), Kaba Ngondo (Littoral) ou pagnes de qualité supérieure avec une touche d\'or sont vivement recommandés.'
        : 'Guests are warmly encouraged to wear traditional Cameroonian attire. Bold, gorgeous Toghu (North-West), Ndop (West), Kaba Ngondo (Sawa/Littoral), or custom African wax prints with touch of gold are highly recommended.'
    },
    {
      id: 'c2',
      badge: language === 'fr' ? 'Le Sacrement' : 'Ecclesiastical',
      title: language === 'fr' ? 'Mariage Civil, Religieux & Grande Réception' : 'The Civil & Religious Wedding & Grand Reception',
      date: language === 'fr' ? 'Samedi, 15 Août 2026' : 'Saturday, August 15, 2026',
      time: '1:00 PM - 11:00 PM',
      venueName: language === 'fr' ? '{{Église / Salle de réception, à confirmer}}' : '{{Church / Reception Venue — to be confirmed}}',
      address: 'Nkongsamba, Littoral Region, Cameroon',
      description: language === 'fr'
        ? 'La bénédiction religieuse suivie de l\'échange des vœux et de la signature civile de notre union à Nkongsamba. Nous nous réunirons ensuite pour un banquet dînatoire somptueux, animé par des danses et de merveilleux moments de fête.'
        : 'The religious wedding blessing, exchange of vows, and official civil signing of our union in Nkongsamba, followed by an opulent, elegant evening banquet reception with non-stop dancing, wedding toasts, and majestic celebrations.',
      dressCode: language === 'fr' ? 'Tenue de Soirée & Chic Impérial' : 'Strict Black-Tie & Regal Glamour',
      dressCodeDescription: language === 'fr'
        ? 'Messieurs en smoking classique ou costume traditionnel sombre raffiné. Mesdames en robe longue de soirée élégante. Le thème de couleur de la réception est Ivoire, Or Chaud et Champagne.'
        : 'Gentlemen in classic black tuxedos or elegant dark traditional attire. Ladies in floor-length evening gowns. The color theme is Ivory, Warm Gold, and soft Champagne.'
    }
  ];

  return (
    <section id="events" className="py-24 bg-ivory relative border-t border-cream">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-script text-4xl text-gold mb-3 block">{t.ceremonySubtitle}</span>
          <h2 className="font-serif text-3xl sm:text-5xl text-charcoal tracking-wide mb-4">{t.ceremonyTitle}</h2>
          <div className="w-16 h-[1px] bg-gold mx-auto mb-6" />
          <p className="font-sans text-xs tracking-widest uppercase text-warm-gray leading-relaxed">
            {t.ceremonyHeadingDesc}
          </p>
        </div>

        {/* Ceremonies Grid split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {localEvents.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="bg-cream rounded-2xl shadow-xl overflow-hidden border border-cream/50 flex flex-col h-full"
            >
              {/* Photo top header */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <div className="absolute inset-0 bg-charcoal/20 z-10" />
                <img
                  src={idx === 0 
                    ? 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80'
                    : coupleImage
                  }
                  alt={event.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6 z-20 bg-gold text-charcoal px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-md">
                  {event.badge}
                </div>
              </div>

              {/* Detail body */}
              <div className="p-8 md:p-10 flex-grow flex flex-col">
                <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-4 tracking-wide leading-tight">
                  {event.title}
                </h3>

                <p className="font-sans text-sm text-charcoal/70 font-light leading-relaxed mb-6 flex-grow">
                  {event.description}
                </p>

                {/* Logistics details list */}
                <div className="space-y-4 border-t border-charcoal/10 pt-6 mb-8 text-charcoal/90">
                  <div className="flex items-start space-x-3 text-xs tracking-wide">
                    <Calendar className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block text-[10px] uppercase text-warm-gray tracking-wider">Date</span>
                      <span className="font-medium">{event.date}</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 text-xs tracking-wide">
                    <Clock className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block text-[10px] uppercase text-warm-gray tracking-wider">{t.ceremonyTime}</span>
                      <span className="font-medium">{event.time}</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 text-xs tracking-wide">
                    <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block text-[10px] uppercase text-warm-gray tracking-wider">{t.ceremonyVenue}</span>
                      <span className="font-medium block">{event.venueName}</span>
                      <span className="text-warm-gray text-[11px] block mt-0.5 font-light">{event.address}</span>
                    </div>
                  </div>
                </div>

                {/* Dress Code Highlight */}
                <div className="bg-ivory/60 border border-gold/20 rounded-xl p-5 mb-8">
                  <div className="flex items-center space-x-2 text-gold mb-2">
                    <Shirt className="h-4 w-4" />
                    <span className="font-sans text-[10px] uppercase tracking-widest font-bold">{t.ceremonyDressCode}</span>
                  </div>
                  <h4 className="font-serif text-sm font-semibold text-charcoal mb-1">
                    {event.dressCode}
                  </h4>
                  <p className="font-sans text-xs text-warm-gray leading-relaxed font-light">
                    {event.dressCodeDescription}
                  </p>
                </div>

                {/* Actions */}
                <button
                  onClick={() => handleOpenMap(event.venueName + ", " + event.address)}
                  className="w-full py-3.5 border border-charcoal text-[11px] font-bold uppercase tracking-widest text-charcoal bg-transparent hover:bg-charcoal hover:text-ivory transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Map className="h-3.5 w-3.5" />
                  <span>{t.ceremonyMapBtn}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
