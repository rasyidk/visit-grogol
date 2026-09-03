'use client';

import { ResourceManager } from '@/components/admin/ResourceManager';
import { kulinerConfig } from '@/lib/adminResources';

export default function AdminKulinerPage() {
  return <ResourceManager config={kulinerConfig} />;
}
