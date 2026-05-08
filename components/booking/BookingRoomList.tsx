import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { BookingRoomCard } from './BookingRoomCard';

type Tab = 'all' | 'waterVillas' | 'signatureVillas';
const VALID_TABS: Tab[] = ['all', 'waterVillas', 'signatureVillas'];

interface Props {
  tab: Tab;
}

export function BookingRoomList({ tab }: Props) {
  const tBooking = useTranslations('BookingPage');

  const activeTab: Tab = VALID_TABS.includes(tab) ? tab : 'all';

  const allRooms = [
    { id: 0, category: 'waterVillas', size: '150 ㎡', capacity: '2', bedding: '1 King Bed' },
    { id: 1, category: 'signatureVillas', size: '220 ㎡', capacity: '4', bedding: '1 King Bed, 2 Twin Beds' },
    { id: 2, category: 'signatureVillas', size: '250 ㎡', capacity: '2', bedding: '1 King Bed' },
    { id: 3, category: 'waterVillas', size: '180 ㎡', capacity: '2', bedding: '1 King Bed' },
    { id: 4, category: 'signatureVillas', size: '400 ㎡', capacity: '6', bedding: '3 King Beds' },
  ];

  const filteredRooms = activeTab === 'all'
    ? allRooms
    : allRooms.filter(room => room.category === activeTab);

  const tabs: { id: Tab; label: string; href: string }[] = [
    { id: 'all', label: tBooking('tabs.all'), href: '/booking/all' },
    { id: 'waterVillas', label: tBooking('tabs.waterVillas'), href: '/booking/waterVillas' },
    { id: 'signatureVillas', label: tBooking('tabs.signatureVillas'), href: '/booking/signatureVillas' },
  ];

  return (
    <section className="bg-background py-20 sm:py-28 md:py-36 px-page">
      <div className="max-w-4xl mx-auto">
        {/* Tabs — left-aligned, pipe separators */}
        <nav className="flex items-center mb-14 md:mb-20">
          {tabs.flatMap((tabItem, i, arr) => {
            const link = (
              <Link
                key={tabItem.id}
                href={tabItem.href as '/booking'}
                className={cn(
                  "text-sm uppercase tracking-[0.15em] transition-colors duration-300 font-sans",
                  activeTab === tabItem.id
                    ? "text-[--color-section-text] border-b border-gold pb-px"
                    : "text-[--color-warm-text] hover:text-[--color-section-text]"
                )}
              >
                {tabItem.label}
              </Link>
            );
            if (i < arr.length - 1) {
              return [link, <span key={`sep-${i}`} className="mx-5 h-3 w-px bg-border/60 self-center" aria-hidden="true" />];
            }
            return [link];
          })}
        </nav>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {filteredRooms.map((room) => (
            <BookingRoomCard
              key={room.id}
              index={room.id}
              size={room.size}
              capacity={room.capacity}
              bedding={room.bedding}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
