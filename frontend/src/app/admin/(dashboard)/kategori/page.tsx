"use client";

import { ResourceManager } from "@/components/admin/ResourceManager";
import { kategoriConfig } from "@/lib/adminResources";

export default function Page() {
  return <ResourceManager config={kategoriConfig} />;
}
