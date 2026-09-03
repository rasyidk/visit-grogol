'use client';

import { ResourceManager } from '@/components/admin/ResourceManager';
import { wisataConfig } from '@/lib/adminResources';

export default function ManajemenWisataPage() {
  return (
    <div>
      <ResourceManager config={wisataConfig} />
    </div>
  );
}
