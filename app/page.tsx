'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shirt, Sparkles, ArrowRight, Star, Zap } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Chip, ChipGroup } from '@/components/ui/Chip'
import { CardSkeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { staggerContainer, staggerItem } from '@/lib/animations'

const STYLE_TAGS = ['Casual', 'Formal', 'Streetwear', 'Minimalist', 'Boho', 'Athleisure']

const FEATURE_CARDS = [
  {
    icon: Shirt,
    title: 'Smart Wardrobe',
    description: 'Digitise every item in your closet with AI-powered tagging and categorisation.',
  },
  {
    icon: Sparkles,
    title: 'Outfit Generator',
    description: 'Get daily outfit suggestions tailored to the weather, occasion, and your mood.',
  },
  {
    icon: Star,
    title: 'Style Insights',
    description: 'Discover patterns in what you actually wear and shop more intentionally.',
  },
  {
    icon: Zap,
    title: 'Quick Add',
    description: 'Snap a photo and our AI fills in the details — brand, colour, category — instantly.',
  },
] as const

export default function HomePage() {
  const [selectedTags, setSelectedTags] = useState<string[]>(['Casual'])
  const [showSkeleton, setShowSkeleton] = useState(false)

  const toggleTag = (tag: string) =>
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    )

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="pt-36 pb-20 px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={staggerItem}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gold-100 text-gold-700 border border-gold-200 mb-6">
              <Sparkles className="h-3 w-3" aria-hidden /> AI-powered wardrobe management
            </span>
          </motion.div>

          <motion.h1
            variants={staggerItem}
            className="text-5xl sm:text-6xl font-bold tracking-tight text-foreground text-balance"
          >
            Your closet,{' '}
            <span className="text-gold-500">intelligently</span>{' '}
            organised
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="mt-5 text-lg text-muted-foreground text-balance max-w-xl mx-auto"
          >
            ClosetIQ turns your wardrobe into a smart, searchable, stylist-backed system.
            Spend less time deciding — and more time feeling great.
          </motion.p>

          <motion.div variants={staggerItem} className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Get started free
            </Button>
            <Button variant="outline" size="lg">
              See how it works
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Feature cards (hover-lift + stagger) ─────────────────────────── */}
      <section className="py-16 px-4 border-t border-border">
        <div className="mx-auto max-w-5xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {FEATURE_CARDS.map(({ icon: Icon, title, description }) => (
              <motion.div key={title} variants={staggerItem}>
                <Card hoverable className="h-full">
                  <CardHeader>
                    <div className="h-9 w-9 rounded-xl bg-muted flex items-center justify-center mb-3">
                      <Icon className="h-4 w-4 text-gold-600" aria-hidden />
                    </div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Style chips (bounce-in on select) ────────────────────────────── */}
      <section className="py-16 px-4 border-t border-border">
        <div className="mx-auto max-w-5xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div variants={staggerItem}>
              <h2 className="text-2xl font-bold tracking-tight">Your style, your rules</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Select the aesthetics that resonate with you.
              </p>
            </motion.div>

            <motion.div variants={staggerItem}>
              <ChipGroup>
                {STYLE_TAGS.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    variant="accent"
                    selected={selectedTags.includes(tag)}
                    onSelect={() => toggleTag(tag)}
                  />
                ))}
              </ChipGroup>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Skeleton + empty-state demo ──────────────────────────────────── */}
      <section className="py-16 px-4 border-t border-border">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Loading states</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">Toggle between skeleton and empty.</p>
            </div>
            <Button variant="outline" onClick={() => setShowSkeleton((v) => !v)}>
              {showSkeleton ? 'Show empty state' : 'Show skeleton'}
            </Button>
          </div>

          {showSkeleton ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[0, 1, 2].map((i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <Card variant="outlined" padding="none">
              <EmptyState
                icon={<Shirt className="h-7 w-7" />}
                title="No items in your wardrobe yet"
                description="Add your first clothing item to get started with personalised outfit suggestions."
                action={
                  <Button leftIcon={<Shirt className="h-4 w-4" />}>
                    Add first item
                  </Button>
                }
              />
            </Card>
          )}
        </div>
      </section>

      {/* ── Float card demo ───────────────────────────────────────────────── */}
      <section className="py-20 px-4 border-t border-border">
        <div className="mx-auto max-w-5xl flex flex-col items-center gap-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight">Cards that breathe</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">Idle float keeps the UI feeling alive.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
            {['Summer Edit', 'Office Week', 'Weekend Fit'].map((label, i) => (
              <Card
                key={label}
                floatIdle
                variant="glass"
                className="text-center"
                style={{ animationDelay: `${i * 0.5}s` }}
              >
                <CardContent>
                  <div className="h-20 w-20 mx-auto rounded-2xl bg-gold-100 flex items-center justify-center mb-3">
                    <Sparkles className="h-8 w-8 text-gold-500" aria-hidden />
                  </div>
                  <CardTitle className="text-center">{label}</CardTitle>
                  <CardDescription className="text-center mt-1">12 items</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-border py-8 px-4">
        <div className="mx-auto max-w-5xl flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2 font-medium text-foreground">
            <Shirt className="h-4 w-4 text-gold-500" aria-hidden />
            ClosetIQ
          </div>
          <span>© {new Date().getFullYear()} ClosetIQ</span>
        </div>
      </footer>
    </div>
  )
}
