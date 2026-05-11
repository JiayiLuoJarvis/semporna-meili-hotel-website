'use client';

import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

export function HotelIntro() {
  const t = useTranslations('HotelIntro');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '0px 0px -40px 0px',
    amount: 0.1,
  });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 w-full bg-warm-light"
    >
      <div className="mx-auto max-w-3xl px-8 py-12 text-center md:py-16 lg:py-20">

        {/* 细线 */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mx-auto mb-6 h-px w-8 bg-[--color-section-text]/25"
        />

        {/* 标题 */}
        <motion.h2
          custom={0.08}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-6 font-serif font-light italic leading-snug tracking-wide text-[--color-section-text]"
          style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)' }}
        >
          {t('headingLine1')}
        </motion.h2>

        {/* Body */}
        <motion.p
          custom={0.16}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-8 font-sans text-sm font-light leading-loose text-[--color-warm-text] md:text-[0.9rem]"
        >
          {t('body1')}
        </motion.p>

        {/* CTA */}
        <motion.div
          custom={0.24}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <Link
            href="/villas"
            className="group inline-flex items-center gap-3 border-b border-[--color-section-text]/30 pb-1 font-sans text-[0.65rem] uppercase tracking-[0.25em] text-[--color-section-text] transition-colors hover:border-[--color-section-text]"
          >
            {t('cta')}
            <span className="transition-transform duration-500 ease-out group-hover:translate-x-1">&#8594;</span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
