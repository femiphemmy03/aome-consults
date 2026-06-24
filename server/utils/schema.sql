-- ============================================================
-- AOME CONSULTS — SUPABASE SCHEMA
-- Run this once in the Supabase SQL editor (or via psql) on a
-- fresh project. RLS is left OFF for v1 — all access is brokered
-- through the Express backend using the service role key.
-- ============================================================

create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------
-- leads: captured before OTP / email verification
-- ----------------------------------------------------------------
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text,
  phone text,
  verified boolean default false,
  created_at timestamptz default now()
);

-- ----------------------------------------------------------------
-- otp_codes: 6-digit email verification codes
-- ----------------------------------------------------------------
create table if not exists otp_codes (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  code text not null,
  expires_at timestamptz not null,
  used boolean default false,
  created_at timestamptz default now()
);

-- ----------------------------------------------------------------
-- bookings: the paid consultation + its scheduling lifecycle
-- ----------------------------------------------------------------
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id),
  full_name text not null,
  email text not null,
  phone text not null,
  country text,
  brief text,                                  -- what they'd like to discuss
  currency text not null check (currency in ('NGN', 'USD')),
  consultation_fee numeric not null,
  payment_reference text,
  payment_status text default 'pending' check (payment_status in ('pending', 'paid', 'failed')),

  -- filled in on the unlisted /schedule page, after payment
  preferred_date date,
  preferred_time text,
  schedule_status text default 'awaiting_schedule'
    check (schedule_status in ('awaiting_schedule', 'requested', 'confirmed', 'declined')),
  video_call_link text,                         -- Google Meet link, pasted in by admin
  admin_notes text,

  confirmed boolean default false,
  created_at timestamptz default now()
);

-- ----------------------------------------------------------------
-- books: catalogue, each card links out to its Selar page
-- ----------------------------------------------------------------
create table if not exists books (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  cover_image_url text,
  short_description text,
  selar_url text not null,
  price_ngn numeric,
  price_usd numeric,
  display_order integer default 0,
  published boolean default true,
  created_at timestamptz default now()
);

-- Seed: first title in the catalogue.
insert into books (title, cover_image_url, short_description, selar_url, price_ngn, price_usd, display_order)
values (
  'The Inner Map: Personality, Beliefs and the Psychology of Meaning',
  '/books/inner-map-cover.png',
  'What if understanding yourself is the first step toward transforming your life? The Inner Map blends psychology, neuroscience and human development to help you understand the hidden forces shaping who you are — and how to grow beyond them.',
  'https://selar.com/1177k1t004',
  10000,
  10,
  1
)
on conflict do nothing;

-- ----------------------------------------------------------------
-- blog_posts: admin-authored, with an editable CTA link
-- ----------------------------------------------------------------
create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text not null,
  cover_image_url text,
  cta_text text default 'Read More',
  cta_url text,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ----------------------------------------------------------------
-- surveys: post-session feedback
-- ----------------------------------------------------------------
create table if not exists surveys (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references bookings(id),
  rating integer check (rating between 1 and 5),
  feedback text,
  would_recommend boolean,
  created_at timestamptz default now()
);

-- ----------------------------------------------------------------
-- site_settings: admin-editable key/value store
-- Seeded with sensible defaults below — edit values from /admin.
-- ----------------------------------------------------------------
create table if not exists site_settings (
  key text primary key,
  value text,
  updated_at timestamptz default now()
);

insert into site_settings (key, value) values
  ('whatsapp_number', '+2349022150216'),
  ('gumroad_profile_url', 'https://aomeconsults.gumroad.com/'),
  ('facebook_url', 'https://www.facebook.com/share/1AQA9CKaRt/'),
  ('instagram_url', ''),
  ('linkedin_url', ''),
  ('tiktok_url', ''),
  ('youtube_url', ''),
  ('consultation_fee_ngn', '20000'),
  ('consultation_fee_usd', '25')
on conflict (key) do nothing;
