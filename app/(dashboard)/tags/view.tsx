'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Tag, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Chip, ChipGroup } from '@/components/ui/Chip'
import { EmptyState } from '@/components/ui/EmptyState'
import { staggerContainer, staggerItem, chipVariants } from '@/lib/animations'

interface TagEntry { name: string; count: number }

interface TagsViewProps {
  tags: TagEntry[]
}

export function TagsView({ tags }: TagsViewProps) {
  const [selected, setSelected] = useState<string[]>([])

  const toggleTag = (name: string) =>
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((t) => t !== name) : [...prev, name],
    )

  return (
    <div className="px-6 py-8 max-w-5xl mx-auto">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">

        {/* Header */}
        <motion.div variants={staggerItem} className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Tags</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {tags.length} {tags.length === 1 ? 'tag' : 'tags'} across your wardrobe
            </p>
          </div>
          <Link href="/wardrobe">
            <Button variant="outline" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
              Manage items
            </Button>
          </Link>
        </motion.div>

        <AnimatePresence mode="wait">
          {tags.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Card variant="outlined" padding="none">
                <EmptyState
                  icon={<Tag className="h-7 w-7" />}
                  title="No tags yet"
                  description="Tags appear here automatically as you label items in your wardrobe."
                  action={
                    <Link href="/wardrobe">
                      <Button variant="outline" size="sm">Go to wardrobe</Button>
                    </Link>
                  }
                />
              </Card>
            </motion.div>
          ) : (
            <motion.div key="tags" variants={staggerItem}>
              <Card>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {selected.length > 0
                      ? `${selected.length} selected — click to filter items`
                      : 'Click tags to filter your wardrobe'}
                  </p>
                  <ChipGroup>
                    <AnimatePresence>
                      {tags.map(({ name, count }) => (
                        <motion.div
                          key={name}
                          variants={chipVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          <Chip
                            label={`${name} (${count})`}
                            variant="accent"
                            selected={selected.includes(name)}
                            onSelect={() => toggleTag(name)}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </ChipGroup>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
