'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLenis } from 'lenis/react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface SectionNavItem {
  id: string;
  label: string;
}

interface PageSectionNavProps {
  items: SectionNavItem[];
  /** DOM id 前缀，如 gallery 页用 "gallery-" */
  idPrefix?: string;
  ariaLabel?: string;
  scrollOffset?: number;
}

export default function PageSectionNav({
  items,
  idPrefix = '',
  ariaLabel,
  scrollOffset = -60,
}: PageSectionNavProps) {
  const [active, setActive] = useState<string>(items[0]?.id ?? '');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lenis = useLenis();

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // 去掉前缀还原为 item.id
            const rawId = entry.target.id.startsWith(idPrefix)
              ? entry.target.id.slice(idPrefix.length)
              : entry.target.id;
            setActive(rawId);
          }
        }
      },
      { rootMargin: '-80px 0px -40% 0px', threshold: 0 },
    );

    const observer = observerRef.current;
    items.forEach(({ id }) => {
      const el = document.getElementById(`${idPrefix}${id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items, idPrefix]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(`${idPrefix}${id}`);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, {
        offset: scrollOffset,
        duration: 1.2,
        easing: (x: number) => Math.min(1, 1.001 - Math.pow(2, -10 * x)),
      });
    } else {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY + scrollOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <motion.nav
      className="flex flex-row items-center justify-center mb-4"
      aria-label={ariaLabel}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      {items.map((item, idx) => {
        const isActive = active === item.id;
        return (
          <React.Fragment key={item.id}>
            {idx > 0 && (
              <span className="text-white/20 text-xs select-none mx-1 sm:mx-2" aria-hidden>
                |
              </span>
            )}
            <button
              onClick={() => scrollToSection(item.id)}
              className={clsx(
                'relative group px-5 sm:px-8 py-3 cursor-pointer transition-colors duration-300 focus-visible:outline-none',
                isActive ? 'text-white' : 'text-white/45 hover:text-white/80',
              )}
            >
              <span className="font-sans text-[10px] sm:text-xs tracking-[0.3em] uppercase">
                {item.label}
              </span>
              <span
                className={clsx(
                  'absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-white transition-all duration-500',
                  isActive ? 'w-full' : 'w-0 group-hover:w-1/2',
                )}
              />
            </button>
          </React.Fragment>
        );
      })}
    </motion.nav>
  );
}
