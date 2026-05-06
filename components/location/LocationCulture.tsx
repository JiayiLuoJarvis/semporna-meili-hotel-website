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
      duration: 0.8,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

export default function LocationCulture() {
  const t = useTranslations('Location');

  const geoRef = useRef<HTMLDivElement>(null);
  const bajauRef = useRef<HTMLDivElement>(null);

  const geoInView = useInView(geoRef, { once: true, margin: '0px 0px -40px 0px', amount: 0.1 });
  const bajauInView = useInView(bajauRef, { once: true, margin: '0px 0px -40px 0px', amount: 0.1 });

  return (
    <section
      id="location-culture"
      className="bg-[--color-about-bg]"
    >
      <div className="mx-auto max-w-350 px-page">
        <div className="relative w-full border-b border-[#e0dad0]">

          {/* ── 1-A 地理优势 ── */}
          <div
            ref={geoRef}
            className="flex flex-col md:flex-row group border-t border-[#e0dad0] py-8 md:py-20 lg:py-24 gap-6 md:gap-16 lg:gap-24"
          >
            {/* 左图 */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={geoInView ? 'visible' : 'hidden'}
              className="w-full md:w-5/12 shrink-0"
            >
              <div className="relative aspect-video md:aspect-4/3 w-full overflow-hidden">
                <Image
                  src="https://picsum.photos/seed/meili_loc_1/1920/1080"
                  alt={t('info.imageAlt.geo')}
                  fill
                  className="object-cover transition-transform duration-[2s] group-hover:scale-105 ease-out"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
            </motion.div>

            {/* 右文 */}
            <div className="w-full md:w-7/12 flex flex-col justify-center py-4 lg:py-10">
              <div className="flex flex-col max-w-lg lg:pl-8">
                <motion.h3
                  custom={0}
                  variants={fadeUp}
                  initial="hidden"
                  animate={geoInView ? 'visible' : 'hidden'}
                  className="font-serif font-light text-xl md:text-2xl lg:text-[2rem] leading-[1.3] tracking-wide mb-4 md:mb-8 text-[--color-section-text]"
                >
                  {t('intro.title1')}
                </motion.h3>

                <motion.p
                  custom={0.15}
                  variants={fadeUp}
                  initial="hidden"
                  animate={geoInView ? 'visible' : 'hidden'}
                  className="font-sans text-[0.875rem] md:text-[0.95rem] font-light leading-relaxed md:leading-[2.2] text-[#5a5347] mb-4"
                >
                  {t('intro.desc1')}
                </motion.p>
                <motion.p
                  custom={0.2}
                  variants={fadeUp}
                  initial="hidden"
                  animate={geoInView ? 'visible' : 'hidden'}
                  className="font-sans text-[0.875rem] md:text-[0.95rem] font-light leading-relaxed md:leading-[2.2] text-[#5a5347] mb-4"
                >
                  {t('intro.desc2')}
                </motion.p>
                <motion.p
                  custom={0.25}
                  variants={fadeUp}
                  initial="hidden"
                  animate={geoInView ? 'visible' : 'hidden'}
                  className="font-sans text-[0.875rem] md:text-[0.95rem] font-light leading-relaxed md:leading-[2.2] text-[#5a5347]"
                >
                  {t('intro.desc3')}
                </motion.p>
              </div>
            </div>
          </div>

          {/* ── 1-B 巴瑶族 ── */}
          <div
            ref={bajauRef}
            className="flex flex-col md:flex-row group border-t border-[#e0dad0] py-8 md:py-20 lg:py-24 gap-6 md:gap-16 lg:gap-24"
          >
            {/* 左图 */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={bajauInView ? 'visible' : 'hidden'}
              className="w-full md:w-5/12 shrink-0"
            >
              <div className="relative aspect-video md:aspect-4/3 w-full overflow-hidden">
                <Image
                  src="https://picsum.photos/seed/meili_loc_2/1920/1080"
                  alt={t('info.imageAlt.bajau')}
                  fill
                  className="object-cover transition-transform duration-[2s] group-hover:scale-105 ease-out"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
            </motion.div>

            {/* 右文 */}
            <div className="w-full md:w-7/12 flex flex-col justify-center py-4 lg:py-10">
              <div className="flex flex-col max-w-lg lg:pl-8">
                <motion.h3
                  custom={0}
                  variants={fadeUp}
                  initial="hidden"
                  animate={bajauInView ? 'visible' : 'hidden'}
                  className="font-serif font-light text-xl md:text-2xl lg:text-[2rem] leading-[1.3] tracking-wide mb-4 md:mb-8 text-[--color-section-text]"
                >
                  {t('culture.bajau.title')}
                </motion.h3>

                <motion.p
                  custom={0.15}
                  variants={fadeUp}
                  initial="hidden"
                  animate={bajauInView ? 'visible' : 'hidden'}
                  className="font-sans text-[0.875rem] md:text-[0.95rem] font-light leading-relaxed md:leading-[2.2] text-[#5a5347] mb-4"
                >
                  {t('culture.bajau.desc1')}
                </motion.p>
                <motion.p
                  custom={0.2}
                  variants={fadeUp}
                  initial="hidden"
                  animate={bajauInView ? 'visible' : 'hidden'}
                  className="font-sans text-[0.875rem] md:text-[0.95rem] font-light leading-relaxed md:leading-[2.2] text-[#5a5347]"
                >
                  {t('culture.bajau.desc2')}
                </motion.p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
