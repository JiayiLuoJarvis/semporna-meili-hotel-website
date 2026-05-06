'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

export default function LocationCTA() {
  const t = useTranslations('Location');
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -40px 0px', amount: 0.1 });

  return (
    <section
      ref={ref}
      className="relative w-full min-h-[75vh] sm:min-h-[85vh] flex items-center overflow-hidden"
    >
      {/* ── 背景：全宽海景图 ── */}
      <Image
        src="https://picsum.photos/seed/meili_cta_sea/1920/1080"
        alt="仙本那海景"
        fill
        className="object-cover"
        priority={false}
      />

      {/* ── 渐变遮罩：顶部留透，中段聚焦，底部收深 ── */}
      <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/50 to-black/75 pointer-events-none" />

      {/* ── 内容：叠在遮罩上，居中 ── */}
      <div className="relative z-10 w-full px-page py-20 sm:py-28 flex flex-col items-center text-center">

        {/* 序章标签 */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex items-center gap-4 mb-8 sm:mb-10"
        >
          <div className="w-8 sm:w-12 h-px bg-gold-warm/60" />
          <span className="font-sans text-[0.55rem] sm:text-[0.6rem] uppercase tracking-[0.45em] text-gold-warm">
            {t('cta.titleEn')}
          </span>
          <div className="w-8 sm:w-12 h-px bg-gold-warm/60" />
        </motion.div>

        {/* 主标题 */}
        <motion.h2
          custom={0.1}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="font-serif text-white leading-[1.1] mb-6 max-w-3xl"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}
        >
          {t('cta.title')}
        </motion.h2>

        {/* 管家语气引言 */}
        <motion.p
          custom={0.18}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="font-text italic text-white/65 text-sm sm:text-base leading-relaxed max-w-xl mb-12 sm:mb-14"
        >
          {t('cta.desc')}
        </motion.p>

        {/* 按钮组 — 主要动作实心 / 次要动作纯文字链接 */}
        <motion.div
          custom={0.26}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10 w-full sm:w-auto"
        >
          <a
            href="https://wa.me/601127803997"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto min-h-12.5 px-10 py-3.5 inline-flex items-center justify-center bg-white text-primary font-sans text-xs tracking-[0.25em] uppercase transition-opacity duration-400 hover:opacity-85"
          >
            {t('cta.whatsapp')}
          </a>
          <a
            href="mailto:amy@meilihotel.com"
            className="font-sans text-xs tracking-[0.2em] uppercase text-white/60 hover:text-white/90 transition-colors duration-300 underline-offset-4 decoration-white/25 hover:decoration-white/60 underline"
          >
            {t('cta.email')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
