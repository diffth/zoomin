import { useEffect } from 'react'

import { DEFAULT_LOCALE, LOCALE_TAGS, SUPPORTED_LOCALES, type Locale } from '@/i18n/config'
import { localePath, ROUTES, type RouteSegment } from '@/i18n/paths'

export type DocumentMeta = {
  locale: Locale
  title: string
  description?: string
  keywords?: string
  /** Route segment this page renders, used to build canonical + hreflang URLs. */
  segment?: RouteSegment
  /** The in-progress screens are excluded from search results. */
  noindex?: boolean
}

const SITE_ORIGIN = 'https://idsnap.ai'
const OG_IMAGE = `${SITE_ORIGIN}/favicon.svg`
const MANAGED = 'data-managed-alternate'

/**
 * Reuses the tags already present in index.html instead of appending new ones,
 * so a route change never leaves two <meta name="description"> behind.
 */
function upsert(selector: string, create: () => HTMLElement): HTMLElement {
  const existing = document.head.querySelector<HTMLElement>(selector)
  if (existing) return existing

  const element = create()
  document.head.appendChild(element)
  return element
}

function setMeta(attribute: 'name' | 'property', key: string, content: string | undefined) {
  const selector = `meta[${attribute}="${key}"]`

  if (content === undefined) {
    document.head.querySelector(selector)?.remove()
    return
  }

  const tag = upsert(selector, () => {
    const meta = document.createElement('meta')
    meta.setAttribute(attribute, key)
    return meta
  })
  tag.setAttribute('content', content)
}

/** Applies per-route, per-locale document metadata including hreflang alternates. */
export function useDocumentMeta({
  locale,
  title,
  description,
  keywords,
  segment = ROUTES.home,
  noindex = false,
}: DocumentMeta) {
  useEffect(() => {
    document.title = title

    const canonicalUrl = `${SITE_ORIGIN}${localePath(locale, segment)}`

    setMeta('name', 'description', description)
    setMeta('name', 'keywords', keywords)
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : undefined)

    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', canonicalUrl)
    setMeta('property', 'og:image', OG_IMAGE)
    setMeta('property', 'og:locale', LOCALE_TAGS[locale].replace('-', '_'))

    setMeta('property', 'twitter:card', 'summary_large_image')
    setMeta('property', 'twitter:title', title)
    setMeta('property', 'twitter:description', description)
    setMeta('property', 'twitter:url', canonicalUrl)
    setMeta('property', 'twitter:image', OG_IMAGE)

    const canonical = upsert('link[rel="canonical"]', () => {
      const el = document.createElement('link')
      el.setAttribute('rel', 'canonical')
      return el
    })
    canonical.setAttribute('href', canonicalUrl)

    // Rebuild hreflang alternates: one per locale plus x-default.
    document.head.querySelectorAll(`link[${MANAGED}]`).forEach((el) => el.remove())

    if (!noindex) {
      const alternates: Array<[string, Locale]> = [
        ...SUPPORTED_LOCALES.map((code) => [code, code] as [string, Locale]),
        ['x-default', DEFAULT_LOCALE],
      ]

      for (const [hreflang, target] of alternates) {
        const link = document.createElement('link')
        link.setAttribute('rel', 'alternate')
        link.setAttribute('hreflang', hreflang)
        link.setAttribute('href', `${SITE_ORIGIN}${localePath(target, segment)}`)
        link.setAttribute(MANAGED, '')
        document.head.appendChild(link)
      }
    }
  }, [locale, title, description, keywords, segment, noindex])
}
