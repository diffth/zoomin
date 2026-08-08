import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import type { TranslationKey } from '@/i18n/en'
import { useI18n } from '@/i18n/I18nProvider'

const features: Array<{
  icon: string
  accent: string
  titleKey: TranslationKey
  bodyKey: TranslationKey
}> = [
  {
    icon: 'crop_free',
    accent: 'bg-primary-fixed text-on-primary-fixed',
    titleKey: 'features.alignment.title',
    bodyKey: 'features.alignment.body',
  },
  {
    icon: 'texture',
    accent: 'bg-secondary-fixed text-on-secondary-fixed',
    titleKey: 'features.background.title',
    bodyKey: 'features.background.body',
  },
  {
    icon: 'verified',
    accent: 'bg-tertiary-fixed text-on-tertiary-fixed',
    titleKey: 'features.compliance.title',
    bodyKey: 'features.compliance.body',
  },
]

export function Features() {
  const { t } = useI18n()

  return (
    <Reveal className="bg-surface-container-low px-gutter py-lg sm:py-xl">
      <div className="mx-auto max-w-page">
        <div className="mb-lg text-center sm:mb-xl">
          <h2 className="font-headline-lg text-headline-lg mb-sm text-balance">
            {t('features.title')}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mx-auto max-w-2xl text-pretty">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid gap-md sm:grid-cols-2 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.titleKey}
              className="bg-surface border-outline-variant group rounded-xl border p-md transition-shadow hover:shadow-md sm:p-lg"
            >
              <div
                className={`${feature.accent} mb-md flex size-12 items-center justify-center rounded-lg transition-transform group-hover:scale-110`}
              >
                <Icon name={feature.icon} />
              </div>
              <h3 className="font-headline-md text-headline-md mb-xs text-balance">
                {t(feature.titleKey)}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant text-pretty">
                {t(feature.bodyKey)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </Reveal>
  )
}
