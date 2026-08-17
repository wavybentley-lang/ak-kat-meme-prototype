import { AK_KAT } from '@/lib/ak-config'
import { ScrollReveal } from '@/components/scroll-reveal'

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-8">
      <ScrollReveal
        className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 text-center md:flex-row md:justify-between md:text-left"
        delay={0.1}
      >
        <span className="font-display text-xl uppercase tracking-wide text-offwhite">
          AK-KAT
        </span>
        <nav className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.18em] text-dust">
          <a
            href={AK_KAT.xUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-signal"
          >
            X
          </a>
          <a
            href={AK_KAT.dexScreenerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-signal"
          >
            DexScreener
          </a>
          <span className="text-muted-foreground/70">{AK_KAT.network}</span>
        </nav>
      </ScrollReveal>
    </footer>
  )
}
