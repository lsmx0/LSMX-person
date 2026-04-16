"use client";

import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { HandDrawnCard } from "./hand-drawn";
import { ArrowRight } from "lucide-react";
import type { PostMeta } from "@/lib/mdx";

const accentColors = [
  "var(--sketch-accent2)",
  "var(--sketch-accent3)",
  "var(--sketch-accent1)",
];

export default function BlogCard({
  post,
  index,
}: {
  post: PostMeta;
  index: number;
}) {
  const color = accentColors[index % accentColors.length];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/blog/${post.slug}`}>
        <HandDrawnCard seed={400 + index} strokeColor={color} className="cursor-pointer bg-[var(--card-bg)]">
          <div className="flex flex-col tablet:flex-row tablet:items-center tablet:justify-between gap-2">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">{post.title}</h3>
              <p className="text-sm text-[var(--muted)]">{post.description}</p>
            </div>
            <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
              <time>{post.date}</time>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 border border-sketch-stroke/30 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </HandDrawnCard>
      </Link>
    </motion.div>
  );
}
