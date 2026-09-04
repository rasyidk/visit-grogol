'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/admin/Sidebar';
import { Topbar } from '@/components/admin/Topbar';
import { Spinner } from '@/components/ui/Misc';
import { useCurrentUser } from '@/hooks/useAuth';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isError, isLoading } = useCurrentUser();

  useEffect(() => {
    setMounted(true);
    // Jika tidak ada token di storage saat mounted, paksa redirect ke login
    if (typeof window !== 'undefined' && !localStorage.getItem('access_token')) {
      router.replace('/dashboard/login');
    } else if (isError) {
      router.replace('/dashboard/login');
    }
  }, [isError, router]);

  if (!mounted || isLoading || isError || (typeof window !== 'undefined' && !localStorage.getItem('access_token'))) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Spinner className="h-8 w-8 text-brand-600" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 text-ink">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col transition-all lg:pl-72">
        <Topbar onMenu={() => setSidebarOpen(true)} />
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
