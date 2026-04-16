"use client";

import { useEffect, useState } from "react";
import rough from "roughjs";
import { motion } from "framer-motion";

interface HandDrawnBorderProps {
  width: number;
  height: number;
  seed?: number;
  strokeColor?: string;
  strokeWidth?: number;
  roughness?: number;
  animate?: boolean;
  className?: string;
}

function generateBorderPath(
  width: number,
  height: number,
  seed: number,
  roughness: number,
  strokeWidth: number
): string | null {
  if (typeof document === "undefined" || width === 0) return null;
  const tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const rc = rough.svg(tempSvg);
  const padding = strokeWidth + 2;
  const rect = rc.rectangle(padding, padding, width - padding * 2, height - padding * 2, {
    seed,
    roughness,
    stroke: "black",
    strokeWidth,
    fill: "none",
    bowing: 2,
  });
  const allPaths = rect.querySelectorAll("path");
  const outlinePath = allPaths[allPaths.length - 1];
  return outlinePath?.getAttribute("d") || null;
}

export default function HandDrawnBorder({
  width,
  height,
  seed = 42,
  strokeColor,
  roughness = 1.5,
  strokeWidth = 2,
  animate = true,
  className = "",
}: HandDrawnBorderProps) {
  const [pathData, setPathData] = useState<string | null>(null);

  useEffect(() => {
    setPathData(generateBorderPath(width, height, seed, roughness, strokeWidth));
  }, [width, height, seed, roughness, strokeWidth]);

  return (
    <svg
      width={width}
      height={height}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ overflow: "visible" }}
    >
      {pathData && animate ? (
        <motion.path
          d={pathData}
          fill="none"
          stroke={strokeColor || "var(--sketch-stroke)"}
          strokeWidth={strokeWidth}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      ) : pathData ? (
        <path
          d={pathData}
          fill="none"
          stroke={strokeColor || "var(--sketch-stroke)"}
          strokeWidth={strokeWidth}
        />
      ) : null}
    </svg>
  );
}
