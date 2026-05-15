import { useTranslations } from 'next-intl';
import { Wifi, ConciergeBell, UtensilsCrossed, Waves, Plane } from 'lucide-react';

export function BookingAmenities() {
  const t = useTranslations('BookingPage.amenities');

  const icons = [
    <Wifi key="1" className="w-8 h-8 md:w-12 md:h-12 mb-4 text-[--color-section-text]" strokeWidth={1} />,
    <ConciergeBell key="2" className="w-8 h-8 md:w-12 md:h-12 mb-4 text-[--color-section-text]" strokeWidth={1} />,
    <UtensilsCrossed key="3" className="w-8 h-8 md:w-12 md:h-12 mb-4 text-[--color-section-text]" strokeWidth={1} />,
    <Waves key="4" className="w-8 h-8 md:w-12 md:h-12 mb-4 text-[--color-section-text]" strokeWidth={1} />,
    <Plane key="5" className="w-8 h-8 md:w-12 md:h-12 mb-4 text-[--color-section-text]" strokeWidth={1} />
  ];

  // We know there are exactly 5 items from our locale
  return (
    <section className="bg-cream py-20 sm:py-28 md:py-36 px-page">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-16">
          <h2
            className="font-serif italic font-light leading-[1.15] text-[--color-section-text] tracking-wide"
            style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)' }}
          >{t('title')}</h2>
          <button className="text-gold border-b border-gold pb-1 text-sm mt-6 md:mt-0 font-sans tracking-widest uppercase hover:text-primary-dark hover:border-primary-dark transition-colors">
            {t('viewAll')}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
          {icons.map((icon, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              {icon}
              <span className="font-text text-sm text-[--color-warm-text]">{t(`items.${idx}.title` as any)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
