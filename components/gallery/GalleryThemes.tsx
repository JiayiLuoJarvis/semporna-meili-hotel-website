'use client';

import { useCallback, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { EmblaCarouselType } from 'embla-carousel';

interface GalleryImage {
  src: string;
}

interface ThemeData {
  id: string;
  title: string;
  images: GalleryImage[];
}

/**
 * 单个主题的轮播画廊
 */
function ThemeCarousel({ theme, isCream }: { theme: ThemeData; isCream: boolean }) {
  // 核心轮播设置：循环、对齐中间、支持拖拽
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false,
  });

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setPrevBtnDisabled(!api.canScrollPrev());
    setNextBtnDisabled(!api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect).on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section 
      className={cn(
        "w-full py-12 md:py-20",
        isCream ? "bg-warm-light" : "bg-white"
      )}
    >
      <div className="max-w-full mx-auto overflow-hidden">
        
        {/* 顶部标题 */}
        <div className="mb-8 md:mb-12 flex flex-col items-center justify-center text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-6 md:w-10 bg-gold-warm" />
            <span className="text-xs md:text-sm tracking-[0.25em] text-warm-text uppercase">
              GALLERY COLLECTION
            </span>
            <div className="h-px w-6 md:w-10 bg-gold-warm" />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-section-text italic tracking-wide px-4">
            {theme.title}
          </h2>
        </div>

        {/* Embla 轮播主容器 */}
        <div className="relative w-full group">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y pt-2 pb-6">
              {theme.images.map((img, i) => (
                <div 
                  key={`${theme.id}-img-${i}`}
                  // flex属性控制基础轮播块大小：移动端占据90%宽度，桌面端占据约70%宽度，从而露出左右两侧图片
                  className="flex-[0_0_85%] md:flex-[0_0_65%] min-w-0 pl-4 md:pl-8"
                >
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    // 放弃单纯使用宽度比例（aspect-ratio）防止拖拽浏览器宽度时高度被暴力压扁。
                    // 改用视口高度(vh)加硬性最小高度(min-h)，确保不管屏幕怎么拉伸，照片都能撑起挺拔的高级感画幅
                    className="relative w-full h-[45vh] min-h-80 md:h-[55vh] md:max-h-150 overflow-hidden select-none bg-muted"
                  >
                    <Image 
                      src={img.src} 
                      alt={theme.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 70vw"
                      className="object-cover" 
                    />
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* 导航按钮：常驻显示 */}
          <button
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/70 text-foreground backdrop-blur-md shadow-sm transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 disabled:opacity-0 z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 font-light" strokeWidth={1.5} />
          </button>
          
          <button
            onClick={scrollNext}
            disabled={nextBtnDisabled}
            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/70 text-foreground backdrop-blur-md shadow-sm transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 disabled:opacity-0 z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8 font-light" strokeWidth={1.5} />
          </button>
        </div>

      </div>
    </section>
  );
}

export default function GalleryThemes({ themes }: { themes: ThemeData[] }) {
  return (
    <div className="w-full flex flex-col">
      {themes.map((theme, index) => {
        // 交错控制是否暖白色背景
        const isCream = index % 2 === 1;
        return (
          <ThemeCarousel 
            key={theme.id} 
            theme={theme} 
            isCream={isCream} 
          />
        );
      })}
    </div>
  );
}
