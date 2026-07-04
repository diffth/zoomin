# IDSnap AI - SEO 가이드라인 반영 완료 보고서

안녕하세요! IDSnap AI 사이트에 구글 및 네이버 검색 최적화를 성공적으로 마쳤습니다! 🚀
가이드라인의 요구사항에 맞춰 검색 로봇이 사이트의 정보를 올바르게 수집하고, 사용자가 SNS 공유 시 예쁜 미리보기 카드가 나타날 수 있도록 마크업 작업을 진행했습니다.

---

## 🛠️ 변경 및 적용 사항 요약

### 1. 메인 페이지 및 공개 페이지 최적화

* **[index.html](file:///e:/AI_DEV/App/zoomin/index.html)**
  * **언어 설정**: `lang="ko"`로 최적화하여 한글 검색 엔진이 기본 언어를 정확히 판단하도록 수정.
  * **메타 설명(Description) & 키워드(Keywords)**: 사이트의 특징("셀카로 만드는 여권·증명사진 AI 변환기")을 명확하게 한글로 소개하여 검색 결과 스니펫 클릭율(CTR)을 높이도록 최적화.
  * **Canonical URL**: 중복 수집을 방지하고 `https://idsnap.ai/`로 대표 URL을 명시.
  * **Open Graph (OG) & Twitter Card**: 소셜 미디어(네이버 블로그, 카카오톡, 페이스북, X 등)에 링크를 공유할 때 대표 타이틀, 설명, 로고 이미지가 정갈하게 카드 형태로 노출되도록 메타 태그 삽입.
  * **JSON-LD 구조화 데이터**: 구글 검색 엔진이 이 사이트를 웹 애플리케이션 서비스(`WebApplication`)로 인식하도록 세부 스키마 메타데이터 추가.

* **[uploadphotos.html](file:///e:/AI_DEV/App/zoomin/uploadphotos.html)**
  * **개별 최적화**: 업로드 전용 페이지 목적에 맞춰 고유한 타이틀("증명사진 생성 시작하기 | IDSnap AI") 및 메타 설명 제공.
  * **Canonical URL**: `https://idsnap.ai/uploadphotos.html`로 설정.
  * **OG 및 Twitter Card**: 소셜 태그 적용.

---

### 2. 비공개 및 개인정보 보호 페이지 (검색 인덱스 제외)

개인 데이터 처리 흐름에 노출되는 대기 및 결과 다운로드 화면은 개인 정보 보호와 크롤링 효율화를 위해 **색인 생성(Indexing)을 원천 차단**했습니다.

* **[myphotos.html](file:///e:/AI_DEV/App/zoomin/myphotos.html)**
  * `noindex, nofollow` 로봇 태그 추가.
  * 타이틀 및 Canonical 주소 개별 부여.
* **[downloadphotos.html](file:///e:/AI_DEV/App/zoomin/downloadphotos.html)**
  * `noindex, nofollow` 로봇 태그 추가.
  * 타이틀 및 Canonical 주소 개별 부여.

---

### 3. 검색 크롤러 소통 파일 추가

* **[robots.txt](file:///e:/AI_DEV/App/zoomin/robots.txt)** [NEW]
  * 모든 검색 로봇의 전반적인 크롤링을 허용하되, 개인 정보 영역(`/myphotos.html`, `/downloadphotos.html`) 및 템플릿 보관 디렉토리(`/docs/`)에 대한 무분별한 수집은 차단하여 크롤링 효율을 극대화하고 사생활 노출을 예방합니다.
  * 사이트맵의 명확한 경로(`https://idsnap.ai/sitemap.xml`)를 기재하여 수집을 가속화합니다.

* **[sitemap.xml](file:///e:/AI_DEV/App/zoomin/sitemap.xml)** [NEW]
  * 검색 엔진 로봇이 헤매지 않고 신속하게 전체 사이트의 구조를 파악할 수 있도록 공개 페이지 목록(`index.html`, `uploadphotos.html`)을 포함하는 최신 형식의 사이트맵을 자동 생성해 두었습니다.

---

## 🔍 반영 코드 예시 (index.html)

수정된 핵심 메타 태그와 구조화 데이터의 예시 형태는 다음과 같습니다:

```html
<!-- index.html <head> 부분 -->
<meta name="description" content="셀카나 일반 인물 사진을 여권, 주민등록증, 운전면허증 등 공식 규격에 맞는 증명사진으로 3초 만에 변환해 보세요...">
<meta name="keywords" content="증명사진, 여권사진, 여권사진 만들기, 증명사진 ai...">
<link rel="canonical" href="https://idsnap.ai/">

<!-- Open Graph / 소셜 공유 최적화 -->
<meta property="og:type" content="website">
<meta property="og:title" content="IDSnap AI - 셀카로 만드는 여권·증명사진 AI 변환기">
<meta property="og:image" content="https://idsnap.ai/favicon.svg">

<!-- JSON-LD 구조화 데이터 -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "IDSnap AI",
  "url": "https://idsnap.ai",
  ...
}
</script>
```

---

## 📢 앞으로 하실 일

1. **실제 도메인 배포 시 변경**: 현재 적용된 대표 도메인은 가상 도메인인 `https://idsnap.ai` 기준입니다. 실서비스용 도메인이 확정되어 실제 배포 서버에 업로드하실 때 해당 주소로 HTML 내 `canonical` 주소 및 `sitemap.xml` 내 경로들을 한 번 더 변경해 주시면 완벽합니다!
2. **네이버 서치어드바이저 및 구글 서치콘솔 등록**: 배포 완료 후 각 서비스에 들어가셔서 본 `sitemap.xml`과 `robots.txt` 주소를 등록 및 검증 제출하시면 며칠 내로 정상적으로 색인(인덱싱)이 시작될 것입니다.
