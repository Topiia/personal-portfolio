# Ankit Singh — AI-Powered Full Stack Portfolio

> **Backend-Focused Full Stack Engineer** — Security-First · Distributed Systems · Production-Grade

A production-grade personal portfolio built with **Next.js 14**, featuring an **AI chat assistant** powered by Groq, real-time media delivery via **Cloudinary**, and a fully data-driven architecture where all content is managed through JSON files.

---

## ✨ Features

- **AI Chat Assistant** — Ask the AI anything about Ankit's skills, projects, and experience. Built with Groq LLM + a custom semantic retrieval layer.
- **Data-Driven Content** — All portfolio content (projects, skills, experience, certifications) lives in JSON files — no code changes needed to update content.
- **Cloudinary Media Pipeline** — Images and videos are served via Cloudinary CDN. A pre-build script auto-generates media mappings at build time.
- **Project Showcase** — Detailed project cards with GitHub repository links, tech stack tags, demo videos, and architecture descriptions.
- **Flagship Project** — Dedicated full-page breakdown for the Capsule project with lightbox image viewer.
- **Certifications & Education** — Timeline-style education section and certificate gallery with image zoom.
- **Resume Download** — One-click resume download directly from the navbar and hero section.
- **Dark Mode** — Theme-aware design with smooth transitions via `ThemeProvider`.
- **Fully Responsive** — Mobile-first layout with fluid typography using `clamp()`.
- **Smooth Animations** — Framer Motion powered entrance animations, hover effects, and micro-interactions.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| AI / LLM | Groq SDK |
| Media CDN | Cloudinary |
| UI Components | Lucide React, Embla Carousel |
| Markdown | react-markdown |
| Image Zoom | react-medium-image-zoom |

---

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages & API routes
│   ├── api/chat/           # AI chat API endpoint (Groq)
│   ├── projects/[id]/      # Dynamic project detail pages
│   └── layout.tsx          # Root layout with metadata & ThemeProvider
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── projects/           # ListProjectCard, project detail components
│   ├── sections/           # Hero, ProjectsGrid, FlagshipProject, Skills, etc.
│   ├── theme/              # ThemeProvider
│   └── ui/                 # Shared UI primitives (Section, Modal, etc.)
├── data/                   # JSON content files
│   ├── projects.json       # Projects list with GitHub links
│   ├── projects/           # Individual detailed project files (e.g. capsule.json)
│   ├── profile.json        # Personal info, CTA buttons
│   ├── skills.json         # Tech skills
│   ├── experience.json     # Work experience
│   ├── education.json      # Education timeline
│   ├── certifications.json # Certificates
│   └── navigation.json     # Navbar links
├── lib/
│   └── ai/                 # AI retrieval layer, prompts, Groq client
├── public/
│   └── resume.pdf          # Downloadable resume
├── scripts/
│   └── generateProjectMedia.ts  # Pre-build Cloudinary media map generator
└── types/                  # Shared TypeScript types
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [Cloudinary](https://cloudinary.com/) account
- A [Groq](https://console.groq.com/) API key

### 1. Clone the repository

```bash
git clone https://github.com/Topiia/personal-portfolio.git
cd personal-portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GROQ_API_KEY=your_groq_api_key
```

### 4. Run the development server

```bash
npm run dev
```

The `predev` script will automatically generate the Cloudinary media map before starting the server.

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

---

## 📦 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server (runs media map generator first) |
| `npm run build` | Production build (runs media map generator first) |
| `npm run start` | Start production server |
| `npm run lint` | Lint the codebase |
| `npm run type-check` | TypeScript type checking |

---

## 🔗 Featured Projects

| Project | Repository |
|---|---|
| Sky-Link — Virtual Drone Telemetry Simulator | [github.com/Topiia/sky-link-drone-sim](https://github.com/Topiia/sky-link-drone-sim) |
| CryptoDash — Real-Time Cryptocurrency Tracker | [github.com/Topiia/crypto-price-tracker](https://github.com/Topiia/crypto-price-tracker) |
| System Pulse — Hardware Monitoring Dashboard | [github.com/Topiia/system-pulse-monitor](https://github.com/Topiia/system-pulse-monitor) |
| Agile Almanac — Collaborative Task Management | [github.com/Topiia/agile-almanac](https://github.com/Topiia/agile-almanac) |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
