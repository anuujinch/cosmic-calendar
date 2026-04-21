// ─── Shared utility types ──────────────────────────────────────────────────────

export type Nullable<T> = T | null
export type Optional<T> = T | undefined
export type ID = string

// ─── API response envelope ────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T
  error: string | null
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number
  page: number
  pageSize: number
}

// ─── Domain types (expand as features are built) ──────────────────────────────

export interface User {
  id: ID
  email: string
  name: string | null
  avatarUrl: string | null
  createdAt: string
}
