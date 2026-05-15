'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLenis } from 'lenis/react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { PageHeroShell } from '@/components/layout/PageHeroShell';

const SECTIONS = [
  { id: 'location-culture', key: 'culture' as const },
  { id: 'location-transport', key: 'transport' as const },
  { id: 'location-info', key: 'info' as const },
] as const;

export default function LocationSubNav() {
  const t = useTranslations('Location.nav');
  const [active, setActive] = useState<string>('location-culture');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lenis = useLenis();

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -40% 0px', threshold: 0 },
    );

    const observer = observerRef.current;
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
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
    <PageHeroShell>
      
      {/* 顶部：标题与描述区（完美居中对称） */}
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
          {t('pageTitle')}
        </h1>
        <p className="font-serif text-sm sm:text-base leading-loose">
          {t('description')}
        </p>
      </motion.div>

      {/* 中部：地址及联系信息 */}
      <motion.div 
        className="flex flex-col items-center gap-4 mb-20"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p className="font-sans text-[10px] sm:text-xs tracking-[0.2em] uppercase font-light">
          {t('address')}
        </p>
        <div className="flex items-center gap-10 mt-1">
          <a
            href={`tel:${t('phone')}`}
            className="font-sans text-[10px] sm:text-xs tracking-[0.2em] uppercase font-light hover:underline underline-offset-4"
          >
            {t('phone')}
          </a>
          <button className="font-sans text-[10px] sm:text-xs tracking-[0.2em] uppercase font-light hover:underline underline-offset-4">
            {t('map')}
          </button>
        </div>
      </motion.div>

      {/* 最底部：导航菜单（去数字、取消圆点，保留最纯净下划线） */}
      <motion.nav 
        className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-24 mb-4"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {SECTIONS.map((sec) => {
          const isActive = active === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className="relative pb-2 group focus-visible:outline-none"
            >
              <span className="font-sans text-xs sm:text-sm tracking-[0.25em] uppercase">
                {t(sec.key)}
              </span>
              <span 
                className={clsx(
                  "absolute bottom-0 left-0 h-px bg-white transition-all duration-300",
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                )}
              />
            </button>
          );
        })}
      </motion.nav>
    </PageHeroShell>
  );
}

