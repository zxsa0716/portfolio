"use client";

/**
 * SectionHeader — editorial / research-journal section opener.
 * Monospace index (§0X) + kicker, large serif title, hairline rule.
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
      className={`mb-14 ${centered ? "text-center max-w-2xl mx-auto" : "max-w-3xl"}`}
    >
      {/* Index + kicker */}
      <motion.div
        variants={fadeInUp}
        className={`flex items-center gap-3 mb-5 ${centered ? "justify-center" : ""}`}
      >
        <span className="section-index">§{index}</span>
        <span className="w-8 h-px" style={{ background: "rgba(59,130,246,0.45)" }} />
        <span className="section-index" style={{ color: "#64748B", letterSpacing: "0.18em" }}>
          {kicker}
        </span>
      </motion.div>

      {/* Serif title */}
      <motion.h2
        variants={fadeInUp}
        className="font-serif font-normal text-[#F1F5F9] mb-5"
        style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", lineHeight: 1.08 }}
      >
        {title}
      </motion.h2>

      {/* Hairline */}
      <motion.div
        variants={fadeInUp}
        className={centered ? "hairline mx-auto" : "hairline"}
        style={{ maxWidth: centered ? "8rem" : "100%" }}
      />

      {description && (
        <motion.p
          variants={fadeInUp}
          className="text-[#64748B] text-base leading-relaxed mt-5"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
