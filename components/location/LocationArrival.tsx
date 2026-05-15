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

export default function LocationArrival() {
  const t = useTranslations('Location');
  const essentials = t.raw('essentialInfo.items') as { heading: string; content: string }[];

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px', amount: 0.1 });

  return (
    <section
      id="location-arrival"
      className="bg-cream pt-20 pb-20 sm:pt-28 sm:pb-28 md:pt-32 md:pb-32"
    >
      <div ref={ref} className="px-page mx-auto flex max-w-6xl flex-col">
        {/* 统一的页面大标：修正字号，恢复全站统一的古典比例 */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-16 flex flex-col justify-between gap-8 border-b border-[--color-section-text]/10 pb-8 sm:mb-24 sm:pb-12 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <span className="mb-4 block font-serif text-lg text-[--color-section-text]/40 italic sm:text-xl">
              {t('essentialInfo.tag')}
            </span>
            <h2 className="mb-6 font-serif text-3xl leading-[1.1] text-[--color-section-text] sm:text-4xl md:text-5xl">
              {t('arrival.title')}
            </h2>
            <p className="max-w-xl font-sans text-sm leading-relaxed text-[--color-section-text]/60 sm:text-base">
              {t('arrival.subtitle')}
            </p>
          </div>
        </motion.div>

        {/* 线性叙事流：更细腻的留白与比例 */}
        <div className="flex w-full flex-col gap-16 text-left sm:gap-24">
          {essentials.map((item, index) => (
            <motion.div
              key={item.heading}
              custom={0.2 + index * 0.15}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="flex flex-col items-start gap-6 lg:flex-row lg:gap-20"
            >
              {/* 左侧：提纲减小字重与字号，更显精致 */}
              <div className="w-full shrink-0 lg:w-1/4">
                <h3 className="sticky top-32 font-serif text-xl text-[--color-section-text] sm:text-2xl">
                  {item.heading}
                </h3>
              </div>

              {/* 右侧：主体文案 */}
              <div className="flex w-full flex-col gap-6 lg:w-3/4">
                <p className="font-sans text-sm leading-relaxed font-light text-[--color-section-text]/75 sm:text-base">
                  {item.content}
                </p>

                {/* 将“三步曲”从突兀的方框改为极简的附录式网格 */}
                {index === 1 && (
                  <div className="mt-8 grid grid-cols-1 gap-8 border-t border-[--color-section-text]/10 pt-8 sm:grid-cols-3">
                    {[1, 2, 3].map((num) => (
                      <div key={num} className="flex flex-col gap-2">
                        <span className="mb-1 font-serif text-sm tracking-wider text-[--color-section-text]/40 uppercase italic">
                          Phase 0{num}
                        </span>
                        <h4 className="font-serif text-base font-medium text-[--color-section-text]">
                          {t(`arrival.stage${num}Label`)}
                        </h4>
                        <p className="font-sans text-xs leading-relaxed text-[--color-section-text]/60 sm:text-sm">
                          {t(`arrival.stage${num}Body`)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
