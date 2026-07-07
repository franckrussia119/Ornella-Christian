import React, { useState, useEffect } from 'react';
import { Heart, Calendar, MapPin, Gift } from 'lucide-react';
import { coupleHeroImage } from '../data';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { language, t } = useLanguage();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Target Date: December 11, 2026 at 2:00 PM (Start of traditional rites)
    const targetDate = new Date('2026-12-11T14:00:00');

    const updateTimer = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-charcoal flex items-center justify-center">
      {/* Background Image with elegant overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/45 via-charcoal/25 to-charcoal/80 z-10" />
      <img
        src={coupleHeroImage}
        alt="Christian and Ornella Wedding"
        className="absolute inset-0 w-full h-full object-cover object-center"
        referrerPolicy="no-referrer"
      />

      {/* Hero Interactive Content */}
      <div className="relative z-20 text-center px-6 md:px-12 max-w-4xl flex flex-col items-center mt-12">
        {/* Marriage Announcement Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-ivory/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-ivory/20 mb-6 flex items-center space-x-2 text-gold font-sans text-[10px] tracking-widest uppercase"
        >
          <Heart className="h-3.5 w-3.5 fill-gold stroke-gold animate-pulse" />
          <span>{t.heroAnnounce}</span>
        </motion.div>

        {/* Cursive Romantic Accent */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <span className="font-script text-4xl md:text-5xl text-blush tracking-wider mb-2 block animate-fadeIn">
            {t.heroWelcome}
          </span>
        </motion.div>

        {/* Main Title: Christian and Ornella */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-serif text-4xl sm:text-6xl md:text-8xl font-light text-ivory tracking-wide leading-none mb-4"
        >
          Christian <span className="font-script text-4xl sm:text-5xl md:text-6xl text-gold lowercase">{t.heroAnd}</span> Ornella
        </motion.h1>

        {/* Location & Dates Details Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-8 text-cream/90 font-sans text-xs tracking-widest uppercase mb-10 border-y border-white/10 py-4 w-full justify-center"
        >
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gold" />
            <span>{language === 'fr' ? '11 - 12 Décembre 2026' : 'December 11 - 12, 2026'}</span>
          </div>
          <div className="h-2 w-2 rounded-full bg-gold hidden sm:block" />
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-gold" />
            <span>{t.heroLocation}</span>
          </div>
        </motion.div>

        {/* Countdown Timer Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="grid grid-cols-4 gap-4 md:gap-6 bg-charcoal/60 backdrop-blur-md p-4 md:p-6 rounded-xl border border-white/15 max-w-lg w-full mb-10 shadow-2xl animate-fadeIn"
        >
          <div className="text-center">
            <span className="block font-serif text-2xl sm:text-4xl font-light text-gold">{timeLeft.days}</span>
            <span className="block font-sans text-[9px] text-cream/70 uppercase tracking-widest mt-1">{t.heroDays}</span>
          </div>
          <div className="text-center border-l border-white/10">
            <span className="block font-serif text-2xl sm:text-4xl font-light text-gold">{timeLeft.hours}</span>
            <span className="block font-sans text-[9px] text-cream/70 uppercase tracking-widest mt-1">{t.heroHours}</span>
          </div>
          <div className="text-center border-l border-white/10">
            <span className="block font-serif text-2xl sm:text-4xl font-light text-gold">{timeLeft.minutes}</span>
            <span className="block font-sans text-[9px] text-cream/70 uppercase tracking-widest mt-1">{t.heroMins}</span>
          </div>
          <div className="text-center border-l border-white/10">
            <span className="block font-serif text-2xl sm:text-4xl font-light text-gold">{timeLeft.seconds}</span>
            <span className="block font-sans text-[9px] text-cream/70 uppercase tracking-widest mt-1">{t.heroSecs}</span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto"
        >
          <button
            onClick={() => handleScrollTo('#store')}
            className="px-8 py-3.5 bg-gold text-charcoal text-[11px] uppercase tracking-widest font-bold transition-all duration-300 hover:bg-gold-dark hover:scale-105 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Gift className="h-3.5 w-3.5" />
            <span>{t.heroBtnStore}</span>
          </button>
          <button
            onClick={() => handleScrollTo('#story')}
            className="px-8 py-3.5 border border-white/55 text-white text-[11px] uppercase tracking-widest font-semibold transition-all duration-300 bg-transparent hover:bg-white hover:text-charcoal flex items-center justify-center cursor-pointer"
          >
            <span>{t.heroBtnStory}</span>
          </button>
        </motion.div>
      </div>

      {/* Floating vertical accent text - celebrating in Cameroon */}
      <div className="absolute left-6 bottom-12 z-20 hidden lg:flex flex-col items-center space-y-4 text-cream/60">
        <span className="w-[1px] h-12 bg-gold/50" />
        <span className="text-[9px] uppercase tracking-[0.25em] rotate-180 writing-mode-vertical whitespace-nowrap">
          C &amp; O &bull; YAOUNDÉ - DOUALA
        </span>
      </div>

      {/* Scroll indicator overlay */}
      <div className="absolute bottom-10 right-12 z-20 hidden lg:flex items-center space-x-3 text-cream/40">
        <span className="text-[10px] uppercase tracking-widest">{t.heroExplore}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-[1px] h-8 bg-gold/50"
        />
      </div>
    </section>
  );
}
