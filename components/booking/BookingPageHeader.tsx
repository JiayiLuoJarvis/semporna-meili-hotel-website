import { useTranslations } from 'next-intl';

export function BookingPageHeader() {
  const t = useTranslations('BookingPage.hero');

  return (
    <section className="bg-primary text-white pt-32 pb-16 md:pt-40 md:pb-24 px-page text-center flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1
          className="font-serif leading-[1.05] tracking-[0.04em]"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 4rem)' }}
        >
          {t('title')}
        </h1>
        <p className="font-text text-white max-w-2xl mx-auto text-sm md:text-base leading-relaxed opacity-90">
          {t('description')}
        </p>
      </div>
    </section>
  );
}
