'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shirt, Plus, Search, SlidersHorizontal } from 'lucide-react'
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Chip, ChipGroup } from '@/components/ui/Chip'
import { EmptyState } from '@/components/ui/EmptyState'
import { Modal } from '@/components/ui/Modal'
import { staggerContainer, staggerItem } from '@/lib/animations'
import type { ClosetItem, ItemCategory } from '@/types/database'

const CATEGORIES: { label: string; value: ItemCategory | 'all' }[] = [
  { label: 'All',        value: 'all'        },
  { label: 'Tops',       value: 'tops'       },
  { label: 'Bottoms',    value: 'bottoms'    },
  { label: 'Shoes',      value: 'shoes'      },
  { label: 'Outerwear',  value: 'outerwear'  },
  { label: 'Dresses',    value: 'dresses'    },
  { label: 'Accessories',value: 'accessories'},
  { label: 'Bags',       value: 'bags'       },
  { label: 'Other',      value: 'other'      },
]

interface WardrobeViewProps {
  items: ClosetItem[]
}

export function WardrobeView({ items }: WardrobeViewProps) {
  const [query, setQuery]       = useState('')
  const [category, setCategory] = useState<ItemCategory | 'all'>('all')
  const [addOpen, setAddOpen]   = useState(false)

  const filtered = items.filter((item) => {
    const matchesQuery    = item.name.toLowerCase().includes(query.toLowerCase())
    const matchesCategory = category === 'all' || item.category === category
    return matchesQuery && matchesCategory
  })

  return (
    <div className="px-6 py-8 max-w-5xl mx-auto">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">

        {/* Header */}
        <motion.div variants={staggerItem} className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Wardrobe</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {items.length} {items.length === 1 ? 'item' : 'items'} in your closet
            </p>
          </div>
          <Button
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() => setAddOpen(true)}
          >
            Add item
          </Button>
        </motion.div>

        {/* Search + filter */}
        <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              placeholder="Search items…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
            />
          </div>
          <Button variant="outline" leftIcon={<SlidersHorizontal className="h-4 w-4" />} size="md">
            Filters
          </Button>
        </motion.div>

        {/* Category chips */}
        <motion.div variants={staggerItem}>
          <ChipGroup>
            {CATEGORIES.map(({ label, value }) => (
              <Chip
                key={value}
                label={label}
                selected={category === value}
                onSelect={() => setCategory(value)}
              />
            ))}
          </ChipGroup>
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {items.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Card variant="outlined" padding="none">
                <EmptyState
                  icon={<Shirt className="h-7 w-7" />}
                  title="Your closet is empty"
                  description="Start building your digital wardrobe — add your first item."
                  action={
                    <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => setAddOpen(true)}>
                      Add first item
                    </Button>
                  }
                />
              </Card>
            </motion.div>
          ) : filtered.length === 0 ? (
            <motion.div key="no-results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Card variant="outlined" padding="none">
                <EmptyState
                  icon={<Search className="h-7 w-7" />}
                  title="No items match"
                  description="Try adjusting your search or clearing the category filter."
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
              {filtered.map((item) => (
                <motion.div key={item.id} variants={staggerItem}>
                  <Card hoverable className="h-full">
                    <CardContent>
                      <div className="h-32 w-full rounded-lg bg-muted mb-3 flex items-center justify-center overflow-hidden">
                        {item.image_url ? (
                          <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" />
                        ) : (
                          <Shirt className="h-8 w-8 text-muted-foreground/50" aria-hidden />
                        )}
                      </div>
                      <CardTitle className="text-sm truncate">{item.name}</CardTitle>
                      <CardDescription className="text-xs capitalize mt-0.5">
                        {item.brand ? `${item.brand} · ` : ''}{item.category}
                      </CardDescription>
                      {item.color.length > 0 && (
                        <div className="flex gap-1 mt-2 flex-wrap">
                          {item.color.slice(0, 3).map((c) => (
                            <span key={c} className="inline-block px-1.5 py-0.5 rounded-full bg-muted text-[10px] text-muted-foreground capitalize">
                              {c}
                            </span>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Add item modal */}
      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add new item"
        description="Fill in the details for your new wardrobe item."
        footer={
          <>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button>Save item</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Item name" placeholder="e.g. White Oxford Shirt" required />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Brand" placeholder="e.g. Uniqlo" />
            <Input label="Size" placeholder="e.g. M, 32, US 9" />
          </div>
          <div className="space-y-1.5">
            <p className="text-sm font-medium">Category</p>
            <ChipGroup>
              {CATEGORIES.slice(1).map(({ label, value }) => (
                <Chip key={value} label={label} />
              ))}
            </ChipGroup>
          </div>
        </div>
      </Modal>
    </div>
  )
}
