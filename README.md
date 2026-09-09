# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Nuraform Hero Recreation

Recreates **only** the hero/banner section of the current live nuraform.com
(the "Stunning, AI-Powered Forms in Seconds" hero with the prompt bar —
not the carousel/rings concept from the original brief, which doesn't match
what's actually on the site today).

## Files

```
NuraformHero/
├── NuraformHero.jsx     # main section — assembles everything
├── HeroBackground.jsx   # base color + central glow + drifting motif blobs
├── PromptBar.jsx        # pill input with rotating placeholder prompts
└── heroData.js          # copy, CTA links, avatar list, timing constants
```

## Install

```bash
npm install gsap @gsap/react
```

Tailwind must already be configured in the host project.

## Integrate

```jsx
import NuraformHero from "./components/NuraformHero/NuraformHero";

function App() {
  return <NuraformHero />;
}
```

Drop real avatar images at the paths referenced in `heroData.js`
(`/assets/baker.jpg`, `/assets/survey.jpg`, etc.) or update the `img` fields.

## What was verified vs. approximated

- **Copy, link structure, and content order** were pulled directly from
  nuraform.com's live markup (headline, subtext, the three CTAs, the four
  avatar photos, the prompt-bar element) — these are accurate.
- **Exact colors/gradient stops** could not be pixel-verified: the site's
  actual SVG/image assets (`intro-bg.svg`, `motif-*.svg`) weren't fetchable
  through available tools, only the page's text/DOM was. The background in
  `HeroBackground.jsx` reconstructs the same _layering strategy_ the DOM
  implies (base dark color → central radial glow → several smaller drifting
  blurred blobs positioned top/left/right, matching the `motif-t1`,
  `motif-l1/r1`, `motif-l2/r2` naming) using a plausible dark violet/indigo
  palette rather than the site's real hex values.

If you can get me a screenshot or the real CSS (e.g. via browser devtools
"Copy styles" or a screenshot upload), I can tighten the gradient colors,
blur radii, and exact avatar positions to match pixel-for-pixel.

## Behavior notes

- Entrance animation (headline → subtext → CTAs → prompt bar → avatars)
  runs as one staggered GSAP timeline scoped with `useGSAP`, auto-cleaned
  on unmount.
- Prompt bar cycles through example prompts via a GSAP timeline, with a
  single React state update per cycle (no per-frame renders).
- `prefers-reduced-motion` disables the intro stagger, the placeholder
  cycling, and the drifting background blobs; everything still renders
  in its final, functional state.
