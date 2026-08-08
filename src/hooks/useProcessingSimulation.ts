import { useEffect, useState } from 'react'

import type { TranslationKey } from '@/i18n/en'

export const processingTaskKeys: TranslationKey[] = [
  'processing.task1',
  'processing.task2',
  'processing.task3',
  'processing.task4',
]

const DURATION_MS = 12_000

/**
 * Animates the demo conversion progress. The legacy page ran the progress ring on
 * requestAnimationFrame while the task list ran on independent setTimeouts, so the
 * two could disagree; here the task states are derived from a single progress value.
 */
export function useProcessingSimulation(taskCount = processingTaskKeys.length) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    let start: number | null = null

    const tick = (timestamp: number) => {
      start ??= timestamp

      const elapsed = timestamp - start
      const next = Math.min(100, (elapsed / DURATION_MS) * 100)
      setProgress(next)

      if (next < 100) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  const bandSize = 100 / taskCount
  const activeIndex = Math.min(taskCount - 1, Math.floor(progress / bandSize))
  const isComplete = progress >= 100

  const taskStatuses = Array.from({ length: taskCount }, (_, index) => {
    if (isComplete || index < activeIndex) return 'complete' as const
    if (index === activeIndex) return 'active' as const
    return 'pending' as const
  })

  const secondsRemaining = Math.ceil(((100 - progress) / 100) * (DURATION_MS / 1000))

  return { progress, taskStatuses, isComplete, secondsRemaining }
}
