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
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full py-32 md:py-48 bg-[--color-cream] overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        
        {/* Editorial Layout: Left text list, Right image gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          
          {/* Left Column: Index & Room List */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="mb-20">
              <h2 className="font-serif text-[--color-section-text] text-3xl md:text-5xl lg:text-6xl mb-6">
                {t('title')}
              </h2>
              <p className="font-sans text-[0.8rem] tracking-[0.2em] text-[--color-warm-text] uppercase uppercase">
                {t('subtitle')}
              </p>
            </div>

            {/* Room Selectors */}
            <div className="flex flex-col gap-8 md:gap-10">
              {ROOMS.map((room, index) => {
                const isActive = index === selectedIndex;
                const roomItem = roomItems[index];

                return (
                  <div 
                    key={room.id}
                    className="relative cursor-pointer group"
                    onClick={() => setSelectedIndex(index)}
                  >
                    <div className={`transition-all duration-700 ease-out ${isActive ? 'opacity-100 translate-x-4' : 'opacity-40 group-hover:opacity-60'}`}>
                      <h3 className="font-serif text-[--color-section-text] text-xl md:text-2xl mb-3">
                        {roomItem?.title}
                      </h3>
                      
                      {/* Description expands only for active item */}
                      <div 
                        className={`overflow-hidden transition-all duration-700 ease-in-out`}
                        style={{ maxHeight: isActive ? '120px' : '0px', opacity: isActive ? 1 : 0 }}
                      >
                        <p className="font-sans text-sm text-[--color-warm-text] leading-relaxed max-w-md pt-2">
                          {roomItem?.desc}
                        </p>
                        <div className="mt-6 flex items-center gap-6">
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
          <div className="lg:col-span-7 relative h-[60vh] md:h-[75vh] lg:h-[85vh] w-full">
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
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}