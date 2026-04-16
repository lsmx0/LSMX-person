"use client";

import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-foreground transition-colors"
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </Link>
  );
}
