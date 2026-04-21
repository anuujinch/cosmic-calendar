'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Plus, Star } from 'lucide-react'
import { Card, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Chip, ChipGroup } from '@/components/ui/Chip'
import { EmptyState } from '@/components/ui/EmptyState'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { staggerContainer, staggerItem } from '@/lib/animations'
import type { Outfit } from '@/types/database'

const OCCASIONS = ['Casual', 'Work', 'Formal', 'Sport', 'Date night', 'Travel']
const SEASONS   = ['Spring', 'Summer', 'Autumn', 'Winter']

interface OutfitsViewProps {
  outfits: Outfit[]
}

export function OutfitsView({ outfits }: OutfitsViewProps) {
  const [createOpen, setCreateOpen] = useState(false)

  return (
    <div className="px-6 py-8 max-w-5xl mx-auto">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">

        {/* Header */}
        <motion.div variants={staggerItem} className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Outfits</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {outfits.length} saved {outfits.length === 1 ? 'outfit' : 'outfits'}
            </p>
          </div>
          <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => setCreateOpen(true)}>
            New outfit
          </Button>
        </motion.div>

        {/* Occasion filter chips */}
        <motion.div variants={staggerItem}>
          <ChipGroup>
            {['All', ...OCCASIONS].map((o) => (
              <Chip key={o} label={o} selected={o === 'All'} />
            ))}
          </ChipGroup>
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {outfits.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Card variant="outlined" padding="none">
                <EmptyState
                  icon={<Sparkles className="h-7 w-7" />}
                  title="No outfits yet"
                  description="Combine items from your wardrobe into a saved outfit look."
                  action={
                    <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => setCreateOpen(true)}>
                      Create first outfit
                    </Button>
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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {outfits.map((outfit) => (
                <motion.div key={outfit.id} variants={staggerItem}>
                  <Card hoverable className="h-full">
                    <CardContent>
                      <div className="h-40 w-full rounded-xl bg-muted mb-4 flex items-center justify-center overflow-hidden">
                        {outfit.image_url ? (
                          <img src={outfit.image_url} alt={outfit.name} className="h-full w-full object-cover" />
                        ) : (
                          <Sparkles className="h-10 w-10 text-muted-foreground/40" aria-hidden />
                        )}
                      </div>
                      <CardTitle className="truncate">{outfit.name}</CardTitle>
                      {outfit.description && (
                        <CardDescription className="mt-1 line-clamp-2">{outfit.description}</CardDescription>
                      )}
                    </CardContent>
                    <CardFooter>
                      {outfit.occasion.slice(0, 2).map((o) => (
                        <span key={o} className="px-2 py-0.5 rounded-full bg-muted text-xs text-muted-foreground capitalize">
                          {o}
                        </span>
                      ))}
                      {outfit.rating && (
                        <span className="ml-auto flex items-center gap-1 text-xs text-gold-600">
                          <Star className="h-3 w-3 fill-gold-400 text-gold-400" />
                          {outfit.rating}
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

      {/* Create outfit modal */}
      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create outfit"
        description="Give your outfit a name and choose its occasions and seasons."
        footer={
          <>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button>Save outfit</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Outfit name" placeholder="e.g. Monday Office Look" required />
          <Input label="Description" placeholder="Optional notes…" />
          <div className="space-y-1.5">
            <p className="text-sm font-medium">Occasion</p>
            <ChipGroup>
              {OCCASIONS.map((o) => <Chip key={o} label={o} />)}
            </ChipGroup>
          </div>
          <div className="space-y-1.5">
            <p className="text-sm font-medium">Season</p>
            <ChipGroup>
              {SEASONS.map((s) => <Chip key={s} label={s} />)}
            </ChipGroup>
          </div>
        </div>
      </Modal>
    </div>
  )
}
