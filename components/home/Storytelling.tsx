'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

// 预设高品质量大图，直接借用 VillasAndSuites 里已经渲染出来的真实资源
const STORY_IMAGES = [
  'https://mgx-backend-cdn.metadl.com/generate/images/1129659/2026-04-18/m3bkbryaafaa/villa-ocean-view-1.png',
  'https://mgx-backend-cdn.metadl.com/generate/images/1129659/2026-04-18/m3bkb6qaafba/villa-overwater-1.png',
  'https://mgx-backend-cdn.metadl.com/generate/images/1129659/2026-04-18/m3bkawaaae7q/villa-premium-1.png',
];

// 内置 Story 数组（规避旧翻译文件里没有配置 posts 或者配置残缺的问题），补足内容量
const STORIES = [
  {
    tag: "生态保育",
    date: "2026.04",
    title: "写给海洋的诗：蔚蓝深处的生态承诺",
    desc: "以百年铁木筑底，零排放活水过滤系统循环流转。在此，我们从不征服自然，而是以最虔诚的姿态致敬脚下的万顷琉璃。"
  },
  {
    tag: "人文探索",
    date: "2026.03",
    title: "海之吉普赛：巴瑶族的千年渔歌",
    desc: "乘木船驶入隐秘浅滩部落，在原住民纯澈无垠的笑容与篝火歌声中，放慢时钟，进行一场超越语言的时空对谈。"
  },
  {
    tag: "风味鉴赏",
    date: "2026.01",
    title: "深海极鲜，悬崖之巅的味蕾交响",
    desc: "清晨渔船直供的深海极鲜，佐以主厨特调南洋珍品。在凌空而降的悬崖餐厅中，任海风与醇酒点缀每分每秒的私密时光。"
  }
];

export function Storytelling() {
  const t = useTranslations('Story');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '0px 0px -40px 0px', amount: 0.1 });

  return (
    <section ref={sectionRef} className="relative w-full py-10 md:py-16 lg:py-20 bg-[--color-cream] overflow-hidden">
      <div className="mx-auto max-w-[85rem] px-5 sm:px-8 lg:px-12">
        {/* Header - 统一对齐到 1280 容器左侧或居中，保持高级感 */}
        <motion.div 
          custom={0} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          className="mb-16 md:mb-24 lg:mb-32 text-center md:text-left"
        >
          <p className="font-sans text-[0.65rem] md:text-[0.75rem] tracking-[0.3em] text-[--color-warm-text] uppercase mb-4 md:mb-6">
            {t('subtitle')}
          </p>
          <h2 
            className="font-serif font-light leading-[1.3] tracking-wider text-[--color-section-text] text-balance max-w-3xl"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
          >
            {t('title')}
          </h2>
        </motion.div>

        {/* 方案B 进化版: 统一左图右文结构，固定图片比例，细化线条分隔样式 */}
        <div className="relative w-full text-[--color-section-text] border-b border-[#e0dad0]">
          
          {STORIES.map((story, index) => {
            const imgSrc = STORY_IMAGES[index % STORY_IMAGES.length];
            return (
              <div key={index} className="flex flex-col md:flex-row group border-t border-[#e0dad0] py-12 md:py-20 lg:py-24 gap-10 md:gap-16 lg:gap-24">
                
                {/* 左侧：严谨一致的固定比例大图 */}
                <motion.div 
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                  className="w-full md:w-5/12 lg:w-[45%] shrink-0"
                >
                  <div className="relative aspect-video md:aspect-[4/3] w-full overflow-hidden bg-[#e0dad0]/20">
                    <Image
                      src={imgSrc}
                      alt={story.title}
                      fill
                      className="object-cover transition-transform duration-[2s] group-hover:scale-105 ease-out"
                      sizes="(max-width: 768px) 100vw, 45vw"
                      priority={index === 0}
                    />
                  </div>
                </motion.div>
                
                {/* 右侧：高度细化的文字排版 */}
                <motion.div 
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                  className="w-full md:w-7/12 lg:w-[55%] flex flex-col justify-center py-4 lg:py-10"
                >
                  <div className="flex flex-col max-w-lg lg:pl-8">
                    {/* Tag / Date 带装饰线 （去除了数字索引） */}
                    <div className="flex items-center gap-4 mb-8 md:mb-10 text-[#a59a85] font-sans text-[0.65rem] md:text-[0.7rem] tracking-[0.25em] uppercase">
                      <span className="block w-6 md:w-8 h-px bg-[#a59a85]/50"></span>
                      <span>{story.tag} &nbsp;&nbsp;|&nbsp;&nbsp; {story.date}</span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-serif text-2xl lg:text-[2rem] leading-[1.3] tracking-wide mb-6 md:mb-8 text-[--color-section-text]">
                      {story.title}
                    </h3>
                    
                    {/* Excerpt */}
                    <p className="font-sans text-[0.875rem] md:text-[0.95rem] font-light leading-[2.2] md:leading-[2.4] text-[#5a5347] mb-12">
                      {story.desc}
                    </p>

                    {/* Button */}
                    <button className="self-start group/btn flex items-center gap-4 outline-none">
                      <span className="border-b border-[--color-section-text]/30 pb-1 font-sans text-[0.65rem] md:text-[0.7rem] tracking-[0.25em] uppercase text-[--color-section-text] transition-colors group-hover/btn:border-[--color-section-text]">
                        {t('btn')}
                      </span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[--color-section-text] transition-transform duration-500 ease-out group-hover/btn:translate-x-2">
                        <path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
                
              </div>
            );
          })}
          
        </div>
      </div>
    </section>
  );
}
