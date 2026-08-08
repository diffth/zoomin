import type { TranslationKey } from '@/i18n/en'
import { ROUTES, type RouteSegment } from '@/i18n/paths'

export type NavLink = {
  labelKey: TranslationKey
  /** A route segment navigates in-app; `#` marks a not-yet-built placeholder. */
  segment?: RouteSegment
}

export const primaryNav: NavLink[] = [
  { labelKey: 'nav.howItWorks', segment: ROUTES.home },
  { labelKey: 'nav.pricing' },
  { labelKey: 'nav.myPhotos', segment: ROUTES.myPhotos },
]

export const footerNav: NavLink[] = [
  { labelKey: 'footer.privacy' },
  { labelKey: 'footer.terms' },
  { labelKey: 'footer.help' },
  { labelKey: 'footer.contact' },
]

export type WorkflowStepId = 'upload' | 'adjust' | 'verify' | 'download'

export type WorkflowStep = {
  id: WorkflowStepId
  labelKey: TranslationKey
  icon: string
  segment: RouteSegment
}

/** The four-stage conversion flow rendered by the side rail / mobile step bar. */
export const workflowSteps: WorkflowStep[] = [
  { id: 'upload', labelKey: 'workflow.upload', icon: 'cloud_upload', segment: ROUTES.upload },
  { id: 'adjust', labelKey: 'workflow.adjust', icon: 'tune', segment: ROUTES.myPhotos },
  { id: 'verify', labelKey: 'workflow.verify', icon: 'verified_user', segment: ROUTES.myPhotos },
  { id: 'download', labelKey: 'workflow.download', icon: 'download', segment: ROUTES.download },
]
