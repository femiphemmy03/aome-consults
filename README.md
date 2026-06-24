# Aome Consults — Full Production App

Vite + React (client) and Express (server), backed by Supabase, Resend and
Flutterwave. Built for Barr. Dr. Maria Esele Abraham's counselling, coaching
and Schema Intelligence™ practice.

## Stack
- **Frontend:** Vite + React (JSX), Tailwind CSS, PWA via `vite-plugin-pwa`
- **Backend:** Node.js + Express
- **Database:** Supabase (Postgres)
- **Email:** Resend
- **Payments:** Flutterwave (consultation fee only — ₦20,000 / $25)
- **Video calls:** manually pasted Google Meet links (no paid video API)
- **Hosting:** Frontend → Netlify, Backend → Render

## 1. Local setup

**One-time setup** (from the project root — the folder containing this README):

```bash
npm install          # installs `concurrently`, used to run both apps together
npm run install:all  # installs server/ and client/ dependencies
```

**Every time you want to develop:**

```bash
npm run dev
```

That single command starts the Express API (port 4000) and the Vite dev
server (port 5173) together in one terminal, color-coded `SERVER` / `CLIENT`.
Stop both with `Ctrl+C`.

Prefer running them separately in two terminals? That still works exactly
as before:

```bash
cd server && npm run dev      # http://localhost:4000
cd client && npm run dev      # http://localhost:5173
```

Both `.env` files are already filled in with the development keys you sent —
just double check `server/.env` has your real `VA_EMAIL` before relying on
lead/booking notifications.

## 2. Local vs. live URLs — what to change, and where

Nothing in the code needs editing to switch between local and live — it's
all environment variables, and **each platform has its own copy of them**:

| Variable | Local value (already set) | Production value | Lives in |
|---|---|---|---|
| `VITE_API_BASE_URL` | `http://localhost:4000` | `https://your-app.onrender.com` | Netlify env vars (Site settings → Environment variables) |
| `VITE_FLUTTERWAVE_PUBLIC_KEY` | sandbox key | live key | Netlify env vars |
| `FRONTEND_URLS` | `http://localhost:5173,http://localhost:3000` | add `https://your-site.netlify.app` | Render env vars |
| `FLW_SECRET_KEY` / `FLW_ENCRYPTION_KEY` | sandbox keys | live keys | Render env vars |

**Why Netlify/Render dashboards and not just editing `.env`?** Two reasons:
1. `.env` is in `.gitignore` on purpose (it holds real secrets), so it never
   gets pushed to GitHub — which means Render and Netlify never see it.
   Each platform's dashboard has its own "Environment Variables" section
   where you re-enter these values once.
2. Vite "bakes in" `VITE_...` variables at **build time**, not when the site
   is visited. So the value has to be set in Netlify *before* it runs
   `npm run build` — editing it afterward means triggering a new deploy/build
   for it to take effect.

A practical setup that lets one codebase serve both:
- Keep `FRONTEND_URLS` on Render as **both** URLs, comma-separated:
  `http://localhost:5173,https://your-site.netlify.app` — this lets the same
  deployed backend accept requests from your local dev frontend too if you
  ever need that.
- `VITE_API_BASE_URL` can only be one value per build, since Netlify builds
  a static site. Local dev always uses `client/.env` (`localhost:4000`);
  the live Netlify build always uses whatever you set in Netlify's dashboard
  (your Render URL). They don't conflict because they're built separately.

## 3. Supabase setup

1. Open your Supabase project's SQL editor.
2. Run `server/utils/schema.sql` once — it creates all 7 tables and seeds
   sensible defaults into `site_settings`, plus the first book (The Inner Map).
3. Leave Row Level Security **off** for v1 — every request goes through the
   Express backend using the service role key, so RLS isn't providing
   protection here and would just need careful policy-writing for no benefit yet.

### Tables
- `leads` — captured before email verification
- `otp_codes` — 6-digit email verification codes
- `bookings` — the paid consultation + its scheduling lifecycle
- `books` — catalogue; each card links out to its Selar page
- `blog_posts` — admin-authored, with an editable CTA button + link
- `surveys` — post-session feedback
- `site_settings` — key/value store, fully editable from `/admin` → Settings
  (WhatsApp number, Gumroad URL, social links, consultation fees)

## 4. Resend setup

- `RESEND_API_KEY` in `server/.env` is currently the **sending-only** key —
  that's intentional. The backend only ever sends transactional email, so it
  never needs the full-access key. Keep the full-access key out of any
  deployed environment entirely.
- Before emails will actually deliver to real inboxes, verify
  **aomeconsults.com** as a sending domain in the Resend dashboard. Until
  then, Resend will only deliver to the email address you signed up with.

## 5. Flutterwave setup

- `server/.env` and `client/.env` currently hold **TEST/sandbox** keys.
- Before going live: get your live keys from the Flutterwave dashboard, swap
  `FLW_PUBLIC_KEY`, `FLW_SECRET_KEY`, `FLW_ENCRYPTION_KEY` in `server/.env`
  and `VITE_FLUTTERWAVE_PUBLIC_KEY` in `client/.env`.
- Only the consultation fee is charged online. The second/full-session fee is
  handled entirely offline between Dr. Maria and the client — there's no
  payment integration for it.

## 6. WhatsApp & AI chat

- The floating WhatsApp button is a free `wa.me` click-to-chat link — no API
  key needed. Number is editable from `/admin` → Settings.
- A Botpress (or similar) AI FAQ widget can be embedded on the homepage later
  using their free tier — note WhatsApp as a *channel* inside Botpress is a
  paid feature, so for now AI chat (if added) would live on the website
  itself, with the WhatsApp button as the separate, human-routed channel.

## 7. The `/schedule` page

This route is **intentionally unlisted** — it's not in any nav menu and has
no button pointing to it anywhere on the site. It's only ever reached via the
link automatically emailed to a client right after their consultation payment
is confirmed (`/schedule?ref=<bookingId>`). It is not gated by login — just
not advertised.

## 8. Replacing placeholder images

- `client/src/assets/images/dr-maria.jpg` — hero portrait (already using the
  latest photo you sent)
- `client/src/assets/images/aome-logo.jpg` — used in the navbar, footer, and
  as the source for the favicon + PWA icons. **Still a placeholder** —
  replace this file with the corrected/official logo, then regenerate
  `client/public/favicon.png` and `client/public/icons/icon-192.png` /
  `icon-512.png` at the same dimensions.
- `client/public/books/inner-map-cover.png` — cover for "The Inner Map".
  Add further covers the same way (drop a file in `client/public/books/` and
  reference it as `/books/filename.png` from the admin Books tab), or just
  paste any external image URL — the field accepts both.

## 9. Admin dashboard

Go to `/admin`, log in with `ADMIN_USERNAME` / `ADMIN_PASSWORD` from
`server/.env`. From there:
- **Bookings** — confirm a schedule request and paste in the Google Meet link
- **Leads**, **Surveys** — read-only views
- **Books**, **Blog** — full add/edit/delete, including book prices and the
  blog's custom "Read More" CTA link
- **Settings** — WhatsApp number, Gumroad URL, social links, consultation
  fees — all editable without touching code

## 10. Netlify deploy (frontend)

1. `cd client && npm run build`
2. Drag the generated `dist/` folder to https://app.netlify.com/drop, or
   connect the repo with build command `npm run build` and publish directory
   `client/dist`.
3. Set environment variables in Netlify: `VITE_API_BASE_URL` (your live
   Render URL) and `VITE_FLUTTERWAVE_PUBLIC_KEY`.

## 11. Render deploy (backend)

1. New Web Service → point at `server/`.
2. Build command: `npm install`. Start command: `npm start`.
3. Add every variable from `server/.env` into Render's environment settings.
4. Once live, register `https://your-render-url.onrender.com/health` on
   https://cron-job.org (free) to ping every 14 minutes — keeps the free tier
   from spinning down.

## 12. Adding the first real blog post / book

- Blog: `/admin` → Blog tab → write title + content, optionally set a custom
  CTA button (text + link), check "Published", save.
- Books: `/admin` → Books tab → title, cover image, short description, Selar
  URL, price in ₦ and/or $, check "Published", save. It appears instantly on
  `/books`.
