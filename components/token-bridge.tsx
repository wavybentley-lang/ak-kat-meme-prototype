'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { SectionLabel } from '@/components/section-label'
import { AK_KAT } from '@/lib/ak-config'
import { cn } from '@/lib/utils'

function shorten(addr: string) {
  if (addr.length <= 14) return addr
  return `${addr.slice(0, 8)}…${addr.slice(-6)}`
}

export function TokenBridge() {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(AK_KAT.contract)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked (e.g. in-app browser) — select fallback could go here.
    }
  }

  const rows = [
    { label: 'TOKEN', value: AK_KAT.name },
    { label: 'NETWORK', value: AK_KAT.network },
    { label: 'CA', value: shorten(AK_KAT.contract), mono: true },
  ]

  return (
    <section id="token" className="relative border-t border-border py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-5">
        <div className="relative border border-border bg-charcoal/60 p-6 md:p-10">
          <span className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l border-t border-signal/60" />
          <span className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r border-t border-signal/60" />
          <span className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b border-l border-signal/60" />
          <span className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b border-r border-signal/60" />

          <SectionLabel accent="dust">DEPLOYMENT MANIFEST</SectionLabel>

          <dl className="mt-6 divide-y divide-border/70">
            {rows.map((r) => (
              <div
                key={r.label}
                className="flex items-center justify-between gap-4 py-3"
              >
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-dust">
                  {r.label}
                </dt>
                <dd
                  className={cn(
                    'text-right text-offwhite',
                    r.mono ? 'font-mono text-sm' : 'font-display text-2xl uppercase',
                  )}
                >
                  {r.value}
                </dd>
              </div>
            ))}
          </dl>

          <button
            type="button"
            onClick={copy}
            aria-live="polite"
            className={cn(
              'mt-6 flex w-full items-center justify-center gap-2 border py-4 font-display text-2xl uppercase tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              copied
                ? 'border-signal bg-signal/15 text-signal'
                : 'border-border bg-transparent text-offwhite hover:border-signal hover:text-signal',
            )}
          >
            {copied ? 'COPIED' : 'COPY CA'}
          </button>

          <div className="mt-4 flex items-center justify-center gap-6 font-mono text-[11px] uppercase tracking-[0.18em]">
            <a
              href={AK_KAT.dexScreenerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-dust transition-colors hover:text-signal"
            >
              DexScreener <ArrowUpRight className="h-3 w-3" />
            </a>
            <a
              href={AK_KAT.xUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-dust transition-colors hover:text-signal"
            >
              X <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
