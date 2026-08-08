/**
 * Source of truth for translation keys. Every other locale is typed as
 * `Record<TranslationKey, string>`, so a missing key is a compile error.
 *
 * Keys ending in `_one` / `_other` are plural forms selected by `Intl.PluralRules`
 * when `t()` is called with a `count`.
 */
export const en = {
  // Navigation ---------------------------------------------------------------
  'nav.howItWorks': 'How it works',
  'nav.pricing': 'Pricing',
  'nav.myPhotos': 'My Photos',
  'nav.getStarted': 'Get Started',
  'nav.openMenu': 'Open navigation menu',
  'nav.closeMenu': 'Close navigation menu',
  'nav.language': 'Language',
  'nav.selectLanguage': 'Select language',

  // Footer -------------------------------------------------------------------
  'footer.copyright': '© 2024 IDSnap AI. Official Document Standards Compliant.',
  'footer.privacy': 'Privacy Policy',
  'footer.terms': 'Terms of Service',
  'footer.help': 'Help Center',
  'footer.contact': 'Contact',

  // Workflow rail ------------------------------------------------------------
  'workflow.tagline': 'Official Standards',
  'workflow.stepsLabel': 'Conversion steps',
  'workflow.upload': 'Upload',
  'workflow.adjust': 'Adjust',
  'workflow.verify': 'Verify',
  'workflow.download': 'Download',

  // Home — hero --------------------------------------------------------------
  'home.badge': 'Trusted by 50,000+ Users',
  'home.title': 'Official ID Photos from Your',
  'home.titleAccent': 'Selfies',
  'home.subtitle':
    'Convert any portrait into a government-compliant identification photo in seconds. Powered by Gemini AI for professional background removal, precise cropping, and official formatting standards.',
  'home.ctaPrimary': 'Get Started Now',
  'home.ctaSecondary': 'View Standards',
  'home.badgeStandards': 'Official Standards Compliant',
  'home.badgePrecision': 'AI-Powered Precision',
  'home.previewValid': 'Valid for Passport',
  'home.previewRemoving': 'Removing Background…',
  'home.previewPrint': '4x6 Print',
  'home.previewQuote': '“Perfect for my visa application!”',

  // Home — features ----------------------------------------------------------
  'features.title': 'Unmatched Processing Quality',
  'features.subtitle':
    'Our specialized AI engine is trained on global biometric database requirements to ensure your photo is never rejected.',
  'features.alignment.title': 'Smart Biometric Alignment',
  'features.alignment.body':
    'Automatically detects eye level and head dimensions to match strict ISO/IEC 19794-5 standards.',
  'features.background.title': 'Official Background Neutralization',
  'features.background.body':
    'Gemini-powered background removal replaces any setting with a professional white or gray studio backdrop.',
  'features.compliance.title': 'Compliance Verification',
  'features.compliance.body':
    'Real-time check against database of requirements for 180+ countries including US, UK, and EU.',

  // Home — call to action ----------------------------------------------------
  'cta.title': 'Ready for your new official ID photo?',
  'cta.body': 'No appointments, no expensive studios. Just a selfie and 3 seconds of AI magic.',
  'cta.button': 'Start Your Free Conversion',

  // Upload -------------------------------------------------------------------
  'upload.title': 'Upload Document Photo',
  'upload.step': 'Step {current} of {total}',
  'upload.progressLabel': 'Conversion progress',
  'upload.dropTitle': 'Drag & drop your photo',
  'upload.dropHint': 'Supports JPG, PNG or HEIC. Max file size 10MB.',
  'upload.selectFile': 'Select File from Device',
  'upload.inputLabel': 'Choose a photo to convert',
  'upload.privacy':
    'Your photo is processed securely on our servers and deleted immediately after conversion. We comply with all international biometric privacy standards.',
  'upload.errorType': 'Please choose an image file (JPG, PNG or HEIC).',
  'upload.errorSize': 'That file is larger than 10MB. Please choose a smaller photo.',
  'upload.previewAlt': 'Preview of the photo you selected',
  'upload.ready': '{size} MB · ready to convert',
  'upload.convert': 'Convert this photo',
  'upload.chooseAnother': 'Choose another',
  'upload.requirementsTitle': 'PHOTO REQUIREMENTS',
  'upload.req1.title': 'Plain white background',
  'upload.req1.detail': 'No shadows or textured walls',
  'upload.req2.title': 'Face centered',
  'upload.req2.detail': 'Looking directly at the camera',
  'upload.req3.title': 'Neutral expression',
  'upload.req3.detail': 'Eyes open and clearly visible',
  'upload.req4.title': 'No glasses or hats',
  'upload.req4.detail': 'Except for religious/medical reasons',
  'upload.sampleCaption': 'SAMPLE COMPLIANT PHOTO',

  // Processing ---------------------------------------------------------------
  'processing.title': 'Processing Your ID Photo',
  'processing.titleDone': 'Your ID Photo Is Ready',
  'processing.subtitle': 'Gemini AI is optimizing your photo for official standards…',
  'processing.subtitleDone': 'All compliance checks passed. Review your formats to download.',
  'processing.operations': 'Current Operations',
  'processing.task1': 'Removing background',
  'processing.task2': 'Adjusting lighting',
  'processing.task3': 'Formatting to 3.5x4.5cm',
  'processing.task4': 'Verifying biometrics',
  'processing.complianceTitle': 'Compliance Check',
  'processing.wait_one': 'Estimated wait: {count} second',
  'processing.wait_other': 'Estimated wait: {count} seconds',
  'processing.reviewCta': 'Review & Download',
  'processing.announceStep': 'Step {current} of {total}: {label}',
  'processing.announceDone': 'Processing complete. Your ID photo is ready.',

  // Download -----------------------------------------------------------------
  'download.banner': 'Your photo is now compliant with official standards.',
  'download.title': 'Review & Download',
  'download.subtitle': 'Select your required document formats below.',
  'download.retry': 'Try Another Photo',
  'download.license.title': "Driver's License",
  'download.license.format': 'Format: 3.5 x 4.5 cm',
  'download.license.note': '35mm x 45mm',
  'download.resident.title': 'Resident ID',
  'download.resident.format': 'Format: Biometric Standard',
  'download.resident.note': '1:1 Biometric',
  'download.certified': 'CERTIFIED',
  'download.jpg': 'Download as JPG',
  'download.pdf': 'Print Ready PDF',
  'download.printTitle': 'Print Instructions',
  'download.printBody':
    "For the best results, use a high-quality photo printer with glossy paper. Ensure that your printer settings are set to 'Actual Size' or '100% Scale' to maintain the correct document dimensions.",

  // Not found ----------------------------------------------------------------
  'notFound.title': "We couldn't find that page",
  'notFound.body': 'The link may be outdated. Head back to the start and convert a new photo.',
  'notFound.back': 'Back to home',

  // Shared -------------------------------------------------------------------
  'common.loading': 'Loading…',

  // Image alt text -----------------------------------------------------------
  'alt.heroPortrait':
    'Professional passport photo of a man against a neutral studio background with balanced, soft lighting.',
  'alt.uploadSample':
    'Sample compliant ID photo: neutral expression, plain white background, even lighting, shoulders squared.',
  'alt.processingPreview': 'Studio portrait being processed into a passport-style headshot.',
  'alt.driversLicenseResult': "Finished driver's licence photo on a neutral light grey background.",
  'alt.residentIdResult': 'Finished square biometric ID photo on a stark white background.',

  // Document metadata --------------------------------------------------------
  'meta.home.title': 'IDSnap AI — Turn Your Selfie into a Passport or ID Photo',
  'meta.home.description':
    'Convert a selfie or any portrait into a passport, national ID, or driver’s licence photo in 3 seconds. AI background removal and official compliance checks included.',
  'meta.home.keywords':
    'id photo, passport photo, passport photo maker, ai id photo, background removal, passport requirements, visa photo',
  'meta.upload.title': 'Start Your ID Photo | IDSnap AI',
  'meta.upload.description':
    'Upload the original photo for your passport or ID. Gemini AI edits it to the official specification automatically.',
  'meta.upload.keywords':
    'upload id photo, passport photo converter, background removal, ai photo editing',
  'meta.processing.title': 'Converting Your ID Photo | IDSnap AI',
  'meta.processing.description':
    'Gemini AI is converting your uploaded photo to official ID photo specifications.',
  'meta.download.title': 'Download Your ID Photo | IDSnap AI',
  'meta.download.description': 'Download your finished ID photo as a JPG or a print-ready PDF.',
  'meta.notFound.title': 'Page Not Found | IDSnap AI',
} as const

export type TranslationKey = keyof typeof en
