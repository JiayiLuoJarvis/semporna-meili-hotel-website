'use client';

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageHeroShellProps {
  children: ReactNode;
  className?: string;
}

/**
 * 所有非首页的 page header 共用外壳。
 * 自动感知 BookingBar 展开高度（--booking-bar-h），动态追加 padding-top，
 * 防止 fixed BookingBar 遮挡标题文字。
 */
export function PageHeroShell({ children, className }: PageHeroShellProps) {
  return (
    <div
      className={cn(
        'bg-primary w-full px-page pb-12 text-white text-center flex flex-col items-center transition-[padding-top] duration-500',
        className,
      )}
      style={{ paddingTop: 'calc(7rem + var(--booking-bar-h, 0px))' }}
    >
      {children}
    </div>
  );
}
