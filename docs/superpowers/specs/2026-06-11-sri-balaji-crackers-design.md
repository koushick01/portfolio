# Sri Balaji Crackers — Website Design Spec

**Date:** 2026-06-11
**Client:** Mr. Thilak Krishna
**Developer:** Koushick Padmanabhan + Claude
**Project directory:** `E:\Web Dev\SriBalaji Crackers`
**Timeline:** 14 days (1–2 weeks)
**Status:** Approved — ready for implementation planning

---

## 1. Project Summary

E-commerce ordering website for Sri Balaji Crackers, a fireworks retail business in Sivakasi, Tamil Nadu. Customers browse products, add to cart, and place orders. No payment gateway — all payments are handled offline (cash/UPI on delivery or pickup). Owner receives instant WhatsApp + email notifications on every order. Admin panel lets the owner manage products and orders without touching code.

---

## 2. Confirmed Decisions

| Decision | Choice | Notes |
|---|---|---|
| Framework | Next.js 14 (App Router) | TypeScript, SSR + SSG |
| Styling | Tailwind CSS | Custom CSS variables for theming |
| Color theme | Night Sky & Sparks | Dark navy bg, electric gold, fiery orange-red, hint of violet. Changeable by editing `tailwind.config.ts` + `globals.css` |
| Dark/Light mode | Toggle (next-themes) | Sun/Moon button in Navbar, persists via localStorage |
| Animations | Framer Motion | useInView (not whileInView) for SSR safety |
| Database | Supabase (PostgreSQL) | Singapore region, RLS enabled on all tables |
| Image storage | Cloudinary | Free tier, CDN, WebP auto-transform |
| Email | Resend | HTML React Email template, 3000/mo free |
| WhatsApp | CallMeBot | Free, owner one-time registration |
| Order logging | Google Sheets (Apps Script webhook) | Auto-append every order |
| Auth | Supabase Auth | Admin only, single user |
| Hosting | Vercel | Free tier, auto-deploy on push to main |
| CI/CD | GitHub → Vercel | Push to main = production deploy in ~60s |
| Node version | Pinned via `.nvmrc` | |
| Delivery scope | All of India | All 28 states + 8 UTs in dropdown |
| Build strategy | Vertical slices | 4 slices + foundation, ~50 commits, 14 days |

**Accounts needed before development:**
- Supabase — needs to be created
- Cloudinary — needs to be created
- Resend — needs to be created
- GitHub ✅ already have
- Vercel ✅ already have

---

## 3. Color System (Night Sky & Sparks)

Defined in `tailwind.config.ts` and `src/app/globals.css`. To change the theme later, edit only these two files.

```
Dark mode:
  --background:    #0B0E1A  (deep navy)
  --surface:       #1E2A4A  (card backgrounds)
  --surface-elevated: #263550
  --primary:       #F6A623  (electric gold — buttons, headings)
  --secondary:     #FF5733  (fiery orange-red — hover, accents)
  --accent:        #7B68EE  (medium violet — highlights)
  --text-primary:  #E8E8FF
  --text-muted:    #8090B0
  --border:        #2A3A5A
  --success:       #4CAF50
  --warning:       #F6A623
  --error:         #E63946

Light mode:
  --background:    #F8F9FF
  --surface:       #FFFFFF
  --surface-elevated: #F0F2FF
  --primary:       #1E2A6E  (deep navy — buttons, headings)
  --secondary:     #E65A1E  (fiery orange-red)
  --accent:        #5548CC  (violet)
  --text-primary:  #0B0E1A
  --text-muted:    #5A6080
  --border:        #D0D8F0
```

Typography: Poppins (headings + body) + Roboto Mono (prices + Order IDs) loaded via `next/font`.

---

## 4. Architecture

Single Next.js 14 app on Vercel. No separate backend server.

```
Customer Browser
  → Next.js frontend (React pages + components)
  → Next.js API routes (serverless functions)
    → Supabase (PostgreSQL, RLS, Auth)
    → Cloudinary (image upload, admin only)
    → CallMeBot (WhatsApp, fire-and-forget)
    → Resend (email, fire-and-forget)
    → Google Sheets webhook (fire-and-forget)

GitHub → Vercel (auto-deploy on push to main)
```

**Key architectural rules:**
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — browser client only, RLS-restricted
- `SUPABASE_SERVICE_ROLE_KEY` — server-side API routes only, never in browser
- Cart lives in localStorage + React Context — no server-side cart
- Notifications use `Promise.allSettled()` — all 3 fire in parallel, failure of one never blocks the order save
- `X-Powered-By` header removed from all responses

---

## 5. Folder Structure

```
E:\Web Dev\SriBalaji Crackers\
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # Homepage (SSG, 24h revalidate)
│   │   ├── globals.css                 # CSS variables — light + dark tokens
│   │   ├── products/
│   │   │   ├── page.tsx                # Catalog (SSR)
│   │   │   └── [slug]/page.tsx         # Product detail (SSR)
│   │   ├── cart/page.tsx               # Cart review (Client)
│   │   ├── order/
│   │   │   ├── page.tsx                # Order form (Client)
│   │   │   └── confirmation/page.tsx   # Order success + ID
│   │   ├── modify-order/page.tsx       # Modify by Order ID + phone
│   │   ├── about/page.tsx              # SSG
│   │   ├── contact/page.tsx            # SSG + Maps embed
│   │   ├── safety/page.tsx             # SSG + legal disclaimer
│   │   ├── privacy-policy/page.tsx     # SSG
│   │   ├── terms/page.tsx              # SSG
│   │   ├── admin/
│   │   │   ├── page.tsx                # Login
│   │   │   ├── layout.tsx              # Sidebar + auth guard
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── products/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/page.tsx
│   │   │   │   └── [id]/edit/page.tsx
│   │   │   ├── categories/page.tsx
│   │   │   ├── orders/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [orderId]/page.tsx
│   │   │   └── settings/page.tsx
│   │   └── api/
│   │       ├── orders/
│   │       │   ├── route.ts            # POST: create order
│   │       │   └── [orderId]/route.ts  # GET + PATCH: modify order
│   │       ├── products/route.ts       # GET: public catalog
│   │       ├── categories/route.ts     # GET: public categories
│   │       └── admin/
│   │           ├── products/route.ts
│   │           ├── categories/route.ts
│   │           ├── orders/
│   │           │   ├── route.ts
│   │           │   ├── [orderId]/route.ts
│   │           │   └── export/route.ts
│   │           ├── settings/route.ts
│   │           └── upload/route.ts
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── StatusBadge.tsx
│   │   │   ├── ThemeToggle.tsx
│   │   │   ├── Toast.tsx
│   │   │   └── SectionHeader.tsx
│   │   ├── catalog/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── CategoryFilter.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   └── ImageGallery.tsx
│   │   ├── cart/
│   │   │   ├── CartDrawer.tsx
│   │   │   ├── CartItem.tsx
│   │   │   └── CartContext.tsx
│   │   ├── order/
│   │   │   ├── OrderForm.tsx
│   │   │   ├── OrderSummary.tsx
│   │   │   ├── AgeConfirmCheckbox.tsx
│   │   │   ├── DeliveryFields.tsx
│   │   │   └── OrderConfirmation.tsx
│   │   └── admin/
│   │       ├── AdminProductForm.tsx
│   │       ├── AdminOrderTable.tsx
│   │       ├── AdminCategoryList.tsx
│   │       ├── ImageUploader.tsx
│   │       └── StatsCard.tsx
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts               # Browser client (anon key)
│   │   │   └── server.ts               # Server client (service role key)
│   │   ├── notifications/
│   │   │   ├── whatsapp.ts             # CallMeBot integration
│   │   │   ├── email.ts                # Resend integration
│   │   │   └── sheets.ts               # Google Sheets webhook
│   │   ├── validations.ts              # Phone, pincode, state validation
│   │   ├── orderid.ts                  # SBC-YYYY-XXXXX generator
│   │   └── rateLimit.ts                # IP-based rate limiter
│   │
│   ├── data/
│   │   └── seed/
│   │       ├── categories.ts           # 12 categories
│   │       └── products.ts             # ~100 products
│   │
│   └── types/
│       └── index.ts                    # All TypeScript interfaces
│
├── supabase/
│   └── migrations/
│       ├── 001_initial_schema.sql
│       └── 002_rls_policies.sql
│
├── public/
│   ├── favicon.ico
│   └── og-image.png                    # Open Graph image for SEO
│
├── .nvmrc                              # Node version pin
├── .env.local                          # Never committed
├── .env.example                        # Committed — shows all key names
├── .gitignore
├── tailwind.config.ts                  # Color tokens + dark mode config
├── next.config.ts
├── tsconfig.json                       # strict: true
└── package.json
```

---

## 6. Database Schema

### Table: `categories`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | Auto-generated |
| `name` | text | Display name |
| `slug` | text | URL-safe |
| `display_order` | integer | Sort order |
| `is_visible` | boolean | False = hidden from catalog |
| `created_at` | timestamptz | Auto |

### Table: `products`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `category_id` | uuid FK | → categories |
| `name` | text | |
| `slug` | text | URL-safe |
| `description` | text | Nullable |
| `price` | numeric(10,2) | INR |
| `images` | text[] | Cloudinary URLs, up to 5 |
| `is_available` | boolean | In stock / out of stock |
| `is_visible` | boolean | Soft delete |
| `display_order` | integer | |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | Auto-updated |

### Table: `orders`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `order_id` | text UNIQUE | `SBC-YYYY-XXXXX` |
| `customer_name` | text | |
| `customer_phone` | text | Used for modification verification |
| `customer_email` | text | Nullable |
| `delivery_type` | text | `home_delivery` or `shop_pickup` |
| `delivery_address` | text | Nullable |
| `delivery_city` | text | Nullable |
| `delivery_state` | text | Any Indian state/UT |
| `delivery_pincode` | text | 6-digit, nullable |
| `special_instructions` | text | Nullable |
| `status` | text | `pending`, `processing`, `dispatched`, `delivered`, `cancelled` |
| `items` | jsonb | Snapshot: product id, name, price, qty |
| `total_amount` | numeric(10,2) | |
| `is_modified` | boolean | |
| `modification_count` | integer | |
| `age_confirmed` | boolean | Must be true |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | |

### Table: `site_settings`
Key-value store. Keys: `contact_phone`, `contact_email`, `shop_address`, `shop_pincode`, `business_hours`, `min_order_value`, `notification_whatsapp`, `notification_email`, `google_sheet_webhook`, `peso_license`, `gst_number`.

### RLS Policy Summary
| Table | Public Read | Public Write | Admin |
|---|---|---|---|
| `categories` | `is_visible = true` only | No | Full access |
| `products` | `is_visible = true` only | No | Full access |
| `orders` | **Never** | Insert only | Full access |
| `site_settings` | Non-sensitive keys only | No | Full access |

Queries always use explicit column selection — no `SELECT *` on orders.

---

## 7. Product Catalog

**12 categories, ~100 products at launch (more to be added via admin panel):**

One Sound Crackers · Ground Chakkar · Flower Pots · Time Bombs · Rocket · Fancy Candles · New Aerial Novelties · Sky Fancy Multi Shots · Sky Fancy Fountains · Helicopter · Sparklers · Colour Matches & Caps

All products and categories are seeded from `src/data/seed/` during Phase 1. All future product management is done through the admin panel — no code changes needed.

**Note on ambiguous items in the product list:** "Peacock", "Glittering Leaf" (under Sky Fancy Fountains) and "Wow Purple" (under New Aerial Novelties) appear without serial numbers in the Excel sheet. These will be seeded as regular products. The admin can rename, recategorize, or delete them after launch without touching code.

---

## 8. Security

### Order creation
- Client-side validation (UX) + server-side re-validation (security) — both required
- Phone: 10-digit Indian mobile regex
- Pincode: 6 digits
- State: must be a valid Indian state or UT
- `age_confirmed` must be strictly `true` — hard rejection if false
- HTML stripped from all text inputs before DB insert
- IP rate limit: max 5 orders per IP per hour (Vercel KV)

### Order modification
- Order ID + phone number must match DB record exactly
- Only allowed when `status = pending`
- **5 failed phone verifications from same IP → 20-minute lockout**
- Customer phone number never returned in any API response
- Error messages never reveal field values — only generic messages

### Admin
- Supabase session verified server-side on every `/api/admin/*` request
- Service role key only used server-side
- Image upload: MIME type validation + 5MB max size
- Admin password minimum 12 characters
- `X-Powered-By` header removed

### Zero data leak guarantees
- No `SELECT *` on orders table — always explicit column list
- API responses include only fields needed for the current operation
- Stack traces and internal errors never sent to the client
- Server logs go to Vercel's private function logs only

---

## 9. Vertical Slices & ~50 Commits

### Foundation — 8 commits (Day 1–2)
1. `chore:` init Next.js 14 + TypeScript + Tailwind + ESLint
2. `chore:` add .nvmrc, .env.example, .gitignore
3. `feat:` configure Tailwind Night Sky theme tokens and CSS variables
4. `feat:` set up Supabase browser + server clients
5. `feat:` add DB schema migrations (4 tables)
6. `feat:` add RLS policies for all tables
7. `feat:` build Navbar with dark/light toggle and mobile menu
8. `feat:` build Footer with links and PESO/GST support

### Slice 1 — Browse & Cart — 10 commits (Day 2–5)
9. `feat:` seed DB with 12 categories and ~100 products
10. `feat:` build homepage — hero, featured products, category grid
11. `feat:` build product catalog page with grid layout
12. `feat:` add category filter, search bar and sort options
13. `feat:` build ProductCard with image and availability badge
14. `feat:` build product detail page with image gallery
15. `feat:` implement cart context with localStorage persistence
16. `feat:` build cart drawer slide-in panel
17. `feat:` build cart page with quantity controls and order total
18. `fix:` mobile responsiveness — catalog and product detail

### Slice 2 — Order Flow + Notifications — 12 commits (Day 5–8)
19. `feat:` build order form with customer details and validation
20. `feat:` add delivery type toggle and conditional address fields
21. `feat:` add all-India state dropdown and pincode validation
22. `feat:` add age confirmation checkbox (18+, required)
23. `feat:` implement POST /api/orders with SBC-YYYY-XXXXX ID generation
24. `feat:` add server-side validation and IP rate limiting
25. `feat:` build order confirmation page with prominent Order ID
26. `feat:` build modify order page with ID and phone lookup
27. `feat:` implement GET /api/orders/[id] with phone verification
28. `feat:` implement PATCH /api/orders/[id] for pending order modification
29. `feat:` integrate WhatsApp (CallMeBot) + Email (Resend) notifications
30. `feat:` integrate Google Sheets webhook for order logging

### Slice 3 — Admin Panel — 14 commits (Day 8–12)
31. `feat:` add admin login page with Supabase Auth session management
32. `feat:` add admin layout with sidebar and server-side session guard
33. `feat:` build admin dashboard with live order stats and quick actions
34. `feat:` build product list with edit, hide and delete actions
35. `feat:` build add product form with fields and validation
36. `feat:` integrate Cloudinary drag-and-drop image upload
37. `feat:` build edit product page
38. `feat:` build category management with reorder and visibility toggle
39. `feat:` build orders table with search, filter and pagination
40. `feat:` add inline order status update dropdown
41. `feat:` build order detail page with full info and internal notes
42. `feat:` implement CSV export for filtered orders
43. `feat:` build site settings editor for contact and notification config
44. `fix:` admin panel mobile layout and UX polish

### Slice 4 — Pages, SEO, QA, Launch — 6 commits (Day 12–14)
45. `feat:` build About, Contact (Maps embed) and Safety pages
46. `feat:` build Privacy Policy and Terms & Conditions pages
47. `feat:` configure sitemap.xml and robots.txt
48. `feat:` add SEO metadata and structured data to all public pages
49. `fix:` full QA pass — Lighthouse audit, accessibility, cross-browser, mobile
50. `chore:` production env vars, domain DNS, final deploy and handover

**Total: 50 commits**

---

## 10. Testing Approach

| Layer | Tool | When | Gate |
|---|---|---|---|
| Type safety | TypeScript strict | Every save | `npx tsc --noEmit` must pass before commit |
| Code quality | ESLint | Every commit | `npm run lint` must pass before commit |
| Manual E2E | Browser testing | End of each slice | 13 test cases (see below) |
| Performance | Lighthouse | Pre-launch | 90+ Performance, Accessibility, SEO; 100 Best Practices |

**13 mandatory manual test cases:**
1. Browse → filter → search → add to cart
2. Cart persists after page refresh
3. Place order → WhatsApp + email received by owner
4. Order ID shows on confirmation page
5. Modify order with correct ID + phone
6. Modification blocked when status = Processing
7. 5 wrong phone attempts → 20-minute IP lockout
8. Age checkbox unchecked → submit button disabled
9. Admin: add product with image upload
10. Admin: update order status
11. Admin: CSV export downloads correctly
12. Dark/light toggle works on every page
13. Anon Supabase key cannot read orders (verified in Supabase dashboard)

---

## 11. Deployment Pipeline

```
Local dev (localhost:3000)
  ↓ git push origin main
GitHub repository
  ↓ webhook (automatic)
Vercel build (npm run build + tsc check)
  ↓ build passes (~60 seconds)
Preview URL (every push) + Production (sribalajicrackers.in)
```

- Local `.env.local` → Supabase dev project + test API keys
- Vercel Dashboard env vars → Supabase prod project + live API keys
- Rollback: Vercel Dashboard → Deployments → Promote any previous deployment (10 seconds)

---

## 12. Pre-Launch Checklist

**Accounts & services:** Supabase created (SG region) · Cloudinary created · Resend created + domain verified · CallMeBot registered with client's WhatsApp · Google Sheet + Apps Script deployed · Domain `.in` registered

**Configuration:** All env vars set in Vercel dashboard · RLS policies verified · Admin user created in Supabase Auth · `site_settings` seeded with client info · All ~100 products seeded with images

**Final verification:** Real end-to-end test order placed · WhatsApp + email received · Google Sheet row appended · Admin panel login works · Lighthouse 90+ on Homepage, Catalog, Order Form · Tested on real mobile device

---

## 13. Pending Client Inputs (TBD)

| Item | Where Used |
|---|---|
| Owner's WhatsApp number | CallMeBot + site_settings |
| Owner's notification email | Resend + site_settings |
| Contact phone for display | Footer, contact page |
| Contact email for display | Footer, contact page |
| Full shop address | Contact page, Google Maps embed |
| Business hours | Contact page |
| Final domain name | Vercel, Resend sender |
| PESO license number | Footer (optional) |
| GST number | Footer (optional) |
| Year established | About page |
| Product images | All 100 products need images |
| Minimum order value | Cart validation (0 = no minimum) |

---

*Spec approved by Koushick Padmanabhan on 2026-06-11. Implementation plan to follow.*
