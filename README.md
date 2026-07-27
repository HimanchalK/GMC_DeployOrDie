# हाम्रो साथी — Hamro Saathi

> **A calm, accessible, interest-based learning platform designed for autistic and neurodivergent children in Nepal.**

Built for the **GMC Internal Hackathon 2026**  
**Theme:** _Empowering Education Through Technology_

---

# The Problem

Autistic and neurodivergent children often learn differently from traditional learners. Many benefit from:

- Visual learning
- Predictable routines
- Structured activities
- Calm environments
- Positive reinforcement

Most educational platforms are designed for general learners and often include distracting interfaces, fast-paced interactions, or little localisation for Nepali children.

**Hamro Saathi** was built to provide a calm, accessible, and engaging learning experience that adapts to the child rather than expecting the child to adapt to the software.

---

# Our Solution

Hamro Saathi is a Nepali-first digital learning platform that combines structured learning, accessibility, and personalised activities into one simple experience.

Instead of overwhelming children with dozens of games, every activity follows the same predictable structure while adapting the content to each child's interests.

---

# Key Features

## 👦 Child Learning Experience

### One-time Onboarding

Children enter their name and choose an interest such as:

- 🦖 Dinosaurs
- 🚗 Vehicles
- 🐘 Animals

The chosen interest personalises future activities.

---

### Guided Learning Dashboard

Children see lessons as

- 🔒 Locked
- ▶ Current
- ✅ Completed

This creates a predictable learning path and reduces confusion.

---

### Three Core Learning Activities

### 🧩 Matching

Choose the picture that matches the prompt.

---

### 🔢 Counting

Tap the object until the required number is reached.

---

### 📖 Sequencing

Arrange everyday routines into the correct order using drag-and-drop.

---

### Positive Reinforcement

Instead of punishment:

- no timers
- no negative scoring
- calm retry prompts
- encouraging audio feedback

Children are encouraged to learn at their own pace.

---

### Accessibility

Designed with accessibility in mind.

Features include:

- Calm Mode
- Reduced motion
- Dyslexia-friendly font
- Colourblind-friendly palette

---

### Playground

A calm exploration space where children can freely interact with simple activities without pressure, scores, or time limits.

---

# Parent / Caregiver Features

- Child profile
- Learning progress
- Completed lessons
- Current lesson status
- Accessibility preferences
- Mood & streak tracking

Future versions will include:

- AI-generated social stories
- Progress analytics
- Teacher dashboard
- Therapist recommendations

---

# Why Hamro Saathi?

Rather than simply creating another educational game, Hamro Saathi follows principles commonly used in structured learning for autistic children.

Our design focuses on:

- Predictability
- Simplicity
- Visual guidance
- Personal interests
- Positive reinforcement
- Minimal distractions

Every screen was designed to reduce cognitive overload.

---

# Technology Stack

## Frontend

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui

---

## Backend

- Supabase
- PostgreSQL

Stores:

- Children
- Lessons
- Learning Progress

---

## Activity Content

Activities are powered by structured JSON datasets.

This allows:

- Easy expansion
- Faster loading
- Simple content management
- Future localisation

---

## Storage

Local Storage is used for:

- Active child session
- Accessibility settings
- Mood tracking
- Learning streak

This keeps the MVP simple while supporting shared family devices.

---

## Libraries

- dnd-kit
- Lucide Icons
- Supabase JS
- React Hooks

---

# Project Structure

```
src
│
├── app
│   ├── (child)
│   │     ├── onboarding
│   │     ├── dashboard
│   │     ├── activity
│   │     ├── playground
│   │     └── settings
│   │
│   └── (parent)
│         └── dashboard
│
├── components
│   ├── activity
│   ├── dashboard
│   ├── onboarding
│   ├── parent
│   ├── playground
│   ├── settings
│   └── ui
│
├── hooks
│
├── services
│
├── data
│   ├── matching.json
│   ├── counting.json
│   └── sequencing.json
│
├── types
│
└── lib
```

---

# Database

Supabase stores:

- children
- lessons
- child_progress

Activity content is loaded from JSON files for the MVP.

---

# Getting Started

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Create a `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Then configure your Supabase project and seed the required lesson data.

---

# Current MVP

✅ Interest-based onboarding

✅ Child dashboard

✅ Progress tracking

✅ Matching activities

✅ Counting activities

✅ Sequencing activities

✅ Accessibility settings

✅ Parent dashboard

✅ Playground

---

# Known Limitations

This project is an MVP built during a hackathon.

Current limitations include:

- Limited activity library
- Local storage session management
- Small content dataset
- Basic parent analytics
- Single-device experience

The architecture is designed to scale without major redesign.

---

# Future Roadmap

- AI-personalised learning paths
- AI-generated social stories
- Teacher dashboard
- Therapist dashboard
- Offline learning support
- Voice-guided Nepali lessons
- Larger activity library
- More interest themes
- Classroom management
- Multi-device accounts
- Cloud content management
- Advanced learning analytics

---

# Why It Matters

Inclusive education means recognising that every child learns differently.

Hamro Saathi creates a learning environment that is:

- Calm
- Predictable
- Accessible
- Personalised
- Inclusive

Our goal is simple:

> **Help every child learn with confidence, regardless of how they learn.**

---

# Team

- **Himanchal Khatiwada**
- **Sonam Prasai**
- **Pariskrit Baral**

---

## Built with ❤️ for children who deserve technology designed around them—not the other way around.
