"use client";

import { ResourceManager } from "@/components/admin/ResourceManager";
import { penggunaConfig } from "@/lib/adminResources";

export default function Page() {
  return <ResourceManager config={penggunaConfig} />;
}
