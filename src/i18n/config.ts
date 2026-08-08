export const SUPPORTED_LOCALES = ['ko', 'en'] as const

export type Locale = (typeof SUPPORTED_LOCALES)[number]

/** Korean is the site's primary market, so it also serves as x-default. */
export const DEFAULT_LOCALE: Locale = 'ko'

export const LOCALE_LABELS: Record<Locale, string> = {
  ko: '한국어',
  en: 'English',
}

/** BCP 47 tags for <html lang> and og:locale. */
export const LOCALE_TAGS: Record<Locale, string> = {
  ko: 'ko-KR',
  en: 'en-US',
}

const STORAGE_KEY = 'zoomin.locale'

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && SUPPORTED_LOCALES.includes(value as Locale)
}

export function storeLocale(locale: Locale) {
  try {
    localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    // Private browsing / storage disabled — the URL still carries the locale.
  }
}

/** Stored choice wins, then Accept-Language order, then the default. */
export function detectLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isLocale(stored)) return stored
  } catch {
    // ignore
  }

  const candidates = typeof navigator === 'undefined' ? [] : (navigator.languages ?? [navigator.language])

  for (const candidate of candidates) {
    const base = candidate.toLowerCase().split('-')[0]
    if (isLocale(base)) return base
  }

  return DEFAULT_LOCALE
}
