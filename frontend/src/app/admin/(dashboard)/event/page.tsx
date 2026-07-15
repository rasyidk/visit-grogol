"use client";

import { ResourceManager } from "@/components/admin/ResourceManager";
import { eventConfig } from "@/lib/adminResources";

export default function Page() {
  return <ResourceManager config={eventConfig} />;
}
