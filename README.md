# zoomin (IDSnap AI)

셀카를 여권·증명사진 규격으로 변환해 주는 웹 앱. 기존 정적 HTML 4종을 **React 19 + Vite 8 + Tailwind v4** 구조로 이전하고 반응형으로 재구성했습니다.

## 실행

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # 타입 체크(tsc -b) + 프로덕션 번들 → dist/
npm run preview    # 빌드 결과 미리보기
npm run typecheck
```

## 구조

```
index.html               Vite 진입점 (기본 메타 + JSON-LD + 폰트)
public/                  favicon, robots.txt, sitemap.xml, _redirects
src/
  main.tsx               createRoot 부트스트랩
  App.tsx                라우터 + 라우트 단위 코드 스플리팅
  index.css              디자인 토큰(@theme) + 레거시 인라인 스타일 이식
  pages/                 HomePage, UploadPage, ProcessingPage, DownloadPage, NotFoundPage
  components/
    layout/              Header, Footer, WorkflowLayout, WorkflowStepNav, ScrollToTop
    home/                Hero, Features, CallToAction
    ui/                  Icon, Reveal
  hooks/                 useDocumentMeta, useFileDrop, useProcessingSimulation
  data/                  navigation.ts, images.ts
  lib/                   cn.ts
```

## 라우트

모든 화면은 `/:locale` 접두사 아래에 있습니다 (`ko` | `en`).

| 라우트 | 화면 | 기존 파일 |
| --- | --- | --- |
| `/ko`, `/en` | 랜딩 | `index.html` |
| `/ko/upload` | 사진 업로드 | `uploadphotos.html` |
| `/ko/my-photos` | AI 변환 진행 | `myphotos.html` |
| `/ko/download` | 결과 다운로드 | `downloadphotos.html` |

접두사 없는 경로(`/upload`)와 기존 `.html` URL은 `public/_redirects` / `vercel.json`의 **301**로 기본 언어(`ko`)에 연결하고, 호스트 설정이 없는 환경을 위해 `App.tsx`에 클라이언트 `<Navigate>` 폴백도 두었습니다. 루트 `/`는 `Accept-Language`로 302 분기합니다.

## 다국어 (한국어 / English)

의존성 없이 Context + 타입 지정된 키 맵으로 구현했습니다.

```
src/i18n/
  config.ts          지원 언어, 기본값(ko), 감지·저장
  en.ts              키의 원본(source of truth)
  ko.ts              Record<TranslationKey, string>
  I18nProvider.tsx   t() · href() 제공
  paths.ts           언어 접두사 경로 헬퍼
```

- **번역 누락은 컴파일 에러입니다.** `ko.ts`가 `Record<TranslationKey, string>`이라 `en.ts`에 키를 추가하고 `ko.ts`에 안 넣으면 빌드가 실패합니다.
- **언어 선택 우선순위**: URL 접두사 → `localStorage` → `Accept-Language` → `ko`
- **언어 전환 시 현재 페이지를 유지합니다.** `/ko/upload`에서 EN을 누르면 `/en/upload`로 갑니다.
- **복수형**은 `Intl.PluralRules`로 처리합니다. `processing.wait_one` / `_other` 키를 두고 `t('processing.wait', { count })`로 호출하면 영어는 "1 second"/"12 seconds"를 구분하고 한국어는 단일 형태를 씁니다.
- `<html lang>`, `og:locale`, `canonical`, `hreflang`(ko/en/x-default)이 라우트마다 갱신됩니다. `noindex` 화면에는 hreflang을 붙이지 않습니다.
- 이미지 `alt`와 에러 메시지도 번역 키로 관리해 언어를 바꾸면 같이 바뀝니다.

새 문구를 추가하려면 `en.ts`에 키를 넣고 `ko.ts`에 대응 값을 채운 뒤 `t('키')`로 쓰면 됩니다.

> 한글 웹폰트로 Noto Sans KR을 Inter 뒤에 얹었습니다. Inter에 한글 글리프가 없어 OS 기본 폰트로 떨어지던 문제를 막기 위한 것으로, 브라우저가 글리프 단위로 골라 씁니다.

## 디자인 토큰

4개 HTML에 중복돼 있던 `tailwind.config` 블록을 `src/index.css`의 `@theme` 한 곳으로 통합했습니다. 색상·간격·타이포 값은 그대로 유지했습니다.

> ⚠️ **`max-w-sm|md|lg|xl` 주의.** 레거시 디자인 시스템이 `sm/md/lg/xl`을 **간격** 토큰으로 쓰는데(1rem/1.5rem/2.5rem/4rem), Tailwind v4는 `max-w-<이름>`을 `--container-*`보다 `--spacing-*`에서 **먼저** 찾습니다. 그래서 이 이름들은 너비 용도로 쓰면 안 됩니다. 대신 `max-w-page`(1200px) · `max-w-measure`(36rem) · `max-w-panel`(28rem) · `max-w-rail`(24rem)을 쓰세요. `max-w-2xl` 이상은 영향 없습니다.

`rounded-full`도 레거시 설정대로 `0.75rem`을 유지합니다. 완전한 원이 필요하면 `rounded-pill`을 쓰세요.

## 반응형 작업 내역

- **모바일 메뉴 동작.** 기존에는 햄버거 버튼이 마크업에만 있고 동작하지 않았고, 랜딩에는 아예 없었습니다. 이제 라우트 이동·Escape로 닫히는 드로어로 동작합니다.
- **모바일 단계 내비게이션.** 기존에는 `lg` 미만에서 사이드바를 숨기기만 해서 모바일에선 진행 단계를 알 수 없었습니다. 가로 스크롤 단계 바를 추가했습니다.
- **유동 타이포.** 48px 고정이던 헤드라인을 `clamp()`로 바꿔 320px에서 32px까지 줄어듭니다. 설정에만 있고 쓰이지 않던 `headline-lg-mobile` 값을 기준으로 삼았습니다.
- **히어로 벤토 그리드.** `sm` 미만에서 고정 500px 12칸 그리드를 단일 컬럼으로 풉니다.
- **터치 타깃.** 주요 버튼/링크를 최소 44–48px 높이로 맞췄습니다.
- `prefers-reduced-motion` 존중, 이미지 `alt` 실제 적용(기존 `data-alt`), 사이드바 `position: fixed` + `ml-64` 조합을 `sticky`로 교체.

## 동작 변경

- 업로드가 `alert()` 대신 실제 파일 선택/드래그 상태와 미리보기, 형식·10MB 검증을 처리합니다.
- 변환 진행률과 작업 목록이 하나의 상태에서 파생됩니다(기존에는 rAF와 setTimeout이 따로 돌아 어긋날 수 있었습니다). 완료 시 다운로드 CTA로 바뀝니다.

## 참고

`npm audit`이 react-router의 RSC 모드 CSRF 권고를 보고하지만, 이 앱은 클라이언트 전용 SPA로 RSC 모드를 쓰지 않아 해당하지 않습니다.
