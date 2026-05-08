import { useTranslations } from 'next-intl';
import Link from 'next/link';

export function BookingContactBanner() {
  const t = useTranslations('BookingPage.contactBanner');

  return (
    <section className="bg-primary py-24 md:py-36 px-page flex flex-col items-center justify-center text-center">
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-10">
        <p
          className="font-serif text-white leading-[1.3]"
          style={{ fontSize: 'clamp(1.4rem, 3vw, 2.4rem)' }}
        >
          {t('text')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/contact"
            className="min-h-11 px-10 py-3 bg-white text-primary hover:bg-cream transition-colors font-sans text-xs tracking-[0.2em] uppercase"
          >
            {t('contact')}
          </Link>
          <a
            href={`tel:${t('phone').replace(/\s/g, '')}`}
            className="min-h-11 px-10 py-3 border border-white/60 text-white hover:bg-white/10 transition-colors font-sans text-xs tracking-[0.2em] uppercase"
          >
            {t('phone')}
          </a>
        </div>
      </div>
    </section>
  );
}
