import React, { useState, useEffect } from 'react';
import { Menu, X, Heart, Shield, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  onOpenAdmin: () => void;
}

export default function Header({ onOpenAdmin }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.navHome, href: '#home' },
    { name: t.navStory, href: '#story' },
    { name: t.navEvents, href: '#events' },
    { name: t.navStore, href: '#store' },
    { name: t.navBlessings, href: '#blessings' },
    { name: t.navFaq, href: '#faq' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const checkUnread = () => {
      const lastRead = localStorage.getItem('christian_ornella_last_read_admin_timestamp') || '1970-01-01T00:00:00.000Z';
      fetch(`/api/stats?since=${encodeURIComponent(lastRead)}`)
        .then((res) => res.json())
        .then((data) => setUnreadCount((data.newRsvps || 0) + (data.newPledges || 0)))
        .catch(() => {});
    };

    checkUnread();

    const interval = setInterval(checkUnread, 15000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleOpenAdminClick = () => {
    const lastRead = localStorage.getItem('christian_ornella_last_read_admin_timestamp') || '0';
    localStorage.setItem('christian_ornella_previous_read_admin_timestamp', lastRead);
    localStorage.setItem('christian_ornella_last_read_admin_timestamp', new Date().toISOString());
    setUnreadCount(0);
    onOpenAdmin();
  };

  return (
    <>
      <header
        id="app-header"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? 'bg-ivory/95 backdrop-blur-md py-4 shadow-sm border-b border-cream'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center space-x-2 group"
          >
            <Heart className="h-4 w-4 text-gold" />
            <span
              className={`font-serif text-lg tracking-[0.2em] font-semibold transition-colors duration-300 ${
                isScrolled ? 'text-charcoal' : 'text-white'
              }`}
            >
              C <span className="font-script text-2xl lowercase font-normal text-gold select-none -mx-1">and</span> O
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-[10px] uppercase tracking-widest font-semibold transition-colors duration-300 hover:text-gold ${
                  isScrolled ? 'text-charcoal' : 'text-white/90'
                }`}
              >
                {link.name}
              </a>
            ))}

            {/* Language Toggle Selector */}
            <button
              onClick={toggleLanguage}
              className={`text-[10px] uppercase tracking-widest font-bold transition-all duration-300 flex items-center space-x-1 hover:text-gold cursor-pointer ${
                isScrolled ? 'text-charcoal' : 'text-white/90'
              }`}
              title={language === 'fr' ? 'Switch to English' : 'Changer en Français'}
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{language === 'fr' ? 'EN' : 'FR'}</span>
            </button>

            {/* Admin Switcher Access */}
            <button
              onClick={handleOpenAdminClick}
              className={`p-1.5 rounded-full transition-all duration-300 hover:bg-gold/15 hover:text-gold cursor-pointer relative ${
                isScrolled ? 'text-charcoal' : 'text-white/90'
              }`}
              title={t.adminTitle}
            >
              <Shield className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white shadow-sm ring-1 ring-white">
                  {unreadCount}
                </span>
              )}
            </button>

            <a
              href="#rsvp"
              onClick={(e) => handleLinkClick(e, '#rsvp')}
              className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border ${
                isScrolled
                  ? 'border-charcoal bg-charcoal text-ivory hover:bg-gold hover:border-gold hover:text-charcoal'
                  : 'border-white bg-transparent text-white hover:bg-white hover:text-charcoal'
              }`}
            >
              RSVP
            </a>
          </nav>

          {/* Mobile Actions Overlay Trigger */}
          <div className="flex items-center space-x-4 md:hidden">
            {/* Language Toggle for mobile */}
            <button
              onClick={toggleLanguage}
              className={`text-[10px] uppercase tracking-wider font-bold transition-all duration-300 flex items-center space-x-1 cursor-pointer ${
                isScrolled ? 'text-charcoal' : 'text-white'
              }`}
            >
              <Globe className="h-4 w-4" />
              <span>{language === 'fr' ? 'EN' : 'FR'}</span>
            </button>

            {/* Admin gear for mobile */}
            <button
              onClick={handleOpenAdminClick}
              className={`p-1 transition-all duration-300 cursor-pointer relative ${
                isScrolled ? 'text-charcoal' : 'text-white'
              }`}
            >
              <Shield className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-[7px] font-bold text-white ring-1 ring-white">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="focus:outline-none p-1 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className={`h-6 w-6 ${isScrolled ? 'text-charcoal' : 'text-white'}`} />
              ) : (
                <Menu className={`h-6 w-6 ${isScrolled ? 'text-charcoal' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-ivory z-40 flex flex-col justify-center items-center px-6"
          >
            <nav className="flex flex-col items-center space-y-6 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-serif text-2xl tracking-widest text-charcoal hover:text-gold transition-colors duration-300 uppercase"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#rsvp"
                onClick={(e) => handleLinkClick(e, '#rsvp')}
                className="mt-4 px-10 py-3 text-xs uppercase tracking-widest bg-charcoal text-ivory border border-charcoal hover:bg-gold hover:border-gold hover:text-charcoal transition-all duration-300 font-bold"
              >
                RSVP NOW
              </a>
            </nav>
            <div className="absolute bottom-12 flex flex-col items-center space-y-2">
              <span className="font-script text-4xl text-gold">Christian & Ornella</span>
              <span className="font-sans text-[9px] uppercase tracking-widest text-warm-gray">La Dotation & Wedding 2026</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
