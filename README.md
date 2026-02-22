# 최희도 포트폴리오

**최희도 (Heedo Choi)** — Urban Climate × Machine Learning Researcher & Developer
국민대학교 산림환경시스템학과 · CLIM Lab 학부연구생

모든 데이터는 실제 CV, 수상 증명서, 연구 포스터에서 추출했습니다. Lorem ipsum 없음.

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 16** (App Router) | Server Components + Turbopack, static export ready |
| Language | **TypeScript 5** strict | All data interfaces typed at compile time |
| Styling | **Tailwind CSS v4** | CSS-first `@theme inline` — no JS config file |
| Animation | **Framer Motion v12** | `layout` + `AnimatePresence popLayout` for filter transitions |
| 3D / Canvas | **React Three Fiber v9 + Drei** | Hero particle field — 2 draw calls total |
| Fonts | **next/font/google** | Inter · Space Grotesk · Geist Mono — zero CLS |
| Icons | **lucide-react** | Tree-shakeable, consistent 1.5px stroke |
| Utils | **clsx + tailwind-merge** | `cn()` for safe conditional class merging |

---

## Design System

**Aesthetic:** Linear.app × Vercel × Raycast — dark, precise, no purple/pink gradients.

```
Base background:  #080E1C  (deep navy)
Surface:          #0C1426
Primary accent:   #3B82F6  (electric blue)
Secondary accent: #10B981  (emerald)
Text primary:     #F1F5F9
Text muted:       #64748B
```

Tokens defined once in `src/app/globals.css` via `@theme inline {}` — available as CSS custom
properties everywhere. JS constants (Framer Motion easing, durations) live in `tailwind.config.ts`.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx             # Fonts, OG metadata, viewport, MotionConfig provider
│   ├── page.tsx               # Section composition (Hero → Contact)
│   └── globals.css            # @theme inline tokens + @layer utilities/components
├── components/
│   ├── Hero/
│   │   ├── index.tsx          # Full-viewport hero, CTAs, stats row
│   │   ├── ParticleField.tsx  # R3F: 480 particles + 120 nearest-neighbour lines
│   │   └── TypeWriter.tsx     # ref-based state machine, TYPE_MS=88 DEL_MS=40
│   ├── About/About.tsx        # Career timeline + research grants
│   ├── Projects/
│   │   ├── index.tsx          # Filter tabs + AnimatePresence grid
│   │   ├── ProjectCard.tsx    # Glass card, wide (2-col) for featured
│   │   └── ProjectModal.tsx   # Spring-animated detail overlay
│   ├── Skills/Skills.tsx      # Hexagonal clip-path skill nodes, 5 clusters
│   ├── Research/index.tsx     # Numbered timeline of 5 conference papers
│   ├── Certificates/
│   │   └── Certificates.tsx   # 3 sections: qualifications / activities / awards
│   ├── Contact/Contact.tsx    # Email clipboard + animated toast, no form
│   ├── ui/
│   │   ├── Navbar.tsx         # Fixed, blur-on-scroll, mobile drawer
│   │   ├── GradientText.tsx
│   │   ├── ScrollReveal.tsx
│   │   ├── Badge.tsx
│   │   └── Card.tsx
│   └── Providers.tsx          # MotionConfig reducedMotion="user"
├── data/
│   ├── projects.ts            # 7 projects with real metrics
│   ├── skills.ts              # 5 SkillClusters + 6 ResearchProjects
│   ├── certificates.ts        # 7 qualifications + 7 activity certs + 6 awards
│   └── research.ts            # 5 conference papers (GCN, XAI, flood, GAT-LSTM, PCAR)
└── lib/
    ├── animations.ts          # Framer Motion variants — ease [0.25,0.46,0.45,0.94]
    └── utils.ts               # cn() = clsx + tailwind-merge
```

---

## Key Technical Decisions

### Tailwind CSS v4 — CSS-first config
`@theme inline {}` in `globals.css` replaces the traditional `tailwind.config.js`.
All design tokens become native CSS custom properties (`--color-blue-500`, etc.)
with zero JavaScript overhead. PostCSS plugin: `@tailwindcss/postcss`.

### Three.js Particle Field — 2 draw calls
Hero background uses exactly **2 draw calls**:
1. `THREE.Points` — 480 particles distributed on a sphere shell (r=3–7)
2. `THREE.LineSegments` — 120 nearest-neighbour connection lines

Mouse-responsive via `lerp(current, target, 0.032)` per frame.
`groupRef.rotation.y = lerpMouse.x * 0.18 + elapsed * 0.038`
Loaded with `next/dynamic({ ssr: false })` to prevent server hydration mismatch.

### Hexagonal Skill Grid — pure CSS
`clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)`
No SVG, no canvas. Three size tiers (expert ≥85 / advanced 70–84 / intermediate <70)
drive hex width + `rgba()` opacity. Each cluster carries `rawRgb: "R,G,B"` so opacity
can vary at runtime: `rgba(${cluster.rawRgb}, ${alpha})`.

### Animation Accessibility
`<MotionConfig reducedMotion="user">` in `Providers.tsx` wraps the entire tree.
**One config, every motion.* element** automatically respects the OS
`prefers-reduced-motion` preference — no per-component handling needed.
CSS `@media (prefers-reduced-motion: reduce)` covers non-Framer transitions.

### Project Filter — smooth reorder
`AnimatePresence mode="popLayout"` + `motion.div layout` on the grid container.
Each `<ProjectCard>` has a `layoutId={project.id}` — Framer Motion interpolates
position changes across filter switches. Featured cards (`wide` → `md:col-span-2`)
are only wide in the "all" view to prevent layout gaps in filtered states.

### Email Copy + Toast
`navigator.clipboard.writeText()` with a graceful `mailto:` fallback.
Toast is a locally-rendered `AnimatePresence` element fixed to `bottom-8` —
no external library, no Context Provider needed.

---

## Real Data Sources

| Section | Source file |
|---|---|
| 7 projects (metrics, links) | 최희도_포트폴리오.pdf + 최희도_cv.docx |
| 5 skill clusters | 최희도_cv.docx |
| 6 funded research projects | 내경력.txt |
| 5 conference papers + metrics | 한국기후변화학회 certificates + GCN poster image |
| 7 national qualifications | 수료증 및 합격증/ image files |
| 7 activity certificates | 수료증 및 합격증/ image files |
| 6 awards | 한국기후변화학회 + 환경데이터공모전 certificates |
| Contact info | 최희도_cv.docx |

---

## Development

```bash
npm install
npm run dev        # http://localhost:3000  (Turbopack)
npm run build      # Production build
npx tsc --noEmit   # Type check only
```

---

## Deployment

Vercel (recommended — zero config for Next.js App Router):

```bash
npx vercel
```

Netlify with `@netlify/plugin-nextjs`:

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

---

*Built 2026 · Last updated: 2026.02.23*
