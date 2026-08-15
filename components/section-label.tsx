import { cn } from '@/lib/utils'

/**
 * Small tactical/monospace label used to number and tag sections,
 * e.g. "RECOVERED FOOTAGE / 001" or "SECTION 01 // HERO".
 */
export function SectionLabel({
  children,
  className,
  accent = 'signal',
}: {
  children: React.ReactNode
  className?: string
  accent?: 'signal' | 'bow' | 'dust'
}) {
  const dot =
    accent === 'bow' ? 'bg-bow' : accent === 'dust' ? 'bg-dust' : 'bg-signal'
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-dust',
        className,
      )}
    >
      <span className={cn('h-1.5 w-1.5', dot)} />
      {children}
    </span>
  )
}
