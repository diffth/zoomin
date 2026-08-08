import { Link } from 'react-router-dom'

import { WorkflowLayout } from '@/components/layout/WorkflowLayout'
import { Icon } from '@/components/ui/Icon'
import { images } from '@/data/images'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { processingTaskKeys, useProcessingSimulation } from '@/hooks/useProcessingSimulation'
import { useI18n } from '@/i18n/I18nProvider'
import { ROUTES } from '@/i18n/paths'
import { cn } from '@/lib/cn'

const RING_CIRCUMFERENCE = 226

export default function ProcessingPage() {
  const { locale, t, href } = useI18n()

  useDocumentMeta({
    locale,
    title: t('meta.processing.title'),
    description: t('meta.processing.description'),
    segment: ROUTES.myPhotos,
    noindex: true,
  })

  const { progress, taskStatuses, isComplete, secondsRemaining } = useProcessingSimulation()
  const rounded = Math.floor(progress)
  const activeIndex = taskStatuses.indexOf('active')

  return (
    <WorkflowLayout currentStep="adjust">
      <div className="mx-auto flex w-full max-w-3xl flex-col justify-center py-md">
        <div className="mb-lg text-center sm:mb-xl">
          <h1 className="font-headline-lg text-headline-lg text-primary mb-xs text-balance">
            {isComplete ? t('processing.titleDone') : t('processing.title')}
          </h1>
          <p className="text-on-surface-variant font-body-lg text-pretty">
            {isComplete ? t('processing.subtitleDone') : t('processing.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-md md:grid-cols-12">
          {/* Live preview */}
          <div className="bg-surface-container-lowest border-outline-variant relative flex min-h-[320px] flex-col items-center justify-center overflow-hidden border p-md sm:min-h-[400px] md:col-span-8">
            <div className="bg-surface-container border-outline relative aspect-4/5 w-full max-w-[256px] overflow-hidden rounded-lg border shadow-sm">
              <div
                role="img"
                aria-label={t('alt.processingPreview')}
                className="size-full bg-cover bg-center transition-all duration-1000"
                style={{
                  backgroundImage: `url("${images.processingPreview}")`,
                  filter: `grayscale(${100 - progress}%) contrast(${100 + progress / 2}%)`,
                  opacity: 0.6 + progress / 250,
                }}
              />

              {!isComplete && <div className="scan-line absolute left-0 z-10 w-full" />}

              <div className="bg-surface/30 absolute inset-0 flex items-center justify-center backdrop-blur-[2px]">
                <svg className="size-20 -rotate-90" viewBox="0 0 80 80" aria-hidden="true">
                  <circle
                    className="text-outline-variant"
                    cx="40"
                    cy="40"
                    r="36"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <circle
                    className="text-primary"
                    cx="40"
                    cy="40"
                    r="36"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeDasharray={RING_CIRCUMFERENCE}
                    strokeDashoffset={RING_CIRCUMFERENCE - (progress / 100) * RING_CIRCUMFERENCE}
                  />
                </svg>
                {/* aria-hidden: announcing this every frame would flood a screen reader.
                    The live region below reports the current operation instead. */}
                <span className="text-primary absolute text-sm font-bold" aria-hidden="true">
                  {rounded}%
                </span>
              </div>
            </div>

            <div className="mt-md w-full max-w-rail">
              <div className="bg-surface-container-high h-2 w-full overflow-hidden rounded">
                <div
                  className={cn('bg-primary h-full rounded', !isComplete && 'shimmer')}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Task list + compliance */}
          <div className="flex flex-col gap-md md:col-span-4">
            <div className="bg-surface-container-low border-outline-variant flex-1 rounded border p-md">
              <h2 className="font-label-md text-label-md text-outline mb-md tracking-wider uppercase">
                {t('processing.operations')}
              </h2>

              {/* Announces only when the active step changes. */}
              <p role="status" aria-live="polite" className="sr-only">
                {isComplete
                  ? t('processing.announceDone')
                  : t('processing.announceStep', {
                      current: activeIndex + 1,
                      total: processingTaskKeys.length,
                      label: t(processingTaskKeys[activeIndex] ?? processingTaskKeys[0]),
                    })}
              </p>

              <ul className="flex flex-col gap-sm">
                {processingTaskKeys.map((taskKey, index) => {
                  const status = taskStatuses[index]

                  return (
                    <li key={taskKey} className="flex items-center gap-xs">
                      <Icon
                        name={
                          status === 'complete'
                            ? 'check_circle'
                            : status === 'active'
                              ? 'progress_activity'
                              : 'radio_button_unchecked'
                        }
                        className={cn(
                          'shrink-0',
                          status === 'complete' && 'text-tertiary-container',
                          status === 'active' && 'text-primary animate-spin',
                          status === 'pending' && 'text-outline-variant',
                        )}
                      />
                      <span
                        className={cn(
                          'text-body-md',
                          status === 'complete' && 'text-tertiary-container',
                          status === 'active' && 'text-primary',
                          status === 'pending' && 'text-on-surface-variant opacity-60',
                        )}
                      >
                        {t(taskKey)}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="bg-primary-container text-on-primary-container rounded p-md">
              <div className="mb-sm flex items-center gap-xs">
                <Icon name="security" className="text-[18px]" />
                <span className="font-label-sm uppercase">{t('processing.complianceTitle')}</span>
              </div>
              {/* Standard identifiers — intentionally not translated. */}
              <div className="space-y-1 text-xs">
                <p>ICAO 9303 Standard</p>
                <p>ISO/IEC 19794-5</p>
                <p>Encryption: AES-256</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-lg flex justify-center sm:mt-xl">
          {isComplete ? (
            <Link
              to={href(ROUTES.download)}
              className="bg-primary text-on-primary hover:bg-primary-container font-label-md flex min-h-12 w-full items-center justify-center gap-sm rounded-lg px-lg transition-all active:scale-95 sm:w-auto"
            >
              <Icon name="download" />
              {t('processing.reviewCta')}
            </Link>
          ) : (
            <p className="bg-outline-variant text-on-surface-variant font-label-md flex min-h-12 w-full items-center justify-center gap-sm rounded-lg px-lg sm:w-auto">
              <Icon name="hourglass_top" className="animate-pulse" />
              {t('processing.wait', { count: secondsRemaining })}
            </p>
          )}
        </div>
      </div>
    </WorkflowLayout>
  )
}
