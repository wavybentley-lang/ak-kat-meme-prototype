'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { AkButton } from '@/components/ak-button'
import { AK_KAT } from '@/lib/ak-config'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'THE CAT', href: '#the-cat' },
  { label: 'LORE', href: '#lore' },
  { label: 'X', href: AK_KAT.xUrl, external: true },
]

export function Navigation() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
          scrolled ? 'border-b border-border bg-night/85 backdrop-blur-md' : 'border-b border-transparent',
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          <a href="#top" className="group flex items-center gap-2" aria-label="AK-KAT home">
            <span className="font-display text-3xl leading-none tracking-wide text-offwhite">
              AK<span className="text-signal">-</span>KAT
            </span>
          </a>

          {/* Desktop */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.external ? '_blank' : undefined}
                rel={l.external ? 'noreferrer' : undefined}
                className="font-mono text-xs uppercase tracking-[0.24em] text-dust transition-colors hover:text-offwhite"
              >
                {l.label}
              </a>
            ))}
            <AkButton
              as="a"
              href={AK_KAT.dexScreenerUrl}
              target="_blank"
              rel="noreferrer"
              variant="signal"
              size="sm"
            >
              GET AK-KAT
            </AkButton>
          </div>

          {/* Mobile trigger */}
          <div className="flex items-center gap-3 md:hidden">
            <AkButton
              as="a"
              href={AK_KAT.dexScreenerUrl}
              target="_blank"
              rel="noreferrer"
              variant="signal"
              size="sm"
              brackets={false}
            >
              GET AK-KAT
            </AkButton>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center border border-border text-offwhite"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 border-b border-border bg-night/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.external ? '_blank' : undefined}
                  rel={l.external ? 'noreferrer' : undefined}
                  onClick={() => setOpen(false)}
                  className="border-b border-border/60 py-3 font-mono text-sm uppercase tracking-[0.22em] text-dust"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
