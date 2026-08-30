"use client";

import { ResourceManager } from "@/components/admin/ResourceManager";
import { galeriVideoConfig } from "@/lib/adminResources";

export default function Page() {
  return <ResourceManager config={galeriVideoConfig} />;
}
