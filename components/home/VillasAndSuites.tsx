'use client';

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
];

export function VillasAndSuites({ locale }: { locale?: string }) {
  const t = useTranslations('Villas');
  const roomItems = t.raw('items') as Array<{ title: string; desc: string }>;

  return (
    <section className="w-full py-20 md:py-28 lg:py-40 bg-[--color-cream] overflow-hidden">
      <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
        {/* Editorial Grid: 3 columns vertical array */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {ROOMS.slice(0, 3).map((room, index) => {
            const item = roomItems[index];

            return (
              <Link 
                key={room.id} 
                href="/villas"
                className="group flex flex-col gap-6 cursor-pointer"
              >
                {/* 纵向大图 */}
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-[--color-cream]">
                  <Image
                    src={room.image}
                    alt={item?.title ?? room.id}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                </div>
                
                {/* 极简文字区 */}
                <div className="flex flex-col items-center text-center">
                  <h3 className="font-serif text-[--color-section-text] text-xl lg:text-2xl mb-3 font-light tracking-wide group-hover:opacity-70 transition-opacity">
                    {item?.title}
                  </h3>
                  <div className="w-8 h-px bg-[--color-section-text]/30 mb-4 transition-all duration-500 group-hover:w-16" />
                  <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[--color-warm-text]">
                    {t('checkRates')}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 底部查看所有按钮 */}
        <div className="mt-16 md:mt-24 flex justify-center">
          <Link
            href="/villas"
            className="inline-block px-12 py-4 border border-[--color-section-text]/20 font-sans text-[0.7rem] uppercase tracking-[0.2em] text-[--color-section-text] transition-all hover:bg-[--color-section-text] hover:text-white"
          >
            {t('title') || 'View All Villas'}
          </Link>
        </div>
      </div>
    </section>
  );
}