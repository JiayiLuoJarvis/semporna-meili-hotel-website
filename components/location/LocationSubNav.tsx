'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { PageHeroShell } from '@/components/layout/PageHeroShell';
import PageSectionNav from '@/components/layout/PageSectionNav';

export default function LocationSubNav() {
  const t = useTranslations('Location.nav');

  const sections = [
    { id: 'location-culture', label: t('culture') },
    { id: 'location-transport', label: t('transport') },
    { id: 'location-info', label: t('info') },
  ];

  return (
    <PageHeroShell>
      
      {/* 顶部：标题与描述区（完美居中对称） */}
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
          {t('pageTitle')}
        </h1>
        <p className="font-serif text-sm sm:text-base leading-loose">
          {t('description')}
        </p>
      </motion.div>

      {/* 中部：地址及联系信息 */}
      <motion.div 
        className="flex flex-col items-center gap-4 mb-20"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p className="font-sans text-[10px] sm:text-xs tracking-[0.2em] uppercase font-light">
          {t('address')}
        </p>
        <div className="flex items-center gap-10 mt-1">
          <a
            href={`tel:${t('phone')}`}
            className="font-sans text-[10px] sm:text-xs tracking-[0.2em] uppercase font-light hover:underline underline-offset-4"
          >
            {t('phone')}
          </a>
          <button className="font-sans text-[10px] sm:text-xs tracking-[0.2em] uppercase font-light hover:underline underline-offset-4">
            {t('map')}
          </button>
        </div>
      </motion.div>

      {/* 最底部：导航菜单 */}
      <PageSectionNav items={sections} ariaLabel="位置页内导航" />
    </PageHeroShell>
  );
}

