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
      className="relative z-10 w-full overflow-hidden bg-[--color-cream]"
    >
      {/* 调整了上下间距，避免过于空旷，同时兼顾移动端、平板到大屏的渐进过渡 */}
      <div className="py-10 md:py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 text-center flex flex-col items-center">
          
          {/* Title - 单行展示，字号适中，自然换行留给移动端 */}
          <motion.h2
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="font-serif font-light leading-[1.3] tracking-wider text-[--color-section-text] text-balance mb-10 md:mb-14"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
          >
            {t('headingLine1')}。
          </motion.h2>

          {/* Body Text - 融合成具有实体感的纯文本块，排版上如同一块基石 */}
          <motion.div
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="max-w-[720px] font-sans text-[0.875rem] md:text-[0.95rem] font-light leading-[2.2] md:leading-[2.4] text-[#5a5347]"
          >
            <p>{t('body1')}</p>
          </motion.div>

          {/* CTA - 在移动端缩小文字和字位，保持精致感 */}
          <motion.div
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="mt-12 md:mt-20"
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
