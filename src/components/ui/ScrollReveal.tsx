"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeInUp, viewportConfig } from "@/lib/animations";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Custom Framer Motion variants. Defaults to fadeInUp. */
  variants?: Variants;
  /** Delay before animation starts (seconds). */
  delay?: number;
  /** Disable the reveal (render children normally). */
  disabled?: boolean;
}

/**
 * Wraps any content in a motion.div that fades in when it enters the viewport.
 * Uses Intersection Observer via Framer Motion's `whileInView`.
 */
export function ScrollReveal({
  children,
  className,
  variants = fadeInUp,
  delay = 0,
  disabled = false,
}: ScrollRevealProps) {
  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className={cn(className)}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}
