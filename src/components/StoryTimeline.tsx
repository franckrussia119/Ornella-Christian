import React from 'react';
import { motion } from 'motion/react';
import { Heart, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import storyPhoto1 from '../assets/images/story-photo-1.jpg';
import storyPhoto2 from '../assets/images/story-photo-2.jpg';
import storyPhoto4 from '../assets/images/story-photo-4.jpg';

export default function StoryTimeline() {
  const { language, t } = useLanguage();

  const localMilestones = [
    {
      id: 'm1',
      year: '2018',
      title: language === 'fr' ? 'Deux étudiants, un même campus' : 'Two Students, One Campus',
      subtitle: language === 'fr' ? 'Là où tout a commencé' : 'Where it all began',
      location: language === 'fr' ? "Université de Buea, Cameroun" : 'University of Buea, Cameroon',
      description: language === 'fr'
        ? "Nous étions tous deux étudiants à l'Université de Buea, nos chemins se croisant entre les amphithéâtres et les allées du campus bien avant que l'un de nous n'ose dire plus qu'un simple bonjour. Ce qui n'était au début que des visages familiers dans la foule est devenu, sans que nous nous en rendions compte, une amitié qu'aucun de nous ne voulait voir s'arrêter."
        : 'We were both students at the University of Buea, our paths crossing between lecture halls and campus footpaths long before either of us had the courage to say much more than hello. What started as familiar faces in a crowd slowly became a friendship neither of us saw coming — and neither of us wanted to end.',
      imageUrl: storyPhoto1
    },
    {
      id: 'm2',
      year: '2019',
      title: language === 'fr' ? 'Le même banc d\'église' : 'The Same Pew',
      subtitle: language === 'fr' ? "Découvrir que nous appartenions à la même famille de foi" : 'Discovering we belonged to the same family of faith',
      location: language === 'fr' ? 'EEC Paroisse de Buea, Cameroun' : 'EEC Paroisse de Buea, Cameroon',
      description: language === 'fr'
        ? "C'est à l'EEC Paroisse de Buea que nous avons réalisé que nous adorions sous le même toit depuis le début. Dimanche après dimanche, notre amitié s'est approfondie dans les bancs de l'église et au-delà, ancrée dans une foi commune qui allait bientôt devenir le fondement de tout ce que nous allions construire ensemble."
        : "It was at EEC Paroisse de Buea that we realized we had been worshipping under the same roof all along. Sunday after Sunday, our friendship deepened in the pews and beyond them, grounded in a shared faith that would soon become the foundation of everything we'd build together.",
      imageUrl: storyPhoto2
    },
    {
      id: 'm3',
      year: '2022',
      title: language === 'fr' ? 'Unis dans la communion fraternelle' : 'Bound in Fellowship',
      subtitle: language === 'fr' ? "Là où l'amitié est devenue pour toujours" : 'Where friendship became forever',
      location: language === 'fr' ? 'UCJG, Buea, Cameroun' : 'UCJG, Buea, Cameroon',
      description: language === 'fr'
        ? "Au sein de l'UCJG, le groupe de jeunesse chrétien de notre église, nous nous sommes retrouvés à servir côte à côte — dans le culte, dans la prière, dans le travail discret de bâtir une communauté de jeunes croyants. C'est ici, entourés de ceux qui nous avaient vus grandir, que notre histoire est passée de l'amitié à une promesse pour la vie."
        : "Through UCJG, our church's Christian youth fellowship, we found ourselves serving side by side — in worship, in prayer, in the quiet work of building a community of young believers. It was here, surrounded by the people who had watched us grow, that our story turned from friendship into a promise for life.",
      imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'm4',
      year: '2026',
      title: language === 'fr' ? 'Direction Baham' : 'Looking Toward Baham',
      subtitle: language === 'fr' ? "L'alliance royale de nos deux familles" : 'An elegant union of our families',
      location: language === 'fr' ? 'Baham, Cameroun' : 'Baham, Cameroon',
      description: language === 'fr'
        ? "Aujourd'hui, nos familles se préparent à se réunir à Baham, au cœur du pays bamiléké, pour notre mariage coutumier traditionnel. En l'honneur de notre riche héritage culturel, nous porterons de somptueuses tenues dorées en Toghu. Les bénédictions, les échanges de présents symboliques et les négociations traditionnelles scelleront l'union de nos deux lignées en parfaite harmonie."
        : "Now, our families prepare to gather in Baham, in the heart of Bamileke country, for our Traditional Customary Wedding. Embracing our rich heritage, we will wear exquisite golden Toghu attire as blessings, symbolic gifts, and traditional negotiation bind our lineages together in beautiful harmony.",
      imageUrl: storyPhoto4
    }
  ];

  return (
    <section id="story" className="py-24 bg-cream relative overflow-hidden">
      {/* Absolute floating decor */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-blush/20 rounded-full blur-3xl -z-10" />
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="font-script text-4xl text-gold mb-3 block">{t.storySubtitle}</span>
          <h2 className="font-serif text-3xl sm:text-5xl text-charcoal tracking-wide mb-4">{t.storyTitle}</h2>
          <div className="w-16 h-[1px] bg-gold mx-auto mb-6" />
          <p className="font-sans text-xs tracking-widest uppercase text-warm-gray leading-relaxed">
            {t.storyHeadingDesc}
          </p>
        </div>

        {/* Timeline Grid layout */}
        <div className="relative">
          {/* Vertical central path line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gold/30 -translate-x-1/2 hidden md:block" />

          <div className="space-y-16 relative">
            {localMilestones.map((milestone, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={milestone.id}
                  className={`flex flex-col md:flex-row items-center justify-between ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Image Block */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-[45%] mb-8 md:mb-0"
                  >
                    <div className="relative group overflow-hidden rounded-xl shadow-xl aspect-4/3 border-4 border-white">
                      <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-transparent transition-all duration-500 z-10" />
                      <img
                        src={milestone.imageUrl}
                        alt={milestone.title}
                        className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </motion.div>

                  {/* Central Node marker */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-ivory border-2 border-gold flex items-center justify-center z-10 shadow-md hidden md:flex">
                    <Heart className="h-3 w-3 text-gold fill-gold" />
                  </div>

                  {/* Text Block */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="w-full md:w-[45%] pl-8 md:pl-0"
                  >
                    <div className="bg-ivory p-8 md:p-10 rounded-xl shadow-md border border-cream relative">
                      {/* Floating Year badge */}
                      <span className="inline-block px-3 py-1 bg-blush text-charcoal font-sans text-[10px] font-bold tracking-widest uppercase rounded-full mb-4">
                        {milestone.year}
                      </span>

                      {/* Milestone Title */}
                      <h3 className="font-serif text-2xl text-charcoal tracking-wide mb-1">
                        {milestone.title}
                      </h3>
                      <h4 className="font-script text-2xl text-gold mb-4 leading-none">
                        {milestone.subtitle}
                      </h4>

                      {/* Location bar */}
                      <div className="flex items-center space-x-2 text-warm-gray text-[10px] uppercase tracking-wider font-semibold mb-4">
                        <MapPin className="h-3.5 w-3.5 text-gold" />
                        <span>{milestone.location}</span>
                      </div>

                      {/* Description copy */}
                      <p className="font-sans text-sm text-charcoal/80 leading-relaxed font-light">
                        {milestone.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
