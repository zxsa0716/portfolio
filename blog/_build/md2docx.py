# -*- coding: utf-8 -*-
"""
블로그 원고 마크다운 → Word(.docx) 변환기
- 이미지 자동 삽입 + '그림 N.' 자동 번호 + 캡션 스타일
- 티스토리 복붙을 전제로 한 깔끔한 서식(맑은 고딕)
사용: python md2docx.py            (blog/*/post.md 전부 변환)
"""
import os, re, glob
from docx import Document
from docx.shared import Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
from PIL import Image

BLOG = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT = "맑은 고딕"
GREEN = RGBColor(0x1F, 0x4E, 0x36)
GRAY = RGBColor(0x6E, 0x6E, 0x6E)
DARK = RGBColor(0x26, 0x26, 0x26)
MAXW_CM = 15.5


def _font(run, size, bold=False, italic=False, color=DARK):
    run.font.name = FONT
    run.font.size = Pt(size)
    run.bold = bold
    run.italic = italic
    run.font.color.rgb = color
    rpr = run._element.get_or_add_rPr()
    rf = rpr.find(qn('w:rFonts'))
    if rf is None:
        rf = OxmlElement('w:rFonts'); rpr.append(rf)
    for a in ('w:ascii', 'w:hAnsi', 'w:eastAsia', 'w:cs'):
        rf.set(qn(a), FONT)


def _para(doc, before=0, after=6, line=1.6, indent=0.0, align=None):
    p = doc.add_paragraph()
    pf = p.paragraph_format
    pf.space_before = Pt(before); pf.space_after = Pt(after)
    pf.line_spacing_rule = WD_LINE_SPACING.MULTIPLE; pf.line_spacing = line
    if indent: pf.first_line_indent = Cm(indent)
    if align is not None: p.alignment = align
    return p


def _inline(p, text, size=11, base_bold=False):
    """**bold** 인라인 처리"""
    for i, seg in enumerate(re.split(r'(\*\*[^*]+\*\*)', text)):
        if not seg: continue
        if seg.startswith('**') and seg.endswith('**'):
            _font(p.add_run(seg[2:-2]), size, bold=True)
        else:
            _font(p.add_run(seg), size, bold=base_bold)


def _botborder(p, color="1F4E36", sz=6):
    pPr = p._p.get_or_add_pPr(); b = OxmlElement('w:pBdr'); bt = OxmlElement('w:bottom')
    bt.set(qn('w:val'), 'single'); bt.set(qn('w:sz'), str(sz))
    bt.set(qn('w:space'), '3'); bt.set(qn('w:color'), color)
    b.append(bt); pPr.append(b)


def _shade(p, fill="F4F7F4"):
    pPr = p._p.get_or_add_pPr(); sh = OxmlElement('w:shd')
    sh.set(qn('w:val'), 'clear'); sh.set(qn('w:fill'), fill); pPr.append(sh)


def setup(doc):
    s = doc.sections[0]
    s.top_margin = Cm(2.0); s.bottom_margin = Cm(2.0)
    s.left_margin = Cm(2.4); s.right_margin = Cm(2.4)


def add_image(doc, path, caption, num):
    if not os.path.exists(path):
        p = _para(doc, after=4)
        _font(p.add_run(f"[이미지 없음: {os.path.basename(path)}]"), 9.5, color=RGBColor(0xC0, 0x39, 0x39))
        return
    try:
        w, h = Image.open(path).size
        width = Cm(MAXW_CM)
        # 지나치게 긴 세로 이미지는 폭을 줄여 페이지를 넘지 않게
        if h / max(w, 1) > 2.2:
            width = Cm(MAXW_CM * 0.62)
    except Exception:
        width = Cm(MAXW_CM)
    p = _para(doc, before=8, after=2, align=WD_ALIGN_PARAGRAPH.CENTER)
    p.add_run().add_picture(path, width=width)
    cp = _para(doc, before=0, after=12, line=1.35, align=WD_ALIGN_PARAGRAPH.CENTER)
    _font(cp.add_run(f"그림 {num}. "), 9.5, bold=True, color=GREEN)
    _font(cp.add_run(caption), 9.5, color=GRAY)


def convert(md_path, out_path):
    base = os.path.dirname(md_path)
    doc = Document(); setup(doc)
    lines = open(md_path, encoding='utf-8').read().split('\n')
    fignum = 0
    i = 0
    in_front = False
    while i < len(lines):
        ln = lines[i].rstrip()
        # front matter 무시
        if i == 0 and ln.strip() == '---':
            in_front = True; i += 1; continue
        if in_front:
            if ln.strip() == '---': in_front = False
            i += 1; continue

        if not ln.strip():
            i += 1; continue

        # 이미지
        m = re.match(r'!\[(.*?)\]\((.*?)\)', ln.strip())
        if m:
            fignum += 1
            add_image(doc, os.path.join(base, m.group(2)), m.group(1), fignum)
            i += 1; continue

        # 제목
        if ln.startswith('#### '):
            p = _para(doc, before=10, after=3)
            _font(p.add_run(ln[5:].strip()), 11.5, bold=True, color=DARK); i += 1; continue
        if ln.startswith('### '):
            p = _para(doc, before=12, after=4)
            _font(p.add_run(ln[4:].strip()), 12.5, bold=True, color=GREEN); i += 1; continue
        if ln.startswith('## '):
            p = _para(doc, before=18, after=6)
            _font(p.add_run(ln[3:].strip()), 14, bold=True, color=GREEN)
            _botborder(p); i += 1; continue
        if ln.startswith('# '):
            p = _para(doc, before=0, after=4, align=WD_ALIGN_PARAGRAPH.LEFT)
            _font(p.add_run(ln[2:].strip()), 18, bold=True, color=GREEN); i += 1; continue

        # 구분선
        if re.match(r'^-{3,}$', ln.strip()):
            p = _para(doc, before=6, after=6); _botborder(p, "CCCCCC", 4); i += 1; continue

        # 인용/콜아웃
        if ln.startswith('> '):
            buf = []
            while i < len(lines) and lines[i].startswith('> '):
                buf.append(lines[i][2:].strip()); i += 1
            p = _para(doc, before=8, after=10, line=1.5, indent=0.0)
            _shade(p)
            _inline(p, ' '.join(buf), 10.5)
            continue

        # 불릿
        if re.match(r'^[-*] ', ln.strip()):
            p = _para(doc, before=0, after=4, line=1.5)
            p.paragraph_format.left_indent = Cm(0.6)
            _font(p.add_run('· '), 11, bold=True, color=GREEN)
            _inline(p, ln.strip()[2:], 11)
            i += 1; continue
        if re.match(r'^\d+\. ', ln.strip()):
            p = _para(doc, before=0, after=4, line=1.5)
            p.paragraph_format.left_indent = Cm(0.6)
            _inline(p, ln.strip(), 11)
            i += 1; continue

        # 일반 문단
        p = _para(doc, before=0, after=9, line=1.65, indent=0.3,
                  align=WD_ALIGN_PARAGRAPH.JUSTIFY)
        _inline(p, ln.strip(), 11)
        i += 1

    doc.save(out_path)
    return out_path, fignum


def main():
    targets = sorted(glob.glob(os.path.join(BLOG, '*', 'post.md')))
    if not targets:
        print('post.md 없음'); return
    for t in targets:
        folder = os.path.basename(os.path.dirname(t))
        out = os.path.join(os.path.dirname(t), f'{folder}.docx')
        try:
            path, n = convert(t, out)
            chars = len(re.sub(r'\s', '', open(t, encoding='utf-8').read()))
            print(f'OK  {folder:24s} 그림 {n:2d}개 · 본문 {chars:,}자 → {os.path.basename(path)}')
        except Exception as e:
            print(f'ERR {folder}: {e}')


if __name__ == '__main__':
    main()
