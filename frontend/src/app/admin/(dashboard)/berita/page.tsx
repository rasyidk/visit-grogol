"use client";

import { ResourceManager } from "@/components/admin/ResourceManager";
import { beritaConfig } from "@/lib/adminResources";

export default function Page() {
  return <ResourceManager config={beritaConfig} />;
}
