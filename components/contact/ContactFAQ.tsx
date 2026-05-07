'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

interface FaqItem {
  q: string;
  a: string;
}

interface FaqCategory {
  category: string;
  questions: FaqItem[];
}

export default function ContactFAQ() {
  const t = useTranslations('ContactPage.faq');
  const categories = t.raw('categories') as FaqCategory[];

  const [activeCategory, setActiveCategory] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const activeFaqs = categories[activeCategory]?.questions ?? [];

  return (
    <section className="bg-cream py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-page">
        <motion.div 
          custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '0px 0px -50px 0px' }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="block font-sans text-[0.65rem] md:text-xs tracking-[0.25em] uppercase text-[--color-warm-text] mb-4">
            {t('label')}
          </span>
          <h2 
            className="font-serif text-[--color-section-text] leading-[1.15] mb-8" 
            style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)' }}
          >
            {t('title')}
          </h2>
          <div className="w-12 sm:w-16 h-px bg-[--color-gold-warm] mx-auto" />
        </motion.div>

        {/* Category Tabs */}
        <motion.div 
          custom={0.1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '0px 0px -50px 0px' }}
          className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12 md:mb-16"
        >
          {categories.map((faq, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveCategory(idx);
                setOpenIndex(null);
              }}
              className={`font-sans text-xs md:text-sm tracking-widest uppercase pb-2 border-b-2 transition-colors px-2 md:px-0 ${
                activeCategory === idx
                  ? 'border-[--color-gold-warm] text-[--color-section-text]' 
                  : 'border-transparent text-[--color-warm-text] hover:text-[--color-section-text]'
              }`}
            >
              {faq.category}
            </button>
          ))}
        </motion.div>

        {/* FAQ Accordions */}
        <div className="max-w-3xl mx-auto min-h-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4"
            >
              {activeFaqs.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`border-b border-[--color-section-text]/10 transition-colors ${openIndex === idx ? 'pb-2' : ''}`}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className="w-full py-6 flex items-center justify-between text-left group"
                  >
                    <span className="font-serif text-[--color-section-text] text-base md:text-lg pr-8 group-hover:text-primary transition-colors">
                      {item.q}
                    </span>
                    <ChevronDown 
                      className={`w-5 h-5 shrink-0 text-[--color-gold-warm] transition-transform duration-300 ${
                        openIndex === idx ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  <AnimatePresence>
                    {openIndex === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="pb-8 font-sans text-[--color-warm-text] text-sm md:text-base leading-relaxed">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}