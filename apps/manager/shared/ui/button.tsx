import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/shared/utils'

// Button typography: uppercase, text-xs, font-bold, tracking-wider.
// Layered shadow + active translate-y come from the daisy-depth pass.
// The `before:` pseudo-element extends the touch zone by 8px on each
// side without changing the visual: a 28px-tall button reads as a
// 44px touch target, satisfying ui-ux-pro-max.touch-target-size.
const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md",
    "text-xs font-bold uppercase tracking-wider leading-none",
    "before:absolute before:-inset-2 before:content-[''] before:pointer-events-auto",
    "transition-all duration-[var(--duration-fast)] ease-[var(--ease-out)]",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3.5 shrink-0 [&_svg]:shrink-0",
    "outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  ].join(' '),
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground border border-primary/20 shadow-depth-btn hover:bg-primary/95 active:shadow-depth-btn-active',
        destructive:
          'bg-destructive text-white border border-destructive/30 shadow-depth-btn hover:bg-destructive/95 active:shadow-depth-btn-active focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/70',
        outline:
          'border bg-card text-foreground shadow-depth-btn hover:bg-accent hover:text-accent-foreground active:shadow-depth-btn-active',
        secondary:
          'bg-secondary text-secondary-foreground border border-border shadow-depth-btn hover:bg-secondary/85 active:shadow-depth-btn-active',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link:
          'text-accent-green underline-offset-4 hover:underline p-0 normal-case tracking-normal font-semibold',
      },
      size: {
        default: 'px-3 py-1.5',
        sm: 'px-2.5 py-1 text-[11px]',
        lg: 'px-4 py-2',
        icon: 'size-7 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      data-variant={variant ?? 'default'}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
