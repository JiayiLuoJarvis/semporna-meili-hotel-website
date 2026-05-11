'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLenis } from 'lenis/react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface NavItem {
  id: string;
  title: string;
  subtitle: string;
}

export default function GalleryPageHeader({ items }: { items: NavItem[] }) {
  const t = useTranslations('Gallery.Hero');
  const [active, setActive] = useState<string>(items[0]?.id ?? '');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lenis = useLenis();

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id.replace('gallery-', ''));
          }
        }
      },
      { rootMargin: '-80px 0px -40% 0px', threshold: 0 },
    );

    const observer = observerRef.current;
    items.forEach(({ id }) => {
      const el = document.getElementById(`gallery-${id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(`gallery-${id}`);
    if (!el) return;
    const offset = -60;
    if (lenis) {
      lenis.scrollTo(el, {
        offset,
        duration: 1.2,
        easing: (x: number) => Math.min(1, 1.001 - Math.pow(2, -10 * x)),
      });
    } else {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-primary w-full px-page pt-28 pb-12 text-white text-center flex flex-col items-center">

      {/* 顶部：标题与描述区 */}
      <motion.div
        className="max-w-2xl flex flex-col items-center mb-10"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="font-sans text-[10px] sm:text-xs tracking-[0.3em] uppercase block mb-5">
          {t('pageTag')}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl tracking-widest font-light mb-8">
          {t('line1')}
        </h1>
        <p className="font-serif text-sm sm:text-base leading-loose">
          {t('description')}
        </p>
      </motion.div>

      {/* 底部：主题导航 */}
      <motion.nav
        className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-24 mb-4"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="relative pb-2 group focus-visible:outline-none"
            >
              <span className="font-sans text-xs sm:text-sm tracking-[0.25em] uppercase">
                {item.title}
              </span>
              <span
                className={clsx(
                  'absolute bottom-0 left-0 h-px bg-white transition-all duration-300',
                  isActive ? 'w-full' : 'w-0 group-hover:w-full',
                )}
              />
            </button>
          );
        })}
      </motion.nav>
    </div>
  );
}

