

import LocationSubNav from '@/components/location/LocationSubNav';
import LocationCulture from '@/components/location/LocationCulture';
import LocationArrival from '@/components/location/LocationArrival';
import LocationCTA from '@/components/location/LocationCTA';
import { BookingBar } from '@/components/home/BookingBar';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PageMeta' });
  return {
    title: t('location.title'),
    description: t('location.description'),
    keywords: t('location.keywords'),
  };
}

export default function LocationPage() {
  return (
    <main className="w-full flex-1">
      <LocationSubNav />
      <BookingBar delayMs={2000} />
      <LocationCulture />
      <LocationArrival />
      <LocationCTA />
    </main>
  );
}
