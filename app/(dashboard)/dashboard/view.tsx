'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Shirt, Sparkles, Star, ArrowRight, Plus, Compass, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { staggerContainer, staggerItem } from '@/lib/animations'
import type { ClosetItem } from '@/types/database'

interface DashboardViewProps {
  userName: string
  itemCount: number
  outfitCount: number
  favoriteCount: number
  recentItems: ClosetItem[]
}

const STAT_CARDS = (itemCount: number, outfitCount: number, favoriteCount: number) => [
  { icon: Shirt,      label: 'Wardrobe items', value: itemCount,     href: '/wardrobe',  color: 'text-blue-500',   bg: 'bg-blue-50'   },
  { icon: Sparkles,   label: 'Outfits saved',  value: outfitCount,   href: '/outfits',   color: 'text-purple-500', bg: 'bg-purple-50' },
  { icon: Star,       label: 'Favourites',     value: favoriteCount, href: '/favorites', color: 'text-gold-500',   bg: 'bg-gold-50'   },
  { icon: TrendingUp, label: 'Wear rate',      value: '—',           href: '/wardrobe',  color: 'text-green-500',  bg: 'bg-green-50'  },
]

export function DashboardView({
  userName,
  itemCount,
  outfitCount,
  favoriteCount,
  recentItems,
}: DashboardViewProps) {
  const firstName = userName.split(' ')[0]
  const stats = STAT_CARDS(itemCount, outfitCount, favoriteCount)

  return (
    <div className="px-6 py-8 max-w-5xl mx-auto">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={staggerItem}>
          <h1 className="text-2xl font-bold tracking-tight">
            Good day, {firstName} 👋
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Here&apos;s an overview of your wardrobe.
          </p>
        </motion.div>

        {/* Stats grid */}
        <motion.div variants={staggerContainer} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ icon: Icon, label, value, href, color, bg }) => (
            <motion.div key={label} variants={staggerItem}>
              <Link href={href} className="block">
                <Card hoverable className="h-full">
                  <CardContent>
                    <div className={`h-9 w-9 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                      <Icon className={`h-4 w-4 ${color}`} aria-hidden />
                    </div>
                    <p className="text-2xl font-bold tracking-tight">{value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick actions */}
        <motion.div variants={staggerItem} className="flex flex-wrap gap-3">
          <Link href="/wardrobe">
            <Button size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>
              Add item
            </Button>
          </Link>
          <Link href="/outfits">
            <Button variant="outline" size="sm" leftIcon={<Sparkles className="h-3.5 w-3.5" />}>
              New outfit
            </Button>
          </Link>
          <Link href="/discover">
            <Button variant="outline" size="sm" leftIcon={<Compass className="h-3.5 w-3.5" />}>
              Discover
            </Button>
          </Link>
        </motion.div>

        {/* Recent items */}
        <motion.div variants={staggerItem} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold tracking-tight">Recent items</h2>
            <Link href="/wardrobe">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                View all
              </Button>
            </Link>
          </div>

          {recentItems.length === 0 ? (
            <Card variant="outlined" padding="none">
              <EmptyState
                icon={<Shirt className="h-6 w-6" />}
                title="Your wardrobe is empty"
                description="Add your first clothing item to get started."
                action={
                  <Link href="/wardrobe">
                    <Button size="sm" leftIcon={<Plus className="h-4 w-4" />}>
                      Add first item
                    </Button>
                  </Link>
                }
              />
            </Card>
          ) : (
            <motion.div variants={staggerContainer} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {recentItems.map((item) => (
                <motion.div key={item.id} variants={staggerItem}>
                  <Card hoverable className="h-full">
                    <CardContent>
                      <div className="h-16 w-full rounded-lg bg-muted mb-3 flex items-center justify-center overflow-hidden">
                        {item.image_url ? (
                          <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" />
                        ) : (
                          <Shirt className="h-6 w-6 text-muted-foreground" aria-hidden />
                        )}
                      </div>
                      <CardTitle className="text-xs truncate">{item.name}</CardTitle>
                      <CardDescription className="text-xs capitalize">{item.category}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
