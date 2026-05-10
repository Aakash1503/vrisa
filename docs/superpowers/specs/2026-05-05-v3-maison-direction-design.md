# v3 — Maison Direction Design Spec
**Date:** 2026-05-05  
**Project:** Vrisa Website / v3  
**Port:** 3003  
**Inspired by:** Loro Piana structural language, expressed in Vrisa's Indian-romantic-artisanal aesthetic

---

## 1. Project Setup

- New folder: `v3/` at the root of the Vrisa Website monorepo
- Stack: Vite 8 + React 19 + GSAP 3.15 (with ScrollTrigger plugin)
- Independent `package.json`, `vite.config.js` (port 3003)
- `versions.json` entry added: `{ "folder": "v3", "name": "Maison Direction", "date": "May 2026", "port": 3003 }`
- No Tailwind, no component libraries, no rounded corners, no box shadows

### Google Fonts
Imported in `index.html` `<head>`:
- **Cormorant Garamond** — weights 300, 400, 300 italic, 400 italic
- **Jost** — weights 200, 300, 400

---

## 2. Global Tokens (`v3/src/index.css`)

```css
:root {
  --terra: #C4784A;
  --rose-dust: #D4A89A;
  --sage: #8A9E7E;
  --ivory: #F5EFE4;
  --parchment: #F0E8D8;
  --ink: #2C2118;
  --muted: #7A6A5A;
  --gold: #B8965A;
  --deep: #1E140C;
}

body {
  background: var(--parchment);
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  cursor: none;
  font-family: Jost, sans-serif;
}
```

Box-sizing reset applied globally. No rounded corners or shadows anywhere in the project.

---

## 3. Component Architecture

```
App.jsx
├── Cursor.jsx           (global, fixed)
├── AnnouncementBar.jsx  (36px top bar)
├── Nav.jsx              (72px nav)
├── Hero.jsx             (calc(100vh - 108px) + floating card bleeds -80px)
├── ScrollSections.jsx   (padding-top: 120px to clear floating card)
└── Footer.jsx           (terra section + parchment bottom bar)
```

ScrollTrigger is registered once in `main.jsx` before the React tree mounts.

---

## 4. Cursor (`Cursor.jsx`)

- **Dot:** 8px, `background: var(--terra)`, fixed, z-index 9999, pointer-events none
- **Ring:** 32px, `border: 1px solid var(--terra)`, opacity 0.5, z-index 9999, pointer-events none
- Ring follows mouse with lerp 0.1 via `gsap.ticker.add()` (not rAF — intentional upgrade from v2)
- Both centered on mouse using negative margins (–4px/–16px)

---

## 5. AnnouncementBar (`AnnouncementBar.jsx`)

- Height: 36px, `background: var(--parchment)`, `border-bottom: 1px solid rgba(196,120,74,0.2)`
- Text: "Commissions open for 2025 — Narain Niwas Palace, Jaipur"
- Font: Jost 0.58rem, letter-spacing 0.25em, uppercase, `color: var(--terra)`
- No close button. Always visible.

---

## 6. Nav (`Nav.jsx`)

- Height: 72px, `background: var(--parchment)`, `border-bottom: 1px solid rgba(44,33,24,0.08)`
- Three zones via CSS position: relative + absolute centre:

| Zone | Content | Style |
|------|---------|-------|
| Left (pl: 3rem) | Story · Atelier | Jost 0.6rem, weight 300, letter-spacing 0.2em, uppercase, `var(--muted)`, hover `var(--ink)` 250ms |
| Centre (absolute 50%) | VRISA wordmark | Cormorant Garamond 1.4rem, weight 300, letter-spacing 0.45em, uppercase, `var(--ink)` |
| Right (pr: 3rem) | Threadtales · Commission | Same as left |

- On scroll past 100px: border-bottom transitions to `rgba(44,33,24,0.15)` — detected via `window.scrollY` listener or `ScrollTrigger` (no other visual change)

---

## 7. Hero (`Hero.jsx`)

### Dimensions
- Height: `calc(100vh - 108px)` (108px = 36px bar + 72px nav)
- Width: 100vw, position: relative
- **No `overflow: hidden` on the hero container** — the floating card needs to bleed below
- Instead: an inner `<div class="video-wrapper">` (absolute, inset 0, overflow: hidden) wraps both video elements and clips them; the card and pagination live outside this wrapper inside the hero container

### Video Layer
- **Two stacked `<video>` elements** (both absolute, inset 0, width/height 100%, object-fit cover)
- Active video: opacity 1; outgoing: opacity 0; crossfade 600ms ease via CSS transition
- Muted, autoplay, loop
- Sources mapped to 6 collection slots:

| Slot | File |
|------|------|
| 1 | `/videos/hero-default.mp4` |
| 2 | `/videos/hero-samarkand.mp4` |
| 3 | `/videos/hero-ahir.mp4` |
| 4 | `/videos/hero-char-chinar.mp4` |
| 5 | `/videos/hero-bagh-e-gul.mp4` |
| 6 | `/videos/hero-tuscany.mp4` |

Files absent at build time → `<video>` elements render with no visible content (graceful empty state).

### Floating Text Card
- Position: absolute, bottom: -80px, left 50%, translateX(-50%)
- Width: 320px, `background: var(--parchment)`, padding: 2.5rem 2.5rem 3rem
- z-index: 10, no border, no shadow, no rounded corners
- Contents (centred):
  - Line 1: current collection name — Cormorant Garamond weight 300, 1.6rem, `var(--ink)`, letter-spacing 0.04em
  - Line 2: spacer margin 1.2rem
  - Line 3: "— Explore —" link — Jost 0.58rem, weight 300, letter-spacing 0.2em, `var(--terra)`, hover opacity 0.7 200ms
- Updates collection name text when pagination changes

### Pagination (6 dots)
- Position: absolute, bottom 2.5rem, left 50%, translateX(-50%)
- Inactive dot: 5px circle, `background: var(--ivory)`, opacity 0.5
- Active dot: width 20px (pill), opacity 1 — `transition: width 400ms ease`
- Gap: 10px between dots
- Clicking a dot: switches video + updates card text

### Sound Toggle
- Position: absolute, bottom 2.5rem, right 2.5rem
- Text: "SOUND ON" / "SOUND OFF" — Jost 0.52rem, letter-spacing 0.2em, uppercase
- Color: `rgba(245,239,228,0.5)`, hover `rgba(245,239,228,0.85)`

---

## 8. ScrollSections (`ScrollSections.jsx`)

- `background: var(--parchment)`, `padding-top: 120px` (clears the –80px floating card + 40px buffer)
- 5 editorial sections, each 100vh, position relative, overflow hidden

### Parallax
- GSAP ScrollTrigger on each image: `scrub: 1`, image `y` from `-8%` to `8%`
- Image: 100% width/height, object-fit cover

### Text Overlay (per section, bottom-left)
- Padding: `0 0 4rem 4rem`
- Region label: Jost 0.52rem, weight 300, letter-spacing 0.35em, uppercase, `var(--gold)`, mb 0.8rem
- Name: Cormorant Garamond italic weight 300, `clamp(2.5rem, 5vw, 4.5rem)`, `var(--ivory)`, line-height 1.1
- Poetic line: Jost 0.7rem, weight 200, letter-spacing 0.08em, `rgba(245,239,228,0.6)`, mt 0.8rem, max-width 380px

### Five Sections

| # | Region | Name | Poetic Line | Image |
|---|--------|------|-------------|-------|
| 1 | Rajasthan · Jaipur | The Haveli Series | She stands like a memory the city refuses to forget | `/images/section-1.jpg` |
| 2 | Mughal · Botanical | Bagh-E-Gul | A garden blooms on her back | `/images/section-2.jpg` |
| 3 | Italy · Cross-cultural | A Postcard from Tuscany | Soft silhouettes and sunlit stillness | `/images/section-3.jpg` |
| 4 | Rajasthan · Kutch | Ahir | Earth remembers and the heart already knows | `/images/section-4.jpg` |
| 5 | Uzbekistan · Silk Route | Samarkand | Where the archaic breathes again | `/images/section-5.jpg` |

### Dividers Between Sections
- 80px parchment div between each section — breathing space, no text

---

## 9. Footer (`Footer.jsx`)

### Part One — Terra
- `background: var(--terra)`, padding: 5rem 4rem
- Two-column layout:

**Left column:**
- Label: "Begin a Conversation" — Jost 0.55rem, letter-spacing 0.35em, uppercase, ivory opacity 0.7
- Heading: "Commission a piece" — Cormorant Garamond italic 2.8rem weight 300, ivory
- Email input: underline only (1px solid `rgba(245,239,228,0.3)` bottom border), no box/radius
  - Placeholder: "Your email" — Jost 0.75rem weight 200, ivory opacity 0.5
  - Width: 320px
  - Arrow → right of input, ivory opacity 0.6, hover opacity 1

**Right column — 3 link groups:**

| Group | Header | Links |
|-------|--------|-------|
| Explore | Explore | Story, Collections, Threadtales, Atelier |
| Commission | Commission | How it Works, Begin a Piece, Bridal, Archive |
| Connect | Connect | Instagram, Pinterest, Press, Contact |

- Group header: Jost 0.5rem, letter-spacing 0.3em, uppercase, ivory opacity 0.45, mb 1.2rem
- Links: Jost 0.68rem, weight 200, ivory opacity 0.6, hover ivory opacity 1 250ms, gap 0.7rem

### Part Two — Parchment Bar
- `background: var(--parchment)`, height: 80px, three zones horizontal (flex):

| Zone | Content | Style |
|------|---------|-------|
| Left | Narain Niwas Palace, Jaipur · Est. 2013 | Jost 0.55rem, weight 200, letter-spacing 0.15em, `var(--muted)` |
| Centre | VRISA | Cormorant Garamond 1rem, letter-spacing 0.4em, `var(--ink)` |
| Right | © 2025 Vrisa. All rights reserved. | Jost 0.55rem, weight 200, `var(--muted)` |

---

## 10. `main.jsx` — GSAP ScrollTrigger Registration

```jsx
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
```

Registered before `ReactDOM.createRoot(...)`.

---

## 11. Asset Strategy

All video and image paths are referenced as public assets (`/videos/…`, `/images/…`). Files are not present at build time. Components render gracefully when assets are absent — `<video>` shows nothing, `<img>` shows nothing. No placeholder colors or fallback content needed; the parchment background provides sufficient context.

---

## 12. File Structure (target)

```
v3/
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
├── public/
│   ├── videos/          (hero-default.mp4, etc. — dropped in separately)
│   └── images/          (section-1.jpg … section-5.jpg — dropped in separately)
└── src/
    ├── main.jsx          (registers GSAP ScrollTrigger)
    ├── App.jsx
    ├── index.css         (tokens + body reset)
    └── components/
        ├── Cursor.jsx
        ├── AnnouncementBar.jsx
        ├── Nav.jsx
        ├── Hero.jsx
        ├── ScrollSections.jsx
        └── Footer.jsx
```
