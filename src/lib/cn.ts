type ClassValue = string | false | null | undefined

/** Joins conditional class names. Keeps `className` merging readable in JSX. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ')
}
