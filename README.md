# Limo Sweden — limoswe.se

Rebuild of [limoswe.se](https://limoswe.se) — a luxury private chauffeur service in Stockholm. Built with Next.js 16, Sanity CMS, and Tailwind CSS v4.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **CMS:** Sanity v5 (Studio at `/studio`)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **UI Components:** Radix UI + shadcn/ui
- **Forms:** React Hook Form + Zod
- **Email:** Resend
- **Fonts:** Cormorant Garamond (display) + Inter (body)
- **Hosting:** Vercel

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set environment variables

Fill in `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id   # from sanity.io/manage
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
RESEND_API_KEY=your_resend_api_key               # from resend.com
```

### 3. Run the dev server

```bash
npm run dev
```

- Site: [http://localhost:3000](http://localhost:3000)
- Sanity Studio: [http://localhost:3000/studio](http://localhost:3000/studio)

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Homepage (all sections assembled)
│   ├── layout.tsx                # Root layout, fonts, metadata
│   ├── globals.css               # Tailwind v4 @theme tokens + base styles
│   ├── fleet/[slug]/page.tsx     # Individual vehicle detail pages
│   ├── api/contact/route.ts      # Booking form email handler (Resend)
│   └── studio/[[...tool]]/       # Sanity Studio
├── components/
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── ConciergSection.tsx
│   ├── FleetSection.tsx          # Groups vehicles by class
│   ├── VehicleCard.tsx           # Links to /fleet/[slug]
│   ├── ServicesSection.tsx
│   ├── TestimonialsSection.tsx
│   ├── BookingSection.tsx
│   └── Footer.tsx
├── sanity/
│   ├── client.ts                 # Sanity client
│   ├── queries.ts                # GROQ queries
│   ├── imageUrl.ts               # Image URL builder
│   ├── env.ts                    # Env var exports
│   └── schemas/
│       ├── vehicle.ts
│       ├── service.ts
│       ├── testimonial.ts
│       └── siteSettings.ts
└── types/
    └── index.ts                  # Shared TypeScript types
```

---

## Design Tokens

Defined in `src/app/globals.css` via Tailwind v4 `@theme {}`:

| Token | Value | Usage |
|---|---|---|
| `limo-black` | `#05050A` | Page background |
| `limo-surface` | `#0C0C14` | Cards, elevated surfaces |
| `limo-border` | `#1C1C28` | Borders, dividers |
| `limo-gold` | `#C4A86A` | Primary accent |
| `limo-gold-light` | `#E8D5A3` | Hover states |
| `limo-steel` | `#8B9EB7` | Secondary accent |
| `limo-white` | `#F0EEE8` | Body text |
| `limo-muted` | `#6B6B7A` | Muted text |

> Design is intentionally cooler and more precise than its sister brand Connoisseur Experience — same Cormorant + Inter font pairing, distinct colour palette.

---

## Content Management

All content is managed via Sanity Studio at `/studio`. Schema types:

- **Vehicle** — name, class, images, amenities, eco flag, capacity
- **Service** — title, icon (Lucide name), description
- **Testimonial** — author, body, rating, source (Google/Direct)
- **Site Settings** — hero copy, phone, WhatsApp, email, logo

Vehicle classes supported: Luxury Class · Executive Class · Luxury Van & SUV · Business Class · Stretch Limousine · VIP Bus

---

## Fleet Pages

Each vehicle gets a dedicated SEO-indexed page at `/fleet/[slug]`. Pages are statically generated at build time via `generateStaticParams()`. When you publish a new vehicle in Sanity, trigger a Vercel redeploy or set up a deploy hook in Sanity project settings.

---

## Domain & DNS Migration

The domain `limoswe.se` is registered at One.com. To point it to Vercel while keeping the email working:

**In One.com DNS panel — change only:**
```
A record     →  76.76.21.21
CNAME www    →  cname.vercel-dns.com
```

**Do NOT touch:**
```
MX records   →  One.com mail servers (keeps info@limoswe.se working)
SPF / DKIM   →  leave unchanged
```

---

## Deployment

1. Push to GitHub
2. Import repo at [vercel.com](https://vercel.com)
3. Add environment variables in Vercel project settings
4. Add `limoswe.se` as a custom domain in Vercel
5. Update DNS at One.com as above

```bash
npm run build   # verify build passes before deploying
```
