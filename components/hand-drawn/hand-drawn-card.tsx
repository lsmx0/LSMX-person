"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import rough from "roughjs";
import { motion } from "framer-motion";

interface HandDrawnCardProps {
  children: React.ReactNode;
  seed?: number;
  strokeColor?: string;
  roughness?: number;
  className?: string;
  hoverEffect?: boolean;
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

function generateRoughPaths(
  width: number,
  height: number,
  seed: number,
  roughness: number
): string[] {
  if (typeof document === "undefined" || width === 0) return [];
  const tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const rc = rough.svg(tempSvg);
  const padding = 4;
  const rect = rc.rectangle(padding, padding, width - padding * 2, height - padding * 2, {
    seed,
    roughness,
    stroke: "black",
    strokeWidth: 2,
    fill: "none",
    bowing: 2,
  });
  const allPaths = rect.querySelectorAll("path");
  // rough.js generates: [fill path (long), outline path (short)]
  // We only want the outline path (the last one)
  const outlinePath = allPaths[allPaths.length - 1];
  const d = outlinePath?.getAttribute("d");
  return d ? [d] : [];
}

export default function HandDrawnCard({
  children,
  seed,
  strokeColor,
  roughness = 1.5,
  className = "",
  hoverEffect = true,
}: HandDrawnCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [paths, setPaths] = useState<string[]>([]);
  const stableSeed = useRef(seed ?? hashString(Math.random().toString()));

  const measure = useCallback(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setDimensions((prev) => {
        if (prev.width === offsetWidth && prev.height === offsetHeight) return prev;
        return { width: offsetWidth, height: offsetHeight };
      });
    }
  }, []);

  useEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [measure]);

  useEffect(() => {
    if (dimensions.width === 0) return;
    const result = generateRoughPaths(
      dimensions.width,
      dimensions.height,
      stableSeed.current,
      roughness
    );
    setPaths(result);
  }, [dimensions, roughness]);

  return (
    <motion.div
      ref={containerRef}
      className={`relative ${className}`}
      whileHover={hoverEffect ? { scale: 1.02, rotate: -0.5 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="relative p-6">{children}</div>
      <svg
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0 pointer-events-none z-20"
        style={{ overflow: "visible" }}
      >
        {paths.map((d, i) => (
          <motion.path
            key={`${dimensions.width}-${i}`}
            d={d}
            fill="none"
            stroke={strokeColor || "var(--sketch-stroke)"}
            strokeWidth={2.5}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: i * 0.15 }}
          />
        ))}
      </svg>
    </motion.div>
  );
}
