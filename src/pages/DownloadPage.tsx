import { Link } from 'react-router-dom'

import { WorkflowLayout } from '@/components/layout/WorkflowLayout'
import { Icon } from '@/components/ui/Icon'
import { images } from '@/data/images'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import type { TranslationKey } from '@/i18n/en'
import { useI18n } from '@/i18n/I18nProvider'
import { ROUTES } from '@/i18n/paths'

type ResultFormat = {
  titleKey: TranslationKey
  formatKey: TranslationKey
  noteKey: TranslationKey
  altKey: TranslationKey
  src: string
  /** Print size in mm, rendered at ~3.78px/mm on desktop and scaled down on phones. */
  frameClass: string
}

const formats: ResultFormat[] = [
  {
    titleKey: 'download.license.title',
    formatKey: 'download.license.format',
    noteKey: 'download.license.note',
    altKey: 'alt.driversLicenseResult',
    src: images.driversLicenseResult,
    frameClass: 'w-[106px] h-[136px] sm:w-[132px] sm:h-[170px]',
  },
  {
    titleKey: 'download.resident.title',
    formatKey: 'download.resident.format',
    noteKey: 'download.resident.note',
    altKey: 'alt.residentIdResult',
    src: images.residentIdResult,
    frameClass: 'w-[120px] h-[120px] sm:w-[150px] sm:h-[150px]',
  },
]

export default function DownloadPage() {
  const { locale, t, href } = useI18n()

  useDocumentMeta({
    locale,
    title: t('meta.download.title'),
    description: t('meta.download.description'),
    segment: ROUTES.download,
    noindex: true,
  })

  return (
    <WorkflowLayout currentStep="download">
      <div className="mx-auto w-full max-w-page">
        <div className="bg-tertiary-container text-on-tertiary-container mb-lg flex items-center gap-sm rounded p-md">
          <Icon name="check_circle" className="text-tertiary-fixed shrink-0" />
          <p className="font-body-md text-body-md">{t('download.banner')}</p>
        </div>

        <div className="mb-lg flex flex-col items-start justify-between gap-md sm:mb-xl md:flex-row md:items-center">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface">
              {t('download.title')}
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
              {t('download.subtitle')}
            </p>
          </div>
          <Link
            to={href(ROUTES.upload)}
            className="border-primary text-primary hover:bg-primary-fixed-dim font-label-md text-label-md group flex min-h-12 w-full items-center justify-center gap-xs rounded border px-md transition-colors md:w-auto"
          >
            <Icon name="refresh" className="transition-transform duration-300 group-hover:rotate-180" />
            {t('download.retry')}
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-md md:grid-cols-12 md:gap-lg">
          {formats.map((format) => (
            <article
              key={format.titleKey}
              className="bg-surface-container-lowest border-outline-variant flex flex-col gap-md rounded-xl border p-md sm:p-lg md:col-span-6"
            >
              <div className="flex items-start justify-between gap-sm">
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">
                    {t(format.titleKey)}
                  </h2>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mt-base tracking-widest uppercase">
                    {t(format.formatKey)}
                  </p>
                </div>
                <span className="bg-secondary-container text-on-secondary-container shrink-0 rounded-full px-xs py-1 text-[10px] font-bold">
                  {t('download.certified')}
                </span>
              </div>

              <div className="bg-surface-container-low border-outline-variant relative flex items-center justify-center rounded border border-dashed p-md sm:p-xl">
                <div className="id-card-shadow bg-white p-1 transition-transform duration-300 hover:scale-105">
                  <img
                    src={format.src}
                    alt={t(format.altKey)}
                    loading="lazy"
                    className={`${format.frameClass} object-cover`}
                  />
                </div>
                <span className="text-on-surface-variant absolute right-2 bottom-2 font-mono text-[10px]">
                  {t(format.noteKey)}
                </span>
              </div>

              <div className="mt-auto grid grid-cols-1 gap-sm sm:grid-cols-2">
                <button
                  type="button"
                  className="bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md flex min-h-12 items-center justify-center gap-xs rounded transition-all active:scale-[0.98]"
                >
                  <Icon name="image" className="text-[20px]" />
                  {t('download.jpg')}
                </button>
                <button
                  type="button"
                  className="border-primary text-primary hover:bg-primary-fixed font-label-md text-label-md flex min-h-12 items-center justify-center gap-xs rounded border transition-all active:scale-[0.98]"
                >
                  <Icon name="picture_as_pdf" className="text-[20px]" />
                  {t('download.pdf')}
                </button>
              </div>
            </article>
          ))}

          <aside className="bg-surface-container-high flex items-start gap-md rounded-xl p-md md:col-span-12">
            <Icon name="info" className="text-primary shrink-0" />
            <div className="flex-1">
              <p className="font-label-md text-label-md text-on-surface font-bold">
                {t('download.printTitle')}
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant text-pretty">
                {t('download.printBody')}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </WorkflowLayout>
  )
}
