import GalleryThemes from '@/components/gallery/GalleryThemes';

import GalleryPageHeader from '@/components/gallery/GalleryPageHeader';
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
  const t = await getTranslations({ locale, namespace: 'PageMeta' });
  return {
    title: t('gallery.title'),
    description: t('gallery.description'),
    keywords: t('gallery.keywords'),
  };
}

export default async function GalleryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tGallery = await getTranslations({ locale, namespace: 'Gallery' });
  const themes = tGallery.raw('Themes') as ThemeData[];

  return (
    <main className="w-full flex-1">
      <GalleryPageHeader
        items={themes.map((t) => ({ id: t.id, title: t.title, subtitle: t.subtitle }))}
      />

      <GalleryThemes themes={themes} />
    </main>
  );
}
