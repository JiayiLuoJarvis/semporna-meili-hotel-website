'use client';

import { useTranslations } from 'next-intl';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { Play, Pause, MapPin, BedDouble, Image as ImageIcon } from 'lucide-react';
import { Link } from '@/i18n/routing';

const HERO_VIDEO =
  'https://mgx-backend-cdn.metadl.com/generate/videos/1129659/2026-04-18/m2r2dqqaae6q/hero-resort-aerial.mp4';
const HERO_IMAGE =
  'https://mgx-backend-cdn.metadl.com/generate/images/1129659/2026-04-17/m2pc7hyaafba/hero-resort-aerial.png';

export function Hero() {
  const t = useTranslations('Index');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const hasScrolledRef = useRef(false);
  const [isMd, setIsMd] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 768px)').matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const handler = (e: MediaQueryListEvent) => setIsMd(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useLenis(({ scroll }) => {
    setScrollY(scroll);
    if (scroll > 20 && !hasScrolledRef.current) {
      hasScrolledRef.current = true;
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.section
      initial={{ height: '100vh' }}
      animate={{ height: isMd ? 'calc(100vh - 80px)' : '100vh' }}
      transition={{ delay: 3, duration: 1, ease: 'easeInOut' }}
      className="relative z-20 overflow-hidden bg-primary"
    >
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={HERO_IMAGE}
          className="h-full w-full object-cover"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/15 to-black/60" />
        <div className="absolute inset-0 bg-linear-to-r from-black/50 via-transparent to-transparent" />
      </div>

      {/* Content — left-aligned editorial layout */}
      <div className="relative z-10 h-full w-full pb-12 md:pb-20">
        <div className="flex h-full w-full flex-col items-start justify-end px-6 md:px-10 lg:px-14">
          {/* Subtitle */}
          <p
            className="animate-fade-in mb-2 font-sans text-xs uppercase tracking-[0.35em] text-white md:mb-3 md:text-sm md:tracking-[0.4em]"
            style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
          >
            {t('subtitle')}
          </p>

          {/* Main Title */}
          <h1
            className="animate-fade-in-up max-w-2xl font-serif leading-[1.05] text-white"
            style={{
              fontSize: 'clamp(1.75rem, 5vw, 3rem)',
              letterSpacing: '0.04em',
              animationDelay: '0.6s',
              animationFillMode: 'both',
              textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            }}
          >
            {t('title')}
          </h1>

          {/* Tagline */}
          <p
            className="animate-fade-in mt-2 max-w-sm font-sans text-xs font-light leading-relaxed text-white md:mt-3 md:max-w-md md:text-sm"
            style={{
              animationDelay: '1s',
              animationFillMode: 'both',
              textShadow: '0 1px 8px rgba(0,0,0,0.2)',
            }}
          >
            {t('description')}
          </p>

          {/* Bottom info bar */}
          <div
            className="animate-fade-in mt-4 flex flex-wrap items-center gap-3 border-t border-white/20 pt-3 md:mt-6 md:gap-4 md:pt-4"
            style={{ animationDelay: '1.3s', animationFillMode: 'both' }}
          >
            <span
              className="font-sans text-xs font-light uppercase tracking-[0.12em] text-white"
              style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}
            >
              {t('address')}
            </span>
            <a
              href="tel:+60123456789"
              className="font-sans text-xs font-light tracking-[0.12em] text-white transition-colors duration-500 hover:text-white/70"
              style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}
            >
              {t('phone')}
            </a>
            <span
              className="hidden font-sans text-xs font-light tracking-[0.12em] text-white xl:inline"
              style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}
            >
              reservations@sempornameili.com
            </span>
          </div>

          {/* 快捷导航卡片（< xl 显示，横向排列在信息栏下方，正方形） */}
          <div
            className="animate-fade-in mt-4 flex gap-2 xl:hidden"
            style={{ animationDelay: '1.5s', animationFillMode: 'both' }}
          >
            <Link
              href="/location"
              className="group flex h-20 w-20 flex-col items-center justify-center gap-2 rounded-sm border border-white/10 bg-black/60 backdrop-blur-sm transition-colors hover:bg-black/75 md:h-24 md:w-24"
            >
              <MapPin className="h-4 w-4 text-white/70 transition-colors group-hover:text-white" strokeWidth={1.2} />
              <span className="font-sans text-xs font-light tracking-widest text-white/80 transition-colors group-hover:text-white">
                {t('heroCards.0')}
              </span>
            </Link>
            <a
              href="#villas"
              className="group flex h-20 w-20 flex-col items-center justify-center gap-2 rounded-sm border border-white/10 bg-black/60 backdrop-blur-sm transition-colors hover:bg-black/75 md:h-24 md:w-24"
            >
              <BedDouble className="h-4 w-4 text-white/70 transition-colors group-hover:text-white" strokeWidth={1.2} />
              <span className="font-sans text-xs font-light tracking-widest text-white/80 transition-colors group-hover:text-white">
                {t('heroCards.1')}
              </span>
            </a>
            <Link
              href="/gallery"
              className="group flex h-20 w-20 flex-col items-center justify-center gap-2 rounded-sm border border-white/10 bg-black/60 backdrop-blur-sm transition-colors hover:bg-black/75 md:h-24 md:w-24"
            >
              <ImageIcon className="h-4 w-4 text-white/70 transition-colors group-hover:text-white" strokeWidth={1.2} />
              <span className="font-sans text-xs font-light tracking-widest text-white/80 transition-colors group-hover:text-white">
                {t('heroCards.2')}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* xl+ 导航卡片（绝对定位右下角，滚动时向右淡出） */}
      <motion.div
        animate={{ x: scrollY > 80 ? 80 : 0, opacity: scrollY > 80 ? 0 : 1 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
        style={{ pointerEvents: scrollY > 80 ? 'none' : 'auto' }}
        className="absolute right-10 bottom-24 z-20 hidden items-center gap-1.5 xl:flex"
      >
        <Link
          href="/location"
          className="group flex h-28 w-28 flex-col items-center justify-center gap-3 rounded-sm border border-white/5 bg-neutral-900/90 backdrop-blur-md transition-colors hover:bg-neutral-800/90"
        >
          <MapPin className="h-5 w-5 text-white/70 transition-colors group-hover:text-white" strokeWidth={1.2} />
          <span className="font-sans text-xs font-light tracking-widest text-white/80 transition-colors group-hover:text-white">
            {t('heroCards.0')}
          </span>
        </Link>
        <a
          href="#villas"
          className="group flex h-28 w-28 flex-col items-center justify-center gap-3 rounded-sm border border-white/5 bg-neutral-900/90 backdrop-blur-md transition-colors hover:bg-neutral-800/90"
        >
          <BedDouble className="h-5 w-5 text-white/70 transition-colors group-hover:text-white" strokeWidth={1.2} />
          <span className="font-sans text-xs font-light tracking-widest text-white/80 transition-colors group-hover:text-white">
            {t('heroCards.1')}
          </span>
        </a>
        <Link
          href="/gallery"
          className="group flex h-28 w-28 flex-col items-center justify-center gap-3 rounded-sm border border-white/5 bg-neutral-900/90 backdrop-blur-md transition-colors hover:bg-neutral-800/90"
        >
          <ImageIcon className="h-5 w-5 text-white/70 transition-colors group-hover:text-white" strokeWidth={1.2} />
          <span className="font-sans text-xs font-light tracking-widest text-white/80 transition-colors group-hover:text-white">
            {t('heroCards.2')}
          </span>
        </Link>
      </motion.div>

      {/* Video control */}
      <button
        onClick={togglePlay}
        className="absolute right-6 bottom-6 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/50 bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-white/20 md:right-10 md:bottom-8"
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
      >
        {isPlaying ? (
          <Pause size={14} strokeWidth={1.5} />
        ) : (
          <Play size={14} strokeWidth={1.5} className="ml-0.5" />
        )}
      </button>


    </motion.section>
  );
}
