'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, Shirt, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { staggerContainer, staggerItem } from '@/lib/animations'

export default function LoginPage() {
  const [email, setEmail]             = useState('')
  const [password, setPassword]       = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError]             = useState<string | null>(null)
  const [isPending, startTransition]  = useTransition()

  const router       = useRouter()
  const searchParams = useSearchParams()
  const redirectTo   = searchParams.get('redirectTo') ?? '/dashboard'

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    startTransition(async () => {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) {
        setError(error.message)
        return
      }

      router.push(redirectTo)
      router.refresh()
    })
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="w-full max-w-sm px-4"
    >
      {/* Brand mark */}
      <motion.div variants={staggerItem} className="flex justify-center mb-8">
        <div className="flex items-center gap-2 font-semibold text-lg tracking-tight">
          <motion.div
            animate={{ rotate: [0, -8, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
          >
            <Shirt className="h-6 w-6 text-gold-500" aria-hidden />
          </motion.div>
          ClosetIQ
        </div>
      </motion.div>

      <Card variant="glass" padding="lg" className="shadow-lift">
        {/* Header */}
        <motion.div variants={staggerItem} className="mb-6">
          <h1 className="text-xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to your wardrobe
          </p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div variants={staggerItem}>
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="h-4 w-4" />}
              autoComplete="email"
              required
            />
          </motion.div>

          <motion.div variants={staggerItem}>
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="h-4 w-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="cursor-pointer hover:text-foreground transition-colors duration-150"
                >
                  {showPassword
                    ? <EyeOff className="h-4 w-4" />
                    : <Eye     className="h-4 w-4" />}
                </button>
              }
              autoComplete="current-password"
              required
            />
          </motion.div>

          {/* Inline error */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                key={error}
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0,  scale: 1 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="rounded-lg bg-destructive/10 border border-destructive/20 px-3 py-2.5 text-sm text-destructive"
                role="alert"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div variants={staggerItem}>
            <Button
              type="submit"
              className="w-full"
              loading={isPending}
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Sign in
            </Button>
          </motion.div>
        </form>

        <motion.p
          variants={staggerItem}
          className="mt-5 text-center text-sm text-muted-foreground"
        >
          No account?{' '}
          <Link
            href="/register"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Sign up free
          </Link>
        </motion.p>
      </Card>
    </motion.div>
  )
}
