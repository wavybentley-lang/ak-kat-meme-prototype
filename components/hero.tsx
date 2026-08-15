'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { AkButton } from '@/components/ak-button'
import { CamoBackground } from '@/components/camo-background'
import { TacticalMetadata } from '@/components/tactical-metadata'
import { AK_KAT } from '@/lib/ak-config'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '14%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '40%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col items-center justify-end overflow-hidden bg-night"
    >
      <CamoBackground contours grid />

      {/* AK-KAT character */}
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
        <Image
          src="/ak-kat-hero.png"
          alt="AK-KAT, a tactical cat in military gear with a pink bow, holding a rifle"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Readability gradient */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-night via-night/50 to-night/70"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_120%,rgba(0,200,83,0.18),transparent_70%)]"
      />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-28 md:px-8 md:pb-24"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <TacticalMetadata
              className="justify-center"
              items={[
                { label: 'DEPLOYED ON', value: AK_KAT.network },
                { label: 'STATUS', value: 'ACTIVE', status: true },
              ]}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-shadow-tactical mt-4 font-display text-[24vw] font-semibold leading-[0.82] tracking-tight text-offwhite sm:text-[20vw] md:text-[16rem]"
          >
            AK<span className="text-signal">-</span>KAT
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-2 max-w-md text-pretty font-sans text-base text-dust md:text-lg"
          >
            The viral cat with a rifle. Bodyguard by trade. Meme by nature.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
          >
            <AkButton as="a" href="#footage" variant="outline" size="md">
              WTF IS THIS?
            </AkButton>
            <AkButton
              as="a"
              href={AK_KAT.dexScreenerUrl}
              target="_blank"
              rel="noreferrer"
              variant="signal"
              size="md"
            >
              GET AK-KAT
            </AkButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-5 left-1/2 z-10 -translate-x-1/2">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-dust/70">
          Scroll // Recon
        </span>
      </div>
    </section>
  )
}
