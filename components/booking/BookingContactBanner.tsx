import { useTranslations } from 'next-intl';
import Link from 'next/link';

export function BookingContactBanner() {
  const t = useTranslations('BookingPage.contactBanner');

  return (
    <section className="bg-warm-light py-24 md:py-36 px-page flex flex-col items-center justify-center text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-10">
        <p
          className="font-serif text-section-text leading-[1.3] whitespace-nowrap"
          style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.9rem)' }}
        >
          {t('text')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/contact"
            className="min-h-11 px-10 py-3 bg-primary text-white hover:bg-primary-light transition-colors font-sans text-xs tracking-[0.2em] uppercase"
          >
            {t('contact')}
          </Link>
          <a
            href={`tel:${t('phone').replace(/\s/g, '')}`}
            className="min-h-11 px-10 py-3 border border-warm-gray text-section-text hover:bg-warm-gray transition-colors font-sans text-xs tracking-[0.2em] uppercase"
          >
            {t('phone')}
          </a>
        </div>
      </div>
    </section>
  );
}
