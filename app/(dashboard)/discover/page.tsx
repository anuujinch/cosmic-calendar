import { getActiveListings } from '@/lib/supabase/queries'
import { requireUser } from '@/lib/supabase/auth'
import { DiscoverView } from './view'

export default async function DiscoverPage() {
  await requireUser()
  const listings = await getActiveListings().catch(() => [])
  return <DiscoverView listings={listings} />
}
