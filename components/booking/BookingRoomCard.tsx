'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { useTranslations } from 'next-intl';
import { Ruler, Users, Bed, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface BookingRoomCardProps {
  index: number;
  size: string;
  capacity: string;
  bedding: string;
}

export function BookingRoomCard({ index, size, capacity, bedding }: BookingRoomCardProps) {
  const tVillas = useTranslations('Villas.items');
  const tBooking = useTranslations('BookingPage.room');
  
  // Using some realistic placeholder images. Next.js image component will be used.
  const images = [
    `https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80`,
    `https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80`,
    `https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?auto=format&fit=crop&w=1200&q=80`,
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const title = tVillas(`${index}.title` as any) || '';
  const desc = tVillas(`${index}.desc` as any) || '';

  return (
    <div className="flex flex-col border border-border/20 hover:border-border/60 bg-white overflow-hidden transition-colors duration-300 min-h-[30rem]">
      {/* Carousel */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted" ref={emblaRef}>
        <div className="flex h-full w-full">
          {images.map((src, idx) => (
            <div key={idx} className="relative flex-[0_0_100%] h-full w-full min-w-0">
              {/* Fallback to gray block if image not found, but we attempt an image */}
              <Image 
                src={src} 
                alt={`${title} - view ${idx + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                onError={(e) => {
                  // Ignore missing images and show a placeholder background in dev
                  // using parent's bg-muted
                  (e.target as HTMLImageElement).style.visibility = 'hidden';
                }}
              />
            </div>
          ))}
        </div>

        {/* Carousel controls */}
        <button 
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center text-white backdrop-blur-md hover:bg-black/50 transition-colors opacity-0 hover:opacity-100 disabled:hidden"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center text-white backdrop-blur-md hover:bg-black/50 transition-colors opacity-0 hover:opacity-100 disabled:hidden"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <h3
          className="font-serif font-light leading-tight text-[--color-section-text] tracking-wide mb-3"
          style={{ fontSize: 'clamp(1.25rem, 2vw, 1.5rem)' }}
        >
          {title}
        </h3>
        <p className="font-text text-sm text-[--color-warm-text] mb-6 leading-relaxed line-clamp-2">
          {desc}
        </p>

        {/* Info Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8 text-sm text-[--color-warm-text] pt-4 border-t border-border/60">
          <div className="flex flex-col items-center text-center space-y-2">
            <Ruler className="w-4 h-4 text-[--color-section-text]" strokeWidth={1.5} />
            <span>{size}</span>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <Users className="w-4 h-4 text-[--color-section-text]" strokeWidth={1.5} />
            <span>{capacity}</span>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <Bed className="w-4 h-4 text-[--color-section-text]" strokeWidth={1.5} />
            <span>{bedding}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-auto grid grid-cols-2 gap-4">
          <Link 
            href="#policies" 
            className="flex items-center justify-center py-3 border border-gold text-gold hover:bg-gold/5 transition-colors text-sm font-medium tracking-widest uppercase"
          >
            {tBooking('checkRates')}
          </Link>
          <Link 
            href="/contact" 
            className="flex items-center justify-center py-3 bg-primary text-white hover:bg-primary-dark transition-colors text-sm font-medium tracking-widest uppercase"
          >
            {tBooking('book')}
          </Link>
        </div>
      </div>
    </div>
  );
}
