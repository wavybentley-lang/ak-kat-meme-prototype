import { Navigation } from '@/components/navigation'
import { Hero } from '@/components/hero'
import { SectionLabel } from '@/components/section-label'

export default function Page() {
  return (
    <main className="relative bg-background text-foreground">
      <Navigation />
      <Hero />

      {/* Scroll target stub — the Reels / "The Viral Cat" section lands here in the next phase. */}
      <section
        id="the-cat"
        className="relative flex min-h-[60vh] flex-col items-center justify-center gap-4 border-t border-border bg-charcoal px-6 py-24 text-center"
      >
        <SectionLabel>Recovered Footage / Incoming</SectionLabel>
        <h2 className="font-display text-5xl uppercase tracking-tight text-offwhite md:text-7xl">
          Yes. The Cat Is Real.
        </h2>
        <p className="max-w-md text-pretty font-sans text-dust">
          Design system and hero are locked in. The viral reels, lore, and final
          conversion sections deploy in the next phase.
        </p>
      </section>
    </main>
  )
}
