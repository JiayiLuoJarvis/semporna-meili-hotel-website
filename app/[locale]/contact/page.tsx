import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import ContactHero from '@/components/contact/ContactHero';
import ContactForm from '@/components/contact/ContactForm';
import ContactFAQ from '@/components/contact/ContactFAQ';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PageMeta' });
  return {
    title: t('contact.title') || 'Contact Us | Meili Resort',
    description: t('contact.description') || 'Get in touch with Meili Resort Semporna.',
  };
}

export default function ContactPage() {
  return (
    <main className="w-full flex-1 pt-17 sm:pt-20 lg:pt-21">
      <ContactHero />
      <ContactForm />
      <ContactFAQ />
    </main>
  );
}