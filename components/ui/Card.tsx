'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { cardHover } from '@/lib/animations'

const variantStyles = {
  default:  'bg-background border border-border shadow-sm',
  glass:    'glass',
  outlined: 'bg-transparent border border-border',
  elevated: 'bg-background border border-border shadow-lift',
  ghost:    'bg-transparent',
} as const

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof variantStyles
  hoverable?: boolean
  floatIdle?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const paddingStyles = {
  none: '',
  sm:   'p-3',
  md:   'p-5',
  lg:   'p-7',
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hoverable, floatIdle, padding = 'md', children, ...props }, ref) => {
    const baseClass = cn(
      'rounded-xl',
      variantStyles[variant],
      paddingStyles[padding],
      className,
    )

    if (floatIdle) {
      return (
        <motion.div
          ref={ref}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className={baseClass}
          {...(props as object)}
        >
          {children}
        </motion.div>
      )
    }

    if (hoverable) {
      return (
        <motion.div
          ref={ref}
          initial="rest"
          whileHover="hover"
          animate="rest"
          variants={cardHover}
          className={cn(baseClass, 'cursor-pointer')}
          {...(props as object)}
        >
          {children}
        </motion.div>
      )
    }

    return (
      <div ref={ref} className={baseClass} {...props}>
        {children}
      </div>
    )
  },
)

Card.displayName = 'Card'

function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-4', className)} {...props} />
}

function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-base font-semibold tracking-tight text-foreground', className)} {...props} />
  )
}

function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-sm text-muted-foreground mt-1', className)} {...props} />
}

function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('', className)} {...props} />
}

function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mt-4 flex items-center gap-2', className)} {...props} />
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
