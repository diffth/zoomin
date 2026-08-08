import { Link } from 'react-router-dom'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { useI18n } from '@/i18n/I18nProvider'

export default function NotFoundPage() {
  const { locale, t, href } = useI18n()

  useDocumentMeta({
    locale,
    title: t('meta.notFound.title'),
    noindex: true,
  })

  return (
    <div className="bg-background text-on-surface flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center gap-md px-gutter py-xl text-center">
        <p className="font-display text-display text-primary">404</p>
        <h1 className="font-headline-lg text-headline-lg text-balance">{t('notFound.title')}</h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-panel text-pretty">
          {t('notFound.body')}
        </p>
        <Link
          to={href()}
          className="bg-primary text-on-primary hover:bg-primary-container font-label-md mt-sm flex min-h-12 items-center rounded-xl px-lg transition-colors"
        >
          {t('notFound.back')}
        </Link>
      </main>
      <Footer />
    </div>
  )
}
