'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Mail, FileText, LogOut, CheckCircle2, AlertCircle } from 'lucide-react'
import { Card, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Chip, ChipGroup } from '@/components/ui/Chip'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { createClient } from '@/lib/supabase/client'
import type { Profile } from '@/types/database'

const STYLE_TAGS = ['Casual', 'Formal', 'Streetwear', 'Minimalist', 'Boho', 'Athleisure', 'Vintage', 'Preppy']

interface SettingsViewProps {
  profile: Profile | null
}

export function SettingsView({ profile }: SettingsViewProps) {
  const [fullName,   setFullName]   = useState(profile?.full_name ?? '')
  const [username,   setUsername]   = useState(profile?.username  ?? '')
  const [bio,        setBio]        = useState(profile?.bio       ?? '')
  const [styleTags,  setStyleTags]  = useState<string[]>(profile?.style_tags ?? [])
  const [status,     setStatus]     = useState<'idle' | 'success' | 'error'>('idle')
  const [isPending,  startTransition] = useTransition()
  const [signOutPending, startSignOut] = useTransition()
  const router = useRouter()

  const toggleTag = (tag: string) =>
    setStyleTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    )

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setStatus('idle')

    startTransition(async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any)
        .from('profiles')
        .update({ full_name: fullName || null, username: username || null, bio: bio || null, style_tags: styleTags })
        .eq('id', user.id)

      setStatus(error ? 'error' : 'success')
    })
  }

  function handleSignOut() {
    startSignOut(async () => {
      const supabase = createClient()
      await supabase.auth.signOut()
      router.push('/login')
      router.refresh()
    })
  }

  return (
    <div className="px-6 py-8 max-w-2xl mx-auto">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">

        {/* Header */}
        <motion.div variants={staggerItem}>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your profile and preferences.</p>
        </motion.div>

        {/* Profile form */}
        <motion.div variants={staggerItem}>
          <Card>
            <form onSubmit={handleSave} className="space-y-5">
              <CardTitle>Profile</CardTitle>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Alex Smith"
                  leftIcon={<User className="h-4 w-4" />}
                />
                <Input
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="alexsmith"
                  leftIcon={<span className="text-muted-foreground text-sm font-medium">@</span>}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Bio</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about your style…"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none transition-shadow duration-150"
                />
              </div>

              <div className="space-y-1.5">
                <p className="text-sm font-medium">Style preferences</p>
                <ChipGroup>
                  {STYLE_TAGS.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      variant="accent"
                      selected={styleTags.includes(tag)}
                      onSelect={() => toggleTag(tag)}
                    />
                  ))}
                </ChipGroup>
              </div>

              {/* Status feedback */}
              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-sm text-success"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Profile saved successfully
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-sm text-destructive"
                  >
                    <AlertCircle className="h-4 w-4" />
                    Failed to save — please try again
                  </motion.div>
                )}
              </AnimatePresence>

              <Button type="submit" loading={isPending}>
                Save changes
              </Button>
            </form>
          </Card>
        </motion.div>

        {/* Account section */}
        <motion.div variants={staggerItem}>
          <Card>
            <div className="space-y-4">
              <CardTitle>Account</CardTitle>
              <p className="text-sm text-muted-foreground">
                Sign out of ClosetIQ on this device.
              </p>
              <Button
                variant="outline"
                leftIcon={<LogOut className="h-4 w-4" />}
                loading={signOutPending}
                onClick={handleSignOut}
                className="text-destructive border-destructive/30 hover:bg-destructive/8 hover:border-destructive/50"
              >
                Sign out
              </Button>
            </div>
          </Card>
        </motion.div>

      </motion.div>
    </div>
  )
}
