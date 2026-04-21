'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, Shirt, User, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { staggerContainer, staggerItem } from '@/lib/animations'

const PASSWORD_RULES = [
  { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { label: 'One uppercase letter',   test: (p: string) => /[A-Z]/.test(p) },
  { label: 'One number',            test: (p: string) => /\d/.test(p) },
]

export default function RegisterPage() {
  const [fullName, setFullName]         = useState('')
  const [email, setEmail]               = useState('')
  const [password, setPassword]         = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError]               = useState<string | null>(null)
  const [success, setSuccess]           = useState(false)
  const [isPending, startTransition]    = useTransition()

  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    startTransition(async () => {
      const supabase = createClient()
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      })

      if (error) {
        setError(error.message)
        return
      }

      // Some Supabase projects require email confirmation; show success state
      setSuccess(true)
      setTimeout(() => router.push('/dashboard'), 1500)
    })
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        className="w-full max-w-sm px-4 text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-4"
        >
          <CheckCircle2 className="h-14 w-14 text-success" />
        </motion.div>
        <h2 className="text-xl font-bold">Account created!</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Taking you to your wardrobe…
        </p>
      </motion.div>
    )
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
        <motion.div variants={staggerItem} className="mb-6">
          <h1 className="text-xl font-bold tracking-tight">Create your account</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Start building your smart wardrobe
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div variants={staggerItem}>
            <Input
              label="Full name"
              type="text"
              name="fullName"
              placeholder="Alex Smith"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              leftIcon={<User className="h-4 w-4" />}
              autoComplete="name"
              required
            />
          </motion.div>

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
              autoComplete="new-password"
              required
            />
          </motion.div>

          {/* Password strength indicators */}
          <AnimatePresence>
            {password.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <ul className="flex flex-col gap-1">
                  {PASSWORD_RULES.map(({ label, test }) => {
                    const passes = test(password)
                    return (
                      <motion.li
                        key={label}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-xs"
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                            passes ? 'bg-success' : 'bg-border'
                          }`}
                        />
                        <span
                          className={`transition-colors duration-300 ${
                            passes ? 'text-foreground' : 'text-muted-foreground'
                          }`}
                        >
                          {label}
                        </span>
                      </motion.li>
                    )
                  })}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error */}
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
              Create account
            </Button>
          </motion.div>
        </form>

        <motion.p
          variants={staggerItem}
          className="mt-5 text-center text-sm text-muted-foreground"
        >
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </motion.p>
      </Card>
    </motion.div>
  )
}
