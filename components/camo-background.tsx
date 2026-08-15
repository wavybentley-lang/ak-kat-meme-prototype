import { cn } from '@/lib/utils'

/**
 * Refined camouflage language: layered olive blocks, faint tactical grid,
 * contour lines and film grain. Meant to be perceived subconsciously and
 * never compete with foreground copy or CTAs.
 */
export function CamoBackground({
  className,
  contours = true,
  grid = true,
}: {
  className?: string
  contours?: boolean
  grid?: boolean
}) {
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div className="texture-camo absolute inset-0" />
      {grid && <div className="texture-grid absolute inset-0 opacity-60" />}
      {contours && (
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.07]"
          viewBox="0 0 800 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <g fill="none" stroke="var(--color-moss)" strokeWidth="1">
            <path d="M-40 120 C 160 40, 320 200, 520 120 S 900 40, 900 120" />
            <path d="M-40 220 C 180 140, 340 300, 540 220 S 900 140, 900 220" />
            <path d="M-40 340 C 200 260, 360 420, 560 340 S 900 260, 900 340" />
            <path d="M-40 470 C 180 390, 380 560, 580 470 S 900 390, 900 470" />
            <path d="M-40 600 C 200 520, 360 700, 560 600 S 900 520, 900 600" />
            <path d="M-40 720 C 180 640, 380 820, 580 720 S 900 640, 900 720" />
          </g>
        </svg>
      )}
      <div className="texture-grain absolute inset-0" />
    </div>
  )
}
