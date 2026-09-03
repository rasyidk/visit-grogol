'use client';

import { ResourceManager } from '@/components/admin/ResourceManager';
import { budayaConfig } from '@/lib/adminResources';

export default function ManajemenBudayaPage() {
  return (
    <div>
      <ResourceManager config={budayaConfig} />
    </div>
  );
}
