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
      className="relative z-10 w-full overflow-hidden bg-background"
    >
      {/* Soneva Style 极大留白：通过夸张的 padding 制造呼吸感和高级感 */}
      <div className="py-20 md:py-28 lg:py-40">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 text-center flex flex-col items-center">
          
          {/* Title - Soneva Style 优雅字号，克制不臃肿 */}
          <motion.h2
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="font-serif font-light leading-[1.2] tracking-wide text-[--color-section-text] text-balance mb-6 md:mb-8"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)' }}
          >
            {t('headingLine1')}
          </motion.h2>

          {/* Body Text - Soneva Style 窄容器、浅灰色、行高舒展 */}
          <motion.div
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="max-w-2xl font-sans text-sm md:text-[0.95rem] font-light leading-relaxed md:leading-loose text-[--color-warm-text]"
          >
            <p>{t('body1')}</p>
          </motion.div>

          {/* CTA - 极其细微的点缀 */}
          <motion.div
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="mt-10 md:mt-16"
          >
            <Link
              href="/villas"
              className="group inline-flex items-center gap-3 font-sans text-[0.65rem] md:text-[0.7rem] uppercase tracking-[0.25em] md:tracking-[0.3em] text-[--color-section-text] border-b border-[--color-section-text]/30 pb-2 transition-colors hover:border-[--color-section-text]"
            >
              {t('cta')}
              <span className="transition-transform duration-500 ease-out group-hover:translate-x-1">
                &#8594;
              </span>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
