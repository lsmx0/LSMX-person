"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { HandDrawnCard, HandDrawnUnderline } from "@/components/hand-drawn";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function HomePage() {
  const t = useTranslations("home");

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 tablet:py-24">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center text-center gap-8"
      >
        {/* Greeting */}
        <motion.div variants={item} className="space-y-2">
          <p className="text-lg text-[var(--muted)]">{t("greeting")}</p>
          <h1 className="text-6xl tablet:text-8xl font-bold tracking-tight">
            {t("name")}
          </h1>
          <HandDrawnUnderline width={280} seed={7} className="mx-auto mt-2" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={item}
          className="text-xl tablet:text-2xl text-[var(--muted)] max-w-lg text-balance"
        >
          {t("tagline")}
        </motion.p>

        {/* Sketch doodle */}
        <motion.div variants={item}>
          <Sparkles className="w-12 h-12 text-sketch-accent2 mx-auto" />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={item} className="flex flex-col tablet:flex-row gap-4">
          <Link href="/projects">
            <HandDrawnCard seed={101} className="px-2 py-1 cursor-pointer">
              <span className="flex items-center gap-2 text-lg">
                {t("viewProjects")}
                <ArrowRight className="w-4 h-4" />
              </span>
            </HandDrawnCard>
          </Link>
          <Link href="/blog">
            <HandDrawnCard seed={102} className="px-2 py-1 cursor-pointer">
              <span className="flex items-center gap-2 text-lg">
                {t("readBlog")}
                <ArrowRight className="w-4 h-4" />
              </span>
            </HandDrawnCard>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
