'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Shirt,
  LayoutGrid,
  Sparkles,
  Star,
  Tag,
  Settings,
  ChevronLeft,
  ChevronRight,
  Compass,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { useUser } from '@/lib/supabase/use-user'
import { createClient } from '@/lib/supabase/client'

const PRIMARY_NAV = [
  { href: '/dashboard', icon: LayoutGrid, label: 'Dashboard'  },
  { href: '/wardrobe',  icon: Shirt,       label: 'Wardrobe'  },
  { href: '/outfits',   icon: Sparkles,    label: 'Outfits'   },
  { href: '/favorites', icon: Star,        label: 'Favorites' },
  { href: '/tags',      icon: Tag,         label: 'Tags'      },
  { href: '/discover',  icon: Compass,     label: 'Discover'  },
] as const

const BOTTOM_NAV = [
  { href: '/settings', icon: Settings, label: 'Settings' },
] as const

function getInitials(name: string | null | undefined, email: string | null | undefined): string {
  if (name) {
    return name
      .split(' ')
      .slice(0, 2)
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  }
  return (email?.[0] ?? '?').toUpperCase()
}

export interface SidebarProps {
  className?: string
}

function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const router   = useRouter()
  const { user } = useUser()

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname?.startsWith(href + '/'))

  const displayName = user?.user_metadata?.full_name ?? null
  const initials    = getInitials(displayName, user?.email)
  const label       = displayName ?? user?.email ?? ''

  function handleSignOut() {
    startTransition(async () => {
      const supabase = createClient()
      await supabase.auth.signOut()
      router.push('/login')
      router.refresh()
    })
  }

  return (
    <motion.aside
      animate={{ width: collapsed ? 60 : 220 }}
      transition={{ type: 'spring', stiffness: 280, damping: 28 }}
      className={cn(
        'relative flex flex-col h-full shrink-0 overflow-hidden',
        'bg-background border-r border-border py-4',
        className,
      )}
    >
      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed((v) => !v)}
        className={cn(
          'absolute -right-3 top-5 z-10',
          'h-6 w-6 rounded-full flex items-center justify-center',
          'bg-background border border-border shadow-sm',
          'text-muted-foreground hover:text-foreground',
          'transition-colors duration-150 cursor-pointer',
        )}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed
          ? <ChevronRight className="h-3 w-3" />
          : <ChevronLeft  className="h-3 w-3" />}
      </button>

      {/* Brand */}
      <div className={cn('flex items-center px-3.5 mb-6', collapsed ? 'justify-center' : 'gap-2.5')}>
        <Shirt className="h-5 w-5 shrink-0 text-gold-500" aria-hidden />
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.18 }}
              className="overflow-hidden whitespace-nowrap font-semibold tracking-tight text-foreground"
            >
              ClosetIQ
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Primary nav */}
      <motion.nav
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex-1 flex flex-col gap-0.5 px-2"
        aria-label="Primary"
      >
        {PRIMARY_NAV.map(({ href, icon: Icon, label: navLabel }) => (
          <motion.div key={href} variants={staggerItem}>
            <Link
              href={href}
              title={collapsed ? navLabel : undefined}
              className={cn(
                'flex items-center gap-3 px-2.5 py-2 rounded-xl text-sm font-medium',
                'transition-colors duration-150 cursor-pointer',
                collapsed ? 'justify-center' : '',
                isActive(href)
                  ? 'bg-foreground text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted',
              )}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.18 }}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    {navLabel}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </motion.div>
        ))}
      </motion.nav>

      {/* Bottom section: Settings + user */}
      <div className="flex flex-col gap-0.5 px-2 pt-3 mt-2 border-t border-border">
        {/* Settings */}
        {BOTTOM_NAV.map(({ href, icon: Icon, label: navLabel }) => (
          <Link
            key={href}
            href={href}
            title={collapsed ? navLabel : undefined}
            className={cn(
              'flex items-center gap-3 px-2.5 py-2 rounded-xl text-sm font-medium',
              'transition-colors duration-150 cursor-pointer',
              collapsed ? 'justify-center' : '',
              isActive(href)
                ? 'bg-foreground text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted',
            )}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.18 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  {navLabel}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        ))}

        {/* User row */}
        {user && (
          <div
            className={cn(
              'mt-2 pt-2 border-t border-border',
              collapsed ? 'flex flex-col items-center gap-1' : 'px-1',
            )}
          >
            <div className={cn('flex items-center gap-2.5', collapsed && 'flex-col')}>
              {/* Avatar */}
              <div className="h-7 w-7 shrink-0 rounded-full bg-gold-100 border border-gold-200 flex items-center justify-center">
                <span className="text-[10px] font-semibold text-gold-700 leading-none">
                  {initials}
                </span>
              </div>

              <AnimatePresence>
                {!collapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.18 }}
                    className="overflow-hidden min-w-0 flex-1"
                  >
                    <p className="text-xs font-medium text-foreground truncate leading-tight">
                      {label}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {!collapsed && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    onClick={handleSignOut}
                    disabled={isPending}
                    title="Sign out"
                    aria-label="Sign out"
                    className="shrink-0 p-1 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/8 transition-colors duration-150 cursor-pointer disabled:opacity-50"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Collapsed sign-out */}
            {collapsed && (
              <button
                onClick={handleSignOut}
                disabled={isPending}
                title="Sign out"
                aria-label="Sign out"
                className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/8 transition-colors duration-150 cursor-pointer disabled:opacity-50"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
    </motion.aside>
  )
}

export { Sidebar }
