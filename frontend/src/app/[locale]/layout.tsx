import type { Metadata } from 'next';
import { Outfit, Poppins } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/providers/QueryProvider';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Visit Grogol Kaloka — Kembali ke Alam & Tradisi',
    template: '%s · Visit Grogol Kaloka',
  },
  description:
    'Desa wisata premium yang memadukan keindahan alam, warisan budaya, dan kenyamanan modern di jantung nusantara.',
  keywords: ['desa wisata', 'pariwisata', 'Visit Grogol Kaloka', 'alam', 'budaya', 'kuliner'],
};

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export function generateStaticParams() {
  return [{ locale: 'id' }, { locale: 'en' }];
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${outfit.variable} ${poppins.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>{children}</QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
