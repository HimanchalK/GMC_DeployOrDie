# हाम्रो साथी — Hamro Saathi

**A calm, interest-based e-learning platform for autistic children in Nepal.**

Built for GMC internal hackathon — theme: _Empowering Education Through Technology_.

---

## The problem

Nepal has an estimated 250,000–300,000 autistic children, but no dedicated Nepali-language learning platform for them. Existing global tools (Proloquo2Go, Avaz, Otsimo) are English-first, expensive, and built around contexts (US classrooms, US therapists) that don't reflect Nepal's reality, where most families don't have access to a trained special educator.

In 2026, Nepal's Ministry of Education announced province-wide autism classrooms, with no curriculum or trained-teacher pipeline ready to fill them. Hamro Saathi is designed to be exactly that missing piece: a Nepali-first, evidence-based digital learning companion a child can use independently, with a caregiver layer alongside it.

## What it does

### For the child

- **One-time onboarding** — the child enters their name and picks an interest (dinosaurs / vehicles / animals). Everything downstream is themed to that choice.
- **Visual learning path** — a dashboard of lessons shown as locked / current / completed, so the child always knows what's next without guessing (TEACCH-style external structure).
- **Three core activities**, all tap-based (not drag-precision-dependent where avoidable):
  - **Matching** — pick the picture that matches the prompt
  - **Counting** — tap to count themed objects up to a target number
  - **Sequencing** — arrange daily-routine steps into the correct order (drag-and-drop via dnd-kit)
- **Gentle feedback only** — no timers, no penalty for wrong answers, calm audio cues (Nepali, via pre-generated Azure Neural TTS), just a prompt to try again.
- **Pre-lesson emotion check-in** — a quick, low-pressure "how are you feeling right now" step before each lesson starts.
- **Achievements** — small, low-pressure milestones (first lesson completed, a perfect score) surfaced as a gentle popup, not a competitive leaderboard.
- **Mood and streak tracking** — lightweight, local, non-punitive engagement signals.
- **Accessibility layer** — calm mode (reduced motion/sound), dyslexia-friendly font toggle, colorblind-safe palette. Shared infrastructure that also lays groundwork for future support beyond autism (ADHD, dyslexia, colorblindness).

### For the parent/caregiver

- **Progress dashboard** — real completed/total lesson counts and child profile info, pulled live from the same data the child's session writes to.
- **Guidance cards** — short, plain-language content (e.g. "what is a visual schedule," "tantrum vs. meltdown") aimed at caregivers who may not have access to a trained therapist.
- **AI social story generator** — describe a specific situation (e.g. "a crowded bus ride") and get back a short, calm, Nepali-language social story rehearsing it with a coping strategy. Falls back to three pre-written stories if the AI call is unavailable, so the feature never blocks the demo.

## Why these design choices, not just "an app with games in it"

- **Sequencing** mirrors TEACCH-style structured teaching — external, visible step-by-step structure, one of the most evidence-backed approaches to autism education worldwide.
- **Interest-based theming** reflects the well-documented finding that autistic learners engage far more with content wrapped around a special interest than generic material.
- **Gentle, non-punitive feedback and no timers** reflect sensory-regulation best practice; wrong answers are treated as information, not failure.
- **Local-first session, no forced sign-up for the child** reduces friction for a device that's typically shared within a family, not personally owned by the child.

## Explicitly out of scope for this MVP

We scoped this deliberately, not by oversight:

- Not an AAC/communication tool.
- Not designed for Level 3 (very substantial) support needs — those children need 1:1 human support, not a self-directed app, and we're not claiming otherwise.
- Not a diagnostic or clinical tool, and not a therapy replacement — it supplements, and points caregivers toward real support (e.g. AutismCare Nepal Society).

## Tech stack

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **Supabase** (Postgres) — source of truth for `children`, `lessons`, `lesson_items`, `child_progress`
- **Local storage** — active session (which child is using the device), plus lightweight state like mood, streak, and accessibility preferences; deliberate MVP simplification for a single shared family device rather than multi-device account sync
- **dnd-kit** — drag-and-drop for the sequencing activity
- **Azure Neural TTS** (`ne-NP-HemkalaNeural`) — natural Nepali audio for feedback phrases, pre-generated and stored rather than called live, so audio playback has zero runtime API dependency
- An LLM API — powers the parent-facing social story generator only; the core child-facing learning loop has **zero AI dependency**, which matters for an autistic user base where predictability is the whole point

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

Then set up a Supabase project with the `children`, `lessons`, `lesson_items`, and `child_progress` tables, and seed at least one lesson per activity type (`matching`, `counting`, `sequencing`) across the three interest themes so the app has content to load. Image assets are served from `public/images/{dinosaur,vehicle,animal,sequence}/`.

## Project structure

```
src/
├── app/
│   ├── (child)/            # onboarding, dashboard, activity engine, settings
│   ├── (parent)/            # parent dashboard
│   └── api/social-story/    # LLM-backed story generation endpoint    # planned feature
├── components/
│   ├── activity/             # Matching / Counting / Sequencing activities
│   ├── achievement/          # Achievement cards, popups
│   ├── emotion/               # Pre-lesson emotion check-in
│   ├── dashboard/, parent/, onboarding/, landing/, settings/, reward/
│   └── ui/                     # shadcn primitives
├── hooks/                      # useLesson, useActivity, useAudio, useAccessibility,
│                                # useAchievement, useAnalytics, useStreak, useEmotion
├── services/                    # Supabase data access (lessons, progress, achievements,
│                                # analytics, children, emotion, streak, reward)
└── types/                       # shared TypeScript types
```

## Known limitations (honest, for judges)

- Session handling is local-storage based rather than full multi-device auth — a deliberate MVP simplification, not an oversight.
- Content library is intentionally small (3 interest themes × 3 activity types) to fit hackathon scope — the data model and components are built to extend to more themes/activities without redesign.
- The parent dashboard's weekly-activity chart and insights panel currently render illustrative sample data; real per-child lesson progress (completed/total, child identity) is live. Full analytics aggregation is flagged as roadmap, not claimed as complete.
- Deaf/ADHD/dyslexia/colorblind support is currently limited to accessibility _toggles_ (font, palette, motion) rather than dedicated content modules — flagged as roadmap.

## Roadmap (post-hackathon)

- Offline-first content delivery, following OLE Nepal's proven model for rural Nepal (400,000+ students served this way today)
- Teacher/classroom dashboard for deployment into resource classes and the government's newly announced province-wide autism classrooms
- Full analytics pipeline behind the parent dashboard's weekly/insights views
- Additional interest themes and lesson types
- Proper multi-device parent accounts via Supabase Auth
- Dedicated content tracks for deaf/HoH, ADHD, and dyslexic learners, building on the shared accessible-design-system foundation already in place

## Team

Himanchal khatiwada
Sonam Prasai
Pariskrit baral
