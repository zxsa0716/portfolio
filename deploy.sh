#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════
#  deploy.sh — 최희도 포트폴리오 배포 스크립트
#  Usage: bash deploy.sh
#
#  Prerequisites:
#    - git installed
#    - gh CLI installed and authenticated  (gh auth login)
#    - Vercel CLI installed                (npm i -g vercel)
#    - Vercel account authenticated        (vercel login)
#    - public/최희도_CV.pdf placed in public/ before running
# ═══════════════════════════════════════════════════════════════

set -euo pipefail

PORTFOLIO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PORTFOLIO_DIR"

echo ""
echo "══════════════════════════════════════════"
echo "  최희도 포트폴리오 배포 스크립트"
echo "══════════════════════════════════════════"
echo ""

# ── Step 0: Pre-flight checks ─────────────────────────────────
echo "[0/5] Pre-flight checks..."

if [ ! -f "public/최희도_CV.pdf" ]; then
  echo ""
  echo "  ⚠️  WARNING: public/최희도_CV.pdf not found."
  echo "     The 'Download CV' button in Hero will return 404."
  echo "     Place your CV PDF at: public/최희도_CV.pdf"
  echo "     Press Enter to continue anyway, or Ctrl+C to abort."
  read -r
fi

command -v git  >/dev/null 2>&1 || { echo "ERROR: git not installed"; exit 1; }
command -v gh   >/dev/null 2>&1 || { echo "ERROR: gh CLI not installed. Install: https://cli.github.com"; exit 1; }
command -v npx  >/dev/null 2>&1 || { echo "ERROR: npx not found. Install Node.js"; exit 1; }

echo "  ✓ Dependencies OK"

# ── Step 1: Build verification ────────────────────────────────
echo ""
echo "[1/5] Verifying production build..."
npm run build
echo "  ✓ Build successful"

# ── Step 2: TypeScript check ──────────────────────────────────
echo ""
echo "[2/5] Running TypeScript type check..."
npx tsc --noEmit
echo "  ✓ No TypeScript errors"

# ── Step 3: Git initialization + commit ───────────────────────
echo ""
echo "[3/5] Setting up Git..."

if [ ! -d ".git" ]; then
  git init
  git branch -m main
  echo "  ✓ Git repository initialized"
else
  echo "  ✓ Git repository already exists"
fi

git add .
git status --short

echo ""
git commit -m "Portfolio deployment — $(date '+%Y.%m.%d')" \
  --author="최희도 <zxsa0716@naver.com>" \
  || echo "  (Nothing to commit — already up to date)"

echo "  ✓ Changes committed"

# ── Step 4: GitHub repository ─────────────────────────────────
echo ""
echo "[4/5] Creating / pushing to GitHub..."

GITHUB_USER=$(gh api user --jq '.login' 2>/dev/null || echo "")

if [ -z "$GITHUB_USER" ]; then
  echo "ERROR: Not authenticated with GitHub. Run: gh auth login"
  exit 1
fi

# Check if remote already set
if git remote get-url origin >/dev/null 2>&1; then
  echo "  Remote 'origin' already configured:"
  git remote -v
  git push origin main --force-with-lease
else
  # Create repo on GitHub and push
  gh repo create portfolio \
    --public \
    --description "최희도 포트폴리오 — Climate AI Researcher & Developer" \
    --push \
    --source=. \
    || {
      # If repo already exists, just add remote and push
      echo "  Repo may already exist — adding remote..."
      git remote add origin "https://github.com/${GITHUB_USER}/portfolio.git"
      git push -u origin main --force-with-lease
    }
fi

echo "  ✓ Pushed to: https://github.com/${GITHUB_USER}/portfolio"

# ── Step 5: Deploy to Vercel ──────────────────────────────────
echo ""
echo "[5/5] Deploying to Vercel..."
npx vercel --prod --yes

echo ""
echo "══════════════════════════════════════════"
echo "  배포 완료! Deployment complete."
echo "══════════════════════════════════════════"
echo ""
echo "  GitHub : https://github.com/${GITHUB_USER}/portfolio"
echo "  Vercel  : Run 'npx vercel ls' to see your live URL"
echo ""
