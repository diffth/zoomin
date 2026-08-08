import { Link } from 'react-router-dom'

import { Icon } from '@/components/ui/Icon'
import { workflowSteps, type WorkflowStepId } from '@/data/navigation'
import { useI18n } from '@/i18n/I18nProvider'
import { cn } from '@/lib/cn'

export type StepStatus = 'complete' | 'current' | 'upcoming'

export function getStepStatus(index: number, currentIndex: number): StepStatus {
  if (index < currentIndex) return 'complete'
  if (index === currentIndex) return 'current'
  return 'upcoming'
}

function useCurrentStepIndex(currentStep: WorkflowStepId): number {
  return workflowSteps.findIndex((step) => step.id === currentStep)
}

/** Desktop side rail — replaces the <aside> duplicated across the three legacy flow pages. */
export function WorkflowSideNav({ currentStep }: { currentStep: WorkflowStepId }) {
  const { t, href } = useI18n()
  const currentIndex = useCurrentStepIndex(currentStep)

  return (
    <aside className="bg-surface-container-low border-outline-variant sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 flex-col gap-sm border-r p-md lg:flex">
      <div className="mb-lg flex items-center gap-xs">
        <div className="bg-primary text-on-primary flex size-8 shrink-0 items-center justify-center rounded-pill">
          <Icon name="id_card" className="text-[18px]" />
        </div>
        <div>
          <div className="font-headline-md text-primary text-sm font-bold">zoomin</div>
          <div className="text-on-surface-variant text-xs">{t('workflow.tagline')}</div>
        </div>
      </div>

      <nav className="flex flex-col gap-xs" aria-label={t('workflow.stepsLabel')}>
        {workflowSteps.map((step, index) => {
          const status = getStepStatus(index, currentIndex)

          const content = (
            <>
              <Icon name={status === 'complete' ? 'check_circle' : step.icon} />
              {t(step.labelKey)}
            </>
          )

          const baseClass =
            'font-label-md text-label-md flex items-center gap-sm rounded-lg p-sm transition-all duration-200'

          if (status === 'current') {
            return (
              <span
                key={step.id}
                aria-current="step"
                className={cn(baseClass, 'bg-secondary-container text-on-secondary-container font-bold')}
              >
                {content}
              </span>
            )
          }

          if (status === 'upcoming') {
            return (
              <span
                key={step.id}
                aria-disabled="true"
                className={cn(baseClass, 'text-on-surface-variant cursor-not-allowed opacity-50')}
              >
                {content}
              </span>
            )
          }

          return (
            <Link
              key={step.id}
              to={href(step.segment)}
              className={cn(baseClass, 'text-on-surface-variant hover:bg-surface-container-high')}
            >
              {content}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

/**
 * Mobile equivalent of the side rail. The legacy pages simply hid the <aside>
 * below `lg`, leaving phone users with no sense of where they were in the flow.
 */
export function WorkflowStepBar({ currentStep }: { currentStep: WorkflowStepId }) {
  const { t } = useI18n()
  const currentIndex = useCurrentStepIndex(currentStep)

  return (
    <div className="bg-surface-container-low border-outline-variant sticky top-16 z-40 border-b lg:hidden">
      <div
        className="flex snap-x snap-mandatory gap-xs overflow-x-auto px-gutter py-xs [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label={t('workflow.stepsLabel')}
      >
        {workflowSteps.map((step, index) => {
          const status = getStepStatus(index, currentIndex)

          return (
            <div
              key={step.id}
              aria-current={status === 'current' ? 'step' : undefined}
              className={cn(
                'font-label-md text-label-md flex min-h-9 shrink-0 snap-start items-center gap-xs rounded-lg px-xs',
                status === 'current' && 'bg-secondary-container text-on-secondary-container font-bold',
                status === 'complete' && 'text-tertiary-container',
                status === 'upcoming' && 'text-on-surface-variant opacity-50',
              )}
            >
              <Icon
                name={status === 'complete' ? 'check_circle' : step.icon}
                className="text-[18px]"
              />
              {t(step.labelKey)}
            </div>
          )
        })}
      </div>
    </div>
  )
}
