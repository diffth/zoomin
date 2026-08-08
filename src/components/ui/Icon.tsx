import { cn } from '@/lib/cn'

type IconProps = {
  /** Material Symbols ligature name, e.g. `cloud_upload`. */
  name: string
  /** Renders the filled variant (legacy pages did this inline with font-variation-settings). */
  filled?: boolean
  className?: string
}

export function Icon({ name, filled = false, className }: IconProps) {
  return (
    <span aria-hidden="true" className={cn('material-symbols-outlined', filled && 'is-filled', className)}>
      {name}
    </span>
  )
}
