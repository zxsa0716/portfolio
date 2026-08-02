# 01편 그림 교체 대기 — 논문 원본 Figure 필요

## 현재 상태
현재 `post.md`의 그림은 **한국기후변화학회 우수대학원생 발표자료**(`우수대학원생_발표.pdf`)에서 추출한 것입니다.
같은 연구 내용이고 저자 본인이 만든 자료지만, **게재 논문(Urban Climate)의 Figure와는 다른 버전**입니다.

## 왜 아직 교체하지 못했나
- 논문 페이지(ScienceDirect)는 자동 접근이 차단됩니다(HTTP 403).
  - DOI: https://doi.org/10.1016/j.uclim.2026.102981
  - 리다이렉트: https://www.sciencedirect.com/science/article/pii/S2212095526002129
- 로컬(OneDrive/Desktop) 전체를 검색했으나 논문 PDF·Figure 원본 파일이 없었습니다.
  - `Desktop/논뮨/` 폴더는 선행연구(참고문헌) 모음이었습니다.
  - `cimateguatd.pdf`는 PCAR 비즈니스 아이디어 공모전 자료였습니다.

## 교체하려면 다음 중 하나가 필요합니다
1. **논문 PDF 파일**(게재본 또는 accepted manuscript)을 로컬에 두기
   → 페이지에서 Figure 영역을 잘라 고해상도로 추출 가능
2. **Figure 원본 이미지 파일**(분석 시 저장한 PNG/TIFF)
   → 가장 좋은 방법. 저자 본인이 생성한 파일이라 화질·권리 모두 깔끔
3. 논문 저장소(있다면) 주소

## 참고: 저작권
게재본(Version of Record)의 조판된 Figure는 출판사 라이선스가 걸립니다.
**저자가 직접 생성한 원본 그림 파일**을 쓰는 것이 화질과 권리 양쪽에서 가장 안전합니다.

## 교체 시 작업 순서
1. 논문 Figure를 `figures/paper_fig1.png` 등으로 저장
2. `post.md`의 해당 `![...](figures/pXX.png)` 경로와 캡션을 교체
3. `python _build/md2docx.py` 실행 → `01_urban-climate.docx` 재생성
