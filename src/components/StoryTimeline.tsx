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
      year: '2021',
      title: language === 'fr' ? 'Rencontre fortuite à Douala' : 'Eyes Met in Douala',
      subtitle: language === 'fr' ? 'Là où tout a commencé' : 'Where it all began',
      location: language === 'fr' ? 'Douala, Cameroun' : 'Douala, Cameroon',
      description: language === 'fr'
        ? "Au milieu des rues animées d'Akwa, à Douala, nos chemins se sont croisés lors d'une conférence locale sur la technologie et l'entrepreneuriat. Une simple discussion sur le design moderne en Afrique s'est rapidement transformée en une conversation de trois heures autour d'un café. Nous avons compris que nous partagions bien plus que des rêves professionnels : les mêmes valeurs, le même humour et une vision commune de l'avenir."
        : 'Amidst the bustling streets of Akwa, Douala, our paths crossed at a local tech and business conference. A shared discussion on modern African design soon turned into a three-hour coffee chat. We realized we shared not just professional dreams, but the same values, laughter, and vision for the future.',
      imageUrl: storyPhoto1
    },
    {
      id: 'm2',
      year: '2022',
      title: language === 'fr' ? 'Première escapade à Limbé' : 'First Escape to Limbé',
      subtitle: language === 'fr' ? "L'amour au rythme des vagues" : 'Falling in love by the black sands',
      location: language === 'fr' ? 'Limbé, Cameroun' : 'Limbé Beach, Cameroon',
      description: language === 'fr'
        ? "Notre tout premier voyage ensemble à Limbé, marchant le long des plages de sable noir volcanique sous la brise fraîche de l'Atlantique. En regardant le coucher du soleil avec le Mont Cameroun en arrière-plan, nous avons réalisé que ce n'était pas un simple feu de paille—nous avions trouvé notre véritable foyer l'un chez l'autre."
        : 'Our first real trip together to Limbé, walking along the volcanic black sands with the fresh Atlantic breeze. Watching the sunset with Mount Cameroon behind us, we realized this was more than just a passing spark—we had found our absolute home in one another.',
      imageUrl: storyPhoto2
    },
    {
      id: 'm3',
      year: '2024',
      title: language === 'fr' ? 'La demande à Kribi' : 'The Kribi Proposal',
      subtitle: language === 'fr' ? "Un 'Oui' pour toujours aux chutes de la Lobé" : 'Yes to Forever by the Chutes de la Lobé',
      location: language === 'fr' ? 'Kribi, Cameroun' : 'Kribi, Cameroon',
      description: language === 'fr'
        ? "Lors d'un week-end romantique dans le paradis balnéaire de Kribi, Christian a planifié une promenade surprise en pirogue au coucher du soleil près des chutes de la Lobé. Là où le fleuve se jette dans l'océan, il s'est agenouillé. Avec le grondement des cascades et le 'Oui' ému d'Ornella, notre chemin vers le mariage était tracé."
        : 'During a weekend getaway to the seaside paradise of Kribi, Christian planned a surprise sunset canoe ride near the Lobé Waterfalls. Standing where the river meets the ocean, he got down on one knee. With the sound of cascading waters and Ornella’s tearful "Oui!", our road to marriage was sealed.',
      imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'm4',
      year: language === 'fr' ? 'Fév 2026' : 'Feb 2026',
      title: language === 'fr' ? 'La Dotation (Mariage Coutumier)' : 'La Dotation (Traditional Rites)',
      subtitle: language === 'fr' ? "L'alliance royale de nos deux familles" : 'An elegant union of our families',
      location: language === 'fr' ? 'Yaoundé, Cameroun' : 'Yaoundé, Cameroon',
      description: language === 'fr'
        ? "Entourés de la chaleur de nos aînés, nos familles se sont réunies à Yaoundé pour notre mariage coutumier traditionnel. En l'honneur de notre riche héritage culturel, nous portions de somptueuses tenues dorées en Toghu. Les bénédictions, les échanges de présents symboliques et les négociations traditionnelles ont scellé l'union de nos deux lignées en parfaite harmonie."
        : 'Surrounded by the warmth of our elders, our families gathered in Yaoundé for our Traditional Customary Wedding. Embracing our rich heritage, we wore exquisite golden Toghu attire. The blessings, exchange of symbolic gifts, and traditional negotiation bound our lineages together in beautiful harmony.',
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
