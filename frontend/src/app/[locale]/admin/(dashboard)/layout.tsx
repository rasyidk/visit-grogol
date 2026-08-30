'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/admin/Sidebar';
import { Topbar } from '@/components/admin/Topbar';
import { Spinner } from '@/components/ui/Misc';
import { useCurrentUser } from '@/hooks/useAuth';
import { tokenStore } from '@/lib/api';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const { isError, isLoading } = useCurrentUser();

  useEffect(() => {
    if (!tokenStore.get()) {
      router.replace('/admin/login');
      return;
    }
    setChecked(true);
  }, [router]);

  useEffect(() => {
    if (isError) router.replace('/admin/login');
  }, [isError, router]);

  if (!checked || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-72">
        <Topbar onMenu={() => setSidebarOpen(true)} />
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
