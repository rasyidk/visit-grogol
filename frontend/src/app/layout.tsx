import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/providers/QueryProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'VisitGrogol — Kembali ke Alam & Tradisi',
    template: '%s · VisitGrogol',
  },
  description:
    'Desa wisata premium yang memadukan keindahan alam, warisan budaya, dan kenyamanan modern di jantung nusantara.',
  keywords: ['desa wisata', 'pariwisata', 'VisitGrogol', 'alam', 'budaya', 'kuliner'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
