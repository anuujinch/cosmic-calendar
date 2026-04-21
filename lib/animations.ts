import type { Variants, Transition } from 'framer-motion'

/* ─── Spring presets ─────────────────────────────────────────────────────── */

export const SPRING_FAST: Transition  = { type: 'spring', stiffness: 420, damping: 30 }
export const SPRING: Transition       = { type: 'spring', stiffness: 300, damping: 24 }
export const SPRING_SOFT: Transition  = { type: 'spring', stiffness: 200, damping: 20 }
export const EASE_SMOOTH              = [0.4, 0, 0.2, 1] as const

/* ─── Page transition ────────────────────────────────────────────────────── */

export const pageTransition: Variants = {
  hidden:  { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0,  transition: { ...SPRING, duration: 0.35, staggerChildren: 0.06 } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.18, ease: EASE_SMOOTH } },
}

/* ─── Stagger list ───────────────────────────────────────────────────────── */

export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
}

export const staggerItem: Variants = {
  hidden:  { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0,  transition: SPRING },
}

/* ─── Card interactions ──────────────────────────────────────────────────── */

export const cardHover: Variants = {
  rest:  { y: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  hover: {
    y: -3,
    boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
    transition: { ...SPRING_FAST, duration: 0.2 },
  },
}

export const cardFloat = {
  animate: {
    y: [0, -6, 0],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
}

/* ─── Button tap ─────────────────────────────────────────────────────────── */

export const buttonTap = {
  whileTap: { scale: 0.97, transition: { duration: 0.1 } },
}

/* ─── Chip bounce-in ─────────────────────────────────────────────────────── */

export const chipVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.55 },
  visible: { opacity: 1, scale: 1, transition: { ...SPRING_SOFT, duration: 0.35 } },
  exit:    { opacity: 0, scale: 0.7, transition: { duration: 0.15 } },
}

/* ─── Modal ──────────────────────────────────────────────────────────────── */

export const backdropVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.18 } },
  exit:    { opacity: 0, transition: { duration: 0.14, delay: 0.06 } },
}

export const modalVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.94, y: 10 },
  visible: { opacity: 1, scale: 1,    y: 0, transition: { ...SPRING, duration: 0.3 } },
  exit:    { opacity: 0, scale: 0.96, y: 6, transition: { duration: 0.15 } },
}

/* ─── Sidebar ────────────────────────────────────────────────────────────── */

export const sidebarItem: Variants = {
  hidden:  { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: SPRING },
}

/* ─── Empty state ────────────────────────────────────────────────────────── */

export const emptyStateVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1, scale: 1,
    transition: { ...SPRING_SOFT, staggerChildren: 0.1 },
  },
}

export const emptyStateItem: Variants = {
  hidden:  { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: SPRING },
}

/* ─── Input focus glow ───────────────────────────────────────────────────── */

export const inputFocusGlow = {
  rest:    { boxShadow: '0 0 0 0px rgba(201,167,96,0)' },
  focused: { boxShadow: '0 0 0 3px rgba(201,167,96,0.22)', transition: { duration: 0.15 } },
}
