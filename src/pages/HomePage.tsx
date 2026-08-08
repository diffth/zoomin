import { CallToAction } from '@/components/home/CallToAction'
import { Features } from '@/components/home/Features'
import { Hero } from '@/components/home/Hero'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { useI18n } from '@/i18n/I18nProvider'
import { ROUTES } from '@/i18n/paths'

export default function HomePage() {
  const { locale, t } = useI18n()

  useDocumentMeta({
    locale,
    title: t('meta.home.title'),
    description: t('meta.home.description'),
    keywords: t('meta.home.keywords'),
    segment: ROUTES.home,
  })

  return (
    <div className="bg-background text-on-surface flex min-h-screen flex-col">
      <Header />
      <main className="w-full flex-1">
        <Hero />
        <Features />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}
