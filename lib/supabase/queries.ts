/**
 * Typed server-side query helpers.
 * Import in Server Components, Server Actions, and Route Handlers.
 * For client-side queries, call createClient() from lib/supabase/client.ts directly.
 */

import { createClient } from './server'
import type { Database } from '@/types/database'

type Tables = Database['public']['Tables']

/* ─── Profiles ───────────────────────────────────────────────────────────── */

export async function getProfile(userId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  if (error) throw error
  return data
}

export async function updateProfile(
  userId: string,
  values: Tables['profiles']['Update'],
) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('profiles')
    .update(values)
    .eq('id', userId)
    .select()
    .single()
  if (error) throw error
  return data
}

/* ─── Closet items ───────────────────────────────────────────────────────── */

export async function getClosetItems(userId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('closet_items')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function getClosetItem(itemId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('closet_items')
    .select('*')
    .eq('id', itemId)
    .single()
  if (error) throw error
  return data
}

export async function getFavoriteItems(userId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('closet_items')
    .select('*')
    .eq('user_id', userId)
    .eq('is_favorite', true)
    .order('updated_at', { ascending: false })
  if (error) throw error
  return data
}

export async function createClosetItem(values: Tables['closet_items']['Insert']) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('closet_items')
    .insert(values)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateClosetItem(
  itemId: string,
  values: Tables['closet_items']['Update'],
) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('closet_items')
    .update(values)
    .eq('id', itemId)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteClosetItem(itemId: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('closet_items')
    .delete()
    .eq('id', itemId)
  if (error) throw error
}

/* ─── Outfits ────────────────────────────────────────────────────────────── */

export async function getOutfits(userId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('outfits')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function getOutfit(outfitId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('outfits')
    .select('*')
    .eq('id', outfitId)
    .single()
  if (error) throw error
  return data
}

export async function createOutfit(values: Tables['outfits']['Insert']) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('outfits')
    .insert(values)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateOutfit(
  outfitId: string,
  values: Tables['outfits']['Update'],
) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('outfits')
    .update(values)
    .eq('id', outfitId)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteOutfit(outfitId: string) {
  const supabase = createClient()
  const { error } = await supabase.from('outfits').delete().eq('id', outfitId)
  if (error) throw error
}

/* ─── Listings ───────────────────────────────────────────────────────────── */

export async function getActiveListings() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('listings')
    .select('*, profiles(username, avatar_url, full_name)')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function getUserListings(userId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('seller_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function createListing(values: Tables['listings']['Insert']) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('listings')
    .insert(values)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateListing(
  listingId: string,
  values: Tables['listings']['Update'],
) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('listings')
    .update(values)
    .eq('id', listingId)
    .select()
    .single()
  if (error) throw error
  return data
}

/* ─── Messages ───────────────────────────────────────────────────────────── */

export async function getMessages(userId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('messages')
    .select('*, sender:profiles!sender_id(username, avatar_url, full_name)')
    .eq('recipient_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function getConversation(userId: string, otherUserId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .or(
      `and(sender_id.eq.${userId},recipient_id.eq.${otherUserId}),` +
        `and(sender_id.eq.${otherUserId},recipient_id.eq.${userId})`,
    )
    .order('created_at', { ascending: true })
  if (error) throw error
  return data
}

export async function sendMessage(values: Tables['messages']['Insert']) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('messages')
    .insert(values)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function markMessageRead(messageId: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('messages')
    .update({ read: true })
    .eq('id', messageId)
  if (error) throw error
}

export async function getUnreadCount(userId: string) {
  const supabase = createClient()
  const { count, error } = await supabase
    .from('messages')
    .select('*', { count: 'exact', head: true })
    .eq('recipient_id', userId)
    .eq('read', false)
  if (error) throw error
  return count ?? 0
}
