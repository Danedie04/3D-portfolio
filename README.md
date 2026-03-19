# Dinesh Kumar — Cinematic Portfolio

A visually stunning, Awwwards-level personal portfolio featuring:
- **3D elastic ID card** with Rapier physics (drag, swing, double-click to flip)
- **Cinematic hero** with blurred portrait background + orange/blue color grading
- **Floating particles** and film grain overlay
- **Custom cursor**, smooth scroll reveals, skill bars
- **Projects, About, Contact** sections with GSAP-style animations

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | React 18 + Vite |
| 3D / Physics | Three.js · @react-three/fiber · @react-three/rapier |
| Helpers | @react-three/drei · meshline |
| Styling | Tailwind CSS + custom CSS |
| Fonts | Bebas Neue · Cormorant Garamond · DM Mono |

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Dev server (http://localhost:5173)
npm run dev

# 3. Production build
npm run build

# 4. Preview production build locally
npm run preview
```

## Deploy to Vercel

### Option A — Vercel CLI
```bash
npm install -g vercel
vercel
# Follow prompts → Framework: Vite → done ✓
```

### Option B — GitHub + Vercel Dashboard
1. Push this repo to GitHub
2. Go to https://vercel.com/new
3. Import your repo
4. Framework preset: **Vite** (auto-detected)
5. Click **Deploy** → live in ~60 seconds

## Deploy to GitHub Pages
```bash
# Install gh-pages
npm install -D gh-pages

# Add to package.json scripts:
# "deploy": "npm run build && gh-pages -d dist"

npm run deploy
```

## Project Structure

```
dinesh-portfolio/
├── public/
├── src/
│   ├── assets/
│   │   └── portrait.js          ← Base64 embedded portrait image
│   ├── components/
│   │   ├── ElasticCard.jsx      ← 3D physics ID card (core feature)
│   │   ├── Hero.jsx             ← Cinematic hero section
│   │   ├── Navbar.jsx           ← Transparent blur-on-scroll nav
│   │   ├── Projects.jsx         ← Animated project grid
│   │   ├── About.jsx            ← Bio + skills + timeline
│   │   ├── Contact.jsx          ← Glassmorphism contact form
│   │   ├── Loader.jsx           ← Cinematic loading screen
│   │   └── CustomCursor.jsx     ← Orange dot cursor
│   ├── styles/
│   │   └── global.css           ← All custom CSS variables & effects
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── vercel.json
```

## Card Interactions
- **Drag** the ID card with mouse
- **Double-click** to flip the card (see skills on back)
- **Release** — card swings back with physics

## Customization
- Edit info in `Projects.jsx`, `About.jsx`, `Contact.jsx`
- Swap portrait: replace `src/assets/portrait.js` with your own base64 image
- Colors: change `--orange` and `--blue-deep` in `global.css`
