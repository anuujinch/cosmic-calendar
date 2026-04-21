import { redirect } from 'next/navigation'
import { createClient } from './server'
import type { Profile } from '@/types/database'

/** Get the currently authenticated user — returns null if not logged in. */
export async function getUser() {
  const supabase = createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error) return null
  return user
}

/** Like getUser() but redirects to /login if the user is not authenticated. */
export async function requireUser() {
  const user = await getUser()
  if (!user) redirect('/login')
  return user
}

/** Fetch the profile row for a given user ID. */
export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  if (error) return null
  return data
}

/** Fetch the profile of the currently authenticated user. */
export async function getCurrentProfile(): Promise<Profile | null> {
  const user = await getUser()
  if (!user) return null
  return getProfile(user.id)
}
