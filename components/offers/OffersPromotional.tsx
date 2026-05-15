'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay,
      ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
    },
  }),
};

// 使用不同质感的高级实景图代表不同的团购场景
const SCENE_IMAGES = [
  'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?auto=format&fit=crop&q=80&w=1200'
];

export default function OffersPromotional() {
  const t = useTranslations('OffersPromotional');
  
  // 巧妙利用现有的 translation keys，将其进行重组，融入到无边框的画报式卡片中
  // 摒弃 01、02 的冰冷合同式罗列，改为“场景-体验”式的叙事
  const items = (t.raw('items') || []) as string[];
  
  const scenes = [
    { title: t('badge'), image: SCENE_IMAGES[0], paragraphs: [items[0], items[1]].filter(Boolean) },
    { title: t('badge'), image: SCENE_IMAGES[1], paragraphs: [items[2], items[3]].filter(Boolean) },
    { title: t('badge'), image: SCENE_IMAGES[2], paragraphs: [items[4], items[5]].filter(Boolean) }
  ].filter(scene => scene.paragraphs.length > 0);
  return (
    <section id="offers" className="bg-white py-12 md:py-20 lg:py-28 overflow-hidden">
      <div className="max-w-350 mx-auto">
        
        {/* 引言区：高对比度的极简排版 */}
        <div className="flex flex-col items-center text-center gap-8 mb-10 md:mb-16 px-page">
          <motion.div 
            custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '0px 0px -50px 0px' }}
            className="max-w-3xl flex flex-col items-center"
          >
            <h2 
              className="font-serif text-[--color-section-text] leading-[1.15] tracking-[0.04em] text-balance mb-8"
              style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)' }}
            >
              {t('badge')}
            </h2>
            <div className="w-12 sm:w-16 h-px bg-[--color-gold-warm]" />
          </motion.div>
        </div>

        {/* 画报式无边框排版（移动端横向滑动，桌面网格） */}
        <div className="flex flex-nowrap overflow-x-auto md:grid md:grid-cols-3 gap-6 md:gap-8 lg:gap-16 snap-x snap-mandatory px-page pb-8 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          {scenes.map((scene, idx) => (
            <motion.div 
              key={idx}
              custom={idx * 0.15} 
              variants={fadeUp} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: '0px 0px -50px 0px' }}
              className="flex flex-col group w-[85vw] sm:w-[60vw] md:w-auto shrink-0 snap-center"
            >
              {/* 大比例沉浸式图片，不添加任何边框与阴影 */}
              <div className="relative aspect-3/4 sm:aspect-4/3 md:aspect-4/5 w-full overflow-hidden bg-muted mb-6 md:mb-10">
                <Image 
                  src={scene.image}
                  alt={scene.title}
                  fill
                  className="object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/5" />
              </div>

              {/* 取消罗列与数字，采用情绪化标题+正文段落组合 */}
              <div className="flex-1 flex flex-col">
                <h3 className="font-serif text-sm md:text-base text-[--color-section-text] mb-5 md:mb-6 leading-tight">
                  {scene.title}
                </h3>
                <div className="w-8 h-px bg-[--color-gold-warm]/40 mb-4 md:mb-5 transition-all duration-500 group-hover:w-16" />
                
                <p className="font-sans text-[--color-warm-text] text-xs md:text-sm leading-relaxed font-light">
                  {scene.paragraphs.join('，')}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="px-page mt-10 md:mt-24 pt-8 md:pt-12 border-t border-[--color-gold-warm]/20">
          <motion.div 
            custom={0.5} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '0px 0px -50px 0px' }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10"
          >
            <Link 
              href="#contact-form"
              className="inline-flex min-h-11 items-center justify-center bg-primary text-white px-8 py-3 text-xs md:text-sm tracking-[0.2em] uppercase transition-colors hover:bg-primary-light"
            >
              {t('ctaMain')}
            </Link>
            <a 
              href="https://wa.me/60112780399" 
              target="_blank" 
              rel="noreferrer"
              className="group flex shrink-0 items-center min-h-11 gap-4 text-sm tracking-[0.2em] text-[--color-gold-warm] uppercase transition-colors hover:text-[--color-section-text]"
            >
              {t('ctaSub')}
              <ArrowRight className="w-5 h-5 transition-transform duration-500 ease-out group-hover:translate-x-2" />
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
