"use client";

import { ResourceManager } from "@/components/admin/ResourceManager";
import { newsletterConfig } from "@/lib/adminResources";

export default function Page() {
  return <ResourceManager config={newsletterConfig} />;
}
