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

export default function OffersContactForm() {
  const t = useTranslations('OffersContactForm');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const type = formData.get('type') as string;
    const typeLabel = t(`types.${type}`);
    const name = formData.get('name') as string;
    const pax = formData.get('pax') as string;
    const dates = formData.get('dates') as string;
    const email = formData.get('email') as string;
    const social = formData.get('social') as string;
    const notes = formData.get('notes') as string;

    const subject = encodeURIComponent(`[Website Inquiry] ${typeLabel} - ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\n` +
      `Inquiry Type: ${typeLabel}\n` +
      `No. of Pax: ${pax}\n` +
      `Dates: ${dates || 'Not specified'}\n` +
      `Email: ${email}\n` +
      `Social: ${social}\n\n` +
      `Notes: \n${notes}`
    );

    setTimeout(() => {
      window.location.href = `mailto:amy@meilihotel.com?subject=${subject}&body=${body}`;
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <section id="contact-form" className="bg-background py-24 md:py-32 lg:py-48">
      <div className="max-w-4xl mx-auto px-page">
        
        <motion.div 
          custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '0px 0px -50px 0px' }}
          className="text-center mb-20 md:mb-28"
        >
          <h2 
            className="font-serif text-[--color-section-text] leading-[1.15] mb-8" 
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}
          >
            {t('title')}
          </h2>
          <div className="w-12 sm:w-16 h-px bg-[--color-gold-warm] mx-auto" />
        </motion.div>

        {isSuccess ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <p className="font-serif text-[--color-section-text] mb-6" style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)' }}>
              {t('successMsg')}
            </p>
            <p className="font-sans text-[--color-warm-text] mb-12 text-sm md:text-base">
              {t('whatsappAlt')}
            </p>
            <a 
              href="https://wa.me/60112780399" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center bg-primary text-white px-10 py-3 text-xs tracking-widest uppercase transition-colors duration-300 hover:bg-primary-light"
            >
              WhatsApp Us
            </a>
          </motion.div>
        ) : (
          <motion.form 
            custom={0.2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '0px 0px -50px 0px' }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-10 md:gap-14 max-w-3xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
              <div className="flex flex-col gap-3">
                <label htmlFor="name" className="font-sans text-[0.65rem] md:text-xs tracking-[0.25em] uppercase text-[--color-warm-text]">
                  {t('nameLabel')} *
                </label>
                <input 
                  type="text" id="name" name="name" required
                  className="w-full bg-transparent border-b border-[--color-section-text]/20 pb-3 pt-1 text-[--color-section-text] focus:outline-none focus:border-[--color-gold-warm] transition-colors rounded-none font-sans text-base"
                />
              </div>

              <div className="flex flex-col gap-3 relative">
                <label htmlFor="type" className="font-sans text-[0.65rem] md:text-xs tracking-[0.25em] uppercase text-[--color-warm-text]">
                  {t('typeLabel')} *
                </label>
                <select 
                  id="type" name="type" required defaultValue=""
                  className="w-full bg-transparent border-b border-[--color-section-text]/20 pb-3 pt-1 text-[--color-section-text] appearance-none focus:outline-none focus:border-[--color-gold-warm] transition-colors cursor-pointer rounded-none font-sans text-base"
                >
                  <option value="" disabled>-- Select --</option>
                  <option value="group">{t('types.group')}</option>
                  <option value="member">{t('types.member')}</option>
                  <option value="promotional">{t('types.promotional')}</option>
                </select>
                <ChevronDown className="absolute right-0 bottom-4 w-4 h-4 text-[--color-section-text]/40 pointer-events-none" />
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="pax" className="font-sans text-[0.65rem] md:text-xs tracking-[0.25em] uppercase text-[--color-warm-text]">
                  {t('paxLabel')} *
                </label>
                <input 
                  type="number" id="pax" name="pax" required min="1"
                  className="w-full bg-transparent border-b border-[--color-section-text]/20 pb-3 pt-1 text-[--color-section-text] focus:outline-none focus:border-[--color-gold-warm] transition-colors rounded-none font-sans text-base"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="dates" className="font-sans text-[0.65rem] md:text-xs tracking-[0.25em] uppercase text-[--color-warm-text]">
                  {t('dateLabel')}
                </label>
                <input 
                  type="date" id="dates" name="dates" 
                  className="w-full bg-transparent border-b border-[--color-section-text]/20 pb-2.5 pt-1 text-[--color-section-text] focus:outline-none focus:border-[--color-gold-warm] transition-colors rounded-none font-sans text-base"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="email" className="font-sans text-[0.65rem] md:text-xs tracking-[0.25em] uppercase text-[--color-warm-text]">
                  {t('emailLabel')}
                </label>
                <input 
                  type="email" id="email" name="email" 
                  className="w-full bg-transparent border-b border-[--color-section-text]/20 pb-3 pt-1 text-[--color-section-text] focus:outline-none focus:border-[--color-gold-warm] transition-colors rounded-none font-sans text-base"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="social" className="font-sans text-[0.65rem] md:text-xs tracking-[0.25em] uppercase text-[--color-warm-text]">
                  {t('socialLabel')}
                </label>
                <input 
                  type="text" id="social" name="social" 
                  className="w-full bg-transparent border-b border-[--color-section-text]/20 pb-3 pt-1 text-[--color-section-text] focus:outline-none focus:border-[--color-gold-warm] transition-colors rounded-none font-sans text-base"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <label htmlFor="notes" className="font-sans text-[0.65rem] md:text-xs tracking-[0.25em] uppercase text-[--color-warm-text]">
                {t('noteLabel')}
              </label>
              <textarea 
                id="notes" name="notes" rows={1}
                placeholder="在此输入您的具体需求或细节..."
                className="w-full bg-transparent border-b border-[--color-section-text]/20 pb-4 pt-1 text-[--color-section-text] placeholder:-translate-y-1 placeholder:text-[--color-warm-text]/40 focus:outline-none focus:border-[--color-gold-warm] transition-colors resize-none rounded-none font-sans text-base"
              />
            </div>

            <div className="mt-8 text-center flex flex-col items-center">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="inline-flex min-h-11 items-center justify-center bg-primary text-white px-14 py-4 mb-8 text-xs md:text-sm tracking-[0.25em] uppercase transition-colors duration-300 hover:bg-primary-light disabled:opacity-70"
              >
                {isSubmitting ? '...' : t('submitBtn')}
              </button>
              
              <div className="flex items-center gap-4 text-xs font-sans tracking-widest uppercase">
                <span className="text-[--color-warm-text]">{t('whatsappAlt')}</span>
                <a href="https://wa.me/60112780399" className="text-[--color-gold-warm] hover:text-[--color-section-text] transition-colors border-b border-[--color-gold-warm]/30 pb-0.5" target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}
