"use client";

import { ResourceManager } from "@/components/admin/ResourceManager";
import { reservasiConfig } from "@/lib/adminResources";

export default function Page() {
  return <ResourceManager config={reservasiConfig} />;
}
