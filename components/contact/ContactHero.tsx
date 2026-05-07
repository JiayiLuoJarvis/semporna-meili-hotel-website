'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Phone, Mail, CalendarDays, MapPin } from 'lucide-react';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

export default function ContactHero() {
  const t = useTranslations('ContactPage.hero');

  return (
    <section className="bg-background py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-page">

        {/* Page heading */}
        <motion.div
          custom={0} variants={fadeUp} initial="hidden" animate="visible"
          className="text-center mb-16 md:mb-24"
        >
          <span className="block font-sans text-xs tracking-[0.3em] uppercase text-[--color-warm-text] mb-4">
            {t('subtitle')}
          </span>
          <h1
            className="font-serif text-[--color-section-text] leading-[1.05]"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            {t('title')}
          </h1>
          <div className="w-12 h-px bg-[--color-gold-warm] mx-auto mt-8 mb-6" />
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-[--color-section-text] inline-flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            {t('addressValue')}
          </p>
        </motion.div>

        {/* Channel cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-[--color-section-text]/10 divide-y md:divide-y-0 md:divide-x divide-[--color-section-text]/10">

          {/* WhatsApp */}
          <motion.div
            custom={0.1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="flex flex-col gap-8 p-10 md:p-12 lg:p-14"
          >
            <div className="w-10 h-10 flex items-center justify-center border border-[--color-gold-warm]/40">
              <Phone className="w-4 h-4 text-[--color-gold-warm]" />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <p className="font-sans text-xs tracking-[0.2em] uppercase text-[--color-section-text]">
                {t('whatsappLabel')}
              </p>
              <p className="font-serif text-[--color-section-text] text-xl md:text-2xl tracking-wide">
                {t('whatsappValue')}
              </p>
            </div>
            <a
              href="https://wa.me/60112780399"
              target="_blank" rel="noreferrer"
              className="font-sans text-xs tracking-[0.2em] uppercase text-[--color-section-text] border-b border-[--color-section-text]/30 pb-0.5 w-fit transition-colors hover:text-[--color-gold-warm] hover:border-[--color-gold-warm]"
            >
              {t('whatsappCta')}
            </a>
          </motion.div>

          {/* Email */}
          <motion.div
            custom={0.2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="flex flex-col gap-8 p-10 md:p-12 lg:p-14"
          >
            <div className="w-10 h-10 flex items-center justify-center border border-[--color-gold-warm]/40">
              <Mail className="w-4 h-4 text-[--color-gold-warm]" />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <p className="font-sans text-xs tracking-[0.2em] uppercase text-[--color-section-text]">
                {t('emailLabel')}
              </p>
              <p className="font-serif text-[--color-section-text] text-xl md:text-2xl tracking-wide">
                {t('emailValue')}
              </p>
            </div>
            <a
              href={`mailto:${t('emailValue')}`}
              className="font-sans text-xs tracking-[0.2em] uppercase text-[--color-section-text] border-b border-[--color-section-text]/30 pb-0.5 w-fit transition-colors hover:text-[--color-gold-warm] hover:border-[--color-gold-warm]"
            >
              {t('emailCta')}
            </a>
          </motion.div>

          {/* Book Direct */}
          <motion.div
            custom={0.3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="flex flex-col gap-8 p-10 md:p-12 lg:p-14"
          >
            <div className="w-10 h-10 flex items-center justify-center border border-[--color-gold-warm]/40">
              <CalendarDays className="w-4 h-4 text-[--color-gold-warm]" />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <p className="font-sans text-xs tracking-[0.2em] uppercase text-[--color-section-text]">
                {t('bookingLabel')}
              </p>
              <p className="font-serif text-[--color-section-text] text-xl md:text-2xl tracking-wide">
                {t('bookingDesc')}
              </p>
            </div>
            <Link
              href="/booking"
              className="font-sans text-xs tracking-[0.2em] uppercase text-[--color-section-text] border-b border-[--color-section-text]/30 pb-0.5 w-fit transition-colors hover:text-[--color-gold-warm] hover:border-[--color-gold-warm]"
            >
              {t('bookingValue')}
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
