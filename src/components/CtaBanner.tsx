import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';

export default function CtaBanner() {
  const handleScrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      const headerOffset = 80;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative bg-charcoal text-ivory py-24 md:py-32 overflow-hidden">
      {/* Decorative floral/star background element */}
      <div className="absolute inset-0 opacity-5 flex items-center justify-center pointer-events-none">
        <Star className="h-96 w-96 text-white stroke-[0.25]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10 space-y-8">
        {/* Minimal crown element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <span className="font-script text-4xl text-gold">the legacy of light</span>
        </motion.div>

        {/* Core Slogan Statement */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide leading-tight max-w-4xl mx-auto"
        >
          You just enjoy your day. <br />
          <span className="italic font-normal text-gold">We’ll capture the rest.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="font-sans text-xs sm:text-sm text-cream/70 tracking-[0.2em] uppercase max-w-lg mx-auto leading-relaxed"
        >
          Durable cloud galleries, high-end film portfolios, and professional visual direction tailored for your family.
        </motion.p>

        {/* CTA Button with slide arrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="pt-4"
        >
          <button
            onClick={handleScrollToContact}
            className="group px-8 py-4 border border-gold bg-gold text-charcoal font-medium text-xs uppercase tracking-widest hover:bg-ivory hover:border-ivory transition-all duration-300 shadow-md cursor-pointer inline-flex items-center space-x-2"
          >
            <span>Begin Your Inquiry</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 transform group-hover:translate-x-1.5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
