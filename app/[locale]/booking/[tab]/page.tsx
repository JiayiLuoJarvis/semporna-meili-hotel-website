import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { BookingPageHeader } from '@/components/booking/BookingPageHeader';
import { BookingRoomList } from '@/components/booking/BookingRoomList';
import { BookingAmenities } from '@/components/booking/BookingAmenities';
import { BookingPolicies } from '@/components/booking/BookingPolicies';
import { BookingContactBanner } from '@/components/booking/BookingContactBanner';
import { BookingBar } from '@/components/home/BookingBar';

const VALID_TABS = ['all', 'waterVillas', 'signatureVillas'] as const;
type Tab = typeof VALID_TABS[number];

export async function generateStaticParams() {
  return VALID_TABS.map(tab => ({ tab }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; tab: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'BookingPage' });
  return { title: t('hero.title') + ' | Meili Resort' };
}

export default async function BookingTabPage({
  params,
}: {
  params: Promise<{ tab: string }>;
}) {
  const { tab } = await params;
  if (!VALID_TABS.includes(tab as Tab)) notFound();

  return (
    <main className="flex flex-col min-h-screen bg-background">
      <BookingPageHeader />
      <BookingRoomList tab={tab as Tab} />
      <BookingAmenities />
      <BookingPolicies />
      <BookingContactBanner />
    </main>
  );
}
