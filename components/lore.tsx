'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { SectionLabel } from '@/components/section-label'
import { cn } from '@/lib/utils'

function AllyFrame({
  codename,
  role,
  glyph,
  className,
}: {
  codename: string
  role: string
  glyph: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative flex aspect-[3/4] w-full flex-col items-center justify-center overflow-hidden border border-border bg-[radial-gradient(circle_at_50%_30%,var(--color-forest),var(--color-charcoal))] p-6 text-center',
        className,
      )}
    >
      <span className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l border-t border-dust/50" />
      <span className="pointer-events-none absolute right-2 top-2 h-3 w-3 border-r border-t border-dust/50" />
      <span className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-b border-l border-dust/50" />
      <span className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b border-r border-dust/50" />
      <span aria-hidden className="font-display text-7xl leading-none text-dust/40">
        {glyph}
      </span>
      <p className="mt-4 font-display text-3xl uppercase leading-none text-offwhite">
        {codename}
      </p>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-dust">
        {role}
      </p>
    </div>
  )
}

export function Lore() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // AK-KAT scales up and rises as the section scrolls through.
  const scale = useTransform(scrollYProgress, [0.1, 0.6], [0.85, 1.15])
  const y = useTransform(scrollYProgress, [0.1, 0.7], [60, -40])
  const opacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 1])

  return (
    <section
      ref={ref}
      id="the-cat"
      className="relative border-t border-border py-20 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-5">
        <header className="mx-auto max-w-3xl text-center">
          <SectionLabel accent="bow" className="justify-center">
            SECTION 03 // THE LORE
          </SectionLabel>
          <h2 className="mt-4 text-balance font-display text-5xl uppercase leading-[0.88] text-offwhite md:text-8xl">
            Why does a cat
            <br />
            need an AK?
          </h2>
          <p className="mt-6 text-pretty font-sans text-lg leading-relaxed text-muted-foreground">
            Some cats are worth protecting.
          </p>
        </header>

        {/* Desktop: allies flank, AK-KAT dominates center. Mobile: sequential. */}
        <div className="mt-14 grid grid-cols-1 items-center gap-6 md:mt-20 md:grid-cols-3 md:gap-4">
          <div className="mx-auto w-full max-w-xs md:max-w-none md:pt-16">
            <AllyFrame codename="Thinking Cat" role="Strategy · The Brain" glyph="?" />
          </div>

          <div className="relative mx-auto w-full max-w-sm md:order-none md:max-w-none">
            <motion.div
              style={
                reduce
                  ? undefined
                  : { scale, y, opacity }
              }
              className="relative aspect-[3/4] w-full overflow-hidden border border-signal/40 bg-charcoal shadow-[0_0_60px_-15px_rgba(0,200,83,0.5)]"
            >
              <Image
                src="/ak-kat-hero.png"
                alt="AK-KAT, the tactical bodyguard cat, standing guard"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 90vw, 33vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-center">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-signal">
                  ASSET // AK-KAT
                </p>
                <p className="font-display text-2xl uppercase text-offwhite">
                  The Bodyguard
                </p>
              </div>
            </motion.div>
          </div>

          <div className="mx-auto w-full max-w-xs md:max-w-none md:pt-16">
            <AllyFrame codename="Cashcat" role="Liquidity · The Bag" glyph="$" />
          </div>
        </div>

        {/* Lore payoff */}
        <div className="mx-auto mt-16 max-w-md text-center font-mono text-sm uppercase leading-loose tracking-[0.14em] text-dust md:mt-24">
          <p className="text-offwhite">Thinking Cat thinks.</p>
          <p className="text-offwhite">Cashcat handles the bag.</p>
          <p className="mt-2 text-signal">AK-KAT handles security.</p>
        </div>
      </div>
    </section>
  )
}
