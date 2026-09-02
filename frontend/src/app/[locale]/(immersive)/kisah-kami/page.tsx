import { JejakWaktu } from '@/components/history/JejakWaktu';

export const metadata = {
  title: 'Kisah Kami | Visit Grogol Kaloka',
  description: 'Jejak sejarah Grogol dari tahun 1916 hingga hari ini.',
};

export default function KisahKamiPage() {
  return (
    <main className="w-full bg-cream min-h-screen">
      <JejakWaktu />
    </main>
  );
}
