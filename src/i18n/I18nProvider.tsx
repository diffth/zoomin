import { createContext, use, useCallback, useEffect, useMemo, type ReactNode } from 'react'

import { LOCALE_TAGS, type Locale } from '@/i18n/config'
import { en, type TranslationKey } from '@/i18n/en'
import { ko } from '@/i18n/ko'
import { localePath, ROUTES, type RouteSegment } from '@/i18n/paths'

const dictionaries: Record<Locale, Record<TranslationKey, string>> = { en, ko }

export type TranslateOptions = Record<string, string | number> & { count?: number }

/** `'processing.wait_one' | 'processing.wait_other'` → `'processing.wait'`. */
type PluralBase<K> = K extends `${infer Base}_other` ? Base : never
export type PluralKey = PluralBase<TranslationKey>

export type I18nValue = {
  locale: Locale
  t: (key: TranslationKey | PluralKey, options?: TranslateOptions) => string
  /** Locale-aware href builder, so no component has to remember the prefix. */
  href: (segment?: RouteSegment) => string
}

const I18nContext = createContext<I18nValue | null>(null)

function interpolate(template: string, options?: TranslateOptions): string {
  if (!options) return template
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in options ? String(options[name]) : match,
  )
}

export function I18nProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = LOCALE_TAGS[locale]
  }, [locale])

  const t = useCallback(
    (key: TranslationKey | PluralKey, options?: TranslateOptions) => {
      const dictionary = dictionaries[locale]

      let resolved = key as TranslationKey
      if (!(resolved in dictionary)) {
        // Plural base key: pick a form. `Intl.PluralRules` returns `one`/`other`
        // for English; Korean has a single form and always returns `other`.
        const category =
          options?.count === undefined
            ? 'other'
            : new Intl.PluralRules(LOCALE_TAGS[locale]).select(options.count)

        const pluralKey = `${key}_${category}` as TranslationKey
        resolved = pluralKey in dictionary ? pluralKey : (`${key}_other` as TranslationKey)
      }

      const template = dictionary[resolved] ?? en[resolved] ?? key
      return interpolate(template, options)
    },
    [locale],
  )

  const href = useCallback(
    (segment: RouteSegment = ROUTES.home) => localePath(locale, segment),
    [locale],
  )

  const value = useMemo<I18nValue>(() => ({ locale, t, href }), [locale, t, href])

  return <I18nContext value={value}>{children}</I18nContext>
}

export function useI18n(): I18nValue {
  const value = use(I18nContext)
  if (!value) throw new Error('useI18n must be used inside <I18nProvider>')
  return value
}
