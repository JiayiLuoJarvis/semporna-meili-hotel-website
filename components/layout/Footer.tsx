'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

export function Footer() {
  const t = useTranslations('Footer');
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.1 });

  const columns = [
    {
      heading: t('col1.heading'),
      links: [t('col1.link1'), t('col1.link2'), t('col1.link3')],
    },
    {
      heading: t('col2.heading'),
      links: [t('col2.link1'), t('col2.link2'), t('col2.link3'), t('col2.link4')],
    },
    {
      heading: t('col3.heading'),
      links: [t('col3.link1'), t('col3.link2'), t('col3.link3')],
    },
    {
      heading: t('col4.heading'),
      links: [t('col4.link1'), t('col4.link2'), t('col4.link3'), t('col4.link4')],
    },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden py-10 md:py-16 bg-primary text-white"
    >
      {/* 装饰性背景 */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.2)_100%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        
        {/* 顶部: 预定联系方式 */}
        <div className="w-full mb-16 md:mb-20">
          <motion.div
            custom={0.1} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
            className="w-full bg-white flex flex-col md:flex-row p-6 md:p-8 lg:p-12 items-center"
          >
            {/* 左侧：文字说明 */}
            <div className="w-full md:w-1/2 flex flex-col mb-8 md:mb-0 md:pr-10 lg:pr-16 md:border-r border-black/10">
              <h4 className="font-sans text-[13px] md:text-sm font-bold tracking-[0.15em] leading-relaxed mb-4 text-black max-w-70">
                {t('contactHeadline')}
              </h4>
              <p className="font-sans text-[10px] md:text-xs font-light tracking-wide text-black/70 leading-[1.8] max-w-sm">
                {t('contactDesc')}
              </p>
            </div>

            {/* 右侧：联系方式行动点 */}
            <div className="w-full md:w-1/2 flex flex-col md:pl-10 lg:pl-16">
              {[
                { label: t('ctaEmailLabel'), href: `mailto:${t('col3.link1')}` },
                { label: t('ctaPhoneLabel'), href: `tel:${t('col3.link2').replace(/\s/g, '')}` },
                { label: t('ctaChatLabel'), href: '/contact' },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="group flex items-center justify-between py-3 md:py-4 border-b border-black/10 last:border-b-0 font-sans text-xs md:text-[13px] font-medium tracking-widest text-black hover:text-black/60 transition-colors duration-300"
                >
                  <span>{label}</span>
                  <ArrowRight size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 中部: 4列导航 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
          {columns.map((col, idx) => (
            <motion.div 
              key={col.heading}
              custom={0.2 + idx * 0.1} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
            >
              <h3 className="mb-6 font-sans text-[10px] font-semibold tracking-[0.2em] text-white uppercase">
                {col.heading}
              </h3>
              <ul className="space-y-4">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="/"
                      className="group inline-flex items-center font-sans text-sm font-light text-white transition-colors duration-300"
                    >
                      <span className="relative overflow-hidden">
                        {link}
                        <span className="absolute bottom-0 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* 底部: 版权与法律信息 */}
        <motion.div 
          custom={0.6} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          className="mt-20 md:mt-32 pt-8 border-t border-white/10 flex flex-col items-center gap-6 sm:flex-row sm:justify-between"
        >
          <p className="font-sans text-[10px] sm:text-xs font-light uppercase tracking-widest text-white">
            &copy; {new Date().getFullYear()} {t('copyright')}
          </p>

          <nav aria-label={t('legalNav')} className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {(
              [
                t('legal.privacy'),
                t('legal.cookie'),
                t('legal.terms'),
                t('legal.accessibility'),
              ] as string[]
            ).map((item) => (
              <Link
                key={item}
                href="/"
                className="font-sans text-[10px] sm:text-xs font-light uppercase tracking-widest text-white transition-colors duration-300"
              >
                {item}
              </Link>
            ))}
          </nav>
        </motion.div>

      </div>
    </footer>
  );
}
