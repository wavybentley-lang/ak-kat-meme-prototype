'use client'

import Image from 'next/image'
import { AkButton } from '@/components/ak-button'
import { SectionLabel } from '@/components/section-label'
import { AK_KAT } from '@/lib/ak-config'

export function FinalConversion() {
  return (
    <section
      id="acquire"
      className="relative flex min-h-[92vh] items-center overflow-hidden border-t border-border"
    >
      {/* AK-KAT portrait, darkened, right-anchored on desktop */}
      <div className="absolute inset-0">
        <Image
          src="/ak-kat-hero.png"
          alt=""
          aria-hidden
          fill
          className="object-cover object-center opacity-40 md:object-right"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-5 py-24">
        <SectionLabel accent="signal">SECTION 04 // FINAL ORDERS</SectionLabel>

        <h2 className="mt-4 max-w-3xl text-balance font-display text-6xl uppercase leading-[0.85] text-offwhite md:text-9xl">
          Are you still fading?
        </h2>

        <p className="mt-6 max-w-md text-pretty font-sans text-lg leading-relaxed text-muted-foreground">
          That&apos;s a lot of confidence for someone standing this close to an
          AK.
        </p>

        <div className="mt-10 flex flex-col items-start gap-5">
          <AkButton
            as="a"
            href={AK_KAT.dexScreenerUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="signal"
            size="xl"
          >
            GIVE ME AN AK
          </AkButton>

          <a
            href={AK_KAT.xUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-[0.2em] text-dust transition-colors hover:text-offwhite"
          >
            JUST HERE FOR THE MEMES → X
          </a>
        </div>
      </div>
    </section>
  )
}
