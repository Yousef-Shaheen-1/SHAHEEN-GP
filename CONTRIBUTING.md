# Contributing to SHAHEEN GROUP Platform

Thank you for your interest in contributing to the **SHAHEEN GROUP — Cinematic Digital Experience & Content Platform**.

## 1. Prerequisites & Required Tools

Ensure your workstation meets the following specifications:
- **Node.js**: `v20.x` or `v22.x` (LTS recommended)
- **npm**: `v10.x` or higher
- **Git**: `2.38+`
- **Operating System**: Linux, macOS, or Windows (WSL2 recommended)

## 2. Local Setup & Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shaheen-group/flagship-platform.git
   cd flagship-platform
   ```

2. Install dependencies using the committed lockfile:
   ```bash
   npm install
   ```

3. Configure your local environment:
   ```bash
   cp .env.example .env
   ```

4. Launch the local development server:
   ```bash
   npm run dev
   ```
   The platform will be available at `http://localhost:3000`.

## 3. Development Commands

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Starts the Express full-stack development server with Vite middleware |
| `npm run build` | Compiles the production bundle via Vite into `/dist` |
| `npm run preview`| Previews the compiled production distribution locally |
| `npm run lint` | Runs TypeScript compiler type-checking (`tsc --noEmit`) |
| `npm run clean` | Cleans up `/dist` build outputs |

## 4. Branching & Commit Conventions

### Branch Naming:
- `feature/<scope>-<description>` (e.g., `feature/tools-search`)
- `fix/<scope>-<description>` (e.g., `fix/audio-volume-clamping`)
- `docs/<scope>-<description>` (e.g., `docs/cloud-deploy-guide`)

### Commit Messages (Conventional Commits):
- `feat: add sovereign tool execution validator`
- `fix: resolve mobile drawer focus trap`
- `docs: update deployment instructions for Cloud Run`
- `perf: optimize subject layer compositor transforms`

## 5. Pull Request Standards

Before submitting a Pull Request:
1. Run `npm run lint` to confirm zero type errors.
2. Run `npm run build` to verify production compilation.
3. Ensure responsive layout integrity across mobile ($375\text{px}$), tablet ($768\text{px}$), and desktop ($1440\text{px}$).
4. Verify both English (`ltr`) and Arabic (`rtl`) layout rendering.
5. Submit your PR against the `main` branch with a clear description of changes.

## 6. Security & Vulnerability Disclosures

Never submit sensitive security issues via public GitHub issues. Follow the instructions in `SECURITY.md` or contact `shaheen.group000@gmail.com`.
