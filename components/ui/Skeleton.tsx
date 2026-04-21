import { cn } from '@/lib/utils'

export interface SkeletonProps {
  className?: string
}

function Skeleton({ className }: SkeletonProps) {
  return <div className={cn('skeleton rounded-md', className)} aria-hidden />
}

function SkeletonText({ lines = 1, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('space-y-2', className)} aria-hidden>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn('h-3.5', i === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full')}
        />
      ))}
    </div>
  )
}

function SkeletonAvatar({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClass = { sm: 'h-8 w-8', md: 'h-10 w-10', lg: 'h-12 w-12' }[size]
  return <Skeleton className={cn(sizeClass, 'rounded-full')} />
}

function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-xl border border-border p-5', className)} aria-hidden>
      <div className="flex items-center gap-3 mb-4">
        <SkeletonAvatar />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3.5 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
      <Skeleton className="h-28 w-full mb-4" />
      <SkeletonText lines={2} />
    </div>
  )
}

export { Skeleton, SkeletonText, SkeletonAvatar, CardSkeleton }
