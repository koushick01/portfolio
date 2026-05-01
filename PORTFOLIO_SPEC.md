# Koushick Padmanabhan — Portfolio Website
# Technical Specification Document

> **Purpose:** This document is a complete, self-contained specification for building a personal portfolio website. An AI model or developer reading this document should be able to implement the entire project without needing any additional context.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Site Architecture](#3-site-architecture)
4. [Folder Structure](#4-folder-structure)
5. [Color System & Theming](#5-color-system--theming)
6. [Typography](#6-typography)
7. [Animation Guidelines](#7-animation-guidelines)
8. [All Site Content](#8-all-site-content)
9. [Component Specifications](#9-component-specifications)
10. [TypeScript Types](#10-typescript-types)
11. [Data Files](#11-data-files)
12. [Tailwind Configuration](#12-tailwind-configuration)
13. [Key Implementation Details](#13-key-implementation-details)
14. [Development Setup](#14-development-setup)
15. [Dependencies](#15-dependencies)
16. [Code Quality Guidelines](#16-code-quality-guidelines)
17. [SEO & Performance](#17-seo--performance)
18. [Responsive Design](#18-responsive-design)
19. [Deployment Guide](#19-deployment-guide)

---

## 1. Project Overview

### 1.1 Goal

Build a personal portfolio website for **Koushick Padmanabhan**, a Software Engineer, that:
- Establishes a professional online presence for job searching and networking
- Showcases his three projects with links to their GitHub repositories
- Displays his skills, work experience, and education clearly and elegantly
- Provides a downloadable resume (PDF)
- Links visitors to his email, GitHub, and LinkedIn

### 1.2 Target Audience
- Software engineering recruiters and hiring managers
- Potential collaborators and open-source contributors
- Anyone researching Koushick's background and work

### 1.3 Non-Goals
- No contact form (email/social links only)
- No blog
- No CMS or admin panel
- No backend, database, or API routes
- No live demo links for projects

### 1.4 Deliverable
A **single-page, fully static, responsive portfolio website** with dark/light mode toggle, built with Next.js and Tailwind CSS, deployed on Vercel.

---

## 2. Tech Stack

| Layer | Technology | Version | Rationale |
|---|---|---|---|
| Framework | Next.js (App Router) | 14.x | SSG support, SEO-friendly, fast, industry standard |
| Language | TypeScript | 5.x | Type safety, readability, prevents runtime errors |
| Styling | Tailwind CSS | 3.x | Utility-first, rapid theming, no CSS files to manage |
| Theming | next-themes | 0.3.x | Handles dark/light toggle with localStorage persistence, prevents flash |
| Animations | Framer Motion | 11.x | Scroll-triggered fade-ins, hover effects |
| Icons | Lucide React | latest | Clean, consistent, tree-shakeable icon set |
| Class merging | clsx + tailwind-merge | latest | Conditional Tailwind class merging without conflicts |
| Fonts | next/font/google (Inter) | built-in | Zero layout shift, self-hosted by Next.js |
| Deployment | Vercel | — | Native Next.js support, free tier, automatic deploys |

**This is a fully static site — no API routes, no server components that fetch data, no environment variables required.**

---

## 3. Site Architecture

### 3.1 Rendering Strategy
**Static Site Generation (SSG)** — all content is hardcoded in TypeScript data files located in `src/data/`. The Next.js build compiles everything into static HTML/CSS/JS. No runtime data fetching.

### 3.2 Page Layout
Single page at route `/`. Sections are stacked top-to-bottom and accessed via smooth scroll. The Navbar links use anchor IDs (`#about`, `#experience`, etc.) to navigate.

**Section order:**
```
┌─────────────────────────┐
│        Navbar           │  ← Sticky, always visible
├─────────────────────────┤
│         Hero            │  ← Full viewport height
├─────────────────────────┤
│         About           │  id="about"
├─────────────────────────┤
│       Experience        │  id="experience"
├─────────────────────────┤
│        Projects         │  id="projects"
├─────────────────────────┤
│         Skills          │  id="skills"
├─────────────────────────┤
│        Contact          │  id="contact"
├─────────────────────────┤
│        Footer           │
└─────────────────────────┘
```

---

## 4. Folder Structure

```
portfolio/
├── public/
│   ├── resume.pdf               # Resume PDF served for download
│   └── favicon.ico              # Site favicon (initials "KP")
│
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout: ThemeProvider, font, metadata, html/body
│   │   ├── page.tsx             # Renders all sections in order
│   │   └── globals.css          # Base resets, CSS custom properties, scrollbar styling
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx       # Sticky nav: logo + section links + theme toggle + mobile menu
│   │   │   └── Footer.tsx       # One-line footer with copyright
│   │   │
│   │   ├── sections/
│   │   │   ├── Hero.tsx         # Full-viewport hero with name, title, tagline, CTA buttons
│   │   │   ├── About.tsx        # Bio text + quick-stat cards
│   │   │   ├── Experience.tsx   # Vertical timeline of work history
│   │   │   ├── Projects.tsx     # Card grid of projects
│   │   │   ├── Skills.tsx       # Skills grouped by category as pill badges
│   │   │   └── Contact.tsx      # Social links (email, GitHub, LinkedIn)
│   │   │
│   │   └── ui/
│   │       ├── ThemeToggle.tsx  # Sun/Moon icon button that switches dark/light
│   │       ├── ProjectCard.tsx  # Individual clickable project card
│   │       ├── SkillBadge.tsx   # Single rounded pill badge for a skill
│   │       ├── SectionHeader.tsx # Reusable section title with accent underline
│   │       └── FadeInSection.tsx # Framer Motion wrapper: fades section up on scroll
│   │
│   ├── data/
│   │   ├── personal.ts          # Name, bio, contact info, social links, resume URL
│   │   ├── projects.ts          # Array of Project objects
│   │   ├── skills.ts            # Array of SkillCategory objects
│   │   └── experience.ts        # Array of Experience objects
│   │
│   ├── lib/
│   │   └── utils.ts             # cn() helper combining clsx and tailwind-merge
│   │
│   └── types/
│       └── index.ts             # TypeScript interfaces: Project, SkillCategory, Experience
│
├── tailwind.config.ts           # Extended with custom colors and font
├── next.config.ts               # Minimal Next.js config
├── tsconfig.json                # Strict TypeScript config
├── postcss.config.js            # Required for Tailwind
└── package.json
```

---

## 5. Color System & Theming

### 5.1 Design Philosophy
Minimalistic, elegant, sophisticated. Two-tone palette (background + surface) with a single accent color (teal). Muted grays for secondary text. Clean borders with no loud gradients.

### 5.2 Accent Color
**Teal** — calm, refined, and distinctive. Pairs beautifully with both dark and light backgrounds without being loud.

### 5.3 Dark Mode Palette

| Token | Hex | Tailwind Custom Name | Usage |
|---|---|---|---|
| Background | `#0A0A0A` | `background` | Page background |
| Surface | `#141414` | `surface` | Cards, navbar |
| Surface elevated | `#1E1E1E` | `surface-elevated` | Hovered cards, dropdowns |
| Text primary | `#F5F5F5` | `text-primary` | Headings, body text |
| Text muted | `#9CA3AF` | `text-muted` | Dates, labels, secondary text |
| Border | `#2A2A2A` | `border-color` | Card borders, dividers |
| Accent | `#2DD4BF` | `accent` | Buttons, links, highlights |
| Accent hover | `#5EEAD4` | `accent-hover` | Hovered accent elements |

### 5.4 Light Mode Palette

| Token | Hex | Usage |
|---|---|---|
| Background | `#FAFAFA` | Page background |
| Surface | `#FFFFFF` | Cards, navbar |
| Surface elevated | `#F4F4F5` | Hovered cards |
| Text primary | `#111111` | Headings, body text |
| Text muted | `#6B7280` | Dates, labels, secondary text |
| Border | `#E5E7EB` | Card borders, dividers |
| Accent | `#0D9488` | Buttons, links, highlights |
| Accent hover | `#14B8A6` | Hovered accent elements |

### 5.5 Implementation

Use **CSS custom properties** defined in `globals.css` and toggled by the `.dark` class (added to `<html>` by `next-themes`):

```css
/* globals.css */
:root {
  --background: #FAFAFA;
  --surface: #FFFFFF;
  --surface-elevated: #F4F4F5;
  --text-primary: #111111;
  --text-muted: #6B7280;
  --border-color: #E5E7EB;
  --accent: #0D9488;
  --accent-hover: #14B8A6;
}

.dark {
  --background: #0A0A0A;
  --surface: #141414;
  --surface-elevated: #1E1E1E;
  --text-primary: #F5F5F5;
  --text-muted: #9CA3AF;
  --border-color: #2A2A2A;
  --accent: #2DD4BF;
  --accent-hover: #5EEAD4;
}

body {
  background-color: var(--background);
  color: var(--text-primary);
  transition: background-color 0.2s ease, color 0.2s ease;
}
```

Extend `tailwind.config.ts` to map these CSS variables to Tailwind utility classes so you can write `bg-surface`, `text-muted`, `border-border-color`, `text-accent`, etc.

```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      background: 'var(--background)',
      surface: 'var(--surface)',
      'surface-elevated': 'var(--surface-elevated)',
      'text-primary': 'var(--text-primary)',
      muted: 'var(--text-muted)',
      'border-custom': 'var(--border-color)',
      accent: 'var(--accent)',
      'accent-hover': 'var(--accent-hover)',
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
    },
  },
}
```

---

## 6. Typography

**Font:** `Inter` loaded via `next/font/google` — clean, professional, highly legible.

| Element | Tailwind Classes | Weight |
|---|---|---|
| Hero name | `text-5xl md:text-6xl lg:text-7xl font-extrabold` | 800 |
| Section headings | `text-3xl md:text-4xl font-bold` | 700 |
| Card titles / subheadings | `text-xl font-semibold` | 600 |
| Body text | `text-base font-normal` (16px) | 400 |
| Muted labels, dates | `text-sm text-muted` | 400 |
| Skill badges | `text-sm font-medium` | 500 |
| Nav links | `text-sm font-medium` | 500 |

All text uses `font-sans` (Inter). Letter spacing for headings: `tracking-tight`. Line height for body: `leading-relaxed`.

---

## 7. Animation Guidelines

Keep all animations subtle and purposeful. The site should feel polished, not flashy.

### 7.1 Scroll Fade-In (Primary Animation)
Wrap each `<section>` in a `FadeInSection` component that uses Framer Motion's `whileInView`:

```typescript
// FadeInSection.tsx — applies to every section
const variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}
// Use: whileInView="visible" initial="hidden" viewport={{ once: true, margin: '-80px' }}
```

The `once: true` flag ensures the animation only plays once — not every time the user scrolls past.

### 7.2 Hover Effects
- **Project cards:** `hover:-translate-y-1 hover:border-accent transition-all duration-200` — subtle lift + border highlight
- **Buttons:** `hover:bg-accent-hover transition-colors duration-150`
- **Nav links:** `hover:text-accent transition-colors duration-150`
- **Social links in contact:** `hover:text-accent hover:-translate-y-0.5 transition-all duration-150`

### 7.3 Theme Toggle Transition
Body transitions colors smoothly on theme change via the CSS `transition` property set in `globals.css`.

### 7.4 Reduced Motion
Respect the user's OS setting for reduced motion:

```typescript
// In FadeInSection.tsx
import { useReducedMotion } from 'framer-motion'

const prefersReducedMotion = useReducedMotion()
// If true, skip animation variants and render children immediately
```

### 7.5 What NOT to Add
- No parallax effects
- No particle backgrounds
- No typing/typewriter effects
- No 3D transforms
- No auto-playing videos or GIFs

---

## 8. All Site Content

This section contains the exact content to display on the website.

### 8.1 Personal Information

```
Full Name:    Koushick Padmanabhan
Title:        Software Engineer
Location:     New Jersey, USA
Email:        koushicks01@gmail.com
Phone:        862-339-8936 (not displayed on site — resume only)
GitHub URL:   https://github.com/koushick01
LinkedIn URL: https://www.linkedin.com/in/koushick-padmanabhan
Resume File:  /resume.pdf (place in public/ folder)
```

### 8.2 Hero Section

```
Greeting:   "Hi, I'm"
Name:       "Koushick Padmanabhan"
Title:      "Software Engineer"
Tagline:    "Building fast, reliable software at the intersection of AI and full-stack development."

Button 1:   "View My Work"   → smooth scroll to #projects  (filled accent style)
Button 2:   "Download Resume" → href="/resume.pdf" download  (outlined style)
```

Below the buttons, include a subtle down-arrow icon that scrolls to the About section when clicked.

### 8.3 About Section

**Section heading:** "About Me"

**Bio (render as a single short paragraph — approximately 3 lines):**

> "Software Engineer with 3+ years of experience building full-stack applications and AI-integrated systems. Currently completing my MS in Computer Science at Montclair State University (graduating May 2026), with prior experience at Infosys and Academy St. Thrift. Open to full-time Software Engineering roles in AI, developer tools, or high-scale backend systems."

**Quick Stats (display as 3 small stat cards beside or below the bio):**

| Stat | Value |
|---|---|
| Years of Experience | 3+ |
| Companies Worked At | 3 |
| Projects Built | 3+ |

### 8.4 Experience Section

**Section heading:** "Experience"

Display in reverse chronological order (most recent first).

---

**Entry 1:**
```
Company:  Academy St. Thrift
Role:     Full Stack Developer Intern
Start:    Jan 2026
End:      May 2026
```

---

**Entry 2:**
```
Company:  Infosys
Role:     Software Development Engineer
Start:    Aug 2022
End:      Aug 2024
```

---

**Entry 3:**
```
Company:  Retech Solutions Pvt. Ltd
Role:     Junior Developer Intern
Start:    Aug 2020
End:      Oct 2020
```

---

### 8.5 Projects Section

**Section heading:** "Projects"

Display as a 3-column grid on desktop, 2-column on tablet, 1-column on mobile.

---

**Project 1:**
```
Name:        Open Fiesta
Date:        Sep 2025
GitHub URL:  https://github.com/koushick01/open-fiesta-app
Description: A multi-model AI chat platform enabling users to interact with 200+ AI models
             (OpenAI, Claude, Gemini, Grok, and more) simultaneously in real-time, with
             side-by-side response comparison for better decision-making.
Tech Stack:  ["Next.js", "TypeScript", "PostgreSQL", "Vercel AI SDK"]
```

---

**Project 2:**
```
Name:        OpenCut
Date:        Feb 2026
GitHub URL:  https://github.com/koushick01/opencut
Description: An AI-powered video generation platform that transforms prompts or URLs into
             fully produced short-form videos — automating script writing, narration, and
             visual generation using Vertex AI, ElevenLabs, and Firecrawl.
Tech Stack:  ["Next.js", "Remotion", "Bun", "Hono", "Vertex AI", "Cloudflare R2"]
```

---

**Project 3:**
```
Name:        Customer Support Voice Agent
Date:        Nov 2025
GitHub URL:  https://github.com/koushick01/customer_support_agent
Description: A real-time AI-powered voice support agent using LiveKit's WebRTC
             infrastructure and a FastAPI backend, enabling low-latency bidirectional audio
             streaming with full session management and persistent data storage.
Tech Stack:  ["Next.js", "FastAPI", "LiveKit", "PostgreSQL", "SQLAlchemy", "Docker"]
```

---

### 8.6 Skills Section

**Section heading:** "Skills"

Display skills grouped by category. Each category has a label and a row of pill badges.

```
Category: Frontend
Skills: React, Next.js, TypeScript, JavaScript, Tailwind CSS, Responsive Web Design

Category: Backend
Skills: Python, FastAPI, Flask, Node.js, Spring Boot, REST APIs, Microservices

Category: Databases
Skills: PostgreSQL, MongoDB, MySQL, Redis, SQLite

Category: Cloud & DevOps
Skills: AWS (EC2, S3, Lambda), Docker, Kubernetes, GitHub Actions, Jenkins, CI/CD

Category: AI & ML
Skills: LLM Integration, Vertex AI, Vercel AI SDK, EfficientNet, Image Classification

Category: Testing & Tools
Skills: Git, Pytest, Selenium, TDD, OAuth 2.0, JWT, JIRA, Agile / Scrum
```

> **Design note:** Do NOT use skill progress bars or percentage meters. They are subjective and look amateurish. Use clean pill badges only.

### 8.7 Contact Section

**Section heading:** "Let's Connect"

**Subheading:**
> "I'm currently open to full-time Software Engineering opportunities. Feel free to reach out."

**Social links (display as large icon + label, horizontally spaced):**

```
Email:    koushicks01@gmail.com  → mailto:koushicks01@gmail.com
GitHub:   github.com/koushick01  → https://github.com/koushick01
LinkedIn: Koushick Padmanabhan   → https://www.linkedin.com/in/koushick-padmanabhan
```

Use Lucide icons: `Mail` for email, `Github` for GitHub, `Linkedin` for LinkedIn.

### 8.8 Footer

```
© 2025 Koushick Padmanabhan · Built with Next.js
```

Center-aligned, small muted text.

---

## 9. Component Specifications

### 9.1 `layout.tsx` (Root Layout)

- Wrap everything in `<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>` from `next-themes`
- Apply Inter font using `next/font/google`
- Set `<html lang="en">` and `suppressHydrationWarning` (required by next-themes to prevent hydration mismatch)
- Set metadata: title, description, openGraph

```typescript
// Metadata
export const metadata = {
  title: 'Koushick Padmanabhan | Software Engineer',
  description: 'Software Engineer specializing in full-stack development and AI-integrated applications. Based in New Jersey.',
  openGraph: {
    title: 'Koushick Padmanabhan | Software Engineer',
    description: 'Software Engineer specializing in full-stack development and AI-integrated applications.',
    type: 'website',
  },
}
```

### 9.2 `page.tsx`

Imports and renders all section components in order. Each section is wrapped in a `FadeInSection`.

```typescript
// page.tsx structure
export default function Home() {
  return (
    <main>
      <Hero />
      <FadeInSection><About /></FadeInSection>
      <FadeInSection><Experience /></FadeInSection>
      <FadeInSection><Projects /></FadeInSection>
      <FadeInSection><Skills /></FadeInSection>
      <FadeInSection><Contact /></FadeInSection>
    </main>
  )
}
```

### 9.3 `Navbar.tsx`

**Behavior:**
- `position: sticky; top: 0; z-index: 50`
- On mount: transparent background
- On scroll past 50px: adds `backdrop-blur-md bg-surface/80 border-b border-border-custom` for a frosted-glass effect
- Uses `useEffect` + `window.addEventListener('scroll', ...)` to detect scroll position

**Layout:**
- Left side: "KP" or "Koushick" as a text logo (links to `#` / scrolls to top)
- Right side: nav links + ThemeToggle

**Nav links:** About, Experience, Projects, Skills, Contact
- Each is an `<a href="#section-id">` with smooth scroll
- Active section highlighted in accent color (use IntersectionObserver to detect current section)

**Mobile (below `md` breakpoint):**
- Hide nav links, show hamburger icon (Lucide `Menu` / `X`)
- Clicking hamburger opens a full-width dropdown with nav links stacked vertically
- Clicking a link closes the menu and scrolls to the section

### 9.4 `Hero.tsx`

**Layout:** Full viewport height (`min-h-screen`), flex column, centered content.

**Content:**
```
[Greeting]  "Hi, I'm"  (text-muted, text-xl)
[Name]      "Koushick Padmanabhan"  (text-5xl md:text-7xl, font-extrabold)
[Title]     "Software Engineer"  (text-xl md:text-2xl, text-accent)
[Tagline]   "Building fast, reliable software..."  (text-muted, max-w-lg)
[Buttons]   [View My Work] [Download Resume]
[Arrow]     ChevronDown icon at bottom center (subtle bounce animation or static)
```

**Button styles:**
- "View My Work": `bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-accent-hover transition-colors`
- "Download Resume": `border border-border-custom text-text-primary px-6 py-3 rounded-lg font-medium hover:border-accent hover:text-accent transition-colors`

**Download Resume button** must use `<a href="/resume.pdf" download>`.

### 9.5 `About.tsx`

**Layout:** Two-column on desktop (`lg:grid-cols-2`), stacked on mobile.

**Left column:** Bio text (single paragraph from section 8.3). Render as a `<p>` tag — `personal.bio` is a plain string.

**Right column:** Three stat cards arranged in a grid.

Each stat card:
```
[Large Number]  "3+"
[Label]         "Years of Experience"
```
Style: `bg-surface border border-border-custom rounded-xl p-6 text-center`

The stat number should be in accent color (`text-accent text-3xl font-bold`).

### 9.6 `Experience.tsx`

**Layout:** Vertical timeline, centered line running down the left (on desktop) or at the very left edge (mobile).

**Timeline structure:**

```
│  ●  [Company Name]           [Date Range]
│     [Role]
│
│  ●  [Next Entry...]
```

- The vertical line: `border-l-2 border-border-custom ml-4`
- Each dot: `w-3 h-3 bg-accent rounded-full -ml-1.5 mt-1.5 flex-shrink-0`
- Company name: `text-xl font-semibold`
- Role: `text-muted text-sm`
- Date range: right-aligned on desktop, below role on mobile, `text-sm text-muted`
- No bullet points — display only company, role, and date range

### 9.7 `Projects.tsx`

**Layout:** CSS Grid — `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

Each card (`ProjectCard.tsx`):
- Entire card is wrapped in an `<a href={githubUrl} target="_blank" rel="noopener noreferrer">` so the whole card is clickable
- Style: `bg-surface border border-border-custom rounded-xl p-6 hover:-translate-y-1 hover:border-accent transition-all duration-200 cursor-pointer`

**Card internal layout:**
```
[Date]           top-right, text-muted text-sm
[Project Name]   text-xl font-semibold
[Description]    text-muted text-sm mt-2 leading-relaxed
[Tech badges]    flex-wrap row of small rounded pills, mt-4
[GitHub link]    "View on GitHub →" text-accent text-sm font-medium, mt-4
                 with Github icon (Lucide) inline
```

Tech stack pills inside cards: `bg-surface-elevated text-muted text-xs px-2 py-1 rounded-md`

### 9.8 `Skills.tsx`

**Layout:** Stack of category blocks, each with:
- Category label: `text-sm font-semibold uppercase tracking-widest text-muted mb-3`
- Skill badges row: `flex flex-wrap gap-2`
- Separator: `border-b border-border-custom` between categories

Each `SkillBadge.tsx`:
- `bg-surface border border-border-custom text-text-primary text-sm font-medium px-4 py-2 rounded-full hover:border-accent hover:text-accent transition-colors duration-150`

### 9.9 `Contact.tsx`

**Layout:** Centered, max-width container.

**Heading:** "Let's Connect" — `text-3xl font-bold`
**Subheading:** paragraph from section 8.7 — `text-muted mt-4 max-w-md mx-auto`

**Social links:** Three items in a horizontal flex row (stacked on mobile), each:
```
[Icon]  [Label]
```
Style: `flex flex-col items-center gap-2 text-muted hover:text-accent hover:-translate-y-0.5 transition-all duration-150`
Icon size: `w-6 h-6`
Label text: `text-sm font-medium`

### 9.10 `ThemeToggle.tsx`

A simple button that:
- Shows `Sun` icon in dark mode, `Moon` icon in light mode (or vice versa)
- Uses `useTheme()` from `next-themes`
- Style: `p-2 rounded-lg hover:bg-surface-elevated transition-colors`
- Add `aria-label="Toggle theme"`
- Handle the mounted state (avoid hydration mismatch): render a placeholder before mount

```typescript
// Pattern to avoid hydration mismatch
const [mounted, setMounted] = useState(false)
useEffect(() => setMounted(true), [])
if (!mounted) return <div className="w-9 h-9" /> // placeholder with same dimensions
```

### 9.11 `SectionHeader.tsx`

Reusable heading component:
```typescript
interface SectionHeaderProps {
  title: string
  subtitle?: string
}
```
- Renders `<h2>` with title in `text-3xl font-bold`
- Below: a 48px wide `border-b-2 border-accent` underline (accent line decoration)
- Optional subtitle in `text-muted mt-2`
- Use in every section

### 9.12 `FadeInSection.tsx`

```typescript
// Wraps children in a Framer Motion div that fades in when scrolled into view
// Props: children, className (optional)
// Animation: opacity 0 → 1, y: 24 → 0, duration 0.5s easeOut
// Trigger: whileInView, viewport={{ once: true, margin: '-80px' }}
// Respects: useReducedMotion()
```

### 9.13 `Footer.tsx`

Single line, centered:
```
© 2025 Koushick Padmanabhan · Built with Next.js
```
Style: `text-muted text-sm text-center py-8 border-t border-border-custom`

---

## 10. TypeScript Types

**File:** `src/types/index.ts`

```typescript
export interface Project {
  id: string
  name: string
  date: string          // e.g. "Feb 2026"
  description: string   // 2-3 sentences max
  tech: string[]        // e.g. ["Next.js", "TypeScript"]
  githubUrl: string
}

export interface SkillCategory {
  category: string      // e.g. "Frontend"
  skills: string[]      // e.g. ["React", "Next.js"]
}

export interface Experience {
  id: string
  company: string
  role: string
  startDate: string     // e.g. "Jan 2026"
  endDate: string       // e.g. "May 2026"
}

export interface PersonalInfo {
  name: string
  title: string
  tagline: string
  location: string
  email: string
  github: string
  linkedin: string
  resumeUrl: string
  bio: string
  stats: { label: string; value: string }[]
}
```

---

## 11. Data Files

### `src/data/personal.ts`

```typescript
import { PersonalInfo } from '@/types'

export const personal: PersonalInfo = {
  name: 'Koushick Padmanabhan',
  title: 'Software Engineer',
  tagline: 'Building fast, reliable software at the intersection of AI and full-stack development.',
  location: 'New Jersey, USA',
  email: 'koushicks01@gmail.com',
  github: 'https://github.com/koushick01',
  linkedin: 'https://www.linkedin.com/in/koushick-padmanabhan',
  resumeUrl: '/resume.pdf',
  bio: "Software Engineer with 3+ years of experience building full-stack applications and AI-integrated systems. Currently completing my MS in Computer Science at Montclair State University (graduating May 2026), with prior experience at Infosys and Academy St. Thrift. Open to full-time Software Engineering roles in AI, developer tools, or high-scale backend systems.",
  stats: [
    { label: 'Years of Experience', value: '3+' },
    { label: 'Companies Worked At', value: '3' },
    { label: 'Projects Built', value: '3+' },
  ],
}
```

### `src/data/projects.ts`

```typescript
import { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'open-fiesta',
    name: 'Open Fiesta',
    date: 'Sep 2025',
    description:
      'A multi-model AI chat platform enabling users to interact with 200+ AI models (OpenAI, Claude, Gemini, Grok, and more) simultaneously in real-time, with side-by-side response comparison for better decision-making.',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Vercel AI SDK'],
    githubUrl: 'https://github.com/koushick01/open-fiesta-app',
  },
  {
    id: 'opencut',
    name: 'OpenCut',
    date: 'Feb 2026',
    description:
      'An AI-powered video generation platform that transforms prompts or URLs into fully produced short-form videos — automating script writing, narration, and visual generation using Vertex AI, ElevenLabs, and Firecrawl.',
    tech: ['Next.js', 'Remotion', 'Bun', 'Hono', 'Vertex AI', 'Cloudflare R2'],
    githubUrl: 'https://github.com/koushick01/opencut',
  },
  {
    id: 'customer-support-voice-agent',
    name: 'Customer Support Voice Agent',
    date: 'Nov 2025',
    description:
      'A real-time AI-powered voice support agent using LiveKit's WebRTC infrastructure and a FastAPI backend, enabling low-latency bidirectional audio streaming with full session management and persistent data storage.',
    tech: ['Next.js', 'FastAPI', 'LiveKit', 'PostgreSQL', 'SQLAlchemy', 'Docker'],
    githubUrl: 'https://github.com/koushick01/customer_support_agent',
  },
]
```

### `src/data/skills.ts`

```typescript
import { SkillCategory } from '@/types'

export const skills: SkillCategory[] = [
  {
    category: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Responsive Web Design'],
  },
  {
    category: 'Backend',
    skills: ['Python', 'FastAPI', 'Flask', 'Node.js', 'Spring Boot', 'REST APIs', 'Microservices'],
  },
  {
    category: 'Databases',
    skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'SQLite'],
  },
  {
    category: 'Cloud & DevOps',
    skills: ['AWS (EC2, S3, Lambda)', 'Docker', 'Kubernetes', 'GitHub Actions', 'Jenkins', 'CI/CD'],
  },
  {
    category: 'AI & ML',
    skills: ['LLM Integration', 'Vertex AI', 'Vercel AI SDK', 'EfficientNet', 'Image Classification'],
  },
  {
    category: 'Testing & Tools',
    skills: ['Git', 'Pytest', 'Selenium', 'TDD', 'OAuth 2.0', 'JWT', 'JIRA', 'Agile / Scrum'],
  },
]
```

### `src/data/experience.ts`

```typescript
import { Experience } from '@/types'

export const experiences: Experience[] = [
  {
    id: 'academy-st-thrift',
    company: 'Academy St. Thrift',
    role: 'Full Stack Developer Intern',
    startDate: 'Jan 2026',
    endDate: 'May 2026',
  },
  {
    id: 'infosys',
    company: 'Infosys',
    role: 'Software Development Engineer',
    startDate: 'Aug 2022',
    endDate: 'Aug 2024',
  },
  {
    id: 'retech',
    company: 'Retech Solutions Pvt. Ltd',
    role: 'Junior Developer Intern',
    startDate: 'Aug 2020',
    endDate: 'Oct 2020',
  },
]
```

### `src/lib/utils.ts`

```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## 12. Tailwind Configuration

**File:** `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',          // 'class' strategy — controlled by next-themes
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        surface: 'var(--surface)',
        'surface-elevated': 'var(--surface-elevated)',
        'text-primary': 'var(--text-primary)',
        muted: 'var(--text-muted)',
        'border-custom': 'var(--border-color)',
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

---

## 13. Key Implementation Details

### 13.1 Smooth Scrolling

Enable native smooth scrolling in `globals.css`:

```css
html {
  scroll-behavior: smooth;
}
```

Each navbar link uses `<a href="#section-id">`. Do NOT use Next.js `<Link>` for anchor links — use plain `<a>` tags.

### 13.2 Active Section Detection (Navbar Highlight)

Use `IntersectionObserver` in the Navbar to detect which section is currently in the viewport:

```typescript
// In Navbar.tsx
const sectionIds = ['about', 'experience', 'projects', 'skills', 'contact']
// Create an IntersectionObserver that watches all section elements
// When a section enters viewport, set it as activeSection state
// Apply accent color to the corresponding nav link when activeSection matches
```

### 13.3 Resume Download

Use a plain anchor tag with `download` attribute:
```html
<a href="/resume.pdf" download="Koushick-Padmanabhan-Resume.pdf">
  Download Resume
</a>
```
Place `resume.pdf` in the `/public` folder. Next.js serves `public/` files at the root URL.

### 13.4 External Links

All external links (GitHub, LinkedIn) must open in a new tab safely:
```html
<a href="..." target="_blank" rel="noopener noreferrer">...</a>
```

### 13.5 Navbar Scroll Effect

```typescript
// In Navbar.tsx
const [scrolled, setScrolled] = useState(false)

useEffect(() => {
  const handleScroll = () => setScrolled(window.scrollY > 50)
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])

// Apply classes conditionally:
// scrolled: 'backdrop-blur-md bg-surface/80 border-b border-border-custom shadow-sm'
// not scrolled: 'bg-transparent'
```

### 13.6 Mobile Menu State

```typescript
// In Navbar.tsx
const [menuOpen, setMenuOpen] = useState(false)

// Close menu when a link is clicked
const handleNavClick = () => setMenuOpen(false)

// Close menu on outside click (optional but recommended)
// Close menu when screen resizes past md breakpoint
```

---

## 14. Development Setup

### 14.1 Prerequisites
- Node.js v18 or higher (LTS recommended)
- npm, pnpm, or yarn
- Git

### 14.2 Create the Project

```bash
# Create a new Next.js project with all the right options
npx create-next-app@latest portfolio \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd portfolio
```

### 14.3 Install Additional Dependencies

```bash
npm install next-themes framer-motion lucide-react clsx tailwind-merge
```

### 14.4 Project Commands

```bash
# Start development server (hot reload)
npm run dev
# → http://localhost:3000

# Type check without building
npx tsc --noEmit

# Lint the project
npm run lint

# Build for production (always test this before deploying)
npm run build

# Start production server locally (after build)
npm run start
```

### 14.5 File to Add Manually

After project creation, place the resume PDF:
```
public/resume.pdf   ← Copy Koushick's resume PDF here
```

---

## 15. Dependencies

### Runtime Dependencies

```json
{
  "next": "^14.2.0",
  "react": "^18.3.0",
  "react-dom": "^18.3.0",
  "next-themes": "^0.3.0",
  "framer-motion": "^11.0.0",
  "lucide-react": "^0.400.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.3.0"
}
```

### Dev Dependencies (auto-installed by create-next-app)

```json
{
  "typescript": "^5.0.0",
  "@types/react": "^18.0.0",
  "@types/react-dom": "^18.0.0",
  "@types/node": "^20.0.0",
  "tailwindcss": "^3.4.0",
  "postcss": "^8.0.0",
  "autoprefixer": "^10.0.0",
  "eslint": "^8.0.0",
  "eslint-config-next": "^14.0.0"
}
```

---

## 16. Code Quality Guidelines

These rules ensure the codebase stays readable, debuggable, and maintainable.

### 16.1 TypeScript
- Enable `"strict": true` in `tsconfig.json` — catches potential null issues and unsafe patterns
- No `any` type — use proper interfaces from `src/types/index.ts`
- All component props must be typed with explicit interfaces

### 16.2 Component Rules
- **One component per file**, named identically to the file (e.g., `ProjectCard.tsx` exports `ProjectCard`)
- **PascalCase** for component names and files
- **camelCase** for utilities, hooks, and data files
- Components receive data as props — **never import data files inside components directly** (import in page or parent, then pass down)

  Exception: section components (About, Hero, etc.) may import from `src/data/` since they are top-level and won't be reused.

### 16.3 Data Separation
- **All displayed content lives in `src/data/`** — never hardcode strings in JSX
- This means updating the portfolio content requires only changing data files, not touching components

### 16.4 Styling
- Use **Tailwind utility classes exclusively** — no inline `style` props, no separate CSS files (except `globals.css`)
- Use the `cn()` helper from `src/lib/utils.ts` for conditional classes
- Never concatenate class strings with template literals without `cn()` — it causes Tailwind purging issues

### 16.5 Accessibility
- Use semantic HTML: `<main>`, `<nav>`, `<section>`, `<footer>`, `<h1>` through `<h6>` in correct order
- `<h1>` appears only once (in Hero for the name)
- Section headings use `<h2>` via `SectionHeader`
- All icon-only buttons must have `aria-label`
- All images (if any added later) must have descriptive `alt` text

### 16.6 Comments
- Only add a comment when the **why** is non-obvious (e.g., `// suppressHydrationWarning is required by next-themes`)
- Do not add comments explaining what the code does — well-named variables/functions handle that
- No TODO comments left in production code

### 16.7 File Naming
```
components/layout/Navbar.tsx      ✓
components/layout/navbar.tsx      ✗
components/ui/ProjectCard.tsx     ✓
components/ui/project-card.tsx    ✗
data/projects.ts                  ✓
data/Projects.ts                  ✗
```

---

## 17. SEO & Performance

### 17.1 Metadata (in `layout.tsx`)

```typescript
export const metadata = {
  title: 'Koushick Padmanabhan | Software Engineer',
  description:
    'Software Engineer specializing in full-stack development and AI-integrated applications. Based in New Jersey.',
  keywords: ['Software Engineer', 'Full Stack Developer', 'Next.js', 'React', 'FastAPI', 'Python'],
  authors: [{ name: 'Koushick Padmanabhan' }],
  openGraph: {
    title: 'Koushick Padmanabhan | Software Engineer',
    description: 'Software Engineer specializing in full-stack development and AI-integrated applications.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Koushick Padmanabhan | Software Engineer',
    description: 'Software Engineer specializing in full-stack development and AI-integrated applications.',
  },
}
```

### 17.2 Performance Targets
- **Lighthouse score:** 95+ on Performance, Accessibility, Best Practices, SEO
- **FCP (First Contentful Paint):** under 1.5s (achieved by having no server data fetching)
- **Font loading:** use `next/font/google` with `display: 'swap'` — eliminates layout shift

### 17.3 Font Loading (in `layout.tsx`)

```typescript
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})
```

Apply via: `<body className={inter.variable}>` and set `font-family: var(--font-inter)` in globals.css.

### 17.4 Favicon
Create a simple "KP" text favicon or a minimal geometric icon in 32×32px and place it at `public/favicon.ico`. You can also add `public/icon.png` (512×512) for PWA-quality icons.

---

## 18. Responsive Design

### 18.1 Strategy
Mobile-first: base styles apply to mobile, use Tailwind's `md:` and `lg:` prefixes to scale up.

### 18.2 Breakpoints
| Breakpoint | Width | Usage |
|---|---|---|
| (default) | < 768px | Mobile: single column, stacked content |
| `md:` | 768px | Tablet: 2-column grids begin |
| `lg:` | 1024px | Desktop: 3-column projects, side-by-side About |
| `xl:` | 1280px | Wide desktop: max-width container |

### 18.3 Section-Specific Layouts

**Navbar:**
- Mobile: hamburger menu replaces nav links
- Desktop: horizontal nav links visible

**Hero:**
- All sizes: centered, full-height — no layout change, only font size scaling

**About:**
- Mobile: bio text stacked above stat cards
- Desktop (`lg:`): two columns — bio left, stats right

**Experience:**
- All sizes: single-column vertical timeline (timeline line stays left-aligned)
- Mobile: date range appears below role
- Desktop: date range appears right-aligned on same row as company name

**Projects:**
- Mobile: `grid-cols-1`
- Tablet `md:`: `grid-cols-2`
- Desktop `lg:`: `grid-cols-3`

**Skills:**
- All sizes: categories stack vertically
- Skills within each category: `flex-wrap` adapts to screen width

**Contact:**
- Mobile: social links stack vertically
- Desktop: social links in horizontal row

### 18.4 Container Widths
Wrap all section content in: `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`

---

## 19. Deployment Guide

### 19.1 Primary Deployment: Vercel (Recommended)

Vercel is the company behind Next.js and offers the best-in-class Next.js hosting. The free Hobby tier is sufficient for this portfolio.

**Step-by-step:**

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio build"
   gh repo create portfolio --public --source=. --remote=origin --push
   # Or manually create repo at github.com and push
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in with your GitHub account
   - Click **"Add New Project"**
   - Select the `portfolio` repository
   - Framework preset: **Next.js** (auto-detected)
   - Root directory: leave as `.` (default)
   - No environment variables needed
   - Click **"Deploy"**

3. **Automatic deployments**
   - Every push to the `main` branch triggers a new deployment automatically
   - Vercel provides a preview URL for every pull request branch

4. **Free tier URL format:** `portfolio-[your-github-username].vercel.app`

---

### 19.2 Custom Domain Setup

Vercel does not sell domains. Buy from a registrar, then connect it.

**Recommended registrars (ranked by value):**

| Registrar | .com price/yr | Why |
|---|---|---|
| **Cloudflare Registrar** | ~$9–10 | At-cost pricing, no markup, best value, excellent DNS |
| **Namecheap** | ~$10–13 | Popular, good UX, free WHOIS privacy |
| **Squarespace Domains** | ~$12 | Clean interface (formerly Google Domains) |
| **GoDaddy** | ~$12–20 | Large but watch for renewal price hikes |

**Suggested domain names for Koushick:**
- `koushick.dev` — ~$15/year (developer-oriented TLD, very professional)
- `koushickpadmanabhan.com` — ~$12/year (full name, best for SEO)
- `koushick.me` — ~$20/year (personal, clean)

**Cost summary:** Domain (~$9–15/year) + Vercel (free) = **under $15/year total**

**How to connect your domain to Vercel:**

1. Buy domain from your chosen registrar
2. In Vercel: Project → **Settings** → **Domains** → type your domain → **Add**
3. Vercel displays DNS records to configure (usually an A record and/or CNAME)
4. Go to your registrar's DNS settings and add those records
5. Wait 5–30 minutes for DNS propagation
6. Vercel automatically provisions a **free SSL/HTTPS certificate** via Let's Encrypt

---

### 19.3 Alternative Deployment Options

| Platform | Cost | Notes |
|---|---|---|
| **Vercel** ✓ Recommended | Free | Native Next.js support, automatic deployments, best DX |
| **Netlify** | Free tier | Solid alternative; requires Next.js adapter, slightly more config |
| **GitHub Pages** | Free | Best for plain HTML/CSS — not recommended for Next.js App Router without extra config |
| **Render** | Free tier | Good full-stack option; free tier has cold starts (30s delay first visit) |
| **AWS Amplify** | ~$1–5/month | AWS-native, familiar given Koushick's background; more control but more complexity |
| **Cloudflare Pages** | Free | Fast global CDN, supports Next.js with adapter, no cold starts |

**Recommendation:** Stick with Vercel unless you need a specific platform for a reason. Vercel's Next.js support is unmatched.

---

### 19.4 Post-Deployment Checklist

After deploying, verify the following:

- [ ] All 6 sections render correctly on desktop and mobile
- [ ] Dark/light mode toggle works and persists on refresh
- [ ] "Download Resume" button downloads the PDF correctly
- [ ] "View My Work" button smooth-scrolls to the Projects section
- [ ] All three project cards open the correct GitHub URL in a new tab
- [ ] Email link opens mail client with correct address
- [ ] LinkedIn link opens in new tab
- [ ] GitHub social link opens in new tab
- [ ] Navbar links smooth-scroll to correct sections
- [ ] Mobile hamburger menu opens and closes correctly
- [ ] Run Lighthouse audit → target 95+ on all scores
- [ ] Test on Chrome, Firefox, and Safari
- [ ] Test on iPhone and Android screen sizes

---

*End of specification document.*
*Version: 1.0 | Date: April 2026 | Project: koushick-portfolio*
