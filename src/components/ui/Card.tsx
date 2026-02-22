"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type CardVariant = "default" | "glass" | "raised" | "bordered";

interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  variant?: CardVariant;
  /** Add a subtle blue glow on hover */
  glow?: boolean;
  /** Lift on hover (translateY) */
  lift?: boolean;
  className?: string;
  as?: "div" | "article" | "section";
}

const variantClasses: Record<CardVariant, string> = {
  default:  "bg-[#0C1426] border border-[#1E2D4A]",
  glass:    "bg-[rgba(12,20,38,0.70)] backdrop-blur-[20px] saturate-150 border border-[rgba(255,255,255,0.06)]",
  raised:   "bg-[#111D36] border border-[rgba(255,255,255,0.08)]",
  bordered: "bg-transparent border border-[rgba(255,255,255,0.10)]",
};

/**
 * Glassmorphism project card with optional glow and lift effects.
 * All colors follow the deep navy design system — no purple/pink.
 */
export function Card({
  children,
  variant = "default",
  glow = false,
  lift = true,
  className,
  as: Tag = "div",
  ...motionProps
}: CardProps) {
  return (
    <motion.div
      whileHover={
        lift
          ? {
              y: -6,
              borderColor: glow
                ? "rgba(59,130,246,0.40)"
                : "rgba(255,255,255,0.14)",
              boxShadow: glow
                ? "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(59,130,246,0.12)"
                : "0 8px 32px rgba(0,0,0,0.4)",
              transition: { duration: 0.25 },
            }
          : undefined
      }
      className={cn(
        "rounded-[14px] p-6 transition-colors duration-200",
        variantClasses[variant],
        className,
      )}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

/* ─── StatCard convenience component ─── */
interface StatCardProps {
  value: string;
  label: string;
  sub?: string;
  accent?: "blue" | "emerald";
  className?: string;
}

/**
 * Hero section stat block (e.g. "R² 0.9681 / XAI 모델 성능").
 */
export function StatCard({ value, label, sub, accent = "blue", className }: StatCardProps) {
  const valueColor = accent === "emerald" ? "text-emerald-400" : "text-blue-400";

  return (
    <Card variant="glass" lift glow className={cn("text-center", className)}>
      <p className={cn("font-display font-bold text-2xl leading-none mb-1", valueColor)}>
        {value}
      </p>
      <p className="text-[#F1F5F9] text-sm font-medium leading-snug">{label}</p>
      {sub && <p className="text-[#64748B] text-xs mt-0.5">{sub}</p>}
    </Card>
  );
}
