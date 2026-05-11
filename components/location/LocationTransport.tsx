'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';

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

export default function LocationTransport() {
  const t = useTranslations('Location');

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px', amount: 0.1 });

  return (
    <section
      id="location-transport"
      className="bg-cream pt-16 sm:pt-20 md:pt-28 pb-16 sm:pb-20 md:pb-28"
    >
      <div ref={ref} className="px-page mx-auto max-w-350 flex flex-col">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col items-center text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2
            className="font-serif text-[--color-section-text] leading-[1.15] mb-6"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
          >
            {t('arrival.title')}
          </h2>
          <p className="font-sans text-[--color-section-text]/60 text-sm sm:text-base max-w-2xl leading-relaxed">
            {t('arrival.subtitle')}
          </p>
        </motion.div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16 max-w-4xl mx-auto">
          
          <motion.div custom={0.1} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="flex flex-col items-center text-center">
            <span className="font-serif italic text-3xl sm:text-4xl text-[--color-section-text]/20 mb-6">
              01
            </span>
            <h3
              className="font-serif text-[--color-section-text] mb-4"
              style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}
            >
              {t('arrival.stage1Label')}
            </h3>
            <p className="font-sans text-[--color-section-text]/75 text-sm leading-loose max-w-70 md:max-w-none lg:px-4">
              {t('arrival.stage1Body')}
            </p>
          </motion.div>

          <motion.div custom={0.2} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="flex flex-col items-center text-center">
            <span className="font-serif italic text-3xl sm:text-4xl text-[--color-section-text]/20 mb-6">
              02
            </span>
            <h3
              className="font-serif text-[--color-section-text] mb-4"
              style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}
            >
              {t('arrival.stage2Label')}
            </h3>
            <p className="font-sans text-[--color-section-text]/75 text-sm leading-loose max-w-70 md:max-w-none lg:px-4">
              {t('arrival.stage2Body')}
            </p>
          </motion.div>

          <motion.div custom={0.3} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="flex flex-col items-center text-center">
            <span className="font-serif italic text-3xl sm:text-4xl text-[--color-section-text]/20 mb-6">
              03
            </span>
            <h3
              className="font-serif text-[--color-section-text] mb-4"
              style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}
            >
              {t('arrival.stage3Label')}
            </h3>
            <p className="font-sans text-[--color-section-text]/75 text-sm leading-loose max-w-70 md:max-w-none lg:px-4">
              {t('arrival.stage3Body')}
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
