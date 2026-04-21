'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}

export async function signIn(_: unknown, formData: FormData) {
  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email:    formData.get('email')    as string,
    password: formData.get('password') as string,
  })

  if (error) return { error: error.message }

  revalidatePath('/', 'layout')
  redirect(formData.get('redirectTo') as string || '/dashboard')
}

export async function signUp(_: unknown, formData: FormData) {
  const supabase = createClient()

  const { error } = await supabase.auth.signUp({
    email:    formData.get('email')    as string,
    password: formData.get('password') as string,
    options: {
      data: { full_name: formData.get('fullName') as string },
    },
  })

  if (error) return { error: error.message }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}
