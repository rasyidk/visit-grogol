import type { Metadata } from 'next';
import { Outfit, Poppins } from 'next/font/google';
import Script from 'next/script';
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
    'Kembali ke Alam & Tradisi. Desa wisata premium yang memadukan keindahan alam, warisan budaya, dan kenyamanan modern di jantung nusantara.',
  applicationName: 'Visit Grogol Kaloka',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
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
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-ZHC78J1HNC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-ZHC78J1HNC');`}
        </Script>
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>{children}</QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
