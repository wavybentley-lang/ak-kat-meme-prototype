'use client'

import { useState } from 'react'
import { SectionLabel } from '@/components/section-label'
import { ReelCard, type Reel } from '@/components/reel-card'

// Drop real source files into /public/reels and set `src`/`poster` here.
const REELS: Reel[] = [
  { id: 'r1', index: '001', caption: 'Perimeter secured', src: undefined },
  { id: 'r2', index: '002', caption: 'No sudden moves', src: undefined },
  { id: 'r3', index: '003', caption: 'Threat neutralized', src: undefined },
  { id: 'r4', index: '004', caption: 'Still fading?', src: undefined },
]

export function Reels() {
  // -1 = none dominant (all play muted on mobile); >=0 = that index is dominant.
  const [active, setActive] = useState<number>(-1)

  return (
    <section id="footage" className="relative border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <header className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel accent="signal">RECOVERED FOOTAGE / ARCHIVE</SectionLabel>
            <h2 className="mt-3 max-w-2xl text-balance font-display text-5xl uppercase leading-[0.9] text-offwhite md:text-7xl">
              The internet already met him.
            </h2>
          </div>
          <p className="max-w-xs font-mono text-xs uppercase leading-relaxed tracking-[0.14em] text-dust">
            Four confirmed sightings. Recovered, catalogued, and cleared for
            distribution.
          </p>
        </header>

        <div
          className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
          onMouseLeave={() => setActive(-1)}
        >
          {REELS.map((reel, i) => (
            <ReelCard
              key={reel.id}
              reel={reel}
              active={active === i}
              dimmed={active !== -1 && active !== i}
              onActivate={() => setActive(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
