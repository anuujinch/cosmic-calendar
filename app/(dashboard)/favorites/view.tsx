'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Shirt, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { staggerContainer, staggerItem } from '@/lib/animations'
import type { ClosetItem } from '@/types/database'

interface FavoritesViewProps {
  items: ClosetItem[]
}

export function FavoritesView({ items }: FavoritesViewProps) {
  return (
    <div className="px-6 py-8 max-w-5xl mx-auto">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">

        {/* Header */}
        <motion.div variants={staggerItem} className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Favourites</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {items.length} starred {items.length === 1 ? 'item' : 'items'}
            </p>
          </div>
          <Link href="/wardrobe">
            <Button variant="outline" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
              Go to wardrobe
            </Button>
          </Link>
        </motion.div>

        <AnimatePresence mode="wait">
          {items.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Card variant="outlined" padding="none">
                <EmptyState
                  icon={<Star className="h-7 w-7" />}
                  title="No favourites yet"
                  description="Star items in your wardrobe to find them quickly here."
                  action={
                    <Link href="/wardrobe">
                      <Button variant="outline" size="sm">Browse wardrobe</Button>
                    </Link>
                  }
                />
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {items.map((item) => (
                <motion.div key={item.id} variants={staggerItem}>
                  <Card hoverable className="h-full">
                    <CardContent>
                      <div className="relative">
                        <div className="h-32 w-full rounded-lg bg-muted mb-3 flex items-center justify-center overflow-hidden">
                          {item.image_url ? (
                            <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" />
                          ) : (
                            <Shirt className="h-8 w-8 text-muted-foreground/50" aria-hidden />
                          )}
                        </div>
                        <div className="absolute top-1.5 right-1.5">
                          <Star className="h-4 w-4 fill-gold-400 text-gold-400" />
                        </div>
                      </div>
                      <CardTitle className="text-sm truncate">{item.name}</CardTitle>
                      <CardDescription className="text-xs capitalize mt-0.5">
                        {item.brand ? `${item.brand} · ` : ''}{item.category}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
