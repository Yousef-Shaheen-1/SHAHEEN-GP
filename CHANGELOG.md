# Changelog — SHAHEEN GROUP Platform

All notable changes to the SHAHEEN GROUP digital platform are documented in this file in adherence with [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and Semantic Versioning.

## [2.0.0] — 2026-10-22

### Added
- **Developer Identity Widget & Modal**: Integrated official developer portrait (`/assets/developer/yousef-shaheen.jpg`) for Yousef A. Shaheen, displaying mastermind statements, location in Amman, Jordan, direct email shortcuts, and keyboard accessibility.
- **Dedicated Social Media Hub**: Unified section and footer shortcut grid supporting all 11 verified platforms (TikTok, Facebook, Snapchat, Telegram, Instagram, WhatsApp, X, Threads, LinkedIn, Discord, YouTube) plus direct Gmail and Yahoo channels.
- **Sovereign Tools Management System**: New Tools section and CMS model supporting CLI tools, streaming telemetry engines, compatibility tags, and one-click copyable installation commands.
- **Extensions & Integrations Module**: Dedicated section for VS Code themes, Lenis camera controllers, and database connectors.
- **Dual-Engine Ambient Audio System**: Integrated HTML5 Audio player loading royalty-free cinematic soundscape (`/assets/audio/shaheen-ambient.mp3`) with procedural Web Audio synth fallback, volume slider, mute/unmute, and user preference persistence in `localStorage`.
- **Dynamic SEO & Social Metadata Engine**: Automated `<title>`, `<meta name="description">`, OpenGraph, Twitter cards, canonical tags, and Schema.org JSON-LD generation reacting to routes and case studies in English and Arabic.
- **Repository Documentation Suite**: Added `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`, `LICENSE` (BSD-3-Clause), `SECURITY.md`, and GitHub Actions workflows.
- **GitHub Actions Workflows**: Added `.github/workflows/ci.yml`, `.github/workflows/deploy-pages.yml`, and `.github/workflows/cloud-deploy.yml`.

### Changed
- Expanded CMS portal to manage Projects, Tools, Extensions, Social Links, and Developer profile with browser persistence.
- Refactored Navbar into 3-zone contract with dedicated Tools, Extensions, Social Hub, and Developer SHAHEEN ID triggers.
- Updated server with `/api/health` monitoring route.

## [1.0.0] — 2026-10-22

### Added
- Initial project foundation featuring SHAHEEN GROUP brand identity ("Beyond Innovation. Beyond Limits.", "We don't just build projects — we command the digital future.").
- Full-screen cinematic hero opening with isolated character cutout layer, 3D mouse parallax tracking, studio rim spotlight, and ground plane perspective shadow.
- Responsive Bento Grid project gallery with live search, category filtering, and case study viewer.
- Four core engineering disciplines with editorial numbering.
- Full-stack Express server (`server.ts`) with Vite middlewares, encrypted contact form API (`POST /api/contact`), and server-side Google GenAI proxy (`POST /api/ai/generate`).
- Native bilingual support for English (LTR) and Arabic (RTL) typography with `Cairo` and `Plus Jakarta Sans`.
- Reference Feature Parity Audit modal comparing features against `aitezazdev/Portfolio`.
