'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const variantStyles = {
  default:     'bg-foreground text-primary-foreground hover:bg-foreground/88 shadow-sm',
  outline:     'border border-border bg-transparent hover:bg-muted text-foreground',
  ghost:       'bg-transparent hover:bg-muted text-foreground',
  accent:      'bg-gold-500 hover:bg-gold-600 text-white shadow-sm',
  destructive: 'bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-sm',
  link:        'text-foreground underline-offset-4 hover:underline h-auto p-0',
} as const

const sizeStyles = {
  sm:   'h-8  px-3   text-xs  rounded-md  gap-1.5',
  md:   'h-10 px-4   text-sm  rounded-lg  gap-2',
  lg:   'h-12 px-6   text-sm  rounded-xl  gap-2.5',
  xl:   'h-14 px-8   text-base rounded-xl gap-3',
  icon: 'h-10 w-10  text-sm  rounded-lg  justify-center',
} as const

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantStyles
  size?: keyof typeof sizeStyles
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading

    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        whileTap={isDisabled ? {} : { scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 420, damping: 30 }}
        disabled={isDisabled}
        className={cn(
          'relative inline-flex items-center font-medium cursor-pointer select-none',
          'transition-colors duration-150 outline-none',
          'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...(props as object)}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin shrink-0" aria-hidden />
        ) : leftIcon ? (
          <span className="h-4 w-4 shrink-0 flex items-center justify-center" aria-hidden>
            {leftIcon}
          </span>
        ) : null}

        {children}

        {rightIcon && !loading && (
          <span className="h-4 w-4 shrink-0 flex items-center justify-center" aria-hidden>
            {rightIcon}
          </span>
        )}
      </motion.button>
    )
  },
)

Button.displayName = 'Button'

export { Button }
