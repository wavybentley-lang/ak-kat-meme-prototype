'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export type Reel = {
  id: string
  index: string
  src?: string
  poster?: string
  caption: string
}

/**
 * A single "recovered footage" reel. Renders a real lazy <video> when a src is
 * provided (muted autoplay, IntersectionObserver-gated, click to toggle sound),
 * and a tactical placeholder frame when footage has not been dropped in yet.
 */
export function ReelCard({
  reel,
  active,
  dimmed,
  onActivate,
  onPin,
}: {
  reel: Reel
  active: boolean
  dimmed: boolean
  onActivate: () => void
  onPin: () => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [muted, setMuted] = useState(true)

  // Only load/decode when the reel is actually near the viewport.
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio > 0.5),
      { threshold: [0, 0.5, 1] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Play only when visible and explicitly hovered or pinned.
  useEffect(() => {
    const v = videoRef.current
    if (!v || !reel.src) return
    const shouldPlay = inView && active
    if (shouldPlay) {
      v.play().catch(() => {})
    } else {
      v.pause()
    }
  }, [inView, active, dimmed, reel.src])

  function toggleSound() {
    const v = videoRef.current
    if (!v) return
    const next = !muted
    setMuted(next)
    v.muted = next
    if (!next) v.play().catch(() => {})
  }

  return (
    <button
      ref={wrapRef as never}
      type="button"
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={reel.src ? () => {
        onPin()
        toggleSound()
      } : onActivate}
      className={cn(
        'group relative block aspect-[9/16] w-full overflow-hidden border border-border bg-charcoal text-left transition-all duration-500',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        dimmed ? 'opacity-45 saturate-50' : 'opacity-100',
        active && 'md:-translate-y-1 md:shadow-[0_0_0_1px_rgba(0,200,83,0.5)]',
      )}
      aria-label={`Recovered footage ${reel.index}: ${reel.caption}`}
    >
      {reel.src ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={reel.src}
          poster={reel.poster}
          muted={muted}
          loop
          playsInline
          preload="none"
        />
      ) : (
        <PlaceholderFeed />
      )}

      {/* Scanline + vignette overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-background/40" />
      <div
        className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 3px)',
        }}
      />

      {/* Top metadata bar */}
      <div className="absolute left-0 right-0 top-0 flex items-center justify-between p-3 font-mono text-[10px] uppercase tracking-[0.18em]">
        <span className="text-signal">REC ● {reel.index}</span>
        <span className="text-dust">SRC: IG</span>
      </div>

      {/* Corner brackets */}
      <span className="pointer-events-none absolute left-2 top-8 h-3 w-3 border-l border-t border-dust/60" />
      <span className="pointer-events-none absolute right-2 top-8 h-3 w-3 border-r border-t border-dust/60" />
      <span className="pointer-events-none absolute bottom-14 left-2 h-3 w-3 border-b border-l border-dust/60" />
      <span className="pointer-events-none absolute bottom-14 right-2 h-3 w-3 border-b border-r border-dust/60" />

      {/* Bottom caption + status */}
      <div className="absolute inset-x-0 bottom-0 p-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-signal">
          STATUS: CONFIRMED
        </p>
        <p className="mt-1 font-display text-lg uppercase leading-tight text-offwhite">
          {reel.caption}
        </p>
        {reel.src && (
          <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-dust">
            {muted ? 'TAP FOR AUDIO' : 'AUDIO LIVE'}
          </p>
        )}
      </div>
    </button>
  )
}

function PlaceholderFeed() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_50%_35%,var(--color-forest),var(--color-charcoal))]">
      <div className="h-8 w-8 animate-pulse rounded-full border border-dashed border-dust/50" />
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-dust/70">
        FEED STANDBY
      </p>
    </div>
  )
}
