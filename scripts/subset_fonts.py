# -*- coding: utf-8 -*-
"""Subset KoPubWorld OTF fonts to glyphs actually used in src/, output woff2.

Korean OTFs are ~3.5MB each; subsetting to the finite set of Hangul used on the
site (plus full Latin + punctuation) yields ~30-90KB woff2 per weight — keeping
quality high without bloating load time. Re-run after adding new Korean copy.
"""
import os
import re
import glob
from fontTools.subset import Subsetter, Options
from fontTools.ttLib import TTFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "src")
FONT_SRC = r"C:\Users\zxsa0\Downloads\KOPUBWORLD_OTF_FONTS"
OUT = os.path.join(SRC, "app", "fonts")
os.makedirs(OUT, exist_ok=True)

# ── 1. Collect every character used in source (covers all KO copy) ──────────
chars = set()
for path in glob.glob(os.path.join(SRC, "**", "*.ts*"), recursive=True):
    with open(path, encoding="utf-8") as f:
        chars.update(f.read())

# Always include full ASCII + common typographic punctuation used in the UI
for c in range(0x20, 0x7F):
    chars.add(chr(c))
chars.update("·—–…“”‘’«»°²³₩%~∙•→←↑↓×÷±≈≤≥√°㎡㎞㎏·")

# Keep only printable / Hangul / Latin-ish; drop control chars
unicodes = sorted({ord(c) for c in chars if ord(c) >= 0x20})

print(f"Collected {len(unicodes)} unique codepoints "
      f"({sum(1 for u in unicodes if 0xAC00 <= u <= 0xD7A3)} Hangul syllables)")

# ── 2. Subset each font to those glyphs, export woff2 ───────────────────────
FONTS = {
    "KoPubWorld Dotum_Pro Light.otf":  "KoPubDotum-Light.woff2",
    "KoPubWorld Dotum_Pro Medium.otf": "KoPubDotum-Medium.woff2",
    "KoPubWorld Dotum_Pro Bold.otf":   "KoPubDotum-Bold.woff2",
    "KoPubWorld Batang_Pro Light.otf": "KoPubBatang-Light.woff2",
    "KoPubWorld Batang_Pro Bold.otf":  "KoPubBatang-Bold.woff2",
}

for src_name, out_name in FONTS.items():
    src_path = os.path.join(FONT_SRC, src_name)
    font = TTFont(src_path)
    opts = Options()
    opts.flavor = "woff2"
    opts.desubroutinize = True
    opts.layout_features = ["*"]
    opts.name_IDs = ["*"]
    opts.notdef_outline = True
    opts.recalc_bounds = True
    sub = Subsetter(options=opts)
    sub.populate(unicodes=unicodes)
    sub.subset(font)
    out_path = os.path.join(OUT, out_name)
    font.save(out_path)
    kb = os.path.getsize(out_path) / 1024
    print(f"  {out_name:28s} {kb:7.1f} KB")

print("Done.")
