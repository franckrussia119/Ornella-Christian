import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Navigation, Compass, ExternalLink } from 'lucide-react';

export default function GoogleMapsSection() {
  const { language, t } = useLanguage();

  const mapsData = [
    {
      city: 'Baham',
      title: language === 'fr' ? 'La Dotation Coutumière (Baham)' : 'Traditional Customary (Baham)',
      venue: language === 'fr' ? '{{Nom du lieu, à confirmer}}' : '{{Venue Name — to be confirmed}}',
      address: 'Baham, West Region, Cameroon',
      coords: 'Baham Cameroon',
      // Real standard responsive Google Maps search embed for Baham
      embedUrl: 'https://maps.google.com/maps?q=Baham%20Cameroon&t=&z=12&ie=UTF8&iwloc=&output=embed',
      directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Baham+Cameroon'
    },
    {
      city: 'Nkongsamba',
      title: language === 'fr' ? 'Le Mariage Civil & Religieux (Nkongsamba)' : 'The Civil & Religious Wedding (Nkongsamba)',
      venue: language === 'fr' ? '{{Église / Salle de réception, à confirmer}}' : '{{Church / Reception Venue — to be confirmed}}',
      address: 'Nkongsamba, Littoral Region, Cameroon',
      coords: 'Nkongsamba Cameroon',
      // Real standard responsive Google Maps search embed for Nkongsamba
      embedUrl: 'https://maps.google.com/maps?q=Nkongsamba%20Cameroon&t=&z=13&ie=UTF8&iwloc=&output=embed',
      directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Nkongsamba+Cameroon'
    }
  ];

  return (
    <section id="maps" className="py-24 bg-cream relative border-t border-cream">
      {/* Absolute design accent grids */}
      <div className="absolute right-10 top-1/4 w-[400px] h-[400px] bg-gold/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-script text-4xl text-gold mb-3 block">
            {language === 'fr' ? 'Itinéraire de Célébration' : 'Celebration Coordinates'}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-charcoal tracking-wide mb-4">
            {language === 'fr' ? 'Accès Google Maps' : 'Google Maps Locations'}
          </h2>
          <div className="w-16 h-[1px] bg-gold mx-auto mb-6" />
          <p className="font-sans text-xs tracking-widest uppercase text-warm-gray leading-relaxed">
            {language === 'fr' 
              ? 'Naviguez facilement vers nos deux lieux de célébration à Baham et Nkongsamba. Utilisez les cartes interactives ci-dessous pour lancer votre GPS.'
              : 'Easily navigate to both of our celebration venues in Baham and Nkongsamba. Use the interactive maps below or launch directly on your device GPS.'}
          </p>
        </div>

        {/* Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {mapsData.map((mapItem, idx) => (
            <div 
              key={idx}
              className="bg-ivory border border-cream rounded-2xl shadow-lg overflow-hidden flex flex-col justify-between"
            >
              {/* Header Details */}
              <div className="p-6 md:p-8 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-gold/15 text-gold-dark px-3 py-1 rounded">
                    {mapItem.city}
                  </span>
                  <div className="flex items-center space-x-1.5 text-xs text-warm-gray">
                    <Compass className="h-4 w-4 text-gold" />
                    <span>Cameroon GPS</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-xl text-charcoal font-bold tracking-wide">
                    {mapItem.title}
                  </h3>
                  <p className="font-sans text-xs text-gold-dark font-medium mt-1">
                    {mapItem.venue}
                  </p>
                </div>

                <div className="flex items-start space-x-2.5 pt-1.5">
                  <MapPin className="h-4 w-4 text-warm-gray shrink-0 mt-0.5" />
                  <span className="font-sans text-xs text-warm-gray leading-relaxed">
                    {mapItem.address}
                  </span>
                </div>
              </div>

              {/* Interactive Iframe Embed container */}
              <div className="h-80 md:h-96 w-full border-t border-b border-cream bg-cream relative">
                <iframe
                  title={`Map of ${mapItem.city}`}
                  src={mapItem.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full relative z-10"
                />
              </div>

              {/* Footer action button */}
              <div className="p-5 bg-cream/30 border-t border-cream flex justify-between items-center">
                <span className="text-[9px] uppercase tracking-widest text-warm-gray font-sans font-bold">
                  Latitude &bull; Longitude Coordinates
                </span>
                <a
                  href={mapItem.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-charcoal text-ivory text-[10px] uppercase tracking-widest font-bold rounded-lg hover:bg-gold hover:text-charcoal transition-all flex items-center space-x-1.5 cursor-pointer"
                >
                  <Navigation className="h-3.5 w-3.5 shrink-0" />
                  <span>{t.ceremonyMapBtn}</span>
                  <ExternalLink className="h-3 w-3 shrink-0" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
