"use client";

import { ResourceManager } from "@/components/admin/ResourceManager";
import { bannerConfig } from "@/lib/adminResources";

export default function Page() {
  return <ResourceManager config={bannerConfig} />;
}
