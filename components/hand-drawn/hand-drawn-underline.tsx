"use client";

import { useEffect, useState } from "react";
import rough from "roughjs";
import { motion } from "framer-motion";

interface HandDrawnUnderlineProps {
  width?: number;
  color?: string;
  seed?: number;
  className?: string;
}

function generateLinePaths(width: number, seed: number): string[] {
  if (typeof document === "undefined") return [];
  const tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const rc = rough.svg(tempSvg);
  const line = rc.line(0, 8, width, 8, {
    seed,
    roughness: 2,
    stroke: "black",
    strokeWidth: 3,
    bowing: 3,
  });
  const pathList: string[] = [];
  line.querySelectorAll("path").forEach((p) => {
    const d = p.getAttribute("d");
    if (d) pathList.push(d);
  });
  return pathList;
}

export default function HandDrawnUnderline({
  width = 200,
  color,
  seed = 99,
  className = "",
}: HandDrawnUnderlineProps) {
  const [paths, setPaths] = useState<string[]>([]);

  useEffect(() => {
    setPaths(generateLinePaths(width, seed));
  }, [width, seed]);

  return (
    <svg
      width={width}
      height={16}
      className={className}
    >
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke={color || "var(--sketch-accent1)"}
          strokeWidth={3}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 + i * 0.1 }}
        />
      ))}
    </svg>
  );
}
