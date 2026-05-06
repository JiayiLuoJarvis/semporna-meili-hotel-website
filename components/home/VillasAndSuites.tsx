'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import useEmblaCarousel from 'embla-carousel-react';

const ROOMS = [
  {
    id: 'room-1',
    title: '单卧室海滩景观水上别墅套房',
    desc: '下榻礁湖边的别墅套房，从配备家居的宽敞平台上可将酒店的白沙滩尽收眼底。',
    image:
      'https://mgx-backend-cdn.metadl.com/generate/images/1129659/2026-04-18/m3bkbryaafaa/villa-ocean-view-1.png',
  },
  {
    id: 'room-2',
    title: '双卧室 POERAVA 水上别墅套房',
    desc: '享受极致奢华的双卧空间，带有私人冷水池，直通清澈见底的仙本那海洋。',
    image:
      'https://mgx-backend-cdn.metadl.com/generate/images/1129659/2026-04-18/m3bkb6qaafba/villa-overwater-1.png',
  },
  {
    id: 'room-3',
    title: '三卧室尊贵海滨别墅宅邸',
    desc: '无与伦比的私密滨海庄园，适合家庭至臻度假，紧邻细白沙滩与椰林。',
    image:
      'https://mgx-backend-cdn.metadl.com/generate/images/1129659/2026-04-18/m3bkawaaae7q/villa-premium-1.png',
  },
  {
    id: 'room-4',
    title: '双卧室尊贵海滨别墅宅邸',
    desc: '在专属的海滨庭院享受私密时光，宽敞的起居空间与自然环境完美融合。',
    image:
      'https://mgx-backend-cdn.metadl.com/generate/images/1129659/2026-04-18/m3bkcoyaafaq/villa-ocean-view-2.png',
  },
  {
    id: 'room-5',
    title: '单卧室奥特曼努冷水池水上别墅套房',
    desc: '标志性的奥特曼努山景，专属冷水池与浪漫的水上生活空间。',
    image:
      'https://mgx-backend-cdn.metadl.com/generate/images/1129659/2026-04-18/m3bkalaaae7a/villa-overwater-2.png',
  },
  {
    id: 'room-1-1',
    title: '单卧室海滩景观水上别墅套房',
    desc: '下榻礁湖边的别墅套房，从配备家居的宽敞平台上可将酒店的白沙滩尽收眼底。',
    image:
      'https://mgx-backend-cdn.metadl.com/generate/images/1129659/2026-04-18/m3bkbryaafaa/villa-ocean-view-1.png',
  },
  {
    id: 'room-2-1',
    title: '双卧室 POERAVA 水上别墅套房',
    desc: '享受极致奢华的双卧空间，带有私人冷水池，直通清澈见底的仙本那海洋。',
    image:
      'https://mgx-backend-cdn.metadl.com/generate/images/1129659/2026-04-18/m3bkb6qaafba/villa-overwater-1.png',
  },
];

export function VillasAndSuites() {
  const t = useTranslations('Villas');
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false,
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.internalEngine().index.get());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="villas" className="w-full overflow-hidden bg-[--color-cream] py-20 md:py-32">
      <div className="mb-10 text-center sm:mb-16">
        <h2 className="mb-4 font-serif text-3xl text-[--color-section-text] md:text-4xl lg:text-5xl">
          {t('subtitle')}
        </h2>
      </div>

      <div className="relative mx-auto w-full max-w-480">
        <div className="overflow-visible" ref={emblaRef}>
          <div className="flex w-full touch-pan-y items-center">
            {ROOMS.map((room, index) => {
              const isActive = index === selectedIndex;
              return (
                <div
                  key={room.id}
                  className="relative flex-[0_0_78%] px-2 sm:flex-[0_0_55%] md:flex-[0_0_42%] md:px-4 lg:flex-[0_0_40%] xl:flex-[0_0_30%] 2xl:flex-[0_0_25%]"
                  style={{
                    zIndex: isActive ? 10 : 1,
                  }}
                >
                  <div
                    style={{
                      transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                      opacity: isActive ? 1 : 0.4,
                      transform: isActive ? 'scale(1)' : 'scale(0.85)',
                      boxShadow: isActive ? '0 25px 50px -12px rgb(0 0 0 / 0.25)' : 'none',
                    }}
                    className="mx-auto flex h-full flex-col bg-white"
                  >
                    <div
                      className="relative w-full shrink-0"
                      style={{
                        paddingBottom: isActive ? '80%' : '130%',
                        transition: 'padding-bottom 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                      }}
                    >
                      <Image
                        src={room.image}
                        alt={room.title}
                        fill
                        sizes="(max-width: 768px) 85vw, (max-width: 1200px) 55vw, 35vw"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col items-center p-6 text-center md:p-8">
                      <h3 className="font-serif text-base font-bold text-[--color-section-text] md:text-lg">
                        {room.title}
                      </h3>

                      <div
                        className="flex w-full flex-col items-center justify-center overflow-hidden"
                        style={{
                          transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                          maxHeight: isActive ? '400px' : '0px',
                          opacity: isActive ? 1 : 0,
                          marginTop: isActive ? '1.5rem' : '0px',
                        }}
                      >
                        <div className="mb-6 h-px w-8 bg-[--color-gold-warm]" />

                        <p className="mb-8 font-sans text-sm leading-loose text-[--color-warm-text]">
                          {room.desc}
                        </p>

                        <div className="mt-auto flex w-full flex-col items-center gap-4 sm:flex-row">
                          <button className="bg-primary hover:bg-primary/90 w-full flex-1 py-3 text-xs tracking-widest whitespace-nowrap text-white uppercase transition-colors">
                            {t('checkRates')}
                          </button>
                          <button className="flex w-full flex-1 items-center justify-center gap-2 py-3 text-xs tracking-widest whitespace-nowrap text-[--color-section-text] uppercase transition-opacity hover:opacity-70">
                            {t('details')} <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Buttons overlay on desktop for easier navigation (matches Apple style) */}
        <div className="absolute top-1/2 left-4 z-20 hidden -translate-y-1/2 md:flex">
          <button
            onClick={scrollPrev}
            className="rounded-full bg-white/80 p-3 text-[--color-section-text] shadow-md backdrop-blur-md transition-all hover:bg-white focus:outline-none"
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </div>
        <div className="absolute top-1/2 right-4 z-20 hidden -translate-y-1/2 md:flex">
          <button
            onClick={scrollNext}
            className="rounded-full bg-white/80 p-3 text-[--color-section-text] shadow-md backdrop-blur-md transition-all hover:bg-white focus:outline-none"
          >
            <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-center gap-6 md:mt-12">
        <div className="flex items-center gap-2">
          {ROOMS.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? 'w-8 bg-[--color-section-text]'
                  : 'w-2 bg-[--color-section-text]/20 hover:bg-[--color-section-text]/40'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
