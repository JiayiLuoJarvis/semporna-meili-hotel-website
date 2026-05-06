'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      delay,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export default function LocationCTA() {
  const t = useTranslations('Location');
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px', amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative flex h-[85vh] min-h-150 w-full items-center justify-center overflow-hidden"
    >
      {/* --- Cinematic Background --- */}
      <div className="absolute inset-0 h-full w-full">
        <Image
          src="https://mgx-backend-cdn.metadl.com/generate/images/1129659/2026-04-17/m2pc7hyaafba/hero-resort-aerial.png"
          alt="Semporna View"
          fill
          className="scale-105 object-cover" // Slight scale for premium feel
          priority={false}
          quality={85}
        />
      </div>

      {/* --- 4A Standard Gradient Overlay & Strong Mask --- 
          Significantly darkened for ultimate text readability */}
      <div className="pointer-events-none absolute inset-0 bg-black/50" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/40 via-black/60 to-[--color-villas-bg]" />

      {/* --- Content Foreground --- */}
      <div className="relative z-10 mx-auto mt-20 flex w-full max-w-[90vw] flex-col items-center text-center md:max-w-5xl">
        {/* Subtle Decor */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-8 h-16 w-0.5 bg-linear-to-b from-transparent via-white/80 to-transparent"
        />

        {/* English Over-title */}
        <motion.span
          custom={0.1}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-8 block font-sans text-xs tracking-[0.4em] text-white uppercase drop-shadow-md"
        >
          {t('cta.titleEn')}
        </motion.span>

        {/* Main Title - specifically engineered to AVOID wrapping on desktop */}
        <motion.h2
          custom={0.2}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-10 w-full font-serif text-2xl leading-snug tracking-wide text-white drop-shadow-lg md:text-4xl lg:text-5xl"
        >
          {t('cta.title')}
        </motion.h2>

        {/* Subtitle / Description */}
        <motion.p
          custom={0.3}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mx-auto mb-16 max-w-2xl font-sans text-sm leading-loose font-light text-white drop-shadow-md sm:text-base"
        >
          {t('cta.desc')}
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div
          custom={0.4}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10"
        >
          {/* Primary Button - Refined outline */}
          <a
            href="https://wa.me/601127803997"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 w-full items-center justify-center border border-white bg-black/20 px-12 font-sans text-xs tracking-[0.2em] text-white uppercase backdrop-blur-sm transition-all duration-700 hover:bg-white hover:text-black sm:w-auto"
          >
            {t('cta.whatsapp')}
          </a>

          {/* Secondary Text Link */}
          <a
            href="mailto:amy@meilihotel.com"
            className="group relative py-3 font-sans text-xs tracking-[0.2em] text-white uppercase transition-opacity duration-500 hover:opacity-80"
          >
            {t('cta.email')}
            <span className="absolute bottom-1 left-0 h-px w-full bg-white/50 transition-all duration-500 group-hover:bg-white" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
