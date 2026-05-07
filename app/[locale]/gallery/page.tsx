import GalleryThemes from '@/components/gallery/GalleryThemes';
import GalleryVideo from '@/components/gallery/GalleryVideo';
import GalleryCTA from '@/components/gallery/GalleryCTA';
import { getTranslations, setRequestLocale } from 'next-intl/server';

interface GalleryImage {
  src: string;
  title: string;
  desc?: string;
}

interface ThemeData {
  id: string;
  title: string;
  subtitle: string;
  images: GalleryImage[];
}

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Gallery' });
  return {
    title: t('Hero.line1'),
    description: 'Explore the beauty of Semporna',
  };
}

export default async function GalleryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tGallery = await getTranslations({ locale, namespace: 'Gallery' });
  const themes = tGallery.raw('Themes') as ThemeData[];

  return (
    <main className="w-full flex-1 pt-17 sm:pt-20 lg:pt-21">
      <GalleryThemes themes={themes} />

      <GalleryVideo />

      <GalleryCTA />
    </main>
  );
}
