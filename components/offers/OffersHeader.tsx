'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLenis } from 'lenis/react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

const SECTIONS = [
  { id: 'group', key: 'group' as const, en: 'Group Deals' },
  { id: 'member', key: 'member' as const, en: 'Members' },
  { id: 'offers', key: 'promotional' as const, en: 'Promotions' },
  { id: 'contact-form', key: 'contact' as const, en: 'Enquire' },
] as const;

const navContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const navItem = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

export default function OffersHeader() {
  const t = useTranslations('Offers.nav');
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

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = -80;
    if (lenis) {
      lenis.scrollTo(el, {
        offset,
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const labels: Record<string, string> = {
    group: t('group'),
    member: t('member'),
    promotional: t('promotional'),
    contact: t('contact'),
  };

  return (
    <div className="bg-primary">
      {/* Header 高度占位 */}
      <div style={{ height: 'var(--header-height, 72px)' }} />

      {/* Sub-nav */}
      <nav aria-label="优惠页内导航">
        <motion.div
          className="px-page flex flex-wrap items-center justify-center"
          variants={navContainer}
          initial="initial"
          animate="animate"
        >
          {SECTIONS.map(({ id, key, en }, idx) => {
            const isActive = active === id;
            return (
              <motion.span
                key={id}
                className="flex shrink-0 items-center"
                variants={navItem}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {idx > 0 && (
                  <span
                    className="mx-4 font-sans text-xs text-white select-none sm:mx-8 lg:mx-12"
                    aria-hidden="true"
                  >
                    •
                  </span>
                )}

                <button
                  onClick={() => handleClick(id)}
                  className="group relative flex cursor-pointer flex-col items-center gap-1.5 pt-6 pb-8 focus-visible:outline-none sm:gap-2 sm:pt-8 sm:pb-10"
                >
                  {/* 中文主标签 */}
                  <span
                    className={clsx(
                      'font-sans text-sm tracking-[0.2em] whitespace-nowrap transition-colors duration-300 sm:text-base',
                      isActive ? 'text-white' : 'text-white group-hover:text-white',
                    )}
                  >
                    {labels[key]}
                  </span>

                  {/* 英文副标签 */}
                  <span
                    className={clsx(
                      'font-sans text-[0.5rem] tracking-[0.25em] whitespace-nowrap uppercase transition-colors duration-300 sm:text-[0.55rem]',
                      isActive ? 'text-white' : 'text-white group-hover:text-white',
                    )}
                  >
                    {en}
                  </span>

                  {/* 激活指示线 */}
                  <span
                    className={clsx(
                      'absolute bottom-4 left-1/2 h-px -translate-x-1/2 bg-white transition-all duration-500 sm:bottom-5',
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
