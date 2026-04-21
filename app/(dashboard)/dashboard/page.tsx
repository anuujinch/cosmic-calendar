import { requireUser } from '@/lib/supabase/auth'
import { getClosetItems, getOutfits, getFavoriteItems } from '@/lib/supabase/queries'
import { DashboardView } from './view'

export default async function DashboardPage() {
  const user      = await requireUser()
  const [items, outfits, favorites] = await Promise.all([
    getClosetItems(user.id).catch(() => []),
    getOutfits(user.id).catch(() => []),
    getFavoriteItems(user.id).catch(() => []),
  ])

  return (
    <DashboardView
      userName={user.user_metadata?.full_name ?? user.email ?? 'there'}
      itemCount={items.length}
      outfitCount={outfits.length}
      favoriteCount={favorites.length}
      recentItems={items.slice(0, 4)}
    />
  )
}
