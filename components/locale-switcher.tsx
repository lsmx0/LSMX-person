"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Languages } from "lucide-react";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const nextLocale = locale === "zh" ? "en" : "zh";
  const label = locale === "zh" ? "EN" : "中";

  function handleSwitch() {
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <button
      onClick={handleSwitch}
      className="flex items-center gap-1 px-2 py-1 text-sm rounded-full hover:bg-foreground/10 transition-colors"
      aria-label="Switch language"
    >
      <Languages className="w-4 h-4" />
      <span className="font-medium">{label}</span>
    </button>
  );
}
