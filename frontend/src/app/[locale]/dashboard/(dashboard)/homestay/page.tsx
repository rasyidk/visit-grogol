'use client';

import { ResourceManager } from '@/components/admin/ResourceManager';
import { homestayConfig } from '@/lib/adminResources';

export default function AdminHomestayPage() {
  return <ResourceManager config={homestayConfig} />;
}
