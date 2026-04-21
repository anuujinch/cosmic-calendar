'use client'

import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { backdropVariants, modalVariants } from '@/lib/animations'
import { Button } from './Button'

const sizeStyles = {
  sm:   'max-w-sm',
  md:   'max-w-md',
  lg:   'max-w-lg',
  xl:   'max-w-2xl',
  full: 'max-w-full mx-4',
} as const

export interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  size?: keyof typeof sizeStyles
  className?: string
  children: React.ReactNode
  footer?: React.ReactNode
  closeOnBackdrop?: boolean
  hideCloseButton?: boolean
}

function Modal({
  open,
  onClose,
  title,
  description,
  size = 'md',
  className,
  children,
  footer,
  closeOnBackdrop = true,
  hideCloseButton = false,
}: ModalProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() },
    [onClose],
  )

  useEffect(() => {
    if (!open) return
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [open, handleKey])

  if (typeof window === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeOnBackdrop ? onClose : undefined}
            aria-hidden
          />

          {/* Panel */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal
            aria-labelledby={title ? 'modal-title' : undefined}
            aria-describedby={description ? 'modal-desc' : undefined}
            className={cn(
              'relative z-10 w-full bg-background rounded-2xl',
              'border border-border shadow-lift-lg',
              sizeStyles[size],
              className,
            )}
          >
            {(title || description || !hideCloseButton) && (
              <div className="flex items-start justify-between p-6 pb-0">
                <div className="flex-1 min-w-0">
                  {title && (
                    <h2 id="modal-title" className="text-lg font-semibold text-foreground">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p id="modal-desc" className="mt-1 text-sm text-muted-foreground">
                      {description}
                    </p>
                  )}
                </div>
                {!hideCloseButton && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="-mt-1 -mr-2 ml-3 shrink-0"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}

            <div className="p-6">{children}</div>

            {footer && (
              <div className="flex items-center justify-end gap-2 px-6 pb-6 -mt-2">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

export { Modal }
