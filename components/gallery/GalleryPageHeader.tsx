'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { PageHeroShell } from '@/components/layout/PageHeroShell';
import PageSectionNav from '@/components/layout/PageSectionNav';

interface NavItem {
  id: string;
  title: string;
  subtitle: string;
}

export default function GalleryPageHeader({ items }: { items: NavItem[] }) {
  const t = useTranslations('Gallery.Hero');

  const sections = items.map((item) => ({ id: item.id, label: item.title }));

  return (
    <PageHeroShell>

      {/* 顶部：标题与描述区 */}
      <motion.div
        className="max-w-2xl flex flex-col items-center mb-10"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="font-sans text-[10px] sm:text-xs tracking-[0.3em] uppercase block mb-5">
          {t('pageTag')}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl tracking-widest font-light mb-8">
          {t('line1')}
        </h1>
        <p className="font-serif text-sm sm:text-base leading-loose">
          {t('description')}
        </p>
      </motion.div>

      {/* 底部：主题导航 */}
      <PageSectionNav items={sections} idPrefix="gallery-" ariaLabel="图片主题导航" />
    </PageHeroShell>
  );
}

