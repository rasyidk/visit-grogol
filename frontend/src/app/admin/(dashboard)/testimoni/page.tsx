"use client";

import { ResourceManager } from "@/components/admin/ResourceManager";
import { testimoniConfig } from "@/lib/adminResources";

export default function Page() {
  return <ResourceManager config={testimoniConfig} />;
}
