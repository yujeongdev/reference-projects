# reference-projects

사이트 분석 레퍼런스 모음. Playwright CLI로 네트워크·라이브러리·디자인 분석 후 기술 스택을 정리합니다.

## 구조

```
reference-projects/
├── scripts/                        # 공통 분석 스크립트
│   ├── take-screenshots.cjs        # 섹션별 스크린샷 자동 캡처
│   ├── detect-libraries.cjs        # JS 청크에서 라이브러리 식별
│   └── detect-chart-libs.cjs       # 차트·애니메이션 라이브러리 탐지
│
└── {프로젝트명}/                   # 프로젝트별 폴더
    ├── {프로젝트명}.md             # 기술 스택 분석 문서
    └── screenshots/                # 섹션별 캡처 이미지
```

## 분석 프로젝트

| 프로젝트 | 사이트 | 주요 스택 |
|---------|--------|---------|
| [jensen-huang-kr-tracker](./jensen-huang-kr-tracker/jensen-huang-kr-tracker.md) | junresearch.com/jensenHuangKRTracker | Next.js 15, Tailwind v4, GSAP, Sigma.js, Three.js |

## 공통 스크립트 사용법

> **요구사항**: `playwright-cli` 설치 필요 (`brew install playwright-cli`)

### 스크린샷 캡처

```bash
# URL과 스크린샷 저장 경로를 수정 후 실행
node scripts/take-screenshots.cjs
```

### 라이브러리 탐지

```bash
# JS 청크에서 주요 라이브러리 식별 (recharts, d3, sigma, gsap 등)
node scripts/detect-libraries.cjs

# 차트·애니메이션 라이브러리 세부 탐지
node scripts/detect-chart-libs.cjs
```

### 스크립트 상단 URL 설정

각 스크립트 상단의 URL만 교체하면 어떤 사이트든 분석 가능합니다.

```js
await page.goto('https://분석할-사이트.com', { waitUntil: 'networkidle' });
```
