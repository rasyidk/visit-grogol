"use client";

import { SingletonManager } from "@/components/admin/SingletonManager";
import { profilConfig } from "@/lib/singletonConfigs";

export default function Page() {
  return <SingletonManager config={profilConfig} />;
}
