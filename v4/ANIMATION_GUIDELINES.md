# Animation Guidelines — Vrisa v4
## Standing Instructions for All Animation Work

These guidelines apply to every component, every interaction,
and every motion built in this project without exception.
Read this file before writing any animation code.

---

## Installed Libraries

The following animation libraries are installed and must be used:

- **GSAP** — primary animation engine for all DOM animations
- **@gsap/react** — React integration for GSAP (useGSAP hook)
- **Framer Motion** — component-level animations and layout transitions
- **Lenis** — smooth scroll. Already initialised globally.

No other animation tools are permitted.
No CSS transitions except where explicitly listed as exceptions below.
No CSS keyframe animations.
No requestAnimationFrame written manually.

---

## GSAP — When to Use

Use GSAP for:
- Any animation triggered by scroll position (ScrollTrigger)
- Sequenced timelines with multiple steps
- The paper curtain reveal on page load
- Cursor following and lerp behaviour
- Parallax effects on images
- Any animation requiring precise timing control
- Text reveals character by character or line by line
- Any animation involving multiple elements with stagger

### GSAP Setup in Every Component

Always use the useGSAP hook from @gsap/react.
Never use useEffect for GSAP animations.

```javascript
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

useGSAP(() => {
  // all GSAP code here
  // automatic cleanup handled by useGSAP
}, { scope: containerRef })
```

### GSAP ScrollTrigger — Standard Settings

Every scroll-triggered reveal uses these defaults
unless the brief specifies otherwise:

```javascript
gsap.from(element, {
  opacity: 0,
  y: 24,
  duration: 1,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: element,
    start: 'top 82%',
    toggleActions: 'play none none none'
  }
})
```

For staggered children:
```javascript
gsap.from(elements, {
  opacity: 0,
  y: 20,
  duration: 0.9,
  ease: 'power2.out',
  stagger: 0.12,
  scrollTrigger: {
    trigger: container,
    start: 'top 80%',
    toggleActions: 'play none none none'
  }
})
```

### GSAP Eases — Approved List

Only use these eases. Nothing else.

| Use case | Ease |
|---|---|
| General reveals | power2.out |
| Page load sequences | power2.inOut |
| Physical lift/peel | power3.inOut |
| Fast exits | power2.in |
| Organic, breathing motion | sine.inOut |
| Cursor and follower elements | none (lerp via ticker) |

Never use: bounce, elastic, back
These do not belong in this brand's vocabulary.

### GSAP Cursor Pattern

```javascript
let cursorX = 0, cursorY = 0
let ringX = 0, ringY = 0

window.addEventListener('mousemove', (e) => {
  cursorX = e.clientX
  cursorY = e.clientY
})

gsap.ticker.add(() => {
  ringX += (cursorX - ringX) * 0.08
  ringY += (cursorY - ringY) * 0.08
  gsap.set(ringRef.current, { x: ringX, y: ringY })
  gsap.set(dotRef.current, { x: cursorX, y: cursorY })
})
```

---

## Framer Motion — When to Use

Use Framer Motion for:
- Component mount and unmount animations
- Layout animations when elements change size or position
- The menu overlay open and close
- Any element that conditionally renders (modals, drawers, tooltips)
- Page transitions if routing is added later
- Hover states on interactive cards and links
- Any animation tied directly to React state

### Framer Motion Standard Variants

Use these named variants consistently across the project.

**Fade Up — standard content reveal:**
```javascript
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
  }
}
```

**Fade In — simple opacity:**
```javascript
const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
}
```

**Slide from Right — drawer and overlay:**
```javascript
const slideRight = {
  hidden: { x: '100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] }
  }
}
```

**Slide from Top — nav reveal:**
```javascript
const slideDown = {
  hidden: { y: '-100%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
  },
  exit: {
    y: '-100%',
    opacity: 0,
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] }
  }
}
```

**Stagger Container — for lists of children:**
```javascript
const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}
```

### Framer Motion — Always Use AnimatePresence

Any component that conditionally mounts must be
wrapped in AnimatePresence to enable exit animations:

```javascript
import { AnimatePresence, motion } from 'framer-motion'

<AnimatePresence>
  {isOpen && (
    <motion.div
      key="overlay"
      variants={slideRight}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      ...
    </motion.div>
  )}
</AnimatePresence>
```

---

## Lenis — Smooth Scroll

Lenis is initialised globally in main.jsx.
Do not initialise it again inside components.

```javascript
// main.jsx — already set up, do not repeat
import Lenis from 'lenis'

const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)
```

Lenis must be connected to GSAP ScrollTrigger
so scroll-triggered animations fire at the correct position:

```javascript
// Also in main.jsx
lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)
```

When building scroll-triggered components:
Never use window.scrollY directly.
Never use native scroll event listeners.
Let Lenis handle all scroll and pass to ScrollTrigger.

---

## Decision Tree — Which Library to Use

When starting any new animation, ask:

**Is it triggered by scroll position?**
→ GSAP with ScrollTrigger

**Is it a timeline with multiple sequenced steps?**
→ GSAP timeline

**Does the element conditionally mount or unmount?**
→ Framer Motion with AnimatePresence

**Is it a hover state on a card or interactive element?**
→ Framer Motion whileHover

**Is it the cursor?**
→ GSAP ticker with lerp

**Is it a layout shift — element changing size or position?**
→ Framer Motion layout prop

**Is it smooth scrolling behaviour?**
→ Lenis — already handles it, do nothing

**Is it a simple one-property state change
already handled by an existing Framer variant?**
→ Use the existing variant from this file

---

## Timing Reference — Brand Vocabulary

These durations define how Vrisa moves.
Slower than most websites. Deliberate. Unhurried.

| Type | Duration |
|---|---|
| Instant feedback (hover colour) | 200-250ms |
| UI element transitions | 400-600ms |
| Content reveals on scroll | 900ms-1s |
| Section transitions | 1.2-1.4s |
| Page load sequences | 1.4-2.2s |
| Parallax scrub | Tied to scroll, scrub: 1 |

Nothing in this project should feel fast or snappy.
If an animation feels urgent, it is wrong for this brand.

---

## CSS Transitions — Permitted Exceptions

These are the only cases where CSS transition is acceptable.
Everything else must use the libraries above.

```css
/* Colour and opacity on hover — too simple for GSAP */
transition: color 250ms ease;
transition: opacity 250ms ease;
transition: border-color 250ms ease;

/* Background colour shifts on nav scroll */
transition: background 400ms ease;
```

---

## What Not to Do — Ever

- Do not use CSS @keyframes
- Do not use CSS transition for anything involving
  position, transform, or scale
- Do not write requestAnimationFrame manually
- Do not use setTimeout for animation sequencing —
  use GSAP timeline delays instead
- Do not mix GSAP and Framer Motion on the same element
- Do not use useEffect for GSAP — always useGSAP
- Do not initialise Lenis more than once
- Do not use ScrollTrigger without connecting it to Lenis
- Do not use spring physics in Framer Motion —
  this brand uses duration-based easing only
- Do not use bounce or elastic eases ever

---

## File to Read Before Any Animation Work

This file: ANIMATION_GUIDELINES.md
Location: v4/ANIMATION_GUIDELINES.md

Feed this file to Claude Code at the start of every
session with the instruction:
"Read ANIMATION_GUIDELINES.md and follow it
for all animation work in this session."