import { requireUser } from '@/lib/supabase/auth'
import { getFavoriteItems } from '@/lib/supabase/queries'
import { FavoritesView } from './view'

export default async function FavoritesPage() {
  const user      = await requireUser()
  const favorites = await getFavoriteItems(user.id).catch(() => [])
  return <FavoritesView items={favorites} />
}
