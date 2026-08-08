import { footerNav } from '@/data/navigation'
import { useI18n } from '@/i18n/I18nProvider'
import { cn } from '@/lib/cn'

type FooterProps = {
  /** The workflow screens sat on a tinted footer; the marketing page used a plain rule. */
  variant?: 'plain' | 'contained'
}

export function Footer({ variant = 'plain' }: FooterProps) {
  const { t } = useI18n()

  return (
    <footer
      className={cn(
        'border-outline-variant w-full border-t',
        variant === 'contained' && 'bg-surface-container-highest',
      )}
    >
      <div className="mx-auto flex w-full max-w-page flex-col items-center justify-between gap-md px-gutter py-lg md:flex-row">
        <div className="flex flex-col items-center gap-xs md:items-start">
          <span className="font-label-md text-label-md text-on-surface font-bold">zoomin</span>
          <p className="font-label-sm text-label-sm text-on-surface-variant text-center md:text-left">
            {t('footer.copyright')}
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-md gap-y-xs">
          {footerNav.map((item) => (
            <a
              key={item.labelKey}
              href="#"
              className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary underline opacity-80 transition-opacity hover:opacity-100"
            >
              {t(item.labelKey)}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
