import { Link } from 'react-router-dom'

import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { images } from '@/data/images'
import { useI18n } from '@/i18n/I18nProvider'
import { ROUTES } from '@/i18n/paths'

const badges = [
  { icon: 'gavel', key: 'home.badgeStandards' },
  { icon: 'psychology', key: 'home.badgePrecision' },
] as const

export function Hero() {
  const { t, href } = useI18n()

  return (
    <Reveal className="relative overflow-hidden px-gutter pt-lg pb-xl sm:pt-xl sm:pb-24">
      <div className="mx-auto grid max-w-page items-center gap-lg lg:grid-cols-2 lg:gap-xl">
        <div className="z-10 text-center lg:text-left">
          <div className="bg-secondary-fixed text-on-secondary-fixed mb-md inline-flex items-center gap-xs rounded-full px-sm py-1">
            <Icon name="verified" filled className="text-[18px]" />
            <span className="font-label-sm text-label-sm tracking-wider uppercase">
              {t('home.badge')}
            </span>
          </div>

          <h1 className="font-display text-display text-on-surface mb-md text-balance">
            {t('home.title')} <span className="text-primary">{t('home.titleAccent')}</span>
          </h1>

          <p className="font-body-lg text-body-lg text-on-surface-variant mx-auto mb-lg max-w-measure text-pretty lg:mx-0">
            {t('home.subtitle')}
          </p>

          <div className="flex flex-col justify-center gap-sm sm:flex-row sm:gap-md lg:justify-start">
            <Link
              to={href(ROUTES.upload)}
              className="bg-primary text-on-primary font-label-md group flex min-h-12 items-center justify-center gap-xs rounded-xl px-lg py-sm transition-all hover:shadow-lg active:scale-95"
            >
              {t('home.ctaPrimary')}
              <Icon name="arrow_forward" className="transition-transform group-hover:translate-x-1" />
            </Link>
            <button
              type="button"
              className="border-outline text-primary font-label-md hover:bg-surface-container min-h-12 rounded-xl border px-lg py-sm transition-all"
            >
              {t('home.ctaSecondary')}
            </button>
          </div>

          <div className="mt-lg flex flex-wrap justify-center gap-md opacity-80 sm:mt-xl lg:justify-start">
            {badges.map((badge) => (
              <div key={badge.key} className="text-on-surface-variant flex items-center gap-xs">
                <Icon name={badge.icon} filled className="text-primary" />
                <span className="font-label-md text-label-md">{t(badge.key)}</span>
              </div>
            ))}
          </div>
        </div>

        <HeroBento />
      </div>
    </Reveal>
  )
}

/**
 * The bento preview. Below `sm` it collapses to a single readable column instead of
 * squeezing a 12x6 grid into a fixed 500px box the way the legacy markup did.
 */
function HeroBento() {
  const { t } = useI18n()

  return (
    <div className="relative grid grid-cols-1 gap-sm sm:h-[500px] sm:grid-cols-12 sm:grid-rows-6">
      {/* Main preview card */}
      <div className="bg-surface-container-lowest border-outline-variant group relative overflow-hidden rounded-xl border p-sm shadow-xl sm:col-span-8 sm:row-span-4">
        <div className="bg-primary/5 absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" />
        <img
          src={images.heroPortrait}
          alt={t('alt.heroPortrait')}
          loading="eager"
          className="aspect-4/3 w-full rounded-lg object-cover sm:aspect-auto sm:h-full"
        />
        <div className="border-outline-variant absolute right-4 bottom-4 left-4 flex items-center justify-between rounded-lg border bg-white/90 p-xs backdrop-blur-md">
          <div className="flex items-center gap-xs">
            <span className="size-2 animate-pulse rounded-pill bg-green-500" />
            <span className="font-label-sm text-label-sm text-on-surface">
              {t('home.previewValid')}
            </span>
          </div>
          <Icon name="check_circle" className="text-primary" />
        </div>
      </div>

      {/* Processing status */}
      <div className="bg-surface-container-high border-outline-variant flex flex-col items-center justify-center gap-sm rounded-xl border p-sm sm:col-span-4 sm:row-span-3">
        <Icon name="auto_fix_high" className="text-primary text-[40px]" />
        <div className="bg-surface-container-highest h-2 w-full overflow-hidden rounded-full">
          <div className="bg-primary h-full w-2/3" />
        </div>
        <p className="font-label-sm text-label-sm text-center">{t('home.previewRemoving')}</p>
      </div>

      {/* Print sheet */}
      <div className="bg-primary-container border-primary flex flex-col justify-between gap-sm rounded-xl border p-sm text-white sm:col-span-4 sm:row-span-3">
        <div className="flex items-start justify-between">
          <Icon name="print" />
          <span className="font-label-sm text-label-sm">{t('home.previewPrint')}</span>
        </div>
        {/* Capped on phones so the stacked card doesn't become a tall block of blue. */}
        <div className="mx-auto grid w-full max-w-[200px] grid-cols-2 gap-xs sm:max-w-none">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="aspect-square rounded bg-white/20" />
          ))}
        </div>
      </div>

      {/* Social proof */}
      <div className="bg-surface border-outline-variant flex items-center gap-sm rounded-xl border p-sm sm:col-span-8 sm:row-span-2">
        <div className="flex -space-x-2">
          <span className="bg-tertiary-fixed size-8 rounded-pill border-2 border-white" />
          <span className="bg-secondary-fixed size-8 rounded-pill border-2 border-white" />
          <span className="bg-primary-fixed size-8 rounded-pill border-2 border-white" />
        </div>
        <p className="font-label-sm text-label-sm text-on-surface-variant italic">
          {t('home.previewQuote')}
        </p>
      </div>
    </div>
  )
}
