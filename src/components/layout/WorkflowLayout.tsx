import type { ReactNode } from 'react'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { WorkflowSideNav, WorkflowStepBar } from '@/components/layout/WorkflowStepNav'
import type { WorkflowStepId } from '@/data/navigation'

type WorkflowLayoutProps = {
  currentStep: WorkflowStepId
  children: ReactNode
}

/** Shell for the three conversion screens: header, step rail, content, footer. */
export function WorkflowLayout({ currentStep, children }: WorkflowLayoutProps) {
  return (
    <div className="bg-surface-container-low flex min-h-screen flex-col">
      <Header />
      <WorkflowStepBar currentStep={currentStep} />

      <div className="mx-auto flex w-full max-w-page flex-1">
        <WorkflowSideNav currentStep={currentStep} />
        {/* `min-w-0` keeps wide children (tables, previews) from blowing out the flex row. */}
        <main className="bg-surface-bright w-full min-w-0 flex-1 px-gutter py-md sm:py-lg">
          {children}
        </main>
      </div>

      <Footer variant="contained" />
    </div>
  )
}
