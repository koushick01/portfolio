# Portfolio — CLAUDE.md

This is Koushick Padmanabhan's personal portfolio website. This file is the single reference for any future changes, additions, or debugging. Read it fully before making any changes.

---

## Project overview

Single-page, fully static portfolio website. All content is hardcoded in TypeScript data files — there is no backend, no database, no API routes, and no environment variables. The Next.js build compiles everything into static HTML/CSS/JS.

**Live repo:** https://github.com/koushick01/portfolio
**Local dev:** `npm run dev` → http://localhost:3000
**Deployed on:** Vercel (auto-deploys on every push to `main`)

---

## Tech stack (exact installed versions)

| Package | Version | Purpose |
|---|---|---|
| next | 14.2.35 | Framework, SSG, App Router |
| react / react-dom | ^18 | UI runtime |
| typescript | ^5 | Type safety |
| tailwindcss | ^3.4.1 | Styling |
| next-themes | ^0.4.6 | Dark/light mode toggle with localStorage persistence |
| framer-motion | ^12.38.0 | Scroll animations (`useInView` + `animate`) |
| lucide-react | ^0.400.0 | Icons — pinned to 0.400.x because v1.x removed brand icons (Github, Linkedin) |
| clsx | ^2.1.1 | Conditional class names |
| tailwind-merge | ^3.5.0 | Merges conflicting Tailwind classes |

> **Do not upgrade lucide-react past 0.x** — v1.x removed the `Github` and `Linkedin` brand icons used in `ProjectCard` and `Contact`.

---

## Commands

```bash
npm run dev        # Start dev server at http://localhost:3000
npm run build      # Production build (always run before deploying manually)
npm run start      # Serve production build locally
npm run lint       # ESLint check
npx tsc --noEmit   # TypeScript check without building
```

---

## Folder structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout: ThemeProvider, Inter font, SEO metadata
│   ├── page.tsx          # Renders all sections in order
│   └── globals.css       # CSS variables for light/dark themes, smooth scroll, scrollbar
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx    # Sticky nav, frosted-glass on scroll, IntersectionObserver active section, mobile hamburger
│   │   └── Footer.tsx    # Single-line copyright footer
│   │
│   ├── sections/
│   │   ├── Hero.tsx      # Full-viewport hero, CTA buttons, ChevronDown arrow
│   │   ├── About.tsx     # Bio paragraph + 3 stat cards
│   │   ├── Experience.tsx # Vertical timeline
│   │   ├── Projects.tsx  # 3-col card grid
│   │   ├── Skills.tsx    # Skill categories with pill badges
│   │   └── Contact.tsx   # Email, GitHub, LinkedIn social links
│   │
│   └── ui/
│       ├── ThemeToggle.tsx    # Sun/Moon toggle button
│       ├── SectionHeader.tsx  # h2 + accent underline + optional subtitle
│       ├── FadeInSection.tsx  # Framer Motion scroll fade-in wrapper
│       ├── SkillBadge.tsx     # Rounded pill badge for a skill
│       └── ProjectCard.tsx    # Clickable project card linking to GitHub
│
├── data/                 # ALL content lives here — edit these to update the site
│   ├── personal.ts       # Name, bio, tagline, email, GitHub, LinkedIn, resume URL, stats
│   ├── projects.ts       # Array of 3 Project objects
│   ├── skills.ts         # Array of 6 SkillCategory objects
│   └── experience.ts     # Array of 3 Experience objects
│
├── lib/
│   └── utils.ts          # cn() helper: clsx + tailwind-merge
│
└── types/
    └── index.ts          # TypeScript interfaces: Project, SkillCategory, Experience, PersonalInfo

public/
├── resume.pdf            # Koushick's resume — served at /resume.pdf for download
└── favicon.ico           # Default Next.js favicon (replace with custom KP initials favicon)

tailwind.config.ts        # Custom color tokens mapped to CSS variables, darkMode: 'class'
```

---

## Updating content

**All displayed content lives in `src/data/`. Never hardcode strings in components.**

| To change | Edit this file |
|---|---|
| Name, bio, tagline, email, social links | `src/data/personal.ts` |
| Projects (add/remove/edit) | `src/data/projects.ts` |
| Skills (add/remove categories or skills) | `src/data/skills.ts` |
| Work experience entries | `src/data/experience.ts` |
| Resume PDF | Replace `public/resume.pdf` |

After editing data files, no component changes needed — sections read directly from the data arrays.

---

## Design system

### Color tokens (CSS variables)

Defined in `src/app/globals.css`. Toggled by `.dark` class applied to `<html>` by `next-themes`.

| Token | Light | Dark | Tailwind class |
|---|---|---|---|
| Background | `#FAFAFA` | `#0A0A0A` | `bg-background` |
| Surface (cards, navbar) | `#FFFFFF` | `#141414` | `bg-surface` |
| Surface elevated (hover) | `#F4F4F5` | `#1E1E1E` | `bg-surface-elevated` |
| Text primary | `#111111` | `#F5F5F5` | `text-text-primary` |
| Text muted | `#6B7280` | `#9CA3AF` | `text-muted` |
| Border | `#E5E7EB` | `#2A2A2A` | `border-border-custom` |
| Accent (teal) | `#0D9488` | `#2DD4BF` | `text-accent`, `bg-accent` |
| Accent hover | `#14B8A6` | `#5EEAD4` | `bg-accent-hover` |

> **Never use `bg-surface/80` or any opacity modifier on CSS variable colors.** Tailwind cannot apply opacity modifiers to CSS variables without RGB-format variable definitions. Use `bg-surface` instead and rely on `backdrop-blur` for the glass effect.

### Typography

Font: Inter (loaded via `next/font/google`, variable `--font-inter`).

| Element | Classes |
|---|---|
| Hero name (h1) | `text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight` |
| Section headings (h2) | `text-3xl md:text-4xl font-bold tracking-tight` |
| Card titles | `text-xl font-semibold` |
| Body text | `text-base leading-relaxed` |
| Muted labels | `text-sm text-muted` |
| Skill badges | `text-sm font-medium` |
| Nav links | `text-sm font-medium` |

---

## Animation

`FadeInSection` wraps every section except Hero. It uses `useInView` (not `whileInView`) to drive the animation:

```tsx
// DO NOT use whileInView — it fails to fire for sections already in the viewport on page load
// CORRECT approach:
const isInView = useInView(ref, { once: true, margin: '-80px' })
<motion.div animate={isInView ? 'visible' : 'hidden'} />
```

**Why:** `whileInView` in Framer Motion v12 with Next.js SSR can leave sections permanently at `opacity: 0` if they are already in the viewport during hydration. `useInView` + `animate` is reliable across SSR and CSR.

Reduced motion is respected via `useReducedMotion()` — renders a plain `<div>` with no animation for users who have that OS preference enabled.

---

## Known gotchas and past bugs

### 1. lucide-react version lock
`lucide-react` is pinned to `^0.400.0`. Version 1.x removed all brand icons including `Github` and `Linkedin`, which are used in `ProjectCard.tsx` and `Contact.tsx`. Do not run `npm update lucide-react` or upgrade to v1.x without replacing those icons with SVGs or another icon library.

### 2. FadeInSection must use useInView, not whileInView
Documented above. The `whileInView` API was unreliable with Next.js SSR causing all sections to be permanently invisible. Already fixed — do not revert.

### 3. Tailwind opacity modifiers don't work on CSS variable colors
`bg-surface/80` does not work. Tailwind's opacity modifier syntax (`/80`) requires the color to be defined in RGB channel format (`rgb(var(--color) / <alpha-value>)`). All CSS variables are defined as hex. If you ever need a semi-transparent version of a surface color, add a separate CSS variable for it in `globals.css`.

### 4. Font requires both inter.variable and font-sans on body
`layout.tsx` applies `inter.variable` (creates `--font-inter` CSS property) AND `font-sans` (tells Tailwind to use the `sans` font stack which is configured to Inter). Both are required — removing either breaks the font.

---

## Adding a new section

1. Create `src/components/sections/YourSection.tsx`
2. Add the section data to an appropriate file in `src/data/` (or create a new one)
3. Add the TypeScript type to `src/types/index.ts` if needed
4. Import and render in `src/app/page.tsx`, wrapped in `<FadeInSection>`
5. Add the nav link to the `navLinks` array in `Navbar.tsx`
6. Add the section ID to `sectionIds` array in `Navbar.tsx`

---

## Adding a new project

Edit `src/data/projects.ts` and add an entry to the array:

```typescript
{
  id: 'unique-kebab-case-id',
  name: 'Project Name',
  date: 'Mon YYYY',
  description: '2-3 sentence description.',
  tech: ['Tech1', 'Tech2'],
  githubUrl: 'https://github.com/koushick01/repo-name',
}
```

No component changes needed.

---

## Deployment

**Platform:** Vercel (free Hobby tier)
**Trigger:** Every push to `main` branch auto-deploys to production
**Preview:** Every push to any other branch gets a preview URL

```bash
# Deploy = just push to main
git push origin main
```

**To roll back:** Vercel dashboard → Deployments tab → find previous deployment → ⋯ → Promote to Production.

**Resume PDF:** The file at `public/resume.pdf` is served at `/resume.pdf`. To update the resume, replace this file and push to main.

---

## SEO metadata

Defined in `src/app/layout.tsx` in the `metadata` export. Includes title, description, keywords, OpenGraph, and Twitter card. Update this if the job title or description changes.
