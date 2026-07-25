# हाम्रो साथी — Hamro Saathi

**A calm, interest-based e-learning platform for autistic children in Nepal.**

Built for [Hackathon Name] — theme: _Empowering Education Through Technology_.

---

## The problem

Nepal has an estimated 250,000–300,000 autistic children, but no dedicated Nepali-language learning platform for them. Existing global tools (Proloquo2Go, Avaz, Otsimo) are English-first, expensive, and built around contexts (US classrooms, US therapists) that don't reflect Nepal's reality — where most families don't have access to a trained special educator.

In 2026, Nepal's Ministry of Education announced province-wide autism classrooms — with no curriculum or trained-teacher pipeline ready to fill them. Hamro Saathi is designed to be exactly that missing piece: a Nepali-first, evidence-based digital learning companion a child can use independently, and a caregiver can follow along with.

## What it does

- **Child mode**: the child picks an interest (dinosaurs / vehicles / animals) once, then works through short, visual, low-stimulation lessons — Matching, Counting, and Sequencing — themed to that interest. Gentle feedback throughout, no timers, no penalties for wrong answers.
- **Parent mode**: a caregiver views the child's progress, reads short guidance cards (e.g. "what is a visual schedule," "tantrum vs. meltdown"), and can generate a personalized Nepali social story for a specific situation (e.g. a crowded bus ride) using an AI-assisted generator, with pre-written fallback stories if the AI call is unavailable.
- **Accessibility layer**: calm mode (reduced motion/sound), dyslexia-friendly font toggle, colorblind-safe palette — shared infrastructure that also lays groundwork for future support beyond autism (ADHD, dyslexia, colorblindness).

The activities are built on evidence-based autism pedagogy, not invented from scratch:

- **Sequencing** mirrors TEACCH-style structured teaching (external, visible step-by-step structure).
- **Interest-based theming** reflects the well-documented finding that autistic learners engage far more with content wrapped around a special interest.
- **Gentle, non-punitive feedback** reflects sensory-regulation best practice — no harsh sounds, no time pressure.

## Explicitly out of scope for this MVP

- Not an AAC/communication tool.
- Not designed for Level 3 (very substantial) support needs — those children need 1:1 human support, not a self-directed app, and we scoped honestly rather than claim otherwise.
- Not a diagnostic or clinical tool, and not a therapy replacement.

## Tech stack

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **Supabase** (Postgres) — source of truth for `children`, `lessons`, `lesson_items`, `child_progress`
- **Local storage** — active session (which child/parent is currently using the device), plus lightweight state like mood/streak, since this MVP is designed for a single shared family device rather than multi-device account sync
- **dnd-kit** — drag-and-drop for the sequencing activity
- **Azure Neural TTS** (`ne-NP-HemkalaNeural`) — natural Nepali audio for feedback phrases, pre-generated rather than called live
- LLM API — powers the parent-facing social story generator

## Getting started

```bash
# install dependencies
npm install

# set up environment variables
cp .env.example .env.local
# fill in:
# NEXT_PUBLIC_SUPABASE_URL=
# NEXT_PUBLIC_SUPABASE_ANON_KEY=
# (add your LLM API key if running the social story generator)

# run the dev server
npm run dev
```

Then set up your Supabase project with the `children`, `lessons`, `lesson_items`, and `child_progress` tables (see `supabase/` for schema/seed if present), and seed at least one lesson per activity type (`matching`, `counting`, `sequencing`) so the app has content to load.

## Project structure

```
src/
├── app/
│   ├── (child)/          # onboarding, dashboard, activity engine, settings
│   ├── parent/            # parent dashboard, progress, social story generator
│   └── api/social-story/  # LLM-backed story generation endpoint
├── components/
│   ├── activity/          # Matching / Counting / Sequencing activities
│   ├── dashboard/, parent/, onboarding/, landing/, settings/, reward/
│   └── ui/                 # shadcn primitives
├── hooks/                  # useLesson, useActivity, useAudio, useAccessibility, etc.
├── services/                # Supabase data access (lessons, progress, achievements...)
└── types/                   # shared TypeScript types
```

## Known limitations (honest, for judges)

- Session handling is local-storage based rather than full multi-device auth — a deliberate MVP simplification, not an oversight (see product doc for reasoning).
- Content library is intentionally small (3 interest themes × 3 activity types) to fit hackathon scope — architecture is built to extend to more themes/activities without redesign.
- Deaf/ADHD/dyslexia/colorblind support is currently limited to accessibility _toggles_ (font, palette, motion) rather than dedicated content modules — flagged as roadmap, not claimed as complete.

## Roadmap (post-hackathon)

- Offline-first content delivery (following OLE Nepal's proven model for rural Nepal)
- Teacher/classroom dashboard for resource-class deployment
- Additional interest themes and lesson types
- Proper multi-device parent accounts via Supabase Auth
- Dedicated content tracks for deaf/HoH, ADHD, and dyslexic learners

## Team

[Add team member names and roles here]
