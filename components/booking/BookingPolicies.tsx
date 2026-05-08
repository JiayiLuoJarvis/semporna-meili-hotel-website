import { useTranslations } from 'next-intl';
import { Clock, CreditCard, Users } from 'lucide-react';

export function BookingPolicies() {
  const t = useTranslations('BookingPage.policies');

  const icons = [
    <Clock key="1" className="w-5 h-5 text-[--color-section-text] shrink-0 mt-1" strokeWidth={1.5} />,
    <CreditCard key="2" className="w-5 h-5 text-[--color-section-text] shrink-0 mt-1" strokeWidth={1.5} />,
    <Users key="3" className="w-5 h-5 text-[--color-section-text] shrink-0 mt-1" strokeWidth={1.5} />
  ];

  return (
    <section id="policies" className="py-20 md:py-32 px-page bg-background">
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-serif leading-[1.15] text-[--color-section-text] tracking-wide mb-10 text-center"
          style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)' }}
        >{t('title')}</h2>
        
        <div className="flex items-center justify-center gap-2 text-xs text-[--color-warm-text] tracking-[0.2em] uppercase mb-14">
          <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
          <span className="font-sans">{t('checkInTime')}</span>
        </div>

        <div className="space-y-10">
          {[0, 1, 2].map((idx) => (
            <div key={idx} className="flex gap-6">
              {icons[idx]}
              <div>
                <h3 className="font-serif text-[--color-section-text] mb-2 text-lg tracking-wide">
                  {t(`items.${idx}.title` as any)}
                </h3>
                <p className="font-text text-sm text-[--color-warm-text] leading-relaxed">
                  {t(`items.${idx}.desc` as any)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
