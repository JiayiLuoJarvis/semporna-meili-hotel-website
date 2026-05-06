'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown, Minus, Plus, ArrowRight, CalendarDays, Users } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface BookingBarProps {
  /** 延迟多少毫秒后展开，默认 3500ms（与首页 Hero 动画同步） */
  delayMs?: number;
}

export function BookingBar({ delayMs = 3500 }: BookingBarProps) {
  const t = useTranslations('BookingBar');

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dayNames = ['日', '一', '二', '三', '四', '五', '六'];

  const [isVisible, setIsVisible] = useState(false);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [guestOpen, setGuestOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delayMs);
    return () => clearTimeout(timer);
  }, [delayMs]);

  useEffect(() => {
    if (!guestOpen) return;
    const handler = () => setGuestOpen(false);
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [guestOpen]);

  const fmtShort = (d: Date) =>
    `${d.getMonth() + 1}月${d.getDate()}日 周${dayNames[d.getDay()]}`;

  return (
    <div className="sticky z-40 hidden md:block" style={{ top: 'var(--header-height, 72px)' }}>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key="booking-bar"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{
              height: { type: 'spring', stiffness: 320, damping: 36, mass: 0.8 },
              opacity: { duration: 0.2, ease: 'easeOut' },
            }}
            className="w-full overflow-hidden"
            style={{ willChange: 'height' }}
          >
          <div
      className="relative w-full"
      style={{
        background: 'rgba(255,255,255,0.82)',
        backdropFilter: 'blur(24px) saturate(1.8)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
        boxShadow: '0 4px 30px rgba(0,0,0,0.10)',
      }}
    >
      <div className="mx-auto max-w-350 px-6 py-3.5 md:px-10 md:py-4 lg:px-16">
        <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center md:gap-2.5">
          {/* Check-in */}
          <button className="group flex flex-1 cursor-pointer items-center gap-2.5 rounded-lg border border-black/12 bg-white px-3.5 py-2.5 transition-all duration-200 hover:border-black/25 hover:bg-white">
            <CalendarDays
              size={15}
              className="flex-shrink-0 text-black/40 transition-colors group-hover:text-black/70"
            />
            <div className="flex min-w-0 flex-col items-start">
              <span className="text-[0.55rem] uppercase tracking-[0.2em] text-black/45 leading-none mb-1">
                {t('checkin')}
              </span>
              <span className="text-[0.82rem] font-sans text-black tracking-wide leading-none">
                {fmtShort(today)}
              </span>
            </div>
          </button>

          <div className="hidden w-5 flex-shrink-0 items-center justify-center md:flex">
            <ArrowRight size={12} className="text-black/25" />
          </div>

          {/* Check-out */}
          <button className="group flex flex-1 cursor-pointer items-center gap-2.5 rounded-lg border border-black/12 bg-white px-3.5 py-2.5 transition-all duration-200 hover:border-black/25 hover:bg-white">
            <CalendarDays
              size={15}
              className="flex-shrink-0 text-black/40 transition-colors group-hover:text-black/70"
            />
            <div className="flex min-w-0 flex-col items-start">
              <span className="text-[0.55rem] uppercase tracking-[0.2em] text-black/45 leading-none mb-1">
                {t('checkout')}
              </span>
              <span className="text-[0.82rem] font-sans text-black tracking-wide leading-none">
                {fmtShort(tomorrow)}
              </span>
            </div>
          </button>

          {/* Guests */}
          <div className="relative flex-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setGuestOpen(!guestOpen);
              }}
              className="group flex w-full cursor-pointer items-center gap-2.5 rounded-lg border border-black/12 bg-white px-3.5 py-2.5 transition-all duration-200 hover:border-black/25 hover:bg-white"
            >
              <Users
                size={15}
                className="flex-shrink-0 text-black/40 transition-colors group-hover:text-black/70"
              />
              <div className="flex min-w-0 flex-1 flex-col items-start">
                <span className="text-[0.55rem] uppercase tracking-[0.2em] text-black/45 leading-none mb-1">
                  {t('guests')}
                </span>
                <span className="text-[0.82rem] font-sans text-black tracking-wide leading-none">
                  {rooms} {t('rooms')} · {adults} {t('adults')}
                  {children > 0 ? ` · ${children} ${t('children')}` : ''}
                </span>
              </div>
              <ChevronDown
                size={12}
                className={`flex-shrink-0 text-black/30 transition-transform duration-300 ${guestOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Guest dropdown */}
            {guestOpen && (
              <div
                className="absolute top-full left-0 right-0 z-10 mt-2 space-y-3.5 rounded-xl p-4 shadow-2xl"
                style={{
                  background: 'rgba(255,255,255,0.97)',
                  backdropFilter: 'blur(24px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {[
                  { label: t('rooms'), value: rooms, set: setRooms, min: 1 },
                  { label: t('adults'), value: adults, set: setAdults, min: 1 },
                  { label: t('children'), value: children, set: setChildren, min: 0 },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-[0.7rem] text-black/55 font-sans tracking-wider">
                      {item.label}
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => item.set(Math.max(item.min, item.value - 1))}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-black/5 text-black/40 transition-all hover:bg-black/10 hover:text-black/70"
                      >
                        <Minus size={9} />
                      </button>
                      <span className="w-4 text-center font-sans text-sm text-black tabular-nums">
                        {item.value}
                      </span>
                      <button
                        onClick={() => item.set(item.value + 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-black/5 text-black/40 transition-all hover:bg-black/10 hover:text-black/70"
                      >
                        <Plus size={9} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="flex-shrink-0 md:self-stretch">
            <button
              className="h-full w-full whitespace-nowrap rounded-lg px-6 py-2.5 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.12em] transition-all duration-300"
              style={{
                background: 'var(--color-primary)',
                color: 'white',
                boxShadow: '0 2px 8px rgba(0,51,101,0.3)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  'var(--color-primary-dark)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  '0 4px 16px rgba(0,51,101,0.45)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  'var(--color-primary)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  '0 2px 8px rgba(0,51,101,0.3)';
              }}
            >
              {t('submit')}
            </button>
          </div>
        </div>
      </div>
    </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
