import { useEffect, useId, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'
import { Icon } from '@/components/ui/Icon'
import { primaryNav } from '@/data/navigation'
import { useI18n } from '@/i18n/I18nProvider'
import { ROUTES } from '@/i18n/paths'
import { cn } from '@/lib/cn'

export function Header() {
  const { t, href } = useI18n()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuId = useId()
  const { pathname } = useLocation()

  // Close the drawer on navigation so the panel never covers the new page.
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isMenuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isMenuOpen])

  const desktopLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'font-body-md text-body-md transition-colors duration-200',
      isActive
        ? 'text-primary font-bold border-b-2 border-primary pb-1'
        : 'text-on-surface-variant hover:text-primary',
    )

  const mobileLinkClass =
    'font-body-md text-body-md flex min-h-11 items-center rounded-lg px-xs transition-colors'

  return (
    <header className="bg-surface border-outline-variant sticky top-0 z-50 w-full border-b">
      <div className="mx-auto flex h-16 w-full max-w-page items-center justify-between px-gutter">
        <Link to={href()} className="font-headline-md text-headline-md text-primary font-bold">
          zoomin
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-md md:flex">
          <nav className="flex items-center gap-md">
            {primaryNav.map((item) =>
              item.segment === undefined ? (
                <a
                  key={item.labelKey}
                  href="#"
                  className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors duration-200"
                >
                  {t(item.labelKey)}
                </a>
              ) : (
                <NavLink key={item.labelKey} to={href(item.segment)} end className={desktopLinkClass}>
                  {t(item.labelKey)}
                </NavLink>
              ),
            )}
          </nav>

          <LanguageSwitcher />

          <Link
            to={href(ROUTES.upload)}
            className="bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md rounded-lg px-md py-xs transition-all duration-200"
          >
            {t('nav.getStarted')}
          </Link>
        </div>

        {/* Mobile trigger — the legacy markup rendered this button but never wired it up. */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls={menuId}
          aria-label={isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
          className="text-primary hover:bg-surface-container -mr-2 flex size-11 items-center justify-center rounded-lg transition-colors md:hidden"
        >
          <Icon name={isMenuOpen ? 'close' : 'menu'} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        id={menuId}
        hidden={!isMenuOpen}
        className="bg-surface border-outline-variant border-t md:hidden"
      >
        <nav className="mx-auto flex w-full max-w-page flex-col px-gutter py-xs">
          {primaryNav.map((item) =>
            item.segment === undefined ? (
              <a
                key={item.labelKey}
                href="#"
                className={cn(mobileLinkClass, 'text-on-surface-variant hover:bg-surface-container')}
              >
                {t(item.labelKey)}
              </a>
            ) : (
              <NavLink
                key={item.labelKey}
                to={href(item.segment)}
                end
                className={({ isActive }) =>
                  cn(
                    mobileLinkClass,
                    isActive
                      ? 'text-primary bg-primary-fixed/40 font-bold'
                      : 'text-on-surface-variant hover:bg-surface-container',
                  )
                }
              >
                {t(item.labelKey)}
              </NavLink>
            ),
          )}

          <Link
            to={href(ROUTES.upload)}
            className="bg-primary text-on-primary font-label-md text-label-md my-xs flex min-h-11 items-center justify-center rounded-lg px-md"
          >
            {t('nav.getStarted')}
          </Link>

          <LanguageSwitcher variant="stacked" />
        </nav>
      </div>
    </header>
  )
}
