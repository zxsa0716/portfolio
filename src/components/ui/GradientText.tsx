"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  /** Gradient direction. Default: "right" */
  direction?: "right" | "diagonal" | "radial";
  /** Preset palettes (all blue/cyan/emerald — no purple/pink) */
  variant?: "blue" | "cyan" | "emerald" | "blue-emerald";
  className?: string;
  /** Animate the gradient position on mount */
  animate?: boolean;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}

const gradients: Record<NonNullable<GradientTextProps["variant"]>, string> = {
  blue:         "from-blue-400 to-blue-200",
  cyan:         "from-blue-400 to-cyan-300",
  emerald:      "from-emerald-400 to-cyan-300",
  "blue-emerald": "from-blue-400 via-cyan-300 to-emerald-400",
};

export function GradientText({
  children,
  direction = "right",
  variant = "blue",
  className,
  animate = false,
  as: Tag = "span",
}: GradientTextProps) {
  const dirClass =
    direction === "diagonal" ? "bg-gradient-to-br"
    : direction === "radial"  ? "bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))]"
    : "bg-gradient-to-r";

  const base = cn(
    "bg-clip-text text-transparent",
    dirClass,
    gradients[variant],
    className,
  );

  if (animate) {
    return (
      <motion.span
        className={base}
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "200% 200%" }}
      >
        {children}
      </motion.span>
    );
  }

  return <Tag className={base}>{children}</Tag>;
}
