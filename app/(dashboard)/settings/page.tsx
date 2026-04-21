import { requireUser } from '@/lib/supabase/auth'
import { getCurrentProfile } from '@/lib/supabase/auth'
import { SettingsView } from './view'

export default async function SettingsPage() {
  await requireUser()
  const profile = await getCurrentProfile()
  return <SettingsView profile={profile} />
}
