'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { PageHeroShell } from '@/components/layout/PageHeroShell';

export default function ContactHero() {
  const t = useTranslations('ContactPage.hero');

  return (
    <PageHeroShell>

      {/* 标题区 */}
      <motion.div
        className="max-w-2xl flex flex-col items-center mb-10"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="font-sans text-[10px] sm:text-xs tracking-[0.3em] uppercase block mb-5">
          {t('subtitle')}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl tracking-widest font-light mb-8">
          {t('title')}
        </h1>
        {/* 金色装饰线不用了，和其它保持一致，或者保留？如果完全一致就去掉金线 */}
        <p className="font-sans text-xs sm:text-sm tracking-[0.2em] uppercase text-white/70">
          {t('addressValue')}
        </p>
      </motion.div>

      {/* 联系渠道 — 三列纯文字，无卡片 */}
      <motion.div
        className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-14 sm:gap-0 text-center mb-10"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      >

        {/* WhatsApp */}
        <div className="flex flex-col items-center gap-4 sm:px-8">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/50">
            {t('whatsappLabel')}
          </p>
          <p className="font-serif text-xl text-white tracking-wide">
            {t('whatsappValue')}
          </p>
          <a
            href="https://wa.me/60112780399"
            target="_blank"
            rel="noreferrer"
            className="font-sans text-[10px] tracking-[0.25em] uppercase text-white pb-px border-b border-white/30 hover:border-white transition-colors duration-200"
          >
            {t('whatsappCta')}
          </a>
        </div>

        {/* 竖向分割线（仅桌面） */}
        <div className="hidden sm:block sm:col-span-1 relative">
          <span className="absolute inset-y-0 left-0 w-px bg-white/10" />
          <span className="absolute inset-y-0 right-0 w-px bg-white/10" />
          <div className="flex flex-col items-center justify-center h-full gap-4 px-8">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/50">
              {t('emailLabel')}
            </p>
            <p className="font-serif text-xl text-white tracking-wide">
              {t('emailValue')}
            </p>
            <a
              href={`mailto:${t('emailValue')}`}
              className="font-sans text-[10px] tracking-[0.25em] uppercase text-white pb-px border-b border-white/30 hover:border-white transition-colors duration-200"
            >
              {t('emailCta')}
            </a>
          </div>
        </div>

        {/* Email（移动端独立展示） */}
        <div className="flex flex-col items-center gap-4 sm:hidden">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/50">
            {t('emailLabel')}
          </p>
          <p className="font-serif text-xl text-white tracking-wide">
            {t('emailValue')}
          </p>
          <a
            href={`mailto:${t('emailValue')}`}
            className="font-sans text-[10px] tracking-[0.25em] uppercase text-white pb-px border-b border-white/30 hover:border-white transition-colors duration-200"
          >
            {t('emailCta')}
          </a>
        </div>

        {/* Book Direct */}
        <div className="flex flex-col items-center gap-4 sm:px-8">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/50">
            {t('bookingLabel')}
          </p>
          <p className="font-serif text-xl text-white tracking-wide">
            {t('bookingDesc')}
          </p>
          <Link
            href="/booking/all"
            className="font-sans text-[10px] tracking-[0.25em] uppercase text-white pb-px border-b border-white/30 hover:border-white transition-colors duration-200"
          >
            {t('bookingValue')}
          </Link>
        </div>

      </motion.div>
    </PageHeroShell>
  );
}
