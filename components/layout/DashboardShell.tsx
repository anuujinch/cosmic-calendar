'use client'

import { cn } from '@/lib/utils'
import { Sidebar } from './Sidebar'

export interface DashboardShellProps {
  children: React.ReactNode
  className?: string
}

function DashboardShell({ children, className }: DashboardShellProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar — desktop only */}
      <div className="hidden md:flex h-full">
        <Sidebar />
      </div>

      {/* Main content */}
      <main className={cn('flex-1 min-w-0 overflow-y-auto', className)}>
        {children}
      </main>
    </div>
  )
}

export { DashboardShell }
