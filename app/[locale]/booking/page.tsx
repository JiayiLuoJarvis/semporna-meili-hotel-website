import { redirect } from 'next/navigation';
export default async function BookingPage() {
  // 重定向
  redirect('/booking/all');
}
