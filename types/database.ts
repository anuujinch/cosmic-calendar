export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

/* ─── Enums ──────────────────────────────────────────────────────────────── */

export type ItemCategory =
  | 'tops'
  | 'bottoms'
  | 'shoes'
  | 'accessories'
  | 'outerwear'
  | 'dresses'
  | 'bags'
  | 'other'

export type ItemCondition = 'new' | 'like_new' | 'good' | 'fair' | 'poor'

export type ListingStatus = 'draft' | 'active' | 'reserved' | 'sold'

/* ─── Row types ──────────────────────────────────────────────────────────── */

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          style_tags: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          style_tags?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          style_tags?: string[]
          updated_at?: string
        }
      }

      closet_items: {
        Row: {
          id: string
          user_id: string
          name: string
          category: ItemCategory
          brand: string | null
          color: string[]
          size: string | null
          condition: ItemCondition
          image_url: string | null
          tags: string[]
          is_favorite: boolean
          wear_count: number
          last_worn: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          category: ItemCategory
          brand?: string | null
          color?: string[]
          size?: string | null
          condition?: ItemCondition
          image_url?: string | null
          tags?: string[]
          is_favorite?: boolean
          wear_count?: number
          last_worn?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          category?: ItemCategory
          brand?: string | null
          color?: string[]
          size?: string | null
          condition?: ItemCondition
          image_url?: string | null
          tags?: string[]
          is_favorite?: boolean
          wear_count?: number
          last_worn?: string | null
          notes?: string | null
          updated_at?: string
        }
      }

      outfits: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          item_ids: string[]
          occasion: string[]
          season: string[]
          rating: number | null
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          item_ids?: string[]
          occasion?: string[]
          season?: string[]
          rating?: number | null
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          description?: string | null
          item_ids?: string[]
          occasion?: string[]
          season?: string[]
          rating?: number | null
          image_url?: string | null
          updated_at?: string
        }
      }

      listings: {
        Row: {
          id: string
          seller_id: string
          item_id: string | null
          title: string
          description: string | null
          price: number
          condition: ItemCondition | null
          status: ListingStatus
          images: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          seller_id: string
          item_id?: string | null
          title: string
          description?: string | null
          price: number
          condition?: ItemCondition | null
          status?: ListingStatus
          images?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          item_id?: string | null
          title?: string
          description?: string | null
          price?: number
          condition?: ItemCondition | null
          status?: ListingStatus
          images?: string[]
          updated_at?: string
        }
      }

      messages: {
        Row: {
          id: string
          sender_id: string
          recipient_id: string
          listing_id: string | null
          content: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          sender_id: string
          recipient_id: string
          listing_id?: string | null
          content: string
          read?: boolean
          created_at?: string
        }
        Update: {
          read?: boolean
        }
      }
    }

    Views: Record<string, never>

    Functions: Record<string, never>

    Enums: {
      item_category: ItemCategory
      item_condition: ItemCondition
      listing_status: ListingStatus
    }
  }
}

/* ─── Convenience row aliases ────────────────────────────────────────────── */

export type Profile    = Database['public']['Tables']['profiles']['Row']
export type ClosetItem = Database['public']['Tables']['closet_items']['Row']
export type Outfit     = Database['public']['Tables']['outfits']['Row']
export type Listing    = Database['public']['Tables']['listings']['Row']
export type Message    = Database['public']['Tables']['messages']['Row']
