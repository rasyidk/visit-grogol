'use client';

import { ResourceManager } from '@/components/admin/ResourceManager';
import { socialMediaConfig } from '@/lib/adminResources';

export default function Page() {
  return <ResourceManager config={socialMediaConfig} />;
}
