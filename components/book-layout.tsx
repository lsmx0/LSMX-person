"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "@/i18n/navigation";

interface BookLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export default function BookLayout({ left, right }: BookLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="hidden tablet:flex desktop:hidden min-h-[calc(100vh-8rem)] items-stretch">
      {/* Left page */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`left-${pathname}`}
          className="flex-1 border-r border-sketch-stroke/10 p-8 overflow-y-auto"
          initial={{ rotateY: -15, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: 15, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{ perspective: 1000 }}
        >
          {left}
        </motion.div>
      </AnimatePresence>

      {/* Spine shadow */}
      <div className="w-px bg-gradient-to-b from-transparent via-sketch-stroke/20 to-transparent" />

      {/* Right page */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`right-${pathname}`}
          className="flex-1 p-8 overflow-y-auto"
          initial={{ rotateY: 15, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: -15, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut", delay: 0.1 }}
          style={{ perspective: 1000 }}
        >
          {right}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
