# IDSnap AI - SEO 가이드라인 반영 구현 계획서

안녕하세요! IDSnap AI 사이트의 검색 엔진 최적화(SEO)를 진행하기 위한 상세 기획안입니다. 
구글 검색 센터와 네이버 서치어드바이저의 기본 가이드라인에 맞춰, 검색 크롤러가 사이트를 잘 이해하고 사용자들이 검색 결과에서 매력적인 스니펫을 볼 수 있도록 최적화하겠습니다. 😊

---

## 사용자 검토 필요 사항

> [!IMPORTANT]
> **1. 기본 언어(lang) 설정**
> 현재 사이트의 기본 언어는 `en`(영어)으로 되어 있습니다. 네이버와 구글 코리아 검색 노출에 최적화하기 위해 메타 태그 및 기본 페이지 언어를 `ko`(한국어)로 변경하거나, 다국어 대응이 가능하도록 설정할 예정입니다. 이번 최적화에서는 한국어 사용자를 최우선 타겟으로 삼아 한국어 타이틀과 디스크립션을 기본으로 반영하려 합니다.
> 
> **2. 대표 도메인 주소(Canonical URL)**
> 검색 엔진에 중복 페이지로 인식되지 않게 하려면 대표 URL(Canonical URL) 설정이 필수적입니다. 임시로 `https://idsnap.ai`를 기본 도메인으로 설정하고 진행하겠습니다. 배포 예정이신 실제 도메인이 있다면 나중에 해당 도메인으로 쉽게 변경하실 수 있습니다.

---

## 제안된 변경 사항

각 HTML 파일의 `<head>` 영역에 메타 태그, Canonical 링크, Open Graph 태그, JSON-LD 구조화 데이터를 보완하고, 검색 크롤러의 접근을 돕는 `robots.txt` 및 `sitemap.xml` 파일을 루트 경로에 추가합니다.

### 1. 메타 데이터 및 소셜 미디어 최적화 (공통 적용)
각 페이지의 목적에 맞는 차별화된 `<title>`과 `<meta name="description">`을 제공합니다.
- **Home (`index.html`)**: 메인 홈 화면
  - **제목**: `IDSnap AI - 셀카로 만드는 여권·증명사진 AI 변환기`
  - **설명**: `셀카나 인물 사진을 여권, 주민등록증, 운전면허증 등 공식 규격에 맞는 증명사진으로 3초 만에 변환해 보세요. AI 기반 배경 제거 및 규격 검증 제공.`
- **Upload (`uploadphotos.html`)**: 사진 업로드 화면
  - **제목**: `증명사진 생성 시작하기 | IDSnap AI`
  - **설명**: `여권 및 증명사진용 원본 사진을 업로드해 주세요. Gemini AI가 규격에 맞게 자동으로 편집해 드립니다.`
- **Processing (`myphotos.html`)**: AI 처리 대기 화면
  - **제목**: `AI 증명사진 변환 중 | IDSnap AI`
  - **설명**: `Gemini AI가 업로드된 사진의 배경을 제거하고 표준 규격에 맞추어 변환하고 있습니다.`
- **Download (`downloadphotos.html`)**: 결과 다운로드 화면
  - **제목**: `증명사진 변환 결과 및 다운로드 | IDSnap AI`
  - **설명**: `변환이 완료된 고품질 AI 증명사진을 확인하고 다운로드해 보세요. 출력 인쇄용 포맷도 함께 제공됩니다.`

### 2. 구조화 데이터 (JSON-LD) 추가
`index.html`에 웹 애플리케이션 정보를 담은 `SoftwareApplication` 구조화 데이터를 추가하여 구글 검색 결과에서 풍부한 정보를 노출할 수 있도록 합니다.

---

## 컴포넌트별 상세 변경안

### [HTML Pages]

#### [MODIFY] [index.html](file:///e:/AI_DEV/App/zoomin/index.html)
- `lang="en"`을 `lang="ko"`로 변경
- `<title>`을 한글 최적화 제목으로 수정
- 메타 설명, 키워드, 로봇 제어 태그 추가
- Canonical 링크 태그 추가 (`<link rel="canonical" href="https://idsnap.ai/index.html">`)
- Open Graph 및 Twitter 카드 태그 추가 (공유 시 썸네일 노출용)
- `JSON-LD` 구조화 데이터 추가 (서비스명, 로고, 목적 등 기술)

#### [MODIFY] [uploadphotos.html](file:///e:/AI_DEV/App/zoomin/uploadphotos.html)
- `lang="en"`을 `lang="ko"`로 변경
- 각 페이지별로 고유한 제목 및 메타 설명 적용
- Canonical 링크 태그 추가 (`<link rel="canonical" href="https://idsnap.ai/uploadphotos.html">`)
- Open Graph 태그 추가

#### [MODIFY] [myphotos.html](file:///e:/AI_DEV/App/zoomin/myphotos.html)
- `lang="en"`을 `lang="ko"`로 변경
- 검색 로봇이 진행 중 화면을 무분별하게 긁어가지 않도록 `<meta name="robots" content="noindex, follow">` 설정 추가
- 각 페이지별 고유 제목 및 Canonical 태그 추가

#### [MODIFY] [downloadphotos.html](file:///e:/AI_DEV/App/zoomin/downloadphotos.html)
- `lang="en"`을 `lang="ko"`로 변경
- 결과 페이지 역시 고유한 개인 정보 노출 방지 및 검색 스팸 방지를 위해 `<meta name="robots" content="noindex, nofollow">` 설정 검토 (또는 일반 정보 전달을 위해 인덱싱 허용 시 메타 설명 설정)
- Canonical 태그 추가

---

### [SEO Configuration Files]

#### [NEW] [robots.txt](file:///e:/AI_DEV/App/zoomin/robots.txt)
- 모든 크롤러(`User-agent: *`)에 대한 기본 수집 권한 허용
- 개인 사진 보관함 등 비공개 영역에 대한 수집 거부(`Disallow: /myphotos.html`, `Disallow: /downloadphotos.html`) 설정으로 보안 및 크롤링 예산 효율화
- `Sitemap` 경로 명시 (`Sitemap: https://idsnap.ai/sitemap.xml`)

#### [NEW] [sitemap.xml](file:///e:/AI_DEV/App/zoomin/sitemap.xml)
- 사이트의 핵심 페이지인 `index.html`과 `uploadphotos.html`을 포함하는 XML 사이트맵 작성
- 갱신 주기(`changefreq`) 및 우선순위(`priority`) 정보 제공

---

## 검증 계획

### 1. 자동 검증 (Lighthouse SEO 테스트)
- 수정 완료 후 브라우저 개발자 도구의 Lighthouse 탭을 실행하여 SEO 점수가 100점에 도달하는지 확인합니다.

### 2. 수동 검증 및 구조화 데이터 검사
- Google 구조화 데이터 테스트 도구(Rich Results Test) 양식에 맞게 JSON-LD 코드가 올바르게 설계되었는지 마크업 분석.
- HTML 소스 보기를 통해 `<title>`, `<meta>`, Open Graph, Canonical 링크가 헤드 최상단에 정상적으로 주입되었는지 확인.
