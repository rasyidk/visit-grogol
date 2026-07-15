"use client";

import { ResourceManager } from "@/components/admin/ResourceManager";
import { destinasiConfig } from "@/lib/adminResources";

export default function Page() {
  return <ResourceManager config={destinasiConfig} />;
}
