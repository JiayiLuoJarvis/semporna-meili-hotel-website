'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { useState, useRef, useEffect } from 'react';
import { useLenis } from 'lenis/react';
import { Link, useRouter, usePathname } from '@/i18n/routing';
import { MobileNavDrawer } from './MobileNavDrawer';

const LOCALES = [
  { code: 'zh', label: '简体中文', short: '中文' },
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'ms', label: 'Bahasa Melayu', short: 'BM' },
];

export function Header() {
  const t = useTranslations('Header');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const lenis = useLenis(
    ({ scroll }) => {
      setIsScrolled(scroll > 80);
    },
    [],
  );

  const handleBookNow = () => {
    lenis?.scrollTo('#booking-bar');
  };

  const switchLocale = (next: string) => {
    router.replace(pathname, { locale: next });
    setLangOpen(false);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <>
      {/* ============================================= */}
      {/*  Unified Header: hamburger | logo | book now  */}
      {/*  Hidden on mobile (md:flex), visible on PC    */}
      {/* ============================================= */}
      <header
        className={`fixed top-0 right-0 left-0 z-50 flex h-18 items-center justify-between px-6 transition-all duration-700 lg:px-10 ${
          isScrolled ? 'bg-primary shadow-sm' : 'bg-transparent'
        }`}
      >
        {/* Left: hamburger + language switcher */}
        <div className="flex shrink-0 items-center gap-4">
          <button
            onClick={() => setNavOpen(true)}
            className="cursor-pointer p-2 text-white transition-opacity hover:opacity-70"
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

          {/* Language switcher */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex cursor-pointer items-center gap-1.5 text-[11px] font-semibold tracking-wider text-white/80 uppercase transition-opacity hover:opacity-70"
              aria-label="Select language"
            >
              <span>{LOCALES.find((l) => l.code === locale)?.short ?? locale.toUpperCase()}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            <div
              className={`absolute top-full left-0 z-50 mt-3 min-w-35 origin-top-left overflow-hidden rounded-sm border border-black/10 bg-white shadow-xl transition-all duration-200 ${
                langOpen
                  ? 'pointer-events-auto scale-100 opacity-100'
                  : 'pointer-events-none scale-95 opacity-0'
              }`}
            >
              <div className="py-1">
                {LOCALES.map((loc) => (
                  <button
                    key={loc.code}
                    onClick={() => switchLocale(loc.code)}
                    className={`flex w-full items-center justify-between px-4 py-3 text-left tracking-widest transition-colors duration-150 ${
                      locale === loc.code
                        ? 'bg-black/5 font-semibold text-black'
                        : 'text-black/60 hover:bg-black/5 hover:text-black'
                    }`}
                  >
                    <span className="text-[12px] uppercase">{loc.label}</span>
                    {locale === loc.code && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="shrink-0"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

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
          className="shrink-0 cursor-pointer rounded-full border border-white/60 px-5 py-2 font-sans text-xs tracking-widest text-white uppercase transition-all duration-300 hover:border-white hover:bg-white/15"
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
