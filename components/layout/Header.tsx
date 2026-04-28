'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useLenis } from 'lenis/react';
import { Link } from '@/i18n/routing';
import { MobileNavDrawer } from './MobileNavDrawer';

const LOCALES = [
  { code: 'zh', label: '简体中文', short: '中文' },
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'ms', label: 'Bahasa Melayu', short: 'BM' },
];

export function Header() {
  const t = useTranslations('Header');
  const [isScrolled, setIsScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const lenis = useLenis(
    ({ scroll }) => {
      setIsScrolled(scroll > 80);
    },
    [],
  );

  const handleBookNow = () => {
    lenis?.scrollTo('#booking-bar');
  };

  return (
    <>
      {/* ============================================= */}
      {/*  Unified Header: hamburger | logo | book now  */}
      {/* ============================================= */}
      <header
        className={`fixed top-0 right-0 left-0 z-50 flex h-18 items-center justify-between px-6 transition-all duration-700 lg:px-10 ${
          isScrolled ? 'bg-primary shadow-sm' : 'bg-transparent'
        }`}
      >
        {/* Left: hamburger menu button */}
        <button
          onClick={() => setNavOpen(true)}
          className="flex-shrink-0 cursor-pointer p-2 text-white transition-opacity hover:opacity-70"
          aria-label={t('openMenu')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Center: logo — absolutely positioned to stay centered regardless of side items */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 transition-opacity hover:opacity-80"
          aria-label={t('brand')}
        >
          <Image
            src="/images/logo-h-new.png"
            alt="Meili Resort"
            width={180}
            height={60}
            className="h-10 w-auto object-contain brightness-0 invert"
            priority
          />
        </Link>

        {/* Right: Book Now */}
        <button
          onClick={handleBookNow}
          className="flex-shrink-0 cursor-pointer rounded-full border border-white/60 px-5 py-2 font-sans text-xs tracking-widest text-white uppercase transition-all duration-300 hover:border-white hover:bg-white/15"
        >
          {t('bookNow')}
        </button>
      </header>

      {/* Nav Drawer (all screen sizes) */}
      <MobileNavDrawer
        isOpen={navOpen}
        onClose={() => setNavOpen(false)}
        locales={LOCALES}
      />
    </>
  );
}
