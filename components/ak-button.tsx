import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const akButton = cva(
  'group relative inline-flex select-none items-center justify-center gap-2 font-display uppercase tracking-wide leading-none transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // Primary conversion — used sparingly so signal green keeps its power.
        signal:
          'bg-signal text-primary-foreground hover:bg-signal/90 shadow-[0_0_0_1px_rgba(0,200,83,0.4)]',
        // Outline tactical action.
        outline:
          'border border-border bg-transparent text-offwhite hover:border-signal hover:text-signal',
        // Quiet ghost link-style.
        ghost: 'bg-transparent text-dust hover:text-offwhite',
      },
      size: {
        sm: 'h-9 px-4 text-lg',
        md: 'h-12 px-6 text-2xl',
        lg: 'h-16 px-10 text-4xl',
        xl: 'h-20 px-14 text-5xl md:text-6xl',
      },
    },
    defaultVariants: { variant: 'signal', size: 'md' },
  },
)

type Common = VariantProps<typeof akButton> & {
  /** Show animated tactical corner brackets on hover. */
  brackets?: boolean
  className?: string
  children: React.ReactNode
}

function Brackets() {
  return (
    <>
      <span className="pointer-events-none absolute left-0 top-0 h-2.5 w-2.5 border-l border-t border-current opacity-0 transition-all duration-200 group-hover:-left-1 group-hover:-top-1 group-hover:opacity-100" />
      <span className="pointer-events-none absolute right-0 top-0 h-2.5 w-2.5 border-r border-t border-current opacity-0 transition-all duration-200 group-hover:-right-1 group-hover:-top-1 group-hover:opacity-100" />
      <span className="pointer-events-none absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l border-current opacity-0 transition-all duration-200 group-hover:-bottom-1 group-hover:-left-1 group-hover:opacity-100" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-2.5 w-2.5 border-b border-r border-current opacity-0 transition-all duration-200 group-hover:-bottom-1 group-hover:-right-1 group-hover:opacity-100" />
    </>
  )
}

type ButtonProps = Common &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    as?: 'button'
  }

type AnchorProps = Common &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> & {
    as: 'a'
  }

export function AkButton(props: ButtonProps | AnchorProps) {
  const { variant, size, brackets = true, className, children } = props

  if (props.as === 'a') {
    const { as: _a, variant: _v, size: _s, brackets: _b, className: _c, children: _ch, ...rest } = props
    return (
      <a className={cn(akButton({ variant, size }), className)} {...rest}>
        {brackets && <Brackets />}
        {children}
      </a>
    )
  }

  const { as: _a, variant: _v, size: _s, brackets: _b, className: _c, children: _ch, ...rest } =
    props as ButtonProps
  return (
    <button className={cn(akButton({ variant, size }), className)} {...rest}>
      {brackets && <Brackets />}
      {children}
    </button>
  )
}
