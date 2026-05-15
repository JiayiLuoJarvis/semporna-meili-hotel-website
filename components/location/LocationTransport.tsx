'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

function PlaneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
    </svg>
  );
}

function CarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
    </svg>
  );
}

function BoatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.64 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26-.06-.54-.31-.63L20 11.68V7c0-1.1-.9-2-2-2h-3V1H9v4H6c-1.1 0-2 .9-2 2v4.68l-1.63.65c-.25.09-.39.37-.31.63L3.95 19z" />
    </svg>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
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

const STAGES = [
  { Icon: PlaneIcon, labelKey: 'stage1Label', bodyKey: 'stage1Body', subKey: 'stage1Sub' },
  { Icon: CarIcon,   labelKey: 'stage2Label', bodyKey: 'stage2Body', subKey: 'stage2Sub' },
  { Icon: BoatIcon,  labelKey: 'stage3Label', bodyKey: 'stage3Body', subKey: 'stage3Sub' },
] as const;

export default function LocationTransport() {
  const t = useTranslations('Location.arrival');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px', amount: 0.1 });

  return (
    <section
      id="location-transport"
      className="bg-warm-light pt-16 sm:pt-20 md:pt-28 pb-16 sm:pb-20 md:pb-28"
    >
      <div ref={ref} className="px-page mx-auto max-w-350 flex flex-col gap-14 sm:gap-16 md:gap-20">

        {/* Section header */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col items-center text-center gap-4"
        >
          <span className="font-sans text-gold-warm uppercase tracking-widest text-xs sm:text-sm">
            {t('sectionTag')}
          </span>
          <h2
            className="font-serif italic font-light text-[--color-section-text] leading-[1.15]"
            style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)' }}
          >
            {t('title')}
          </h2>
          <p className="font-sans text-[--color-section-text] text-sm sm:text-base max-w-xl leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Journey stages */}
        <div className="relative">
          {/* Desktop path line — sits behind icon circles */}
          <div
            className="hidden md:block absolute left-0 right-0 h-px border-t border-dashed border-[--color-section-text]/15"
            style={{ top: '24px' }}
          />

          <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-0">
            {STAGES.map(({ Icon, labelKey, bodyKey, subKey }, i) => (
              <motion.div
                key={labelKey}
                custom={0.1 + i * 0.15}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="flex md:flex-col md:flex-1 items-start md:items-center gap-5 md:gap-0 md:text-center md:px-6 lg:px-10"
              >
                {/* Icon circle — bg-primary masks the dashed line on desktop */}
                <div className="shrink-0 w-12 h-12 rounded-full border border-[--color-section-text]/20 bg-warm-light flex items-center justify-center relative z-10 md:mb-6">
                  <Icon className="w-5 h-5 text-primary" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <h3 className="font-serif font-light text-[--color-section-text] text-lg sm:text-xl">
                    {t(labelKey)}
                  </h3>
                  <span className="font-sans text-gold-warm text-xs uppercase tracking-widest">
                    {t(subKey)}
                  </span>
                  <p className="font-sans text-[--color-section-text] text-xs sm:text-sm leading-relaxed md:max-w-60 mt-1">
                    {t(bodyKey)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA footer */}
        <motion.div
          custom={0.6}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-10 border-t border-[--color-section-text]/10"
        >
          <p className="font-serif italic text-[--color-section-text] text-sm sm:text-base leading-relaxed max-w-lg">
            {t('footer')}
          </p>
          <Link
            href="/contact"
            className="font-sans text-xs uppercase tracking-widest text-gold border border-gold/40 px-6 py-3 hover:bg-gold hover:text-white transition-colors duration-300 shrink-0"
          >
            {t('cta')}
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
