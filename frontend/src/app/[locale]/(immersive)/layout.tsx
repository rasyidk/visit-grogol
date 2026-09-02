import { Navbar } from '@/components/layout/Navbar';

export default function ImmersiveLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-[100dvh] overflow-hidden">
      <Navbar />
      <main className="flex-1 relative overflow-hidden">{children}</main>
    </div>
  );
}
