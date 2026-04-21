'use client'

import { forwardRef, useState, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, leftIcon, rightIcon, id, ...props }, ref) => {
    const [focused, setFocused] = useState(false)
    const generatedId = useId()
    const inputId = id ?? generatedId

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-foreground">
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <span
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            >
              {leftIcon}
            </span>
          )}

          <motion.div
            animate={{
              boxShadow: focused
                ? '0 0 0 3px rgba(201,167,96,0.22)'
                : '0 0 0 0px rgba(201,167,96,0)',
            }}
            transition={{ duration: 0.15 }}
            className="rounded-lg"
          >
            <input
              ref={ref}
              id={inputId}
              onFocus={(e) => { setFocused(true); props.onFocus?.(e) }}
              onBlur={(e)  => { setFocused(false); props.onBlur?.(e) }}
              className={cn(
                'w-full rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground',
                'placeholder:text-muted-foreground',
                'transition-colors duration-150',
                'focus:outline-none',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                leftIcon  ? 'pl-9'  : '',
                rightIcon ? 'pr-9'  : '',
                error ? 'border-destructive' : 'border-input',
                className,
              )}
              {...props}
            />
          </motion.div>

          {rightIcon && (
            <span
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            >
              {rightIcon}
            </span>
          )}
        </div>

        <AnimatePresence mode="wait">
          {(error || hint) && (
            <motion.p
              key={error ?? hint}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className={cn('text-xs', error ? 'text-destructive' : 'text-muted-foreground')}
              role={error ? 'alert' : undefined}
            >
              {error ?? hint}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
