import { Link } from 'react-router-dom'

import { WorkflowLayout } from '@/components/layout/WorkflowLayout'
import { Icon } from '@/components/ui/Icon'
import { images } from '@/data/images'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { useFileDrop } from '@/hooks/useFileDrop'
import type { TranslationKey } from '@/i18n/en'
import { useI18n } from '@/i18n/I18nProvider'
import { ROUTES } from '@/i18n/paths'
import { cn } from '@/lib/cn'

const requirements: Array<{ titleKey: TranslationKey; detailKey: TranslationKey }> = [
  { titleKey: 'upload.req1.title', detailKey: 'upload.req1.detail' },
  { titleKey: 'upload.req2.title', detailKey: 'upload.req2.detail' },
  { titleKey: 'upload.req3.title', detailKey: 'upload.req3.detail' },
  { titleKey: 'upload.req4.title', detailKey: 'upload.req4.detail' },
]

export default function UploadPage() {
  const { locale, t, href } = useI18n()

  useDocumentMeta({
    locale,
    title: t('meta.upload.title'),
    description: t('meta.upload.description'),
    keywords: t('meta.upload.keywords'),
    segment: ROUTES.upload,
  })

  const { isDragging, selected, errorKey, acceptFile, clear, dropHandlers } = useFileDrop()

  return (
    <WorkflowLayout currentStep="upload">
      <div className="mx-auto max-w-4xl">
        {/* Progress header */}
        <div className="mb-lg sm:mb-xl">
          <div className="mb-xs flex flex-wrap items-end justify-between gap-x-md gap-y-xs">
            <h1 className="font-headline-lg text-headline-lg text-on-surface">
              {t('upload.title')}
            </h1>
            <span className="font-label-sm text-label-sm text-primary tracking-wider uppercase">
              {t('upload.step', { current: 1, total: 4 })}
            </span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={1}
            aria-valuemin={1}
            aria-valuemax={4}
            aria-label={t('upload.progressLabel')}
            className="bg-surface-container-highest h-2 w-full overflow-hidden rounded-full"
          >
            <div className="bg-primary h-full w-1/4 transition-all duration-500 ease-out" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-md lg:grid-cols-12 lg:gap-lg">
          {/* Upload zone */}
          <div className="lg:col-span-8">
            {selected ? (
              <div className="bg-surface border-outline-variant flex flex-col gap-md rounded-xl border p-md sm:p-lg">
                <div className="flex flex-col items-center gap-md sm:flex-row sm:items-start">
                  <img
                    src={selected.previewUrl}
                    alt={t('upload.previewAlt')}
                    className="border-outline-variant w-full max-w-[220px] rounded-lg border object-cover"
                  />
                  <div className="min-w-0 flex-1 text-center sm:text-left">
                    <p className="font-headline-md text-headline-md text-on-surface truncate">
                      {selected.file.name}
                    </p>
                    <p className="font-label-md text-label-md text-on-surface-variant mt-xs">
                      {t('upload.ready', { size: (selected.file.size / 1024 / 1024).toFixed(2) })}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-sm sm:flex-row">
                  <Link
                    to={href(ROUTES.myPhotos)}
                    className="bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md flex min-h-12 flex-1 items-center justify-center gap-xs rounded-lg px-lg transition-colors"
                  >
                    {t('upload.convert')}
                    <Icon name="arrow_forward" />
                  </Link>
                  <button
                    type="button"
                    onClick={clear}
                    className="border-outline text-primary hover:bg-surface-container font-label-md text-label-md min-h-12 rounded-lg border px-lg transition-colors"
                  >
                    {t('upload.chooseAnother')}
                  </button>
                </div>
              </div>
            ) : (
              <div
                {...dropHandlers}
                className={cn(
                  'upload-dashed bg-surface border-outline-variant group relative flex min-h-[280px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border p-md transition-all hover:border-primary sm:min-h-[400px] sm:p-lg',
                  isDragging && 'is-dragging bg-primary-fixed/20',
                )}
              >
                <input
                  id="photo-input"
                  type="file"
                  accept="image/*"
                  onChange={(event) => acceptFile(event.target.files?.[0])}
                  className="absolute inset-0 z-10 cursor-pointer opacity-0"
                  aria-label={t('upload.inputLabel')}
                />

                <div className="flex flex-col items-center text-center transition-transform duration-200 group-hover:scale-105">
                  <div className="bg-primary-fixed text-primary group-hover:bg-primary group-hover:text-on-primary mb-md flex size-16 items-center justify-center rounded-full transition-colors">
                    <Icon name="cloud_upload" className="text-[40px]" />
                  </div>
                  <h2 className="font-headline-md text-headline-md text-on-surface mb-xs">
                    {t('upload.dropTitle')}
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-md sm:mb-lg">
                    {t('upload.dropHint')}
                  </p>
                  <span className="bg-primary text-on-primary group-hover:bg-primary-container font-label-md text-label-md flex min-h-12 items-center rounded-lg px-lg shadow-md transition-colors">
                    {t('upload.selectFile')}
                  </span>
                </div>
              </div>
            )}

            {errorKey && (
              <p
                role="alert"
                className="bg-error-container text-on-error-container font-label-md text-label-md mt-md flex items-center gap-xs rounded-lg p-sm"
              >
                <Icon name="error" />
                {t(errorKey)}
              </p>
            )}

            <div className="bg-secondary-fixed/30 border-secondary-fixed mt-md flex items-start gap-sm rounded-lg border p-sm">
              <Icon name="info" className="text-secondary shrink-0" />
              <p className="font-label-md text-label-md text-on-secondary-fixed-variant">
                {t('upload.privacy')}
              </p>
            </div>
          </div>

          {/* Requirements */}
          <div className="flex flex-col gap-md lg:col-span-4">
            <div className="bg-surface-container border-outline-variant rounded-xl border p-md">
              <h2 className="font-label-md text-label-md text-on-surface mb-md flex items-center gap-xs font-bold">
                <Icon name="assignment_turned_in" className="text-[20px]" />
                {t('upload.requirementsTitle')}
              </h2>
              <ul className="flex flex-col gap-sm">
                {requirements.map((requirement) => (
                  <li key={requirement.titleKey} className="flex items-start gap-sm">
                    <Icon name="check_circle" className="text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-label-md text-label-md text-on-surface">
                        {t(requirement.titleKey)}
                      </p>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">
                        {t(requirement.detailKey)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <figure className="border-outline-variant bg-surface relative m-0 overflow-hidden rounded-xl border">
              <img
                src={images.uploadSample}
                alt={t('alt.uploadSample')}
                loading="lazy"
                className="aspect-4/5 w-full object-cover"
              />
              <figcaption className="bg-primary/90 text-on-primary font-label-sm text-label-sm absolute right-0 bottom-0 left-0 p-xs text-center">
                {t('upload.sampleCaption')}
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </WorkflowLayout>
  )
}
