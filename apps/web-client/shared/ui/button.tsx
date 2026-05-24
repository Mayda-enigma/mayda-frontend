import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/shared/utils'

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xs font-bold uppercase tracking-wider leading-none transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive before:absolute before:-inset-2 before:content-['']",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground border border-primary/20 shadow-depth-btn hover:bg-primary/95 active:shadow-depth-btn-active',
        destructive:
          'bg-destructive text-white border border-destructive/30 shadow-depth-btn hover:bg-destructive/95 active:shadow-depth-btn-active dark:bg-destructive/70',
        outline:
          'border bg-card text-foreground shadow-depth-btn hover:bg-accent hover:text-accent-foreground active:shadow-depth-btn-active',
        secondary:
          'bg-secondary text-secondary-foreground border border-border shadow-depth-btn hover:bg-secondary/85 active:shadow-depth-btn-active',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline p-0 normal-case tracking-normal font-semibold',
      },
      size: {
        default: 'h-9 px-3 py-1.5 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-2.5 py-1 text-[11px] has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-4 py-2 has-[>svg]:px-4',
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
      data-variant={variant}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
