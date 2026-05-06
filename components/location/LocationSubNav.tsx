'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLenis } from 'lenis/react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

const SECTIONS = [
  { id: 'location-culture', key: 'culture' as const, en: 'Culture' },
  { id: 'location-transport', key: 'transport' as const, en: 'Getting Here' },
  { id: 'location-info', key: 'info' as const, en: 'Need to Know' },
] as const;

const navContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const navItem = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

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

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = -80;
    if (lenis) {
      lenis.scrollTo(el, { offset, duration: 1.4, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const labels: Record<string, string> = {
    culture: t('culture'),
    info: t('info'),
    transport: t('transport'),
  };

  return (
    <div className="bg-primary">
      {/* Header 高度占位 */}
      <div style={{ height: 'var(--header-height, 72px)' }} />

      {/* Sub-nav */}
      <nav aria-label="位置页内导航">
        <motion.div
          className="flex justify-center items-center px-page flex-wrap"
          variants={navContainer}
          initial="initial"
          animate="animate"
        >
          {SECTIONS.map(({ id, key, en }, idx) => {
            const isActive = active === id;
            return (
              <motion.span key={id} className="flex items-center shrink-0" variants={navItem} transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}>
                {idx > 0 && (
                  <span
                    className="mx-4 sm:mx-8 lg:mx-12 text-white/30 select-none font-sans text-xs"
                    aria-hidden="true"
                  >
                    •
                  </span>
                )}

                <button
                  onClick={() => handleClick(id)}
                  className="group relative flex flex-col items-center gap-1.5 sm:gap-2 pt-6 pb-8 sm:pt-8 sm:pb-10 cursor-pointer focus-visible:outline-none"
                >
                  {/* 中文主标签 */}
                  <span
                    className={clsx(
                      'font-sans text-sm sm:text-base tracking-[0.2em] whitespace-nowrap transition-colors duration-300',
                      isActive ? 'text-white' : 'text-white/60 group-hover:text-white',
                    )}
                  >
                    {labels[key]}
                  </span>

                  {/* 英文副标签 */}
                  <span
                    className={clsx(
                      'font-sans text-[0.5rem] sm:text-[0.55rem] uppercase tracking-[0.25em] whitespace-nowrap transition-colors duration-300',
                      isActive ? 'text-white/55' : 'text-white/30 group-hover:text-white/60',
                    )}
                  >
                    {en}
                  </span>

                  {/* 激活指示线 */}
                  <span
                    className={clsx(
                      'absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 h-px bg-white transition-all duration-500',
                      isActive ? 'w-6 opacity-100' : 'w-0 opacity-0',
                    )}
                  />
                </button>
              </motion.span>
            );
          })}
        </motion.div>
      </nav>
    </div>
  );
}
