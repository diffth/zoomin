import { lazy, Suspense, useMemo } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'

import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { detectLocale, SUPPORTED_LOCALES, type Locale } from '@/i18n/config'
import { I18nProvider, useI18n } from '@/i18n/I18nProvider'
import { ROUTES } from '@/i18n/paths'

// Route-level code splitting: the landing page ships without the workflow screens.
const HomePage = lazy(() => import('@/pages/HomePage'))
const UploadPage = lazy(() => import('@/pages/UploadPage'))
const ProcessingPage = lazy(() => import('@/pages/ProcessingPage'))
const DownloadPage = lazy(() => import('@/pages/DownloadPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

function RouteFallback() {
  const { t } = useI18n()

  return (
    <div className="bg-background flex min-h-screen items-center justify-center" role="status">
      <span className="sr-only">{t('common.loading')}</span>
      <span className="border-outline-variant border-t-primary size-10 animate-spin rounded-pill border-4" />
    </div>
  )
}

/** Re-provides i18n for everything under a `/:locale` prefix. */
function LocaleLayout({ locale }: { locale: Locale }) {
  return (
    <I18nProvider locale={locale}>
      <Outlet />
    </I18nProvider>
  )
}

/**
 * Sends an unprefixed path to the reader's locale, preserving the rest of the URL:
 * `/upload` → `/ko/upload`. Covers old links and anyone typing a bare path.
 */
function RedirectToLocale({ segment }: { segment?: string }) {
  const { locale } = useI18n()
  const { search, hash } = useLocation()
  const target = segment === undefined ? `/${locale}` : `/${locale}/${segment}`

  return <Navigate to={`${target}${search}${hash}`} replace />
}

function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        {/* Localized routes: /ko/…, /en/… */}
        {SUPPORTED_LOCALES.map((locale) => (
          <Route key={locale} path={`/${locale}`} element={<LocaleLayout locale={locale} />}>
            <Route index element={<HomePage />} />
            <Route path={ROUTES.upload} element={<UploadPage />} />
            <Route path={ROUTES.myPhotos} element={<ProcessingPage />} />
            <Route path={ROUTES.download} element={<DownloadPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        ))}

        {/* Unprefixed paths pick up the detected locale. */}
        <Route path="/" element={<RedirectToLocale />} />
        <Route path={`/${ROUTES.upload}`} element={<RedirectToLocale segment={ROUTES.upload} />} />
        <Route
          path={`/${ROUTES.myPhotos}`}
          element={<RedirectToLocale segment={ROUTES.myPhotos} />}
        />
        <Route
          path={`/${ROUTES.download}`}
          element={<RedirectToLocale segment={ROUTES.download} />}
        />

        {/* URLs the original static site published. */}
        <Route path="/index.html" element={<RedirectToLocale />} />
        <Route
          path="/uploadphotos.html"
          element={<RedirectToLocale segment={ROUTES.upload} />}
        />
        <Route path="/myphotos.html" element={<RedirectToLocale segment={ROUTES.myPhotos} />} />
        <Route
          path="/downloadphotos.html"
          element={<RedirectToLocale segment={ROUTES.download} />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}

export function App() {
  // Detected once per load; the locale in the URL takes over inside LocaleLayout.
  const initialLocale = useMemo(() => detectLocale(), [])

  return (
    <BrowserRouter>
      <I18nProvider locale={initialLocale}>
        <ScrollToTop />
        <AppRoutes />
      </I18nProvider>
    </BrowserRouter>
  )
}
