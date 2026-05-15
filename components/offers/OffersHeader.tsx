'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { PageHeroShell } from '@/components/layout/PageHeroShell';
import PageSectionNav from '@/components/layout/PageSectionNav';

export default function OffersHeader() {
  const tNav = useTranslations('Offers.nav');
  const tHeader = useTranslations('Offers.header');

  const sections = [
    { id: 'group', label: tNav('group') },
    { id: 'member', label: tNav('member') },
    { id: 'offers', label: tNav('promotional') },
  ];

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
          {tHeader('pageTag')}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl tracking-widest font-light mb-8">
          {tHeader('pageTitle')}
        </h1>
        <p className="font-serif text-sm sm:text-base leading-loose">
          {tHeader('description')}
        </p>
      </motion.div>

      {/* 最底部：页内导航 */}
      <PageSectionNav items={sections} ariaLabel="优惠页内导航" />

    </PageHeroShell>
  );
}
