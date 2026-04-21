import { requireUser } from '@/lib/supabase/auth'
import { getClosetItems } from '@/lib/supabase/queries'
import { TagsView } from './view'
import type { ClosetItem } from '@/types/database'

export default async function TagsPage() {
  const user  = await requireUser()
  const items = (await getClosetItems(user.id).catch(() => [])) as ClosetItem[]

  // Aggregate all tags with counts
  const tagMap = new Map<string, number>()
  for (const item of items) {
    for (const tag of item.tags) {
      tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1)
    }
  }
  const tags = Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)

  return <TagsView tags={tags} />
}
