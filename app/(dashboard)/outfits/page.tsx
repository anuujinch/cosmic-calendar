import { requireUser } from '@/lib/supabase/auth'
import { getOutfits } from '@/lib/supabase/queries'
import { OutfitsView } from './view'

export default async function OutfitsPage() {
  const user    = await requireUser()
  const outfits = await getOutfits(user.id).catch(() => [])
  return <OutfitsView outfits={outfits} />
}
