import { Hero } from '@/components/home/Hero';
import { BookingBar } from '@/components/home/BookingBar';
import { HotelIntro } from '@/components/home/HotelIntro';
import { VillasAndSuites } from '@/components/home/VillasAndSuites';
import { Storytelling } from '@/components/home/Storytelling';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <main className="relative w-full grow" style={{ backgroundColor: 'var(--color-cream)' }}>
      {/* 1. Hero 视频大图 */}
      <Hero />

      {/* 2. BookingBar — sticky，顶部贴紧 header 后固定，只在 md+ 显示 */}
      <BookingBar />

      {/* 3. 酒店介绍 */}
      <HotelIntro />

      {/* 3. 别墅与套房 */}
      <VillasAndSuites />

      {/* 4. 优惠精选 */}
      {/* <SpecialOffers /> */}

      {/* 5. 品牌故事引言 */}
      <Storytelling />
    </main>
  );
}
