"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { Home, FolderOpen, BookOpen, MessageCircle, Menu, X } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "./theme-toggle";
import LocaleSwitcher from "./locale-switcher";

const navItems = [
  { href: "/", icon: Home, labelKey: "home" },
  { href: "/projects", icon: FolderOpen, labelKey: "projects" },
  { href: "/blog", icon: BookOpen, labelKey: "blog" },
  // { href: "/guestbook", icon: MessageCircle, labelKey: "guestbook" }, // 备案期间暂时隐藏
] as const;

export default function Navbar() {
  const t = useTranslations("nav");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-sketch-stroke/10">
      <nav className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tight">
          <motion.span
            className="inline-block"
            whileHover={{ rotate: -3, scale: 1.05 }}
          >
            LSMX
          </motion.span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden tablet:flex items-center gap-6">
          {navItems.map((item) => (
            <li key={item.labelKey}>
              <Link
                href={item.href}
                className="flex items-center gap-1.5 text-sm hover:text-sketch-accent2 transition-colors"
              >
                <item.icon className="w-4 h-4" />
                {t(item.labelKey)}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggle />
          {/* Mobile menu button */}
          <button
            className="tablet:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="tablet:hidden border-t border-sketch-stroke/10 bg-background/95 backdrop-blur-md"
        >
          <ul className="flex flex-col p-4 gap-3">
            {navItems.map((item) => (
              <li key={item.labelKey}>
                <Link
                  href={item.href}
                  className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-foreground/5 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  {t(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </header>
  );
}
