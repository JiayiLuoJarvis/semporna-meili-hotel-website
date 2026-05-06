

import LocationSubNav from '@/components/location/LocationSubNav';
import LocationCulture from '@/components/location/LocationCulture';
import LocationArrival from '@/components/location/LocationArrival';
import LocationCTA from '@/components/location/LocationCTA';
import { BookingBar } from '@/components/home/BookingBar';

export default function LocationPage() {
  return (
    <main className="w-full flex-1">
      <LocationSubNav />
      <BookingBar delayMs={2000} />
      <LocationCulture />
      <LocationArrival />
      <LocationCTA />
    </main>
  );
}
