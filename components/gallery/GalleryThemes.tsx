'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Masonry from 'react-masonry-css';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

interface GalleryImage {
  src: string;
  title?: string;
  desc?: string;
}

interface ThemeData {
  id: string;
  title: string;
  subtitle?: string;
  images: GalleryImage[];
}

/**
 * 获取伪瀑布流纵横比，让布局错落有致
 */
function getAspectRatio(index: number) {
  const ratios = ['aspect-[4/3]', 'aspect-[3/4]', 'aspect-square', 'aspect-[16/9]'];
  return ratios[index % ratios.length];
}

function ThemeMasonryGallery({ theme, isCream }: { theme: ThemeData; isCream: boolean }) {
  const [index, setIndex] = useState(-1);

  // 瀑布流断点配置
  const breakpointColumnsObj = {
    default: 3,
    1024: 2,
    640: 1
  };

  // 给 Lightbox 提供标准格式数据
  const slides = theme.images.map((img) => ({
    src: img.src,
    title: img.title || theme.title,
    description: img.desc || '',
  }));

  return (
    <section 
      id={`gallery-${theme.id}`}
      className={cn(
        "w-full py-16 md:py-24 px-4 sm:px-8",
        isCream ? "bg-warm-light" : "bg-white"
      )}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* 主题标题区域 */}
        <div className="mb-12 md:mb-16 flex flex-col items-center justify-center text-center">
          <h2
            className="font-serif font-light italic leading-snug tracking-wide text-section-text text-balance"
            style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)' }}
          >
            {theme.title}
          </h2>
        </div>

        {/* 瀑布流布局 */}
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-4 md:-ml-6"
          columnClassName="pl-4 md:pl-6 bg-clip-padding flex flex-col gap-4 md:gap-6"
        >
          {theme.images.map((img, i) => (
            <motion.div
              key={`${theme.id}-img-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className={cn(
                "relative group overflow-hidden cursor-pointer bg-muted rounded-sm",
                getAspectRatio(i)
              )}
              onClick={() => setIndex(i)}
            >
              <Image
                src={img.src}
                alt={img.title || theme.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* 悬浮遮罩 — 细线边框提示可点击，无放大图标 */}
              <div className="absolute inset-0 ring-inset ring-0 group-hover:ring-1 group-hover:ring-white/30 bg-black/0 group-hover:bg-black/15 transition-all duration-500" />
              
              {/* 底部文字信息（可选显示） */}
              {(img.title || img.desc) && (
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                  {img.title && <h3 className="text-white font-serif text-lg lg:text-xl mb-1">{img.title}</h3>}
                  {img.desc && <p className="text-white/80 font-sans text-xs line-clamp-2">{img.desc}</p>}
                </div>
              )}
            </motion.div>
          ))}
        </Masonry>

        {/* 灯箱组件 — 纯展示，无缩放，流畅淡入 */}
        <Lightbox
          open={index >= 0}
          close={() => setIndex(-1)}
          index={index}
          slides={slides}
          plugins={[Captions, Thumbnails]}
          animation={{
            fade: 450,
            swipe: 500,
            easing: {
              fade: 'cubic-bezier(0.4, 0, 0.2, 1)',
              swipe: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              navigation: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            },
          }}
          captions={{ descriptionTextAlign: 'center', descriptionMaxLines: 2 }}
          thumbnails={{ position: 'bottom', width: 100, height: 66, border: 0, borderRadius: 2, gap: 8 }}
          controller={{ closeOnBackdropClick: true }}
          styles={{
            container: { backgroundColor: 'rgba(0, 0, 0, 0.95)' },
            button: { filter: 'none', color: 'rgba(255,255,255,0.7)' },
          }}
        />
      </div>
    </section>
  );
}

export default function GalleryThemes({ themes }: { themes: ThemeData[] }) {
  return (
    <div className="w-full flex flex-col pt-4">
      {themes.map((theme, index) => {
        const isCream = index % 2 === 1;
        return (
          <ThemeMasonryGallery 
            key={theme.id} 
            theme={theme} 
            isCream={isCream} 
          />
        );
      })}
    </div>
  );
}
