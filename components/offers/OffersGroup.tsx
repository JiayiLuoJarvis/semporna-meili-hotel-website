'use client';

import { useRef, useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';

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

const IMAGES = [
  'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=1200',
];

export default function OffersGroup() {
  const t = useTranslations('OffersGroup');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px', amount: 0.1 });

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi]);

  return (
    <section id="group" className="bg-white overflow-hidden">
      <div className="px-page mx-auto max-w-350">
        <div className="border-warm-gray relative w-full border-b">
          <div
            ref={ref}
            className="group border-warm-gray flex flex-col gap-6 py-8 md:flex-row md:gap-16 md:py-20 lg:gap-24 lg:py-24"
          >
            {/* 左图 */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="w-full shrink-0 md:w-5/12"
            >
              <div className="relative aspect-video w-full overflow-hidden md:aspect-4/3" ref={emblaRef}>
                <div className="flex h-full">
                  {IMAGES.map((src, idx) => (
                    <div key={idx} className="relative flex-[0_0_100%] min-w-0">
                      <Image
                        src={src}
                        alt={`${t('badge')} ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 45vw"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
                {/* 左右箭头 */}
                <button
                  onClick={scrollPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
                  aria-label="上一张"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={scrollNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
                  aria-label="下一张"
                >
                  <ChevronRight size={16} />
                </button>
                {/* 指示点 */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {IMAGES.map((_, idx) => (
                    <span
                      key={idx}
                      className={`block h-1 rounded-full transition-all duration-300 ${
                        idx === selectedIndex ? 'w-4 bg-white' : 'w-1 bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 右文 */}
            <div className="flex w-full flex-col justify-center py-4 md:w-7/12 lg:py-10">
              <div className="flex max-w-lg flex-col lg:pl-8">
                <motion.h3
                  custom={0}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  className="mb-4 font-serif text-xl leading-[1.3] font-light tracking-wide text-[--color-section-text] md:mb-8 md:text-2xl lg:text-[2rem]"
                >
                  {t('badge')}
                </motion.h3>
                <motion.p
                  custom={0.15}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  className="text-[--color-warm-text] mb-8 font-sans text-sm leading-relaxed font-light md:leading-[2.2]"
                >
                  {t('subtitle')}
                </motion.p>
                <motion.div
                  custom={0.35}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  className="flex flex-col sm:flex-row gap-4 sm:items-center"
                >
                  <Link
                    href="#contact-form"
                    className="inline-flex min-h-11 items-center justify-center bg-primary text-white px-8 py-3 text-xs tracking-[0.2em] uppercase transition-colors hover:bg-primary-light"
                  >
                    {t('ctaMain')}
                  </Link>
                  <a
                    href="https://wa.me/60112780399"
                    target="_blank"
                    rel="noreferrer"
                    className="group/link flex items-center gap-3 text-xs tracking-[0.2em] text-[--color-gold-warm] uppercase transition-colors hover:text-[--color-section-text]"
                  >
                    {t('ctaSub')}
                    <ArrowRight className="w-4 h-4 transition-transform duration-500 ease-out group-hover/link:translate-x-2" />
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
