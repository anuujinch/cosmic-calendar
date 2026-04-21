'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { chipVariants } from '@/lib/animations'

const variantStyles = {
  default: {
    base:     'bg-muted text-foreground hover:bg-border',
    selected: 'bg-foreground text-primary-foreground',
  },
  outlined: {
    base:     'border border-border text-foreground hover:bg-muted',
    selected: 'border border-foreground bg-foreground text-primary-foreground',
  },
  accent: {
    base:     'bg-gold-100 text-gold-800 hover:bg-gold-200',
    selected: 'bg-gold-500 text-white',
  },
} as const

export interface ChipProps {
  label: string
  selected?: boolean
  onSelect?: () => void
  onRemove?: () => void
  variant?: keyof typeof variantStyles
  size?: 'sm' | 'md'
  className?: string
}

function Chip({
  label,
  selected = false,
  onSelect,
  onRemove,
  variant = 'default',
  size = 'md',
  className,
}: ChipProps) {
  const { base, selected: selectedStyle } = variantStyles[variant]

  return (
    <motion.div
      variants={chipVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileTap={{ scale: 0.95 }}
      onClick={onSelect}
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onKeyDown={onSelect ? (e) => e.key === 'Enter' && onSelect() : undefined}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium select-none',
        'transition-colors duration-150',
        onSelect ? 'cursor-pointer' : '',
        size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        selected ? selectedStyle : base,
        className,
      )}
    >
      {label}

      {onRemove && (
        <button
          onClick={(e) => { e.stopPropagation(); onRemove() }}
          className="rounded-full hover:opacity-70 transition-opacity cursor-pointer"
          aria-label={`Remove ${label}`}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </motion.div>
  )
}

export interface ChipGroupProps {
  children: React.ReactNode
  className?: string
}

function ChipGroup({ children, className }: ChipGroupProps) {
  return (
    <AnimatePresence>
      <div className={cn('flex flex-wrap gap-2', className)}>{children}</div>
    </AnimatePresence>
  )
}

export { Chip, ChipGroup }
