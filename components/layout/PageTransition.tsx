'use client'

import { motion } from 'framer-motion'
import { pageTransition } from '@/lib/animations'

export interface PageTransitionProps {
  children: React.ReactNode
}

function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-full"
    >
      {children}
    </motion.div>
  )
}

export { PageTransition }
