<h1 align="center">نِظام · Nidham</h1>

<p align="center">
  <strong>A Better You — 90-Day Personal Operating System</strong><br/>
  Calm, focused, purposeful execution for high-agency learners.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react" alt="React 19"/>
  <img src="https://img.shields.io/badge/TypeScript-6-3178c6?style=flat-square&logo=typescript" alt="TypeScript 6"/>
  <img src="https://img.shields.io/badge/Tauri-v2-24C8D8?style=flat-square&logo=tauri" alt="Tauri v2"/>
  <img src="https://img.shields.io/badge/Vite-8-646cff?style=flat-square&logo=vite" alt="Vite 8"/>
  <img src="https://img.shields.io/badge/Desktop-Windows%20x64-0078D6?style=flat-square&logo=windows" alt="Windows Desktop"/>
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="MIT License"/>
</p>

---

## 📖 Table of Contents

1. [What is Nidham?](#-what-is-nidham)
2. [Desktop App & Releases](#-desktop-app--releases)
3. [Core Philosophy](#-core-philosophy)
4. [Features](#-features)
5. [Tech Stack](#-tech-stack)
6. [Project Structure](#-project-structure)
7. [Getting Started](#-getting-started)
8. [Configuration](#-configuration)
9. [Data & Persistence](#-data--persistence)
10. [Roadmap](#-roadmap)
11. [Contributing](#-contributing)
12. [License](#-license)

---

## 🌿 What is Nidham?

**Nidham** (نِظام — Arabic for *"order" / "system"*) is a fully client-side, privacy-first **personal productivity operating system** structured around a repeating **90-day cycle**.

It is built for people who want to combine:

- 🧠 **Deep technical learning** (AI Engineering, RAG, Web Dev, Data Science…)
- 📝 **Language mastery** (IELTS preparation)
- 🏋️ **Physical training**
- 🕌 **Faith practices** (daily prayers, Quran, adhkar)
- 🛠️ **Shipped projects** — real, portfolio-ready evidence

Everything lives in one elegant dashboard — no subscription, no server, no tracking.
Your data stays **100% on your device** via `localStorage`.

---

## 🖥️ Desktop App & Releases

Nidham is available as a **native Windows desktop application** built with [Tauri v2](https://tauri.app/) and Rust. It leverages the Windows native WebView2 runtime, resulting in a lightweight installer of **just ~3.3 MB** (compared to ~150 MB for Electron equivalents) with minimal memory footprint and fast startup times.

### 📦 Pre-Built Release Installers

The compiled production installers are located in the local release bundle directory:

📁 **Release Folder**: [`src-tauri/target/release/bundle/`](file:///c:/Users/HM/Desktop/Nidham/src-tauri/target/release/bundle/)

| Format | Installer File | Size | Description |
|--------|---------------|------|-------------|
| **Windows Setup (`.exe`)** | [`Nidham_0.1.0_x64-setup.exe`](file:///c:/Users/HM/Desktop/Nidham/src-tauri/target/release/bundle/nsis/Nidham_0.1.0_x64-setup.exe) | **~3.3 MB** | Standard Windows NSIS installer with desktop shortcut & start menu integration |
| **Windows MSI Package (`.msi`)** | [`Nidham_0.1.0_x64_en-US.msi`](file:///c:/Users/HM/Desktop/Nidham/src-tauri/target/release/bundle/msi/Nidham_0.1.0_x64_en-US.msi) | **~4.3 MB** | Windows Installer package (ideal for enterprise / unattended deployment) |

> 💡 **Quick Run:** You can directly run [`Nidham_0.1.0_x64-setup.exe`](file:///c:/Users/HM/Desktop/Nidham/src-tauri/target/release/bundle/nsis/Nidham_0.1.0_x64-setup.exe) to install Nidham natively on Windows 10 or 11. All your data, dark mode preferences, and timers will run offline in a dedicated native desktop window.

### 🔨 Desktop CLI Commands

```bash
# Run desktop app in development mode with live hot-reload:
npm run tauri:dev

# Build the release installers (.exe and .msi):
npm run tauri:build
```

---

## 🧭 Core Philosophy

| Principle | Meaning |
|-----------|---------|
| **90-Day Cycles** | Break the year into 3 focused sprints. Each cycle has a mission, objectives, outputs, and an exit review. |
| **Day-Level Execution** | Every day has one main objective, essential commitments, a technical focus, an IELTS session, and personal anchors. |
| **Evidence over Activity** | Progress is measured by shipped outputs (reports, code, scores) — not hours logged. |
| **Depth over Breadth** | The 5-stage depth model: Understand → Practice → Implement → Validate → Apply + Evidence. |
| **Intentional Recovery** | Capacity modes (Normal / Reduced / Recovery) prevent burnout by planning rest deliberately. |
| **Privacy First** | Zero backend. All state is stored in the browser's `localStorage` and can be exported to JSON. |

---

## ✨ Features

### 🎯 Command Center
- Live dashboard with key metrics: day number, execution rate, IELTS band estimate, cycle progress
- System risk panel with severity levels (low / medium / high)
- Active project progress overview
- Daily quote card with motivational context
- Current cycle summary at a glance

### 📅 Today View
- **Interactive 90-Minute Focus Chrono** — live countdown (`01:30:00` → `00:00:00`), smooth visual progress bar, pause/resume, +5m extension, reset, and built-in offline Web Audio harmonic chimes (start, pause, and celebration bells).
- **Today's Technical Tasks (Agenda)** — concrete execution roadmap for Day 1 (RAG retrieval evaluation, Precision@k & MRR metrics, dense vs BM25 benchmarks, failure taxonomy, and strict TypeScript contracts) mentioned clearly without tracking friction.
- **Global Sticky Chrono Pill** — active timer stays visible in the corner across all views with pause/play and one-click navigation back to Today.
- **Main Objective** — single focused goal for the day with automatic completion on timer finish.
- **Essential Commitments** — Faith · Technical · IELTS · Health · Discipline with direct 90m chrono launch trigger.
- **Faith & Anchors card** — detailed Islamic practice tracker:
  - 5 individual prayer buttons (Fajr 🌙, Dhuhr, Asr, Maghrib, Isha 🌟) with animated progress bar
  - Fajr on-time badge
  - Sūrat Al-Baqarah thirds (3 independent toggles with Arabic āyah ranges)
  - Morning 🌅 & Evening 🌆 Adhkar
  - Training and screen-time discipline quick toggles
- **Daily Close** — structured end-of-day reflection (what was done, what interfered, tomorrow's priority)
- **Quick Notes** — free-form scratchpad

### 📆 Week View
- Weekly mission, RAG focus, rotating technical track
- Day-by-day schedule with technical stage and IELTS skill
- Capacity at a glance (work intensity, training sessions, travel)
- Weekly outcome checklist
- Structured weekly review form (missed diagnoses with root-cause categories, tactical adjustments)

### 🔄 Current Cycle
- Cycle mission, date period, and status
- **Manage Mode** — full inline editing:
  - Add / edit / delete core objectives
  - Add / toggle / delete expected outputs
  - Full cycle task manager (add, complete, delete tasks by category: Objective / Output / Theme / General)
- Exit criteria checklist
- Cycle review form with identity-level reflection questions

### 📚 Learning & Projects
- Learning topic tracker with depth stage and progress percentage
- Session log with evidence linking
- Project dashboard with milestones, tech rationale, tech-gate justification, and portfolio readiness flag
- Output evidence vault (evaluation reports, GitHub updates, architecture diagrams, benchmark tests…)

### 🇬🇧 IELTS Hub
- Session history across all 5 skill areas (Reading · Listening · Writing · Speaking · Diagnostic)
- Error bank with recurrence count, root cause, correction, and next drill
- Estimated band score derived from logged mock results

### 🗂️ Review
- Weekly review history with execution summaries and tactical adjustments
- Cycle review history with deep reflection (identity change, skills gained, evidence produced)

### 📦 Resources
- Curated resource library (Articles, Docs, Papers, Tools, Books)
- Linked to learning topics and projects

### ⚙️ Settings
- User profile (name, motto, program start date, IELTS target, sleep goal, screen time limit)
- Dark / Light theme toggle — persisted across sessions, flash-free on load
- JSON data export / import (full backup and restore)
- Reset to defaults

### 🌙 Dark & Light Mode
- Full dual-theme CSS variable system (`body.dark-theme` / `body.light-theme`)
- Botanical dark-green palette — not just inverted greys
- Flash-free theme restoration via inline script in `index.html`

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **UI Framework** | [React 19](https://react.dev/) — functional components, hooks |
| **Language** | [TypeScript 6](https://www.typescriptlang.org/) — strict mode |
| **Desktop Shell** | [Tauri v2](https://tauri.app/) — Rust backend, native Windows WebView2 (~3.3 MB installer) |
| **Build Tool** | [Vite 8](https://vite.dev/) |
| **Styling** | Vanilla CSS with a full CSS-variable design system (no Tailwind) |
| **Audio** | Built-in Web Audio API synthesizer for calm focus chimes (100% offline, zero audio assets) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Fonts** | Plus Jakarta Sans · Playfair Display · Newsreader · Caveat · JetBrains Mono (Google Fonts) |
| **Confetti** | [canvas-confetti](https://github.com/catdad/canvas-confetti) |
| **Linting** | [oxlint](https://oxc.rs/docs/guide/usage/linter.html) |
| **State** | React Context API + `localStorage` persistence |
| **Persistence** | Local `localStorage` (key prefix `nidham_pos_state_v3`) |
| **Deployment** | Windows `.exe` / `.msi` desktop installer + static web hosting |

> Zero server backend. No third-party analytics. No cookies. No telemetry.

---

## 📁 Project Structure

```
nidham/
├── index.html                   # App shell · flash-fix script · Google Fonts
├── vite.config.ts               # Vite configuration (port 1420 pinned for Tauri)
├── tsconfig*.json
├── src-tauri/                   # 🖥️ Tauri v2 native desktop application
│   ├── Cargo.toml               # Rust package manifest
│   ├── tauri.conf.json          # Window size, bundle targets, app identifier
│   ├── build.rs                 # Tauri build hook
│   ├── capabilities/            # Window permissions & core capabilities
│   ├── src/                     # Rust entry points (main.rs, lib.rs)
│   └── target/release/bundle/   # 📦 Built installers (.exe and .msi)
├── public/
│   ├── favicon.svg
│   └── images/                  # Static hero images
└── src/
    ├── main.tsx                  # React entry point
    ├── App.tsx                   # Root layout — sidebar + view router + floating chrono pill
    ├── index.css                 # Global resets
    ├── App.css                   # App-level layout classes
    │
    ├── types/
    │   └── index.ts              # All TypeScript interfaces (DayData, CycleData, FocusTimerState…)
    │
    ├── data/
    │   └── initialData.ts        # Seed data + date calculation helpers
    │
    ├── context/
    │   └── AppContext.tsx        # Global state provider + Focus Chrono ticker + actions
    │
    ├── utils/
    │   └── sound.ts              # Web Audio API chime synthesizer (offline)
    │
    ├── styles/
    │   ├── variables.css         # CSS design tokens (colours, radii, shadows, dark theme)
    │   ├── base.css              # Typography, card, button, layout base styles
    │   ├── sidebar.css           # Sidebar navigation styles
    │   └── components.css        # Shared component styles & focus chrono console
    │
    └── components/
        ├── layout/               # ViewHeader, Sidebar
        ├── common/               # QuoteCard, shared UI atoms
        ├── command-center/       # CommandCenterView
        ├── today/                # TodayView (Focus Chrono, Technical Tasks, Faith & Anchors…)
        ├── week/                 # WeekView
        ├── cycle/                # CycleView (Manage Mode, Task Manager)
        ├── learning-projects/    # LearningView, ProjectsView
        ├── ielts/                # IELTSView
        ├── review/               # ReviewView
        ├── resources/            # ResourcesView
        ├── settings/             # SettingsView
        ├── archive/              # ArchiveView
        └── modals/               # QuickLogModal
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 18
- npm ≥ 9 (ships with Node)
- [Rust](https://www.rust-lang.org/) (optional, only required if compiling the desktop app from source)

### Web Development Mode

```bash
# 1. Clone the repository
git clone https://github.com/mohammedhachoud/nidham.git
cd nidham

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:1420](http://localhost:1420) in your browser.

---

### Desktop Application Mode

```bash
# Launch the native desktop window with live hot-reload:
npm run tauri:dev

# Build standalone Windows installers (.exe and .msi):
npm run tauri:build
```

The compiled installers will be generated in:
[`src-tauri/target/release/bundle/`](file:///c:/Users/HM/Desktop/Nidham/src-tauri/target/release/bundle/)

---

### Build Web for Production

```bash
npm run build     # outputs to /dist
npm run preview   # preview the production build locally
```

### Lint

```bash
npm run lint
```

---

## ⚙️ Configuration

All personal configuration lives inside the app under **Settings** (gear icon in the sidebar).
No `.env` file is needed — everything is stored in `localStorage`.

| Field | Description | Default |
|-------|-------------|---------|
| **Name** | Your name, shown in the dashboard greeting | — |
| **Motto** | Personal mission statement | — |
| **Program Start Date** | Date of Day 1 of your 90-day journey | — |
| **IELTS Target Band** | Your goal band score | 7.5 |
| **Daily Sleep Target** | Hours per night | 7 |
| **Screen Time Limit** | Hours per day | 2 |
| **Theme** | `dark` or `light` | `dark` |

### Customising Seed Data

The seed data (cycles, weeks, initial day template) lives in `src/data/initialData.ts`.
Edit `INITIAL_CYCLES`, `INITIAL_WEEKS`, and `INITIAL_TODAY` to match your actual plan before first launch.

The program start date drives all day-number calculations:

```ts
// src/data/initialData.ts
export const PROGRAM_START_DATE = new Date('2026-07-11'); // change to your Day 1
```

---

## 💾 Data & Persistence

All data is stored in the browser using `localStorage` under the key prefix `nidham_pos_state_v3`.

| Key | Contents |
|-----|---------|
| `nidham_pos_state_v3_cycles` | All 3 cycle objects (objectives, outputs, tasks, review) |
| `nidham_pos_state_v3_weeks` | All week plans and weekly reviews |
| `nidham_pos_state_v3_today` | Today's day data (prayers, commitments, daily close) |
| `nidham_pos_state_v3_topics` | Learning topics with depth stage |
| `nidham_pos_state_v3_sessions` | Learning session log |
| `nidham_pos_state_v3_projects` | Projects with milestones and tech rationale |
| `nidham_pos_state_v3_outputs` | Output evidence vault |
| `nidham_pos_state_v3_ielts_sessions` | IELTS session records |
| `nidham_pos_state_v3_ielts_errors` | IELTS error bank |
| `nidham_pos_state_v3_resources` | Resource library |
| `nidham_pos_state_v3_profile` | User profile settings |
| `nidham_theme` | `"dark"` or `"light"` |

### Backup & Restore

- **Export**: Settings → **Export JSON** — downloads a full snapshot of all data
- **Restore**: Settings → **Import JSON** — paste or upload your backup file

> ⚠️ Clearing browser storage will erase all your data. Export regularly.

---

## 🗺️ Roadmap

- [ ] **PWA / Offline support** — service worker for fully offline usage
- [ ] **Mobile layout** — touch-optimised full-screen day view
- [ ] **Browser notifications** — prayer time reminders and session prompts
- [ ] **Charts & Analytics** — execution-rate trends, IELTS score trajectory over time
- [ ] **Optional cloud sync** — Supabase or Firebase backend for multi-device use
- [ ] **Quran audio player** — embedded recitation for the daily Baqarah thirds
- [ ] **Habit streak tracker** — visual daily streaks for prayers, training, and adhkar
- [ ] **Arabic UI** — full right-to-left layout option
- [ ] **Week template generator** — auto-populate week plans from cycle objectives

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are welcome!

1. **Fork** the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: describe your change"`
4. Push the branch: `git push origin feat/your-feature`
5. Open a **Pull Request** against `main`

### Code Style Guidelines

| Rule | Detail |
|------|--------|
| TypeScript | Strict mode — no `any`, no implicit types |
| Components | Functional only — no class components |
| Styling | Use CSS variables from `variables.css` — no hardcoded colours |
| Icons | Lucide React only |
| Commits | Follow [Conventional Commits](https://www.conventionalcommits.org/) |

---

## 📄 License

MIT © 2026 — see [LICENSE](LICENSE) for full text.

---

<p align="center">
  Built with intention. Ship something real every 90 days. 🌿
</p>
