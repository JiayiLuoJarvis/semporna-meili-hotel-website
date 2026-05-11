'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLenis } from 'lenis/react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

const SECTIONS = [
  { id: 'group', key: 'group' as const },
  { id: 'member', key: 'member' as const },
  { id: 'offers', key: 'promotional' as const },
  { id: 'contact-form', key: 'contact' as const },
] as const;

export default function OffersHeader() {
  const tNav = useTranslations('Offers.nav');
  const tHeader = useTranslations('Offers.header');
  const [active, setActive] = useState<string>('group');
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
    <div className="bg-primary w-full px-page pt-28 pb-12 text-white text-center flex flex-col items-center">

      {/* 顶部：标题与描述区 */}
      <motion.div
        className="max-w-2xl flex flex-col items-center mb-16"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="font-sans text-[10px] sm:text-xs tracking-[0.3em] uppercase block mb-5">
          {tHeader('pageTag')}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl tracking-widest font-light mb-8">
          {tHeader('pageTitle')}
        </h1>
        <p className="font-serif text-sm sm:text-base leading-loose">
          {tHeader('description')}
        </p>
      </motion.div>

      {/* 最底部：页内导航 */}
      <motion.nav
        className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-24 mb-4"
        aria-label="优惠页内导航"
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
                {tNav(sec.key)}
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
