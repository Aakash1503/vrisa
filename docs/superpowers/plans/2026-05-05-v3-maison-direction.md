# v3 Maison Direction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build v3/ — a full Vite+React+GSAP page for Vrisa's "Maison Direction" aesthetic, with custom cursor, editorial nav, hero with video crossfade + floating card, five parallax scroll sections, and a two-part footer.

**Architecture:** Independent Vite project at `v3/` (mirroring v1/v2 structure). GSAP ScrollTrigger registered globally in `main.jsx` before the React tree. Six components compose sequentially inside `App.jsx`; the floating card bridges Hero into ScrollSections via a deliberate -80px bottom bleed held open by `padding-top: 120px` on ScrollSections.

**Tech Stack:** Vite 8, React 19, GSAP 3.15 (ScrollTrigger plugin), Google Fonts (Cormorant Garamond + Jost), plain CSS via index.css — no Tailwind, no component libraries.

---

## File Map

| File | Responsibility |
|------|---------------|
| `v3/package.json` | Project deps: react, react-dom, gsap |
| `v3/vite.config.js` | Port 3003 |
| `v3/eslint.config.js` | ESLint (copied from v2) |
| `v3/index.html` | Entry HTML, Google Fonts `<link>` tags |
| `v3/src/main.jsx` | Registers GSAP ScrollTrigger, mounts React |
| `v3/src/App.jsx` | Assembles all six components |
| `v3/src/index.css` | Design tokens, body reset, global rules |
| `v3/src/components/Cursor.jsx` | Fixed dot + lagging ring via GSAP ticker |
| `v3/src/components/AnnouncementBar.jsx` | 36px parchment top bar |
| `v3/src/components/Nav.jsx` | 72px 3-zone nav, scroll-aware border |
| `v3/src/components/Hero.jsx` | Video crossfade, floating card, pagination, sound |
| `v3/src/components/ScrollSections.jsx` | 5 parallax editorial sections + 80px dividers |
| `v3/src/components/Footer.jsx` | Terra contact section + parchment bottom bar |
| `versions.json` (root) | Add v3 entry |

---

## Task 1: Scaffold v3 project

**Files:**
- Create: `v3/package.json`
- Create: `v3/vite.config.js`
- Create: `v3/eslint.config.js`
- Create: `v3/index.html`
- Create: `v3/src/main.jsx`
- Create: `v3/src/App.jsx`
- Create: `v3/src/index.css`

- [ ] **Step 1: Create `v3/package.json`**

```json
{
  "name": "v3",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "gsap": "^3.15.0",
    "react": "^19.2.5",
    "react-dom": "^19.2.5"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "eslint": "^10.2.1",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.2",
    "globals": "^17.5.0",
    "vite": "^8.0.10"
  }
}
```

- [ ] **Step 2: Create `v3/vite.config.js`**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 3003 },
})
```

- [ ] **Step 3: Create `v3/eslint.config.js`**

```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
])
```

- [ ] **Step 4: Create `v3/index.html`**

Note: Jost needs weight 200 added (v2 only had 300,400). Cormorant Garamond unchanged.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vrisa — Maison Direction</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 5: Create `v3/src/index.css`**

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

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

body {
  background: var(--parchment);
  overflow-x: hidden;
  cursor: none;
  font-family: Jost, sans-serif;
}

#root {
  width: 100%;
}

a {
  text-decoration: none;
  color: inherit;
}

button {
  background: none;
  border: none;
  cursor: none;
  padding: 0;
  font-family: inherit;
}

/* Footer email input placeholder */
.footer-email::placeholder {
  color: var(--ivory);
  opacity: 0.5;
}
```

- [ ] **Step 6: Create `v3/src/main.jsx`**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './index.css'
import App from './App.jsx'

gsap.registerPlugin(ScrollTrigger)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 7: Create `v3/src/App.jsx` (placeholder — wired fully in Task 9)**

```jsx
export default function App() {
  return <div style={{ background: 'var(--parchment)', minHeight: '100vh' }} />
}
```

- [ ] **Step 8: Create public asset directories**

```bash
mkdir -p v3/public/videos v3/public/images
```

- [ ] **Step 9: Install dependencies**

```bash
cd v3 && npm install
```

Expected: `node_modules/` created, no errors.

- [ ] **Step 10: Verify dev server starts on port 3003**

```bash
cd v3 && npm run dev
```

Expected: `Local: http://localhost:3003/` — blank parchment page, no console errors.

---

## Task 2: Update versions.json

**Files:**
- Modify: `versions.json` (root)

- [ ] **Step 1: Add v3 entry to `versions.json`**

Open `/Users/aakashkumar/Desktop/Vrisa Website/versions.json` and replace its contents with:

```json
[
  { "folder": "v1", "name": "Plutarch Direction", "date": "May 2026", "port": 3001 },
  { "folder": "v2", "name": "Injiri Direction",   "date": "May 2026", "port": 3002 },
  { "folder": "v3", "name": "Maison Direction",   "date": "May 2026", "port": 3003 }
]
```

---

## Task 3: Cursor component

**Files:**
- Create: `v3/src/components/Cursor.jsx`

- [ ] **Step 1: Create `v3/src/components/Cursor.jsx`**

```jsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const mouse = { x: -100, y: -100 }
    const ring = { x: -100, y: -100 }

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`
      }
    }

    const tick = () => {
      ring.x += (mouse.x - ring.x) * 0.1
      ring.y += (mouse.y - ring.y) * 0.1
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px)`
      }
    }

    gsap.ticker.add(tick)
    window.addEventListener('mousemove', onMove)

    return () => {
      gsap.ticker.remove(tick)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          background: 'var(--terra)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          marginLeft: '-4px',
          marginTop: '-4px',
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          border: '1px solid var(--terra)',
          borderRadius: '50%',
          opacity: 0.5,
          pointerEvents: 'none',
          zIndex: 9999,
          marginLeft: '-16px',
          marginTop: '-16px',
          willChange: 'transform',
        }}
      />
    </>
  )
}
```

- [ ] **Step 2: Add Cursor to App.jsx and verify**

In `v3/src/App.jsx`:

```jsx
import Cursor from './components/Cursor'

export default function App() {
  return (
    <>
      <Cursor />
      <div style={{ background: 'var(--parchment)', minHeight: '100vh' }} />
    </>
  )
}
```

Start dev server, move mouse. Expect: terra dot tracks instantly, terra ring lags behind with lerp, default cursor hidden.

---

## Task 4: AnnouncementBar component

**Files:**
- Create: `v3/src/components/AnnouncementBar.jsx`

- [ ] **Step 1: Create `v3/src/components/AnnouncementBar.jsx`**

```jsx
export default function AnnouncementBar() {
  return (
    <div
      style={{
        height: '36px',
        background: 'var(--parchment)',
        borderBottom: '1px solid rgba(196,120,74,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          fontFamily: 'Jost, sans-serif',
          fontSize: '0.58rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--terra)',
        }}
      >
        Commissions open for 2025 — Narain Niwas Palace, Jaipur
      </span>
    </div>
  )
}
```

- [ ] **Step 2: Add to App.jsx and verify**

```jsx
import Cursor from './components/Cursor'
import AnnouncementBar from './components/AnnouncementBar'

export default function App() {
  return (
    <>
      <Cursor />
      <AnnouncementBar />
      <div style={{ background: 'var(--parchment)', minHeight: '100vh' }} />
    </>
  )
}
```

Expect: 36px terra-text bar at top, parchment background, no close button.

---

## Task 5: Nav component

**Files:**
- Create: `v3/src/components/Nav.jsx`

- [ ] **Step 1: Create `v3/src/components/Nav.jsx`**

```jsx
import { useEffect, useState } from 'react'

const linkStyle = {
  fontFamily: 'Jost, sans-serif',
  fontSize: '0.6rem',
  fontWeight: 300,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
  transition: 'color 250ms ease',
  cursor: 'none',
}

function NavLink({ children }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href="#"
      style={{ ...linkStyle, color: hovered ? 'var(--ink)' : 'var(--muted)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </a>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'relative',
        height: '72px',
        background: 'var(--parchment)',
        borderBottom: scrolled
          ? '1px solid rgba(44,33,24,0.15)'
          : '1px solid rgba(44,33,24,0.08)',
        transition: 'border-bottom 300ms ease',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '3rem',
        paddingRight: '3rem',
      }}
    >
      {/* Left links */}
      <div style={{ display: 'flex', gap: '2.5rem' }}>
        <NavLink>Story</NavLink>
        <NavLink>Atelier</NavLink>
      </div>

      {/* Centre wordmark — absolutely centred */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: '1.4rem',
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            color: 'var(--ink)',
          }}
        >
          VRISA
        </span>
      </div>

      {/* Right links */}
      <div style={{ marginLeft: 'auto', display: 'flex', gap: '2.5rem' }}>
        <NavLink>Threadtales</NavLink>
        <NavLink>Commission</NavLink>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Add to App.jsx and verify**

```jsx
import Cursor from './components/Cursor'
import AnnouncementBar from './components/AnnouncementBar'
import Nav from './components/Nav'

export default function App() {
  return (
    <>
      <Cursor />
      <AnnouncementBar />
      <Nav />
      <div style={{ background: 'var(--parchment)', height: '200vh' }} />
    </>
  )
}
```

Expect: 72px nav, VRISA centred, left/right links, hover turns ink. Add placeholder height and scroll past 100px — border-bottom should become slightly more visible.

---

## Task 6: Hero component

**Files:**
- Create: `v3/src/components/Hero.jsx`

- [ ] **Step 1: Create `v3/src/components/Hero.jsx`**

```jsx
import { useState, useRef, useEffect } from 'react'

const COLLECTIONS = [
  { name: 'The Haveli Series',        video: '/videos/hero-default.mp4' },
  { name: 'Samarkand',                video: '/videos/hero-samarkand.mp4' },
  { name: 'Ahir',                     video: '/videos/hero-ahir.mp4' },
  { name: 'Char Chinar',              video: '/videos/hero-char-chinar.mp4' },
  { name: 'Bagh-E-Gul',              video: '/videos/hero-bagh-e-gul.mp4' },
  { name: 'A Postcard from Tuscany',  video: '/videos/hero-tuscany.mp4' },
]

export default function Hero() {
  const [activeSlot, setActiveSlot] = useState(0)
  const [activeVideo, setActiveVideo] = useState('a') // 'a' | 'b'
  const [muted, setMuted] = useState(true)
  const videoA = useRef(null)
  const videoB = useRef(null)

  // Load initial video on mount
  useEffect(() => {
    if (videoA.current) {
      videoA.current.src = COLLECTIONS[0].video
      videoA.current.play().catch(() => {})
    }
  }, [])

  const switchSlot = (index) => {
    if (index === activeSlot) return
    const incoming = activeVideo === 'a' ? videoB : videoA
    const incomingRef = incoming

    if (incomingRef.current) {
      incomingRef.current.src = COLLECTIONS[index].video
      incomingRef.current.muted = muted
      incomingRef.current.play().catch(() => {})
    }

    setActiveSlot(index)
    setActiveVideo(prev => prev === 'a' ? 'b' : 'a')
  }

  const toggleSound = () => {
    const newMuted = !muted
    setMuted(newMuted)
    const activeRef = activeVideo === 'a' ? videoA : videoB
    if (activeRef.current) activeRef.current.muted = newMuted
  }

  const videoStyle = (isActive) => ({
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: isActive ? 1 : 0,
    transition: 'opacity 600ms ease',
  })

  return (
    <div
      style={{
        position: 'relative',
        height: 'calc(100vh - 108px)',
        width: '100vw',
      }}
    >
      {/* Video wrapper — clips video, does NOT clip card or pagination */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
        }}
      >
        <video
          ref={videoA}
          muted
          autoPlay
          loop
          playsInline
          style={videoStyle(activeVideo === 'a')}
        />
        <video
          ref={videoB}
          muted
          autoPlay
          loop
          playsInline
          style={videoStyle(activeVideo === 'b')}
        />
      </div>

      {/* Pagination dots */}
      <div
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 5,
        }}
      >
        {COLLECTIONS.map((_, i) => (
          <button
            key={i}
            onClick={() => switchSlot(i)}
            style={{
              width: activeSlot === i ? '20px' : '5px',
              height: '5px',
              background: 'var(--ivory)',
              opacity: activeSlot === i ? 1 : 0.5,
              borderRadius: activeSlot === i ? '3px' : '50%',
              transition: 'width 400ms ease, opacity 400ms ease',
            }}
          />
        ))}
      </div>

      {/* Sound toggle */}
      <button
        onClick={toggleSound}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          right: '2.5rem',
          fontFamily: 'Jost, sans-serif',
          fontSize: '0.52rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(245,239,228,0.5)',
          zIndex: 5,
          transition: 'color 200ms ease',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'rgba(245,239,228,0.85)'}
        onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,239,228,0.5)'}
      >
        {muted ? 'Sound On' : 'Sound Off'}
      </button>

      {/* Floating text card — bleeds 80px below hero */}
      <div
        style={{
          position: 'absolute',
          bottom: '-80px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '320px',
          background: 'var(--parchment)',
          padding: '2.5rem 2.5rem 3rem',
          zIndex: 10,
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: '1.6rem',
            color: 'var(--ink)',
            letterSpacing: '0.04em',
          }}
        >
          {COLLECTIONS[activeSlot].name}
        </p>
        <div style={{ margin: '1.2rem 0' }} />
        <a
          href="#"
          style={{
            fontFamily: 'Jost, sans-serif',
            fontSize: '0.58rem',
            fontWeight: 300,
            letterSpacing: '0.2em',
            color: 'var(--terra)',
            opacity: 1,
            transition: 'opacity 200ms ease',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          — Explore —
        </a>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Add to App.jsx and verify**

```jsx
import Cursor from './components/Cursor'
import AnnouncementBar from './components/AnnouncementBar'
import Nav from './components/Nav'
import Hero from './components/Hero'

export default function App() {
  return (
    <>
      <Cursor />
      <AnnouncementBar />
      <Nav />
      <Hero />
      <div style={{ background: 'var(--parchment)', height: '200vh' }} />
    </>
  )
}
```

Expect:
- Hero fills remaining viewport below bar+nav (calc 100vh - 108px)
- Floating parchment card visible, hanging 80px below hero bottom into the div below
- Six pagination dots at bottom centre, active dot widens to pill on click
- Collection name in card updates on dot click
- Sound toggle text at bottom right, "Sound On" by default
- Videos invisible (no files yet) — parchment/dark background shows through

---

## Task 7: ScrollSections component

**Files:**
- Create: `v3/src/components/ScrollSections.jsx`

- [ ] **Step 1: Create `v3/src/components/ScrollSections.jsx`**

```jsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const SECTIONS = [
  {
    region: 'Rajasthan · Jaipur',
    name: 'The Haveli Series',
    line: 'She stands like a memory the city refuses to forget',
    image: '/images/section-1.jpg',
  },
  {
    region: 'Mughal · Botanical',
    name: 'Bagh-E-Gul',
    line: 'A garden blooms on her back',
    image: '/images/section-2.jpg',
  },
  {
    region: 'Italy · Cross-cultural',
    name: 'A Postcard from Tuscany',
    line: 'Soft silhouettes and sunlit stillness',
    image: '/images/section-3.jpg',
  },
  {
    region: 'Rajasthan · Kutch',
    name: 'Ahir',
    line: 'Earth remembers and the heart already knows',
    image: '/images/section-4.jpg',
  },
  {
    region: 'Uzbekistan · Silk Route',
    name: 'Samarkand',
    line: 'Where the archaic breathes again',
    image: '/images/section-5.jpg',
  },
]

export default function ScrollSections() {
  const sectionRefs = useRef([])

  useEffect(() => {
    const triggers = []

    sectionRefs.current.forEach((section) => {
      if (!section) return
      const img = section.querySelector('.parallax-img')
      if (!img) return

      const st = gsap.fromTo(
        img,
        { y: '-8%' },
        {
          y: '8%',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      )
      triggers.push(st.scrollTrigger)
    })

    return () => {
      triggers.forEach(t => t && t.kill())
    }
  }, [])

  return (
    <div
      style={{
        background: 'var(--parchment)',
        paddingTop: '120px',
      }}
    >
      {SECTIONS.map((section, i) => (
        <div key={section.name}>
          {/* Editorial section */}
          <div
            ref={el => sectionRefs.current[i] = el}
            style={{
              position: 'relative',
              height: '100vh',
              overflow: 'hidden',
            }}
          >
            <img
              className="parallax-img"
              src={section.image}
              alt={section.name}
              style={{
                position: 'absolute',
                top: '-10%',
                left: 0,
                width: '100%',
                height: '120%',
                objectFit: 'cover',
              }}
            />

            {/* Text overlay — bottom left */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                padding: '0 0 4rem 4rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '0.52rem',
                  fontWeight: 300,
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  marginBottom: '0.8rem',
                }}
              >
                {section.region}
              </p>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontWeight: 300,
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  color: 'var(--ivory)',
                  lineHeight: 1.1,
                }}
              >
                {section.name}
              </p>
              <p
                style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '0.7rem',
                  fontWeight: 200,
                  letterSpacing: '0.08em',
                  color: 'rgba(245,239,228,0.6)',
                  marginTop: '0.8rem',
                  maxWidth: '380px',
                }}
              >
                {section.line}
              </p>
            </div>
          </div>

          {/* Parchment divider between sections (not after last) */}
          {i < SECTIONS.length - 1 && (
            <div style={{ height: '80px', background: 'var(--parchment)' }} />
          )}
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Add to App.jsx and verify**

```jsx
import Cursor from './components/Cursor'
import AnnouncementBar from './components/AnnouncementBar'
import Nav from './components/Nav'
import Hero from './components/Hero'
import ScrollSections from './components/ScrollSections'

export default function App() {
  return (
    <>
      <Cursor />
      <AnnouncementBar />
      <Nav />
      <Hero />
      <ScrollSections />
    </>
  )
}
```

Expect:
- Floating card from Hero appears over ScrollSections top area (card bleeds -80px, sections clear with 120px padding)
- Five 100vh sections with 80px parchment dividers between them
- Images invisible (files absent) — parchment shows through; text overlays visible with correct typography
- Scroll slowly — each section's image should move at a different rate than the page scroll (parallax). Since images are absent, verify by opening browser DevTools and checking GSAP tweens are created (no console errors about ScrollTrigger)

---

## Task 8: Footer component

**Files:**
- Create: `v3/src/components/Footer.jsx`

- [ ] **Step 1: Create `v3/src/components/Footer.jsx`**

```jsx
const LINK_GROUPS = [
  {
    header: 'Explore',
    links: ['Story', 'Collections', 'Threadtales', 'Atelier'],
  },
  {
    header: 'Commission',
    links: ['How it Works', 'Begin a Piece', 'Bridal', 'Archive'],
  },
  {
    header: 'Connect',
    links: ['Instagram', 'Pinterest', 'Press', 'Contact'],
  },
]

function FooterLink({ children }) {
  return (
    <a
      href="#"
      style={{
        display: 'block',
        fontFamily: 'Jost, sans-serif',
        fontSize: '0.68rem',
        fontWeight: 200,
        color: 'rgba(245,239,228,0.6)',
        transition: 'color 250ms ease',
        cursor: 'none',
      }}
      onMouseEnter={e => e.currentTarget.style.color = 'rgba(245,239,228,1)'}
      onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,239,228,0.6)'}
    >
      {children}
    </a>
  )
}

export default function Footer() {
  return (
    <footer>
      {/* Part One — Terra */}
      <div
        style={{
          background: 'var(--terra)',
          padding: '5rem 4rem',
          display: 'flex',
          gap: '6rem',
          alignItems: 'flex-start',
        }}
      >
        {/* Left column */}
        <div style={{ flexShrink: 0 }}>
          <p
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.55rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'rgba(245,239,228,0.7)',
              marginBottom: '1.5rem',
            }}
          >
            Begin a Conversation
          </p>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: '2.8rem',
              color: 'var(--ivory)',
              marginBottom: '2rem',
              lineHeight: 1.1,
            }}
          >
            Commission a piece
          </p>
          {/* Email input row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid rgba(245,239,228,0.3)',
              width: '320px',
            }}
          >
            <input
              type="email"
              placeholder="Your email"
              className="footer-email"
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontFamily: 'Jost, sans-serif',
                fontSize: '0.75rem',
                fontWeight: 200,
                color: 'var(--ivory)',
                padding: '0.6rem 0',
                cursor: 'none',
              }}
            />
            <span
              style={{
                color: 'rgba(245,239,228,0.6)',
                fontSize: '1rem',
                transition: 'opacity 200ms ease',
                cursor: 'none',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '1'}
              onMouseLeave={e => e.currentTarget.style.opacity = '0.6'}
            >
              →
            </span>
          </div>
        </div>

        {/* Right column — link groups */}
        <div style={{ display: 'flex', gap: '4rem', paddingTop: '0.5rem' }}>
          {LINK_GROUPS.map(group => (
            <div key={group.header}>
              <p
                style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '0.5rem',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,239,228,0.45)',
                  marginBottom: '1.2rem',
                }}
              >
                {group.header}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {group.links.map(link => (
                  <FooterLink key={link}>{link}</FooterLink>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Part Two — Parchment bar */}
      <div
        style={{
          background: 'var(--parchment)',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: '4rem',
          paddingRight: '4rem',
        }}
      >
        <span
          style={{
            fontFamily: 'Jost, sans-serif',
            fontSize: '0.55rem',
            fontWeight: 200,
            letterSpacing: '0.15em',
            color: 'var(--muted)',
          }}
        >
          Narain Niwas Palace, Jaipur · Est. 2013
        </span>
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1rem',
            letterSpacing: '0.4em',
            color: 'var(--ink)',
          }}
        >
          VRISA
        </span>
        <span
          style={{
            fontFamily: 'Jost, sans-serif',
            fontSize: '0.55rem',
            fontWeight: 200,
            color: 'var(--muted)',
          }}
        >
          © 2025 Vrisa. All rights reserved.
        </span>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Add to App.jsx and verify**

```jsx
import Cursor from './components/Cursor'
import AnnouncementBar from './components/AnnouncementBar'
import Nav from './components/Nav'
import Hero from './components/Hero'
import ScrollSections from './components/ScrollSections'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Cursor />
      <AnnouncementBar />
      <Nav />
      <Hero />
      <ScrollSections />
      <Footer />
    </>
  )
}
```

Expect:
- Terra section with left/right columns visible below scroll sections
- "Commission a piece" italic heading, email input with underline only, arrow → right
- Three link groups (Explore, Commission, Connect) with hover opacity
- Parchment bottom bar with left/centre/right layout: location · VRISA wordmark · copyright

---

## Task 9: Final App.jsx + smoke verification

**Files:**
- Modify: `v3/src/App.jsx` (finalise — already done in Task 8 Step 2)

- [ ] **Step 1: Confirm App.jsx is complete**

`v3/src/App.jsx` should already be:

```jsx
import Cursor from './components/Cursor'
import AnnouncementBar from './components/AnnouncementBar'
import Nav from './components/Nav'
import Hero from './components/Hero'
import ScrollSections from './components/ScrollSections'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Cursor />
      <AnnouncementBar />
      <Nav />
      <Hero />
      <ScrollSections />
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Run dev server and do full page walk**

```bash
cd v3 && npm run dev
```

Walk through this checklist in the browser at `http://localhost:3003`:

| Check | Expected |
|-------|----------|
| Default cursor | Hidden (cursor: none on body) |
| Custom dot | 8px terra circle, tracks instantly |
| Custom ring | 32px terra ring, lerps behind |
| Announcement bar | 36px, terra text, parchment bg |
| Nav | 72px, VRISA centred, left/right links, muted colour |
| Nav hover | Links go to ink |
| Scroll to 101px | Nav border-bottom visibly slightly darker |
| Hero height | Fills remainder of viewport (calc 100vh - 108px) |
| Pagination | 6 dots at bottom centre, first dot active (wider pill) |
| Dot click | Card text updates, dot animates width |
| Sound toggle | "Sound On" bottom right, hover brightens |
| Floating card | Visible, overlaps top of ScrollSections |
| ScrollSections | padding-top: 120px, card sits above section content |
| 5 sections | Each 100vh, text overlays visible |
| 4 parchment dividers | 80px gaps between sections |
| Parallax | No console errors from ScrollTrigger |
| Footer terra | Two columns, email input underline only |
| Footer links hover | Brightens to ivory opacity 1 |
| Footer bottom bar | Three zones horizontal, 80px height |
| No rounded corners | Cards, inputs, buttons — all sharp |
| No box shadows | None visible anywhere |
| Console | Zero errors |

- [ ] **Step 3: Verify ScrollTrigger is registered**

In the browser DevTools console, type:

```js
gsap.plugins
```

Expected output includes `ScrollTrigger` in the object.

- [ ] **Step 4: Print final file structure**

```bash
find v3/src -type f | sort
```

Expected:
```
v3/src/App.jsx
v3/src/components/AnnouncementBar.jsx
v3/src/components/Cursor.jsx
v3/src/components/Footer.jsx
v3/src/components/Hero.jsx
v3/src/components/Nav.jsx
v3/src/components/ScrollSections.jsx
v3/src/index.css
v3/src/main.jsx
```
