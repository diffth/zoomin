import type { Locale } from '@/i18n/config'

/** Route segments, relative to the `/:locale` prefix. */
export const ROUTES = {
  home: '',
  upload: 'upload',
  myPhotos: 'my-photos',
  download: 'download',
} as const

export type RouteSegment = (typeof ROUTES)[keyof typeof ROUTES]

/** Builds an absolute in-app path: `localePath('ko', ROUTES.upload)` → `/ko/upload`. */
export function localePath(locale: Locale, segment: RouteSegment = ROUTES.home): string {
  return segment ? `/${locale}/${segment}` : `/${locale}`
}

/**
 * Swaps the locale prefix on the current pathname, keeping the rest of the route.
 * `/ko/upload` + `en` → `/en/upload`
 */
export function switchLocaleInPath(pathname: string, nextLocale: Locale): string {
  const segments = pathname.split('/').filter(Boolean)
  // First segment is the current locale prefix; replace it and keep the remainder.
  const rest = segments.slice(1)
  return `/${[nextLocale, ...rest].join('/')}`
}
