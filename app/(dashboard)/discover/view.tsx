'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Compass, Search, ShoppingBag, Tag } from 'lucide-react'
import { Card, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Chip, ChipGroup } from '@/components/ui/Chip'
import { EmptyState } from '@/components/ui/EmptyState'
import { staggerContainer, staggerItem } from '@/lib/animations'

type Listing = {
  id: string
  title: string
  description: string | null
  price: number
  condition: string | null
  images: string[]
  status: string
  profiles?: { username: string | null; full_name: string | null; avatar_url: string | null } | null
}

const CONDITIONS = ['All', 'New', 'Like new', 'Good', 'Fair']

interface DiscoverViewProps {
  listings: Listing[]
}

export function DiscoverView({ listings }: DiscoverViewProps) {
  const [query,     setQuery]     = useState('')
  const [condition, setCondition] = useState('All')

  const filtered = listings.filter((l) => {
    const matchesQuery     = l.title.toLowerCase().includes(query.toLowerCase())
    const matchesCondition = condition === 'All' || (l.condition ?? '').replace('_', ' ') === condition.toLowerCase()
    return matchesQuery && matchesCondition
  })

  return (
    <div className="px-6 py-8 max-w-5xl mx-auto">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">

        {/* Header */}
        <motion.div variants={staggerItem}>
          <h1 className="text-2xl font-bold tracking-tight">Discover</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Browse items listed for sale by the community.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div variants={staggerItem}>
          <Input
            placeholder="Search listings…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            leftIcon={<Search className="h-4 w-4" />}
          />
        </motion.div>

        {/* Condition filter */}
        <motion.div variants={staggerItem}>
          <ChipGroup>
            {CONDITIONS.map((c) => (
              <Chip key={c} label={c} selected={condition === c} onSelect={() => setCondition(c)} />
            ))}
          </ChipGroup>
        </motion.div>

        {/* Listings grid */}
        <AnimatePresence mode="wait">
          {listings.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Card variant="outlined" padding="none">
                <EmptyState
                  icon={<Compass className="h-7 w-7" />}
                  title="Nothing for sale yet"
                  description="Be the first to list an item — go to your wardrobe and mark one for sale."
                />
              </Card>
            </motion.div>
          ) : filtered.length === 0 ? (
            <motion.div key="no-results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Card variant="outlined" padding="none">
                <EmptyState
                  icon={<Search className="h-7 w-7" />}
                  title="No listings match"
                  description="Try a different search term or clear the condition filter."
                />
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.map((listing) => (
                <motion.div key={listing.id} variants={staggerItem}>
                  <Card hoverable className="h-full">
                    <CardContent>
                      <div className="h-44 w-full rounded-xl bg-muted mb-4 flex items-center justify-center overflow-hidden">
                        {listing.images[0] ? (
                          <img src={listing.images[0]} alt={listing.title} className="h-full w-full object-cover" />
                        ) : (
                          <ShoppingBag className="h-10 w-10 text-muted-foreground/40" aria-hidden />
                        )}
                      </div>
                      <CardTitle className="truncate">{listing.title}</CardTitle>
                      {listing.description && (
                        <CardDescription className="mt-1 line-clamp-2">{listing.description}</CardDescription>
                      )}
                    </CardContent>
                    <CardFooter className="justify-between">
                      <span className="font-semibold text-foreground">
                        ${Number(listing.price).toFixed(2)}
                      </span>
                      {listing.condition && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground capitalize">
                          <Tag className="h-3 w-3" />
                          {listing.condition.replace('_', ' ')}
                        </span>
                      )}
                    </CardFooter>
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
