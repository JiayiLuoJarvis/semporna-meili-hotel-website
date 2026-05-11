'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export function BookingPageHeader() {
  const t = useTranslations('BookingPage.hero');

  return (
    <section className="bg-primary w-full px-page pt-28 pb-12 text-white text-center flex flex-col items-center">
      <motion.div
        className="max-w-2xl flex flex-col items-center"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="font-sans text-[10px] sm:text-xs tracking-[0.3em] uppercase block mb-5">
          {t('pageTag')}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl tracking-widest font-light mb-8">
          {t('title')}
        </h1>
        <motion.p
          className="font-serif text-sm sm:text-base leading-loose"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t('description')}
        </motion.p>
      </motion.div>
    </section>
  );
}
