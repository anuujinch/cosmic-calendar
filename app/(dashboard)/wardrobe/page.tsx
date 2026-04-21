import { requireUser } from '@/lib/supabase/auth'
import { getClosetItems } from '@/lib/supabase/queries'
import { WardrobeView } from './view'

export default async function WardrobePage() {
  const user  = await requireUser()
  const items = await getClosetItems(user.id).catch(() => [])
  return <WardrobeView items={items} />
}
