'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

export default function GalleryCTA() {
  const t = useTranslations('Gallery.CTA');

  return (
    <div className="px-page max-w-350 mx-auto pt-16 sm:pt-20 w-full pb-16 sm:pb-24 lg:pb-32 bg-background">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '0px 0px -20px 0px', amount: 0.02 }}
        className="pt-16 sm:pt-20 border-t border-[--color-border] flex flex-col items-center text-center w-full"
      >
        <h2 className="font-serif text-section-text leading-[1.15] mb-3 font-normal text-3xl md:text-5xl lg:text-6xl tracking-tight max-w-3xl">
          {t('title')}
        </h2>
        <p className="font-sans text-warm-text max-w-lg mx-auto text-base sm:text-lg mb-8 sm:mb-12">
          {t('desc')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
          <a
            href="https://wa.me/something"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-8 py-3.5 md:py-4 border border-border text-section-text font-sans uppercase tracking-widest text-xs sm:text-sm hover:bg-muted transition-colors duration-300 w-full sm:w-auto"
          >
            {t('whatsapp')}
          </a>
          <button className="px-8 py-3.5 md:py-4 bg-primary text-white font-sans uppercase tracking-widest text-xs sm:text-sm hover:bg-primary-light transition-colors duration-300 w-full sm:w-auto shadow-md">
            {t('button')}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
