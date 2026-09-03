'use client';

import { ResourceManager } from '@/components/admin/ResourceManager';
import { umkmConfig } from '@/lib/adminResources';

export default function AdminUmkmPage() {
  return <ResourceManager config={umkmConfig} />;
}
