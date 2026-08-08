import { useEffect, useRef, useState, type ReactNode } from 'react'

import { cn } from '@/lib/cn'

type RevealProps = {
  children: ReactNode
  className?: string
}

/**
 * Fade/slide a section in on first scroll into view — the React equivalent of the
 * IntersectionObserver snippet the legacy landing page ran over every <section>.
 */
export function Reveal({ children, className }: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className={cn(
        'transition-all duration-700',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
        className,
      )}
    >
      {children}
    </section>
  )
}
