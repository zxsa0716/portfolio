# -*- coding: utf-8 -*-
"""figures/ 파일명을 본문 등장 순서(01, 02, …)로 다시 정렬한다.

- post.md의 이미지 경로도 함께 고친다.
- 본문에서 쓰지 않는 그림은 삭제하지 않고 figures/_미사용/ 으로 옮긴다.
- 04_cina는 원래 파일명을 유지하므로 대상에서 제외한다.

사용: python rename_figures.py
"""
import os, re, glob, shutil

BLOG = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKIP = {'04_cina'}


def renumber(folder):
    md, figd = os.path.join(folder, 'post.md'), os.path.join(folder, 'figures')
    src = open(md, encoding='utf-8').read()
    refs = [m.group(1) for m in re.finditer(r'!\[.*?\]\((figures/[^)]+)\)', src)]
    if not refs:
        return 0, 0

    used, moved = {os.path.basename(r) for r in refs}, 0
    for p in sorted(glob.glob(os.path.join(figd, '*'))):
        if os.path.isfile(p) and os.path.basename(p) not in used:
            os.makedirs(os.path.join(figd, '_미사용'), exist_ok=True)
            shutil.move(p, os.path.join(figd, '_미사용', os.path.basename(p)))
            moved += 1

    # 임시 이름을 거쳐 옮겨 이름 충돌을 피한다
    plan = [(os.path.join(folder, rel),
             os.path.join(figd, f'__tmp{i:02d}__'),
             os.path.join(figd, f'{i:02d}{os.path.splitext(rel)[1].lower()}'),
             f'figures/{i:02d}{os.path.splitext(rel)[1].lower()}')
            for i, rel in enumerate(refs, 1)]
    for old, tmp, _, _ in plan:
        if os.path.exists(old):
            shutil.move(old, tmp)
    for _, tmp, new, _ in plan:
        if os.path.exists(tmp):
            shutil.move(tmp, new)

    it = iter([newrel for *_, newrel in plan])
    open(md, 'w', encoding='utf-8').write(
        re.sub(r'(!\[.*?\]\()figures/[^)]+(\))', lambda m: m.group(1) + next(it) + m.group(2), src))
    return len(refs), moved


def main():
    for d in sorted(os.listdir(BLOG)):
        p = os.path.join(BLOG, d)
        if not (os.path.isdir(p) and re.match(r'^\d\d_', d)) or d in SKIP:
            continue
        n, moved = renumber(p)
        print(f'OK  {d:22s} 그림 {n:2d}개 → 01~{n:02d} · 미참조 {moved}개 _미사용/ 이동')
    print('\n이어서 `python md2docx.py`로 Word를 다시 생성하세요.')


if __name__ == '__main__':
    main()
