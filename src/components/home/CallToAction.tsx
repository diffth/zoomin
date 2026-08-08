import { Link } from 'react-router-dom'

import { Reveal } from '@/components/ui/Reveal'
import { useI18n } from '@/i18n/I18nProvider'
import { ROUTES } from '@/i18n/paths'

export function CallToAction() {
  const { t, href } = useI18n()

  return (
    <Reveal className="px-gutter py-lg sm:py-xl">
      <div className="bg-primary text-on-primary relative mx-auto flex max-w-page flex-col items-center justify-between gap-md overflow-hidden rounded-2xl p-md sm:p-lg md:flex-row md:gap-xl md:p-xl">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative z-10 text-center md:text-left">
          <h2 className="font-headline-lg text-headline-lg mb-sm text-balance text-white">
            {t('cta.title')}
          </h2>
          <p className="text-on-primary-container font-body-md text-body-md text-pretty">
            {t('cta.body')}
          </p>
        </div>

        <Link
          to={href(ROUTES.upload)}
          className="text-primary font-label-md hover:bg-primary-fixed relative z-10 flex min-h-12 w-full items-center justify-center rounded-xl bg-white px-lg py-sm text-center shadow-lg transition-all active:scale-95 md:w-auto"
        >
          {t('cta.button')}
        </Link>
      </div>
    </Reveal>
  )
}
