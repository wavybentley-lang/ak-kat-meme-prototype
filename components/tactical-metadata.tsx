import { cn } from '@/lib/utils'

type Item = { label: string; value: string; status?: boolean }

/**
 * Monospace key/value strip for tactical interface metadata,
 * e.g. NETWORK: ROBINHOOD CHAIN · STATUS: ACTIVE.
 */
export function TacticalMetadata({
  items,
  className,
}: {
  items: Item[]
  className?: string
}) {
  return (
    <dl
      className={cn(
        'flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-dust',
        className,
      )}
    >
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <dt className="text-muted-foreground/70">{item.label}:</dt>
          <dd className="flex items-center gap-1.5 text-offwhite">
            {item.status && (
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
              </span>
            )}
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}
