"use client";

import { useTranslations } from "next-intl";
import { Globe, ExternalLink, Mail } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-sketch-stroke/10 py-8 mt-16">
      <div className="max-w-5xl mx-auto px-4 flex flex-col tablet:flex-row items-center justify-between gap-4 text-sm text-[var(--muted)]">
        <p>
          © {year} LSMX · {t("builtWith")}
        </p>
        <div className="flex items-center gap-4">
          <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-foreground transition-colors">
            <Globe className="w-5 h-5" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="hover:text-foreground transition-colors">
            <ExternalLink className="w-5 h-5" />
          </a>
          <a href="mailto:hello@example.com" aria-label="Email" className="hover:text-foreground transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
