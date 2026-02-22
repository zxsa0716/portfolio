import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Image optimization ───────────────────────────────────────────────
  // next/image handles WebP/AVIF conversion automatically.
  // All project thumbnails are CSS gradients (no actual images).
  // Configure for any future image assets.
  images: {
    formats: ["image/avif", "image/webp"],
    // No external domains needed — all assets are local.
  },

  // ── Compression ──────────────────────────────────────────────────────
  compress: true,

  // ── Security headers ─────────────────────────────────────────────────
  // Applied at the Next.js level; vercel.json adds the same for CDN.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent clickjacking
          { key: "X-Frame-Options",           value: "DENY" },
          // Force HTTPS (HSTS)
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          // Block MIME-type sniffing
          { key: "X-Content-Type-Options",    value: "nosniff" },
          // Enable XSS protection in older browsers
          { key: "X-XSS-Protection",          value: "1; mode=block" },
          // Referrer policy — protect user privacy
          { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
          // Permissions policy — disable unneeded browser features
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
      // Long-cache for static assets (Next.js _next/static is hashed)
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // PDF served from /public — reasonable cache
      {
        source: "/(.*)\\.pdf",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" },
          { key: "Content-Disposition", value: "inline" },
        ],
      },
    ];
  },

  // ── PoweredBy header removal ─────────────────────────────────────────
  poweredByHeader: false,
};

export default nextConfig;
