# SHAHEEN GROUP — Cinematic Digital Experience & Content Platform

> **"Beyond Innovation. Beyond Limits."**  
> *"We don't just build projects — we command the digital future."*  
> **Mastermind**: Yousef A. Shaheen (`Yousef@Shaheen:~#`)  
> **Location**: Amman, Jordan  

---

## Overview

**SHAHEEN GROUP** is an elite digital platform, portfolio, and sovereign content management system built from the ground up for high-stakes technology syndicates. It merges luxury cinematic art direction, 60 FPS motion design, and mathematical precision with a high-performance full-stack architecture.

The platform provides a complete ecosystem for showcasing enterprise architecture, sovereign command-line tools, high-concurrency stream engines, developer identity, and verified social communication channels.

---

## Key Features

- **Cinematic Hero Opening**: Immersive full-screen visual experience featuring isolated subject layering, dynamic 3D mouse parallax tracking, studio rim spotlighting, and perspective shadow grounding.
- **Background Audio System**: Unobtrusive ambient soundscape player loading royalty-free audio (`/assets/audio/shaheen-ambient.mp3`) with procedural Web Audio API synth drone fallback, volume slider, mute toggle, and preference persistence.
- **Developer Identity Widget (SHAHEEN ID)**: Dedicated profile modal showcasing Yousef A. Shaheen, official portrait, brand statements, location in Amman, Jordan, direct email shortcuts, and keyboard dismiss.
- **Verified Social Hub**: Centralized directory and footer shortcuts covering 11 official channels (TikTok, Facebook, Snapchat, Telegram, Instagram, WhatsApp, X, Threads, LinkedIn, Discord, YouTube) and direct mail desks.
- **Sovereign Tools & Extensions**: Dedicated modules for managing command-line utilities, avionics streaming engines, and VS Code plugins with one-click copyable installation commands.
- **Project Case Studies**: Bento grid layout with category filtering (AI, Fintech, Aerospace, Enterprise), live text search, and deep case studies detailing challenges, solutions, and impact KPIs.
- **Native Bilingual Support (EN / AR)**: Seamless real-time switching between English (`ltr`) and Arabic (`rtl`) with typography tuned via `Cairo` and `Plus Jakarta Sans`.
- **Dynamic SEO & Social Metadata**: Automated updates to `<title>`, `<meta name="description">`, OpenGraph, Twitter cards, canonical tags, and Schema.org JSON-LD structured data on route changes and case study views.
- **Full-Stack Mastermind CMS**: Protected administrative portal for managing Projects, Tools, Extensions, Journal Dispatches, and Social channels with persistent storage and block reordering.
- **Encrypted Contact API**: Full-stack dispatch route (`POST /api/contact`) validating submissions and issuing cryptographic ticket IDs (`SH-XXXX`).
- **AI Content Architect**: Server-side proxy (`POST /api/ai/generate`) utilizing Google Gemini API for bilingual translations and case study drafts.

---

## Technology Stack

- **Frontend Core**: React 19, TypeScript, Vite
- **Styling & Design System**: Tailwind CSS v4, Custom CSS logical properties for RTL/LTR
- **Animation & Audio**: Motion, GSAP, HTML5 Audio, Web Audio API
- **Icons**: Lucide React, Custom SVG brand glyphs
- **Backend Server**: Node.js, Express, tsx
- **AI Engine**: `@google/genai` (Gemini 2.5 Flash via server-side proxy)
- **Code Quality**: ESLint, TypeScript Strict Type Checking

---

## Project Structure

```text
├── .github/
│   └── workflows/
│       ├── ci.yml                 # Continuous Integration (lint, type-check, build)
│       ├── deploy-pages.yml       # Static export deployment for GitHub Pages
│       └── cloud-deploy.yml       # Containerized cloud deployment template
├── public/
│   └── assets/
│       ├── brand/                 # Official Shaheen Group emblems
│       ├── cinematic/             # Hero background and isolated subject cutout
│       ├── developer/             # Yousef A. Shaheen portrait asset
│       ├── audio/                 # Royalty-free ambient audio loop
│       └── projects/              # High-fidelity project showcase imagery
├── src/
│   ├── components/
│   │   ├── Navbar.tsx             # 3-Zone Top Bar Contract
│   │   ├── Hero.tsx               # Full-screen cinematic hero with parallax
│   │   ├── ProjectsSection.tsx    # Filterable Bento Grid showcase
│   │   ├── ProjectDetailModal.tsx # Deep case study viewer
│   │   ├── ToolsSection.tsx       # Sovereign CLI & developer tools
│   │   ├── ExtensionsSection.tsx  # Plugins & IDE integrations
│   │   ├── ServicesSection.tsx    # Core engineering disciplines
│   │   ├── MetricsSection.tsx     # Tabular KPI proofs strip
│   │   ├── JournalSection.tsx     # Intellectual dispatches & reader modal
│   │   ├── SocialSection.tsx      # Verified social media channels
│   │   ├── ContactSection.tsx     # Full-stack validated inquiry form
│   │   ├── DeveloperModal.tsx     # Mastermind developer identity card
│   │   ├── AudioControl.tsx       # Ambient audio player & volume slider
│   │   ├── AdminPortal.tsx        # Persistent Mastermind CMS
│   │   ├── ParityChecklistModal.tsx # Reference parity audit matrix
│   │   └── Footer.tsx             # Anti-slop quiet footer
│   ├── hooks/
│   │   └── useDocumentSeo.ts      # Reactive SEO & JSON-LD hook
│   ├── i18n/
│   │   └── translations.ts        # Comprehensive English & Arabic dictionaries
│   ├── services/
│   │   ├── api.ts                 # Full-stack client communication helper
│   │   └── soundscape.ts          # Dual-engine audio engine
│   ├── store/
│   │   ├── initialData.ts         # High-fidelity baseline seed data
│   │   └── useCmsStore.ts         # Local storage persistent state store
│   ├── utils/
│   │   └── seo.ts                 # DOM metadata & Schema.org injector
│   ├── App.tsx                    # Root application router
│   ├── main.tsx                   # React DOM entry point
│   └── index.css                  # Tailwind styles and custom design tokens
├── server.ts                      # Full-stack Express server
├── package.json                   # Project scripts and dependencies
├── tsconfig.json                  # TypeScript compiler configuration
├── vite.config.ts                 # Vite bundler configuration
└── README.md                      # Platform documentation
```

---

## Getting Started

### Prerequisites

- Node.js `20.x` or `22.x`
- npm `10.x` or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shaheen-group/flagship-platform.git
   cd flagship-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```

4. Launch the full-stack development environment:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

## Development & Validation Commands

- **Start Development Server**: `npm run dev`
- **Lint & Type-Check**: `npm run lint`
- **Production Build**: `npm run build`
- **Preview Production Build**: `npm run preview`
- **Clean Outputs**: `npm run clean`

---

## Deployment Architecture

### 1. Full-Stack Cloud Deployment (Recommended)

To run the complete platform including server-side APIs (`/api/contact`, `/api/ai/generate`, `/api/health`) and protected CMS operations:
- **Runtime**: Docker / Cloud Run / Node.js Host
- **Build Command**: `npm run build`
- **Start Command**: `npm run start` (starts `tsx server.ts` or `node server.ts`)
- **Port**: `3000` (configurable via `PORT` environment variable)

### 2. Static GitHub Pages Deployment

GitHub Pages serves static web assets directly from `/dist`:
- **Workflow**: Automated via `.github/workflows/deploy-pages.yml`
- **Limitations**: GitHub Pages delivers the static public showcase (Hero, Projects, Tools, Extensions, Social Hub, bilingual views). However, private server APIs and encrypted dispatches require the companion cloud backend.

---

## Administrator Access & Provisioning

The Mastermind CMS console can be accessed via the **CMS** link in the navigation header or footer.
- **Default Review Passcode**: `shaheen2026`
- **Production Provisioning**: Set the `ADMIN_PASSCODE` environment variable on your backend server. Passwords are never exposed in public JavaScript bundles.

---

## Verified Social Communications

- **X (Twitter)**: [x.com/You_sh94](https://x.com/You_sh94)
- **LinkedIn**: [linkedin.com/in/yousef-z-445aba414](https://www.linkedin.com/in/yousef-z-445aba414)
- **Telegram**: [t.me/B0SS_S1](https://t.me/B0SS_S1)
- **WhatsApp**: [wa.link/lc6f5w](https://wa.link/lc6f5w)
- **Instagram**: [instagram.com/55.0](https://www.instagram.com/55.0)
- **TikTok**: [tiktok.com/@zix8ii](https://www.tiktok.com/@zix8ii)
- **Facebook**: [facebook.com/share/19u4QUKFTL/](https://www.facebook.com/share/19u4QUKFTL/)
- **Snapchat**: [snapchat.com/add/fi1_oo](https://www.snapchat.com/add/fi1_oo)
- **Threads**: [threads.com/@1.0_v_](https://www.threads.com/@1.0_v_)
- **Discord**: [discord.gg/kgwKFPTmZE](https://discord.gg/kgwKFPTmZE)
- **YouTube**: [youtube.com/@shaheenos](https://youtube.com/@shaheenos)
- **Gmail**: `shaheen.group000@gmail.com`
- **Yahoo**: `shaheen.group000@yahoo.com`

---

## License

This project is licensed under the **BSD 3-Clause License**. See the [LICENSE](./LICENSE) file for terms.
