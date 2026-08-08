import type { TranslationKey } from '@/i18n/en'

/** Korean has a single plural form, so `_one` and `_other` carry the same text. */
export const ko: Record<TranslationKey, string> = {
  // Navigation ---------------------------------------------------------------
  'nav.howItWorks': '이용 방법',
  'nav.pricing': '요금 안내',
  'nav.myPhotos': '내 사진',
  'nav.getStarted': '시작하기',
  'nav.openMenu': '메뉴 열기',
  'nav.closeMenu': '메뉴 닫기',
  'nav.language': '언어',
  'nav.selectLanguage': '언어 선택',

  // Footer -------------------------------------------------------------------
  'footer.copyright': '© 2024 IDSnap AI. 공식 증명사진 규격 준수.',
  'footer.privacy': '개인정보처리방침',
  'footer.terms': '이용약관',
  'footer.help': '고객센터',
  'footer.contact': '문의하기',

  // Workflow rail ------------------------------------------------------------
  'workflow.tagline': '공식 규격 준수',
  'workflow.stepsLabel': '변환 단계',
  'workflow.upload': '업로드',
  'workflow.adjust': '보정',
  'workflow.verify': '검증',
  'workflow.download': '다운로드',

  // Home — hero --------------------------------------------------------------
  'home.badge': '50,000명 이상이 사용 중',
  'home.title': '셀카로 만드는',
  'home.titleAccent': '공식 증명사진',
  'home.subtitle':
    '일반 인물 사진을 몇 초 만에 공식 규격에 맞는 증명사진으로 변환해 드립니다. Gemini AI가 배경 제거, 정밀 크롭, 규격 맞춤까지 알아서 처리합니다.',
  'home.ctaPrimary': '지금 시작하기',
  'home.ctaSecondary': '규격 살펴보기',
  'home.badgeStandards': '공식 규격 준수',
  'home.badgePrecision': 'AI 정밀 보정',
  'home.previewValid': '여권 사용 가능',
  'home.previewRemoving': '배경 제거 중…',
  'home.previewPrint': '4x6 인화',
  'home.previewQuote': '“비자 신청에 딱 맞았어요!”',

  // Home — features ----------------------------------------------------------
  'features.title': '어디에 내도 통과하는 품질',
  'features.subtitle':
    '전 세계 생체 인식 데이터베이스 요건을 학습한 전용 AI 엔진이 반려되지 않는 사진을 만들어 드립니다.',
  'features.alignment.title': '생체 정보 자동 정렬',
  'features.alignment.body':
    '눈높이와 얼굴 크기를 자동으로 인식해 까다로운 ISO/IEC 19794-5 규격에 맞춥니다.',
  'features.background.title': '공식 규격 배경 처리',
  'features.background.body':
    'Gemini 기반 배경 제거로 어떤 배경이든 전문 스튜디오 수준의 흰색 또는 회색 배경으로 바꿔 드립니다.',
  'features.compliance.title': '규격 적합성 검증',
  'features.compliance.body':
    '미국, 영국, EU를 포함한 180여 개국의 요건 데이터베이스와 실시간으로 대조합니다.',

  // Home — call to action ----------------------------------------------------
  'cta.title': '새 증명사진, 지금 만들어 보시겠어요?',
  'cta.body': '예약도, 비싼 스튜디오도 필요 없습니다. 셀카 한 장과 3초면 충분합니다.',
  'cta.button': '무료로 변환 시작하기',

  // Upload -------------------------------------------------------------------
  'upload.title': '증명사진 업로드',
  'upload.step': '{total}단계 중 {current}단계',
  'upload.progressLabel': '변환 진행 상황',
  'upload.dropTitle': '사진을 끌어다 놓으세요',
  'upload.dropHint': 'JPG, PNG, HEIC 지원 · 최대 10MB',
  'upload.selectFile': '기기에서 파일 선택',
  'upload.inputLabel': '변환할 사진 선택',
  'upload.privacy':
    '업로드하신 사진은 안전하게 처리되며 변환 직후 즉시 삭제됩니다. 국제 생체정보 보호 기준을 준수합니다.',
  'upload.errorType': '이미지 파일을 선택해 주세요. (JPG, PNG, HEIC)',
  'upload.errorSize': '파일이 10MB를 넘습니다. 더 작은 사진을 선택해 주세요.',
  'upload.previewAlt': '선택하신 사진 미리보기',
  'upload.ready': '{size} MB · 변환 준비 완료',
  'upload.convert': '이 사진으로 변환하기',
  'upload.chooseAnother': '다시 선택',
  'upload.requirementsTitle': '사진 요건',
  'upload.req1.title': '단색 흰 배경',
  'upload.req1.detail': '그림자나 무늬가 없어야 합니다',
  'upload.req2.title': '얼굴 중앙 정렬',
  'upload.req2.detail': '정면을 바라봐 주세요',
  'upload.req3.title': '무표정',
  'upload.req3.detail': '눈이 또렷하게 보여야 합니다',
  'upload.req4.title': '안경·모자 착용 금지',
  'upload.req4.detail': '종교적·의학적 사유는 예외입니다',
  'upload.sampleCaption': '규격에 맞는 예시 사진',

  // Processing ---------------------------------------------------------------
  'processing.title': '증명사진 변환 중',
  'processing.titleDone': '증명사진이 완성되었습니다',
  'processing.subtitle': 'Gemini AI가 공식 규격에 맞게 사진을 보정하고 있습니다…',
  'processing.subtitleDone': '모든 규격 검사를 통과했습니다. 원하는 형식으로 내려받으세요.',
  'processing.operations': '진행 중인 작업',
  'processing.task1': '배경 제거',
  'processing.task2': '조명 보정',
  'processing.task3': '3.5×4.5cm 규격 맞춤',
  'processing.task4': '생체 정보 검증',
  'processing.complianceTitle': '규격 검사',
  'processing.wait_one': '예상 대기 시간: {count}초',
  'processing.wait_other': '예상 대기 시간: {count}초',
  'processing.reviewCta': '확인하고 다운로드',
  'processing.announceStep': '{total}단계 중 {current}단계: {label}',
  'processing.announceDone': '변환이 완료되었습니다. 증명사진이 준비되었습니다.',

  // Download -----------------------------------------------------------------
  'download.banner': '공식 규격에 맞게 변환이 완료되었습니다.',
  'download.title': '확인 및 다운로드',
  'download.subtitle': '필요하신 증명사진 형식을 선택하세요.',
  'download.retry': '다른 사진으로 다시 하기',
  'download.license.title': '운전면허증',
  'download.license.format': '규격: 3.5 x 4.5 cm',
  'download.license.note': '35mm x 45mm',
  'download.resident.title': '주민등록증',
  'download.resident.format': '규격: 생체 인식 표준',
  'download.resident.note': '1:1 생체 규격',
  'download.certified': '규격 인증',
  'download.jpg': 'JPG로 다운로드',
  'download.pdf': '인쇄용 PDF',
  'download.printTitle': '인쇄 안내',
  'download.printBody':
    '고품질 인화지와 사진 전용 프린터 사용을 권장합니다. 규격이 정확히 유지되도록 프린터 설정에서 ‘실제 크기’ 또는 ‘100% 배율’을 선택해 주세요.',

  // Not found ----------------------------------------------------------------
  'notFound.title': '페이지를 찾을 수 없습니다',
  'notFound.body': '주소가 변경되었을 수 있습니다. 처음으로 돌아가 새 사진을 변환해 보세요.',
  'notFound.back': '홈으로 돌아가기',

  // Shared -------------------------------------------------------------------
  'common.loading': '불러오는 중…',

  // Image alt text -----------------------------------------------------------
  'alt.heroPortrait':
    '부드럽고 균일한 조명 아래 무채색 스튜디오 배경에서 촬영한 남성의 여권 사진.',
  'alt.uploadSample':
    '규격에 맞는 예시 증명사진. 무표정, 흰 배경, 균일한 조명, 어깨를 바르게 편 자세.',
  'alt.processingPreview': '여권 규격 증명사진으로 변환 중인 스튜디오 인물 사진.',
  'alt.driversLicenseResult': '밝은 회색 배경으로 완성된 운전면허증 사진.',
  'alt.residentIdResult': '흰 배경으로 완성된 정사각형 생체 규격 증명사진.',

  // Document metadata --------------------------------------------------------
  'meta.home.title': 'IDSnap AI - 셀카로 만드는 여권·증명사진 AI 변환기',
  'meta.home.description':
    '셀카나 일반 인물 사진을 여권, 주민등록증, 운전면허증 등 공식 규격에 맞는 증명사진으로 3초 만에 변환해 보세요. AI 기반 배경 제거 및 규격 검증 제공.',
  'meta.home.keywords':
    '증명사진, 여권사진, 여권사진 만들기, 증명사진 ai, 배경제거, 여권 규격, id photo, passport photo, ai 증명사진',
  'meta.upload.title': '증명사진 생성 시작하기 | IDSnap AI',
  'meta.upload.description':
    '여권 및 증명사진용 원본 사진을 업로드해 주세요. Gemini AI가 규격에 맞게 자동으로 편집해 드립니다.',
  'meta.upload.keywords': '증명사진 업로드, 여권사진 변환, 사진 배경 제거, AI 편집, id photo upload',
  'meta.processing.title': 'AI 증명사진 변환 중 | IDSnap AI',
  'meta.processing.description':
    'Gemini AI가 업로드한 사진을 공식 증명사진 규격에 맞게 변환하고 있습니다.',
  'meta.download.title': '증명사진 다운로드 | IDSnap AI',
  'meta.download.description': '완성된 증명사진을 JPG 또는 인쇄용 PDF로 내려받으세요.',
  'meta.notFound.title': '페이지를 찾을 수 없습니다 | IDSnap AI',
}
