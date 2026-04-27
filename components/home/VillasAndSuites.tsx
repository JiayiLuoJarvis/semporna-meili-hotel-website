'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const ROOMS = [
  {
    id: 'room-1',
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/1129659/2026-04-18/m3bkbryaafaa/villa-ocean-view-1.png',
  },
  {
    id: 'room-2',
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/1129659/2026-04-18/m3bkb6qaafba/villa-overwater-1.png',
  },
  {
    id: 'room-3',
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/1129659/2026-04-18/m3bkawaaae7q/villa-premium-1.png',
  },
  {
    id: 'room-4',
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/1129659/2026-04-18/m3bkcoyaafaq/villa-ocean-view-2.png',
  },
  {
    id: 'room-5',
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/1129659/2026-04-18/m3bkalaaae7a/villa-overwater-2.png',
  },
];

export function VillasAndSuites() {
  const t = useTranslations('Villas');
  const roomItems = t.raw('items') as Array<{ title: string; desc: string }>;
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Auto cycle for demo purposes, can be removed if strictly manual is preferred
  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % ROOMS.length);
    }, 6000);
    
    // Reset timer when selectedIndex changes (e.g., manual click)
    return () => clearInterval(timer);
  }, [selectedIndex]);

  return (
    <section className="w-full py-20 md:py-24 lg:py-32 bg-[--color-cream] overflow-hidden">
      <div className="mx-auto max-w-[85rem] px-5 sm:px-8 lg:px-12">
        
        {/* Mobile Header (Hidden on Desktop) */}
        <div className="block lg:hidden mb-10 text-center">
          <p className="font-sans text-[0.65rem] tracking-[0.3em] text-[--color-warm-text] uppercase mb-4">
            {t('subtitle')}
          </p>
          <h2 
            className="font-serif font-light leading-[1.3] tracking-wider text-[--color-section-text] text-balance"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
          >
            {t('title')}
          </h2>
        </div>

        {/* Editorial Layout: Left text list, Right image gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Index & Room List (Desktop Only) */}
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-center mt-4 lg:mt-0">
            {/* Desktop Header */}
            <div className="mb-16">
              <p className="font-sans text-[0.75rem] tracking-[0.3em] text-[--color-warm-text] uppercase mb-6">
                {t('subtitle')}
              </p>
              <h2 
                className="font-serif font-light leading-[1.3] tracking-wider text-[--color-section-text] text-balance"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)' }}
              >
                {t('title')}
              </h2>
            </div>

            {/* Room Selectors */}
            <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
              {ROOMS.map((room, index) => {
                const isActive = index === selectedIndex;
                const roomItem = roomItems[index];

                return (
                  <div 
                    key={room.id}
                    className="relative cursor-pointer group"
                    onClick={() => setSelectedIndex(index)}
                  >
                    <div className={`transition-all duration-700 ease-out ${isActive ? 'opacity-100 translate-x-2 lg:translate-x-4' : 'opacity-40 group-hover:opacity-60'}`}>
                      <h3 className="font-serif text-[--color-section-text] text-xl md:text-2xl mb-2 lg:mb-3">
                        {roomItem?.title}
                      </h3>
                      
                      {/* Description expands only for active item */}
                      <div 
                        className="overflow-hidden transition-all duration-700 ease-in-out"
                        style={{ maxHeight: isActive ? '160px' : '0px', opacity: isActive ? 1 : 0 }}
                      >
                        <p className="font-sans text-[0.875rem] md:text-sm text-[--color-warm-text] leading-relaxed max-w-md pt-1 lg:pt-2">
                          {roomItem?.desc}
                        </p>
                        <div className="mt-4 lg:mt-6 flex items-center gap-6">
                          <Link href="/villas" className="font-sans text-[0.65rem] tracking-[0.3em] uppercase border-b border-[--color-section-text]/30 pb-1 text-[--color-section-text] transition-colors hover:border-[--color-section-text]">
                            {t('checkRates')}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Large Image Reveal */}
          <div className="lg:col-span-7 relative h-[130vw] sm:h-[100vw] md:h-[60vh] lg:h-[650px] xl:h-[750px] w-full overflow-hidden">
            {ROOMS.map((room, index) => {
              const isActive = index === selectedIndex;
              return (
                <div
                  key={room.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  {/* Subtle scale effect on active image */}
                  <div className={`w-full h-full relative transition-transform duration-[10s] ease-out ${isActive ? 'scale-105' : 'scale-100'}`}>
                    <Image
                      src={room.image}
                      alt={roomItems[index]?.title ?? room.id}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover object-center"
                      priority={index === 0}
                    />
                    
                    {/* Mobile Text Overlay (Hidden on Desktop) - 浅色磨砂质感卡片 */}
                    <div className="absolute bottom-0 left-0 right-0 lg:hidden backdrop-blur-md bg-white/60 border-t border-white/40 p-6 sm:p-8 pb-12 shadow-lg">
                      <div className={`transition-all duration-700 delay-200 transform ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                        <h3 className="font-serif text-[--color-section-text] text-xl sm:text-2xl mb-2 font-medium">
                          {roomItems[index]?.title}
                        </h3>
                        <p className="font-sans text-[0.8rem] sm:text-sm text-[--color-section-text]/80 leading-relaxed line-clamp-2">
                          {roomItems[index]?.desc}
                        </p>
                        <div className="mt-5">
                          <Link href="/villas" className="inline-block font-sans text-[0.65rem] tracking-[0.2em] uppercase border-b border-[--color-section-text]/40 pb-1 text-[--color-section-text] transition-colors hover:border-[--color-section-text]">
                            {t('checkRates')}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Mobile Indicators (Hidden on Desktop) - 极细指示线 */}
            <div className="absolute bottom-4 left-6 right-6 lg:hidden z-20 flex gap-2">
              {ROOMS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className="flex-1 py-2 cursor-pointer focus:outline-none group"
                  aria-label={`Go to room ${index + 1}`}
                >
                  <div className={`h-[2px] transition-all duration-500 ${index === selectedIndex ? 'bg-[--color-section-text] w-full opacity-100' : 'bg-[--color-section-text] w-full opacity-20 group-hover:opacity-40'}`} />
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}