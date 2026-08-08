import { useLocation, useNavigate } from 'react-router-dom'

import { Icon } from '@/components/ui/Icon'
import { LOCALE_LABELS, storeLocale, SUPPORTED_LOCALES, type Locale } from '@/i18n/config'
import { useI18n } from '@/i18n/I18nProvider'
import { switchLocaleInPath } from '@/i18n/paths'
import { cn } from '@/lib/cn'

type LanguageSwitcherProps = {
  /** `bar` is the inline desktop control; `stacked` fills the mobile drawer. */
  variant?: 'bar' | 'stacked'
}

export function LanguageSwitcher({ variant = 'bar' }: LanguageSwitcherProps) {
  const { locale, t } = useI18n()
  const navigate = useNavigate()
  const { pathname, search, hash } = useLocation()

  const change = (next: Locale) => {
    if (next === locale) return
    storeLocale(next)
    // Keep the reader on the same page, just under the other locale prefix.
    navigate(`${switchLocaleInPath(pathname, next)}${search}${hash}`, { replace: true })
  }

  if (variant === 'stacked') {
    return (
      <div className="border-outline-variant mt-xs border-t pt-xs">
        <p className="font-label-sm text-label-sm text-on-surface-variant px-xs pb-xs tracking-wider uppercase">
          {t('nav.language')}
        </p>
        <div className="flex gap-xs">
          {SUPPORTED_LOCALES.map((code) => (
            <button
              key={code}
              type="button"
              lang={code}
              onClick={() => change(code)}
              aria-current={code === locale ? 'true' : undefined}
              className={cn(
                'font-label-md text-label-md flex min-h-11 flex-1 items-center justify-center rounded-lg transition-colors',
                code === locale
                  ? 'bg-primary text-on-primary font-bold'
                  : 'border-outline-variant text-on-surface-variant hover:bg-surface-container border',
              )}
            >
              {LOCALE_LABELS[code]}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      role="group"
      aria-label={t('nav.selectLanguage')}
      className="border-outline-variant flex items-center gap-1 rounded-lg border p-0.5"
    >
      <Icon name="language" className="text-on-surface-variant ml-1 text-[18px]" />
      {SUPPORTED_LOCALES.map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          onClick={() => change(code)}
          aria-current={code === locale ? 'true' : undefined}
          className={cn(
            'font-label-sm text-label-sm rounded px-xs py-1 transition-colors',
            code === locale
              ? 'bg-primary text-on-primary font-bold'
              : 'text-on-surface-variant hover:text-primary hover:bg-surface-container',
          )}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
