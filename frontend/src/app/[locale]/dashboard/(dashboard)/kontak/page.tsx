"use client";

import { SingletonManager } from "@/components/admin/SingletonManager";
import { kontakConfig } from "@/lib/singletonConfigs";

export default function Page() {
  return <SingletonManager config={kontakConfig} />;
}
