'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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

type InquiryType = 'reservation' | 'packages' | 'transfer' | 'honeymoon' | 'other' | '';

const DATE_TYPES: InquiryType[] = ['reservation', 'packages', 'honeymoon'];

export default function ContactForm() {
  const t = useTranslations('ContactPage.form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [inquiryType, setInquiryType] = useState<InquiryType>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const type = formData.get('type') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const dates = formData.get('dates') as string;
    const message = formData.get('message') as string;
    const typeLabel = type ? t(`types.${type}`) : type;

    const subject = encodeURIComponent(`[Contact Us] ${typeLabel} - ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\n` +
      `Inquiry Type: ${typeLabel}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone || 'Not provided'}\n` +
      (dates ? `Estimated Arrival: ${dates}\n` : '') +
      `\nMessage:\n${message}`
    );

    setTimeout(() => {
      window.location.href = `mailto:amy@meilihotel.com?subject=${subject}&body=${body}`;
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <section className="bg-white py-20 md:py-32">
      <div className="max-w-5xl mx-auto px-page">

        <motion.div
          custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '0px 0px -50px 0px' }}
          className="text-center mb-16 md:mb-20"
        >
          <h2
            className="font-serif text-[--color-section-text] leading-snug mb-6"
            style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)', letterSpacing: '0.04em' }}
          >
            {t('title')}
          </h2>
          <div className="w-12 sm:w-16 h-px bg-[--color-gold-warm] mx-auto mb-6" />
          <p className="font-sans text-[--color-section-text] text-sm md:text-base max-w-prose mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <p className="font-serif text-[--color-section-text] mb-6" style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)' }}>
              {t('successMsg')}
            </p>
            <p className="font-sans text-[--color-warm-text] mb-12 text-sm md:text-base">
              {t('whatsappAlt')}
            </p>
            <a
              href="https://wa.me/60112780399" target="_blank" rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center bg-primary text-white px-10 py-3 text-xs tracking-widest uppercase transition-colors duration-300 hover:bg-primary-light"
            >
              WhatsApp Us
            </a>
          </motion.div>
        ) : (
          <motion.form
            custom={0.2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '0px 0px -50px 0px' }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-10 md:gap-14"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

              <div className="flex flex-col gap-3">
                <label htmlFor="name" className="font-sans text-xs tracking-[0.2em] uppercase text-[--color-section-text]">
                  {t('nameLabel')} *
                </label>
                <input
                  type="text" id="name" name="name" required
                  className="w-full bg-transparent border-b border-[--color-section-text]/20 pb-3 pt-1 text-[--color-section-text] focus:outline-none focus:border-[--color-gold-warm] transition-colors rounded-none font-sans text-sm md:text-base"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="email" className="font-sans text-xs tracking-[0.2em] uppercase text-[--color-section-text]">
                  {t('emailLabel')} *
                </label>
                <input
                  type="email" id="email" name="email" required
                  className="w-full bg-transparent border-b border-[--color-section-text]/20 pb-3 pt-1 text-[--color-section-text] focus:outline-none focus:border-[--color-gold-warm] transition-colors rounded-none font-sans text-sm md:text-base"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="type" className="font-sans text-xs tracking-[0.2em] uppercase text-[--color-section-text]">
                  {t('typeLabel')} *
                </label>
                <div className="relative border-b border-[--color-section-text]/20 focus-within:border-[--color-gold-warm] transition-colors">
                  <select
                    id="type" name="type" required
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value as InquiryType)}
                    className="w-full bg-transparent pb-3 pt-1 text-[--color-section-text] appearance-none focus:outline-none cursor-pointer rounded-none font-sans text-sm md:text-base"
                  >
                    <option value="" disabled>-- Select --</option>
                    <option value="reservation">{t('types.reservation')}</option>
                    <option value="packages">{t('types.packages')}</option>
                    <option value="transfer">{t('types.transfer')}</option>
                    <option value="honeymoon">{t('types.honeymoon')}</option>
                    <option value="other">{t('types.other')}</option>
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[--color-section-text]/40 pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="phone" className="font-sans text-xs tracking-[0.2em] uppercase text-[--color-section-text]">
                  {t('phoneLabel')}
                </label>
                <input
                  type="tel" id="phone" name="phone"
                  className="w-full bg-transparent border-b border-[--color-section-text]/20 pb-3 pt-1 text-[--color-section-text] focus:outline-none focus:border-[--color-gold-warm] transition-colors rounded-none font-sans text-sm md:text-base"
                />
              </div>

              {DATE_TYPES.includes(inquiryType) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                  className="flex flex-col gap-3 md:col-span-2"
                >
                  <label htmlFor="dates" className="font-sans text-xs tracking-[0.2em] uppercase text-[--color-section-text]">
                    {t('dateLabel')}
                  </label>
                  <input
                    type="date" id="dates" name="dates"
                    className="w-full bg-transparent border-b border-[--color-section-text]/20 pb-3 pt-1 text-[--color-section-text] focus:outline-none focus:border-[--color-gold-warm] transition-colors rounded-none font-sans text-sm md:text-base"
                  />
                </motion.div>
              )}

            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="message" className="font-sans text-xs tracking-[0.2em] uppercase text-[--color-section-text]">
                {t('messageLabel')} *
              </label>
              <textarea
                id="message" name="message" required
                placeholder={t('messagePlaceholder')}
                rows={6}
                className="w-full bg-transparent border-b border-[--color-section-text]/20 pb-3 pt-1 text-[--color-section-text] placeholder:text-[--color-warm-text]/50 focus:outline-none focus:border-[--color-gold-warm] transition-colors resize-none rounded-none font-sans text-sm md:text-base"
              />
            </div>

            <div className="mt-8 text-center">
              <button
                type="submit" disabled={isSubmitting}
                className="inline-flex min-h-11 items-center justify-center bg-primary text-white px-16 py-4 text-xs md:text-sm tracking-[0.25em] uppercase transition-colors duration-300 hover:bg-primary-light disabled:opacity-70 mx-auto w-full md:w-auto"
              >
                {isSubmitting ? '...' : t('submitBtn')}
              </button>
            </div>

          </motion.form>
        )}
      </div>
    </section>
  );
}
