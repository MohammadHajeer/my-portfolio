# Mohammad Hajeer — Developer Portfolio

A modern, fully responsive developer portfolio built with **React** and **Tailwind CSS**. Features a clean dark/light mode toggle, smooth scroll animations, and a professional developer aesthetic inspired by tools like Supabase and Linear.

---

## ✨ Features

- **Dark / Light Mode** — Toggle with a single click; uses Tailwind `dark:` variants throughout
- **Smooth Animations** — Intersection-observer fade-ins on every section + CSS keyframe effects
- **Profile Photo** — Circular photo with floating geometric decorations and an indigo glow
- **Fully Responsive** — Mobile-first layout, adapts cleanly from small screens to wide desktops
- **Single Component** — Everything lives in one `portfolio.jsx` file, zero dependencies beyond React + Tailwind

---

## 📁 Project Structure

```
portfolio.jsx   ← Single React component (the entire portfolio)
README.md       ← This file
```

---

## 🗂️ Sections

| # | Section | Description |
|---|---------|-------------|
| 1 | **Hero** | Name, title, intro, CTA buttons, stats row, profile photo with geometric decorations |
| 2 | **About** | Bio paragraphs, focus area cards (Frontend / Backend / Systems), skill pills |
| 3 | **Tech Stack** | Visual grid of 12 technologies with icons and categories |
| 4 | **Projects** | Four project cards with descriptions, tech tags, and live/open-source status badges |
| 5 | **Workflow** | 8-step horizontal pipeline — Idea → Planning → Design → Build → Testing → Deploy → Host → Maintain |
| 6 | **Quote** | Prophetic hadith in English and Arabic with indigo left-border treatment |
| 7 | **Contact** | LinkedIn, GitHub, and click-to-copy email |
| 8 | **Footer** | Name, copyright, quick links, built-with note |

---

## 🎨 Design System

### Color Palette

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| Background | `gray-50` | `#0a0a0a` |
| Surface / Cards | `white` | `#111111` |
| Borders | `gray-200` | `#1f1f1f` |
| Body Text | `gray-500` | `gray-400` |
| Headings | `gray-900` | `gray-50` |
| Primary Accent | `indigo-600` | `indigo-400` |
| Tags (bg) | `indigo-50` | `indigo-950` |
| Tags (text) | `indigo-600` | `indigo-300` |

### Typography

- **Display / Headings** — `DM Sans` (Google Fonts)
- **Body / Code / Labels** — `DM Mono` (Google Fonts)

### Animations

| Class | Effect |
|-------|--------|
| `.hero-content` | Fade-in on load |
| `.hero-photo` | Fade-in on load (delayed) |
| `.pulse-ring` | Breathing opacity + scale on photo rings |
| `.geo-orbit` | Slow 22s rotation on dashed orbit ring |
| `.geo-float-a/b/c` | Subtle floating on geometric accent shapes |
| `.cursor-blink` | Blinking cursor on hero name |
| `FadeIn` component | Scroll-triggered translateY fade-in (IntersectionObserver) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A React project with Tailwind CSS configured

### Installation

```bash
# 1. Copy portfolio.jsx into your project
cp portfolio.jsx src/pages/index.jsx   # or wherever your entry point is

# 2. Make sure Tailwind is set up with darkMode: 'class'
# tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
}

# 3. Run your dev server
pnpm dev
```

### Tailwind Dark Mode Config

This portfolio uses **class-based** dark mode. Make sure your `tailwind.config.js` has:

```js
module.exports = {
  darkMode: 'class',   // ← required
  // ...
}
```

The component manages the `dark` class internally on its root wrapper — no extra configuration needed.

---

## 🖼️ Replacing the Profile Photo

The hero section loads a placeholder image from Unsplash. To use your own photo:

```jsx
// Find this line in portfolio.jsx:
src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=440&h=440&fit=crop&crop=face"

// Replace with your own image URL or local path:
src="/images/your-photo.jpg"
// or
src="https://your-cdn.com/photo.jpg"
```

The image is cropped to a circle (`rounded-full`, `object-cover`, `object-top`) — works best with a portrait/headshot photo.

---

## ✏️ Customization

### Personal Info

Search for these strings in `portfolio.jsx` and replace:

| Placeholder | Replace with |
|-------------|-------------|
| `Mohammad Hajeer` | Your full name |
| `mohammadhajeer002@gmail.com` | Your email address |
| `linkedin.com/in/muhammad-hajeer` | Your LinkedIn URL |
| `github.com/MohammadHajeer` | Your GitHub URL |
| `Software Engineer · Full-Stack Web Developer · CS Graduate` | Your title |

### Projects

Edit the `PROJECTS` array at the top of the file:

```js
const PROJECTS = [
  {
    title: "Your Project Name",
    desc:  "Short description of what it does and the problem it solves.",
    tags:  ["React", "Node.js", "PostgreSQL"],
    status: "Live",   // "Live" | "Open Source" | "In Progress" | "Archived"
  },
  // ...
];
```

### Tech Stack

Edit the `TECH_STACK` array:

```js
const TECH_STACK = [
  { name: "React", icon: "⚛️", cat: "Frontend" },
  // add or remove entries freely
];
```

### Accent Color

The portfolio uses **indigo** as its primary accent. To switch to another color, do a find-and-replace:

```
indigo → blue      (cool, professional)
indigo → violet    (creative, bold)
indigo → sky       (light, modern)
indigo → emerald   (Supabase-style green)
```

---

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | 18+ | UI framework |
| `tailwindcss` | 3+ | Utility-first styling |

No additional npm packages required. Google Fonts are loaded via a `<style>` tag import inside the component.

---

## 📄 License

MIT — free to use, modify, and distribute for personal and commercial projects.

---

<p align="center">Built with React & Tailwind · Crafted with precision</p>
