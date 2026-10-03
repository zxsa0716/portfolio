"use client";

/**
 * SectionHeader — the opener of a journal section.
 * Mono index (§0X) + kicker on one rule, serif title beneath, hairline, standfirst.
 */

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";

interface SectionHeaderProps {
  index: string;        // "01"
  kicker: string;       // short EN/KO label, e.g. "Publications"
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
}

export default function SectionHeader({
  index,
  kicker,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className={`mb-12 ${centered ? "text-center max-w-2xl mx-auto" : "max-w-3xl"}`}
    >
      {/* Index + kicker */}
      <motion.div
        variants={fadeInUp}
        className={`flex items-center gap-3 mb-4 ${centered ? "justify-center" : ""}`}
      >
        <span className="section-index">§{index}</span>
        <span className="w-7 h-px" style={{ background: "var(--accent-line)" }} />
        <span className="label">{kicker}</span>
      </motion.div>

      {/* Serif title */}
      <motion.h2
        variants={fadeInUp}
        className="font-serif mb-5"
        style={{
          fontSize: "clamp(1.875rem, 4vw, 2.875rem)",
          lineHeight: 1.1,
          fontWeight: 500,
          color: "var(--ink)",
        }}
      >
        {title}
      </motion.h2>

      {/* Hairline */}
      <motion.div
        variants={fadeInUp}
        className={centered ? "hairline mx-auto" : "hairline"}
        style={{ maxWidth: centered ? "7rem" : "100%" }}
      />

      {description && (
        <motion.p
          variants={fadeInUp}
          className="measure-text mt-5"
          style={{ color: "var(--muted)", fontSize: "0.9375rem" }}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
