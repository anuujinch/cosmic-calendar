'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Shirt, Bell, Search, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

const NAV_LINKS = [
  { href: '/wardrobe',  label: 'Wardrobe'  },
  { href: '/outfits',   label: 'Outfits'   },
  { href: '/discover',  label: 'Discover'  },
] as const

export interface NavbarProps {
  className?: string
}

function Navbar({ className }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 26, duration: 0.4 }}
        className={cn(
          'fixed top-3 inset-x-4 z-40 mx-auto max-w-6xl',
          'flex items-center justify-between',
          'px-4 py-2.5 rounded-2xl glass',
          className,
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight text-foreground cursor-pointer"
        >
          <Shirt className="h-5 w-5 text-gold-500" aria-hidden />
          ClosetIQ
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5" aria-label="Main">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'px-3 py-1.5 text-sm rounded-lg cursor-pointer',
                'text-muted-foreground hover:text-foreground hover:bg-muted',
                'transition-colors duration-150',
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="icon" aria-label="Search" className="hidden md:inline-flex">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </Button>

          {/* Avatar */}
          <div
            className={cn(
              'h-8 w-8 rounded-full cursor-pointer select-none',
              'bg-gold-100 border border-gold-300',
              'flex items-center justify-center',
              'text-xs font-semibold text-gold-700',
              'transition-colors duration-150 hover:bg-gold-200',
            )}
            aria-label="User menu"
            role="button"
            tabIndex={0}
          >
            A
          </div>

          {/* Mobile toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{ opacity: 0,  y: -8, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 360, damping: 30 }}
            className={cn(
              'fixed top-[72px] inset-x-4 z-30 mx-auto max-w-6xl',
              'rounded-2xl glass p-3',
            )}
          >
            <nav className="flex flex-col gap-0.5" aria-label="Mobile">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'px-4 py-2.5 text-sm font-medium rounded-xl cursor-pointer',
                    'text-foreground hover:bg-muted',
                    'transition-colors duration-150',
                  )}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export { Navbar }
