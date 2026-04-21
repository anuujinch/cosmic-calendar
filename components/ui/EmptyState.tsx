'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { emptyStateVariants, emptyStateItem } from '@/lib/animations'

export interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <motion.div
      variants={emptyStateVariants}
      initial="hidden"
      animate="visible"
      className={cn('flex flex-col items-center justify-center py-16 px-4 text-center', className)}
    >
      {icon && (
        <motion.div variants={emptyStateItem} className="mb-5">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            className={cn(
              'flex h-16 w-16 items-center justify-center rounded-2xl',
              'bg-muted text-muted-foreground',
            )}
          >
            {icon}
          </motion.div>
        </motion.div>
      )}

      <motion.h3 variants={emptyStateItem} className="text-base font-semibold text-foreground">
        {title}
      </motion.h3>

      {description && (
        <motion.p
          variants={emptyStateItem}
          className="mt-2 text-sm text-muted-foreground max-w-[28ch] text-balance"
        >
          {description}
        </motion.p>
      )}

      {action && (
        <motion.div variants={emptyStateItem} className="mt-6">
          {action}
        </motion.div>
      )}
    </motion.div>
  )
}

export { EmptyState }
