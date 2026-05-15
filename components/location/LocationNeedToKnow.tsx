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

export default function LocationNeedToKnow() {
  const t = useTranslations('Location');
  const items = t.raw('essentialInfo.items') as { heading: string; content: string }[];

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px', amount: 0.1 });

  return (
    <section
      id="location-info"
      className="bg-background pt-16 sm:pt-20 md:pt-28 pb-16 sm:pb-20 md:pb-28"
    >
      <div ref={ref} className="px-page mx-auto max-w-350 flex flex-col">
        <div className="max-w-4xl">

        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-12 sm:mb-16 flex flex-col"
        >
          <span className="font-serif italic text-[--color-section-text]/30 text-base mb-4 block uppercase tracking-widest">
            {t('essentialInfo.tag')}
          </span>
          <h2
            className="font-serif text-[--color-section-text] leading-[1.15]"
            style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)' }}
          >
            {t('essentialInfo.title')}
          </h2>
        </motion.div>

        <div className="flex flex-col gap-10 sm:gap-12 w-full text-left border-t border-[--color-section-text]/10 pt-12 sm:pt-16">
          {items.map((item, index) => (
            <motion.div
              key={item.heading}
              custom={0.1 + index * 0.1}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="flex flex-col md:flex-row gap-4 md:gap-16"
            >
              <h3
                className="font-serif text-[--color-section-text] w-full md:w-1/3 shrink-0 pt-1"
                style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)' }}
              >
                {item.heading}
              </h3>
              <p className="font-sans text-sm sm:text-base text-[--color-section-text]/75 leading-relaxed md:w-2/3">
                {item.content}
              </p>
            </motion.div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
