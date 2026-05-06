"use client";

import { useTranslations } from "next-intl";
import { Mail, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();
  const [showQQ, setShowQQ] = useState(false);
  const [showWechat, setShowWechat] = useState(false);

  return (
    <footer className="border-t border-sketch-stroke/10 py-8 mt-16">
      <div className="max-w-5xl mx-auto px-4 flex flex-col items-center gap-4 text-sm text-[var(--muted)]">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="mailto:lsmx_0@163.com" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
            <Mail className="w-4 h-4" />
            <span>lsmx_0@163.com</span>
          </a>
          <button
            onClick={() => setShowQQ(!showQQ)}
            className="flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{showQQ ? "1286962598" : "QQ"}</span>
          </button>
          <button
            onClick={() => setShowWechat(!showWechat)}
            className="flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.045c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.946-7.062-6.122zM14.48 13.01c.533 0 .966.44.966.982a.975.975 0 0 1-.966.981.975.975 0 0 1-.966-.981c0-.542.433-.982.966-.982zm4.832 0c.533 0 .966.44.966.982a.975.975 0 0 1-.966.981.975.975 0 0 1-.966-.981c0-.542.433-.982.966-.982z"/></svg>
            <span>{showWechat ? "LSMX_1" : "WeChat"}</span>
          </button>
        </div>
        <p>
          © {year} LSMX · {t("builtWith")}
        </p>
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          豫ICP备2026002727号-2
        </a>
      </div>
    </footer>
  );
}
