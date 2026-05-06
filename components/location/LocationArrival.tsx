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
      className="bg-cream pt-20 sm:pt-28 md:pt-32 pb-20 sm:pb-28 md:pb-32"
    >
      <div ref={ref} className="px-page max-w-6xl mx-auto flex flex-col">

        {/* 统一的页面大标：修正字号，恢复全站统一的古典比例 */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 sm:mb-24 border-b border-[--color-section-text]/10 pb-8 sm:pb-12"
        >
          <div className="max-w-2xl">
            <span className="font-serif italic text-[--color-section-text]/40 text-lg sm:text-xl mb-4 block">
              {t('essentialInfo.tag')}
            </span>
            <h2 className="font-serif text-[--color-section-text] text-3xl sm:text-4xl md:text-5xl leading-[1.1] mb-6">
              {t('arrival.title')}
            </h2>
            <p className="font-sans text-[--color-section-text]/60 text-sm sm:text-base leading-relaxed max-w-xl">
              {t('arrival.subtitle')}
            </p>
          </div>
        </motion.div>

        {/* 线性叙事流：更细腻的留白与比例 */}
        <div className="flex flex-col gap-16 sm:gap-24 w-full text-left">
          {essentials.map((item, index) => (
            <motion.div
              key={item.heading}
              custom={0.2 + index * 0.15}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="flex flex-col lg:flex-row gap-6 lg:gap-20 items-start"
            >
              {/* 左侧：提纲减小字重与字号，更显精致 */}
              <div className="w-full lg:w-1/4 shrink-0">
                <h3 className="font-serif text-xl sm:text-2xl text-[--color-section-text] sticky top-32">
                  {item.heading}
                </h3>
              </div>

              {/* 右侧：主体文案 */}
              <div className="w-full lg:w-3/4 flex flex-col gap-6">
                <p className="font-sans text-sm sm:text-base text-[--color-section-text]/75 leading-relaxed font-light">
                  {item.content}
                </p>

                {/* 将“三步曲”从突兀的方框改为极简的附录式网格 */}
                {index === 1 && (
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-[--color-section-text]/10">
                    {[1, 2, 3].map((num) => (
                      <div key={num} className="flex flex-col gap-2">
                        <span className="font-serif italic text-sm text-[--color-section-text]/40 mb-1 tracking-wider uppercase">
                          Phase 0{num}
                        </span>
                        <h4 className="font-serif text-[--color-section-text] text-base font-medium">
                          {t(`arrival.stage${num}Label`)}
                        </h4>
                        <p className="font-sans text-[--color-section-text]/60 text-xs sm:text-sm leading-relaxed">
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
