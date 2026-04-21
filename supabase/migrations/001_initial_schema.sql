-- ClosetIQ — initial schema
-- Run this in your Supabase SQL editor or via `supabase db push`.

-- ─── Extensions ───────────────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ─── Enums ────────────────────────────────────────────────────────────────────
create type public.item_category as enum (
  'tops', 'bottoms', 'shoes', 'accessories', 'outerwear', 'dresses', 'bags', 'other'
);

create type public.item_condition as enum (
  'new', 'like_new', 'good', 'fair', 'poor'
);

create type public.listing_status as enum (
  'draft', 'active', 'reserved', 'sold'
);

-- ─── profiles ─────────────────────────────────────────────────────────────────
-- One row per auth.users record. Created automatically via trigger (see below).
create table public.profiles (
  id          uuid        references auth.users on delete cascade primary key,
  username    text        unique,
  full_name   text,
  avatar_url  text,
  bio         text,
  style_tags  text[]      not null default '{}',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ─── closet_items ─────────────────────────────────────────────────────────────
create table public.closet_items (
  id          uuid                   default uuid_generate_v4() primary key,
  user_id     uuid                   not null references public.profiles(id) on delete cascade,
  name        text                   not null,
  category    public.item_category   not null,
  brand       text,
  color       text[]                 not null default '{}',
  size        text,
  condition   public.item_condition  not null default 'good',
  image_url   text,
  tags        text[]                 not null default '{}',
  is_favorite boolean                not null default false,
  wear_count  integer                not null default 0,
  last_worn   date,
  notes       text,
  created_at  timestamptz            not null default now(),
  updated_at  timestamptz            not null default now()
);

-- ─── outfits ──────────────────────────────────────────────────────────────────
create table public.outfits (
  id          uuid        default uuid_generate_v4() primary key,
  user_id     uuid        not null references public.profiles(id) on delete cascade,
  name        text        not null,
  description text,
  item_ids    uuid[]      not null default '{}',
  occasion    text[]      not null default '{}',
  season      text[]      not null default '{}',
  rating      smallint    check (rating between 1 and 5),
  image_url   text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ─── listings ─────────────────────────────────────────────────────────────────
create table public.listings (
  id          uuid                   default uuid_generate_v4() primary key,
  seller_id   uuid                   not null references public.profiles(id) on delete cascade,
  item_id     uuid                   references public.closet_items(id) on delete set null,
  title       text                   not null,
  description text,
  price       numeric(10, 2)         not null check (price >= 0),
  condition   public.item_condition,
  status      public.listing_status  not null default 'draft',
  images      text[]                 not null default '{}',
  created_at  timestamptz            not null default now(),
  updated_at  timestamptz            not null default now()
);

-- ─── messages ─────────────────────────────────────────────────────────────────
create table public.messages (
  id           uuid        default uuid_generate_v4() primary key,
  sender_id    uuid        not null references public.profiles(id) on delete cascade,
  recipient_id uuid        not null references public.profiles(id) on delete cascade,
  listing_id   uuid        references public.listings(id) on delete set null,
  content      text        not null,
  read         boolean     not null default false,
  created_at   timestamptz not null default now()
);

-- ─── Indexes ──────────────────────────────────────────────────────────────────
create index on public.closet_items (user_id);
create index on public.closet_items (user_id, is_favorite) where is_favorite = true;
create index on public.outfits      (user_id);
create index on public.listings     (seller_id);
create index on public.listings     (status) where status = 'active';
create index on public.messages     (recipient_id, read) where read = false;
create index on public.messages     (sender_id, recipient_id);

-- ─── Row-Level Security ───────────────────────────────────────────────────────
alter table public.profiles      enable row level security;
alter table public.closet_items  enable row level security;
alter table public.outfits       enable row level security;
alter table public.listings      enable row level security;
alter table public.messages      enable row level security;

-- profiles
create policy "profiles: public read"
  on public.profiles for select using (true);
create policy "profiles: own insert"
  on public.profiles for insert with check (auth.uid() = id);
create policy "profiles: own update"
  on public.profiles for update using (auth.uid() = id);

-- closet_items
create policy "closet_items: own select"
  on public.closet_items for select using (auth.uid() = user_id);
create policy "closet_items: own insert"
  on public.closet_items for insert with check (auth.uid() = user_id);
create policy "closet_items: own update"
  on public.closet_items for update using (auth.uid() = user_id);
create policy "closet_items: own delete"
  on public.closet_items for delete using (auth.uid() = user_id);

-- outfits
create policy "outfits: own select"
  on public.outfits for select using (auth.uid() = user_id);
create policy "outfits: own insert"
  on public.outfits for insert with check (auth.uid() = user_id);
create policy "outfits: own update"
  on public.outfits for update using (auth.uid() = user_id);
create policy "outfits: own delete"
  on public.outfits for delete using (auth.uid() = user_id);

-- listings
create policy "listings: active public read"
  on public.listings for select
  using (status = 'active' or auth.uid() = seller_id);
create policy "listings: own insert"
  on public.listings for insert with check (auth.uid() = seller_id);
create policy "listings: own update"
  on public.listings for update using (auth.uid() = seller_id);
create policy "listings: own delete"
  on public.listings for delete using (auth.uid() = seller_id);

-- messages
create policy "messages: own select"
  on public.messages for select
  using (auth.uid() = sender_id or auth.uid() = recipient_id);
create policy "messages: own send"
  on public.messages for insert with check (auth.uid() = sender_id);
create policy "messages: recipient mark read"
  on public.messages for update using (auth.uid() = recipient_id);

-- ─── Triggers ─────────────────────────────────────────────────────────────────

-- Auto-create profile row when a new auth user signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Auto-update updated_at on row change
create or replace function public.handle_updated_at()
returns trigger language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

create trigger trg_closet_items_updated_at
  before update on public.closet_items
  for each row execute function public.handle_updated_at();

create trigger trg_outfits_updated_at
  before update on public.outfits
  for each row execute function public.handle_updated_at();

create trigger trg_listings_updated_at
  before update on public.listings
  for each row execute function public.handle_updated_at();
