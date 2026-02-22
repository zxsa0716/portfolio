"use client";

/**
 * TypeWriter — cycles through tech keywords with a blinking cursor.
 * All phrases come from real research/project work.
 */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const PHRASES = [
  "climate models",
  "GNN systems",
  "spatial AI tools",
  "XAI pipelines",
  "urban risk maps",
];

const TYPE_MS  = 88;   // ms per character typed
const DEL_MS   = 40;   // ms per character deleted
const HOLD_MS  = 2600; // pause after full word
const GAP_MS   = 380;  // pause before next word starts

export function TypeWriter() {
  const [displayed, setDisplayed] = useState("");
  const wordIdxRef  = useRef(0);
  const deletingRef = useRef(false);
  const timerRef    = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    function tick() {
      const phrase = PHRASES[wordIdxRef.current % PHRASES.length];

      if (!deletingRef.current) {
        // ── Typing forward ──────────────────────────
        setDisplayed((prev) => {
          const next = phrase.slice(0, prev.length + 1);
          if (next === phrase) {
            // Word complete — wait, then delete
            timerRef.current = setTimeout(() => {
              deletingRef.current = true;
              tick();
            }, HOLD_MS);
          } else {
            timerRef.current = setTimeout(tick, TYPE_MS);
          }
          return next;
        });
      } else {
        // ── Deleting ────────────────────────────────
        setDisplayed((prev) => {
          const next = prev.slice(0, -1);
          if (next === "") {
            // Empty — move to next word and start typing
            timerRef.current = setTimeout(() => {
              wordIdxRef.current += 1;
              deletingRef.current = false;
              tick();
            }, GAP_MS);
          } else {
            timerRef.current = setTimeout(tick, DEL_MS);
          }
          return next;
        });
      }
    }

    // Kick off with a short initial delay
    timerRef.current = setTimeout(tick, 900);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span className="inline-flex items-baseline gap-0.5">
      <span className="text-blue-400 font-semibold">{displayed}</span>
      {/* Blinking cursor */}
      <motion.span
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ duration: 0.9, repeat: Infinity, times: [0, 0.45, 0.5, 0.95] }}
        className="text-blue-300 font-light select-none"
        aria-hidden
      >
        |
      </motion.span>
    </span>
  );
}
