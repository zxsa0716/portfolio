import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "blue" | "emerald" | "amber" | "red" | "ghost";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  /** Small dot indicator on the left */
  dot?: boolean;
  /** Prefix icon element */
  icon?: React.ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-[rgba(17,29,54,0.9)] border-[#1E2D4A] text-[#94A3B8]",
  blue:    "bg-[rgba(37,99,235,0.12)] border-[rgba(59,130,246,0.25)] text-[#60A5FA]",
  emerald: "bg-[rgba(5,150,105,0.12)] border-[rgba(16,185,129,0.25)] text-[#34D399]",
  amber:   "bg-[rgba(245,158,11,0.10)] border-[rgba(245,158,11,0.25)] text-[#FCD34D]",
  red:     "bg-[rgba(239,68,68,0.10)] border-[rgba(239,68,68,0.25)] text-[#FCA5A5]",
  ghost:   "bg-transparent border-transparent text-[#64748B] px-0",
};

/**
 * Compact label badge for tech stack tags, categories, and status indicators.
 * Follows the design system color palette (no purple/pink).
 */
export function Badge({ children, variant = "default", className, dot, icon }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium leading-none border",
        variantClasses[variant],
        className,
      )}
    >
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full shrink-0",
            variant === "emerald" ? "bg-emerald-400"
            : variant === "amber"   ? "bg-amber-400"
            : variant === "red"     ? "bg-red-400"
            : "bg-blue-400",
          )}
        />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}

/* ─── TechBadge convenience wrapper ─── */
interface TechBadgeProps {
  tech: string;
  className?: string;
}

/**
 * Small monospace tech stack label — used inside ProjectCard.
 */
export function TechBadge({ tech, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-block px-2 py-0.5 rounded-md font-mono text-[11px]",
        "bg-[rgba(17,29,54,0.85)] border border-white/10 text-[#94A3B8]",
        className,
      )}
    >
      {tech}
    </span>
  );
}
