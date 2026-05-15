import OffersHeader from '@/components/offers/OffersHeader';
import OffersGroup from '@/components/offers/OffersGroup';
import OffersMember from '@/components/offers/OffersMember';
import OffersPromotional from '@/components/offers/OffersPromotional';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PageMeta' });
  return {
    title: t('offers.title'),
    description: t('offers.description'),
    keywords: t('offers.keywords'),
  };
}

export default function OffersPage() {
  return (
    <main className="w-full flex-1">
      <OffersHeader />
      <OffersGroup />
      <OffersMember />
      <OffersPromotional />
    </main>
  );
}
