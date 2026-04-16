"use client";

import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { HandDrawnCard } from "./hand-drawn";
import type { PostMeta } from "@/lib/mdx";

const accentColors = [
  "var(--sketch-accent1)",
  "var(--sketch-accent2)",
  "var(--sketch-accent3)",
];

export default function ProjectCard({
  project,
  index,
}: {
  project: PostMeta;
  index: number;
}) {
  const color = accentColors[index % accentColors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/projects/${project.slug}`}>
        <HandDrawnCard seed={300 + index} strokeColor={color} className="cursor-pointer bg-[var(--card-bg)]">
          {/* Cover preview */}
          {project.cover && (
            <div className="mb-4 rounded overflow-hidden aspect-video bg-sketch-fill/30">
              {project.cover.endsWith(".mp4") || project.cover.endsWith(".webm") ? (
                <video
                  src={project.cover}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={project.cover}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              )}
            </div>
          )}
          <h3 className="text-xl font-bold mb-1">{project.title}</h3>
          <p className="text-sm text-[var(--muted)] mb-3">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags?.map((tag) => (
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
