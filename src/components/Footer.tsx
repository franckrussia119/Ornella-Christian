import React, { useState } from 'react';
import { Mail, ArrowRight, Loader2, Check, Heart, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate real API latency for high-end feel
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setIsSubscribed(true);
      setEmail('');
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
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

  return (
    <footer className="bg-charcoal text-ivory/80 pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
      {/* Background radial soft light */}
      <div className="absolute right-0 bottom-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/10">
        
        {/* Col 1: Wedding Monogram Brand (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center space-x-2">
            <Heart className="h-4.5 w-4.5 text-gold fill-gold" />
            <span className="font-serif text-xl tracking-[0.25em] font-bold text-white uppercase">
              C <span className="font-script text-2xl lowercase font-normal text-gold -mx-0.5">and</span> O
            </span>
          </div>
          <p className="font-sans text-xs sm:text-sm text-ivory/60 leading-relaxed font-light max-w-sm">
            We are incredibly blessed to walk this beautiful journey of customary rites in Yaoundé and ecclesiastical vows in Douala. Thank you for your endless prayers, support, and blessings on our household.
          </p>
          <div className="flex flex-col space-y-1 text-xs font-sans text-gold">
            <span>&bull; Yaoundé, Cameroon &mdash; Bastos Estate</span>
            <span>&bull; Douala, Cameroon &mdash; Crystal Palace Gardens</span>
          </div>
        </div>

        {/* Col 2: Navigation Links (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="font-serif text-sm tracking-widest text-white uppercase font-bold">Quick Links</h4>
          <ul className="space-y-2.5 text-xs font-sans font-medium">
            {[
              { name: 'Our Love Story', href: '#story' },
              { name: 'Ceremonies Info', href: '#events' },
              { name: 'Wedding Registry Store', href: '#store' },
              { name: 'Prayers & Blessings', href: '#blessings' },
              { name: 'Travel & FAQ Guide', href: '#faq' },
              { name: 'Submit RSVP Confirmation', href: '#rsvp' },
            ].map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="hover:text-gold transition-colors duration-200"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Celebration News Updates (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="space-y-2">
            <h4 className="font-serif text-sm tracking-widest text-white uppercase font-bold">Celebration Updates</h4>
            <p className="font-sans text-xs text-ivory/50 font-light leading-relaxed">
              Subscribe to receive transport timetables, hotel discount codes, and live streams link for our wedding ceremony.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="relative">
            <div className="flex border-b border-white/20 pb-2 focus-within:border-gold transition-colors duration-300">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubscribed || isSubmitting}
                className="bg-transparent text-sm w-full focus:outline-none placeholder:text-white/30 text-white"
              />
              <button
                type="submit"
                disabled={isSubscribed || isSubmitting}
                className="text-white hover:text-gold transition-colors disabled:opacity-50 p-1 cursor-pointer"
                aria-label="Subscribe"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : isSubscribed ? (
                  <Check className="h-4 w-4 text-emerald-400" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
              </button>
            </div>
            
            {error && <p className="text-red-400 text-[10px] font-bold mt-1.5">{error}</p>}
            {isSubscribed && (
              <p className="text-emerald-400 text-[10px] font-bold mt-1.5">
                Thank you! You are subscribed for wedding news updates.
              </p>
            )}
          </form>
        </div>

      </div>

      {/* Signature and copyright details */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 flex flex-col md:flex-row items-center justify-between text-[10px] uppercase tracking-widest text-white/40 font-sans font-semibold space-y-4 md:space-y-0">
        <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-2 text-center md:text-left">
          <span>&copy; 2026 Christian &amp; Ornella Wedding Portal.</span>
          <span className="hidden md:inline">&bull;</span>
          <span>All rights reserved.</span>
        </div>
        <div className="flex items-center space-x-1 text-gold">
          <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
          <span>Made with love for our union in Cameroon</span>
        </div>
      </div>
    </footer>
  );
}
