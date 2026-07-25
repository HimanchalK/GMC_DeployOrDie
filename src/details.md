# Hamro Saathi — Autonomous Development Guide

## Mission

You are acting as a senior software engineer on this project.

Your job is NOT to redesign the project.

Your job is to continuously improve the existing codebase while maintaining architectural consistency.

Assume the project owner is asleep.

Make safe, incremental improvements that compile and integrate with the existing project.

---

# Project Overview

Hamro Saathi is an educational web platform for autistic and specially challenged children.

The application focuses on

- calm interactions
- accessibility
- predictable UI
- parent visibility
- positive reinforcement

This is NOT a game.

This is NOT Duolingo.

It should feel safe, gentle and trustworthy.

---

# Current Status

Already complete

✅ Landing

✅ Child onboarding

✅ Dashboard

✅ Lesson progression

✅ Activity engine

    Matching

    Counting

    Sequencing

✅ Supabase integration

✅ Progress tracking

The application already works.

Do NOT rewrite working systems.

---

# Tech Stack

Next.js 16

App Router

TypeScript

TailwindCSS

shadcn/ui

Supabase

React Hooks

No Redux

No Zustand

No Context API unless absolutely necessary.

---

# Engineering Principles

Always prefer

small commits

small reusable components

typed code

clean hooks

single responsibility

predictable state

Avoid

large files

duplicated code

deep prop drilling

magic strings

hardcoded values

---

# UI Principles

The UI must never feel like AI-generated templates.

Avoid

huge gradients

glassmorphism everywhere

oversaturated colours

floating random blobs

heavy shadows

marketing landing page aesthetics

Instead

soft cards

rounded corners

comfortable spacing

large buttons

gentle colours

consistent typography

predictable layouts

accessibility first

---

# Accessibility Rules

Large tap targets

Minimum button height 48px

Readable fonts

Keyboard navigation

ARIA labels

Screen reader friendly

Reduced motion support

High contrast support

Do not introduce flashing animations.

---

# Folder Structure

Continue using

components/

activity/

dashboard/

landing/

onboarding/

reward/

achievement/

parent/

profile/

emotion/

settings/

audio/

common/

hooks/

services/

types/

lib/

Do not flatten folders.

---

# Features To Build

Implement these in order.

Only proceed to the next one when the previous feature is clean.

---

## Phase 1

Reward System

Create

components/reward

RewardCard

Celebration

StarBurst

RewardBadge

Confetti

Create

hooks/useReward.ts

services/reward.ts

Keep animations subtle.

---

## Phase 2

Achievement System

Create

AchievementCard

AchievementGrid

AchievementPopup

AchievementService

Achievement Types

Examples

First Lesson

Completed Theme

3 Day Streak

Perfect Score

Explorer

Store progress in Supabase-ready service layer.

---

## Phase 3

Dashboard Improvements

Improve

Welcome Banner

Progress Card

Lesson Card

Empty State

Add

Today's Goal

Continue Learning

Recent Achievement

Learning Streak

Favourite Interest

without breaking current behaviour.

---

## Phase 4

Parent Components

Create

ChildOverview

ProgressChart

WeeklyActivity

RecentLessons

StrengthsCard

NeedsPracticeCard

These are UI only.

No authentication changes.

---

## Phase 5

Emotion Check

Before learning

🙂

😐

🙁

Create reusable components.

Service layer.

Hooks.

Future database support.

---

## Phase 6

Accessibility Settings

Create

AccessibilitySettings

Large Text

Reduce Motion

Mute Sounds

High Contrast

Colour Blind Friendly

Persist locally.

---

## Phase 7

Audio System

AudioButton

VoicePrompt

Prompt narration

Reward sounds

Success

Retry

Completion

Support future Nepali audio files.

---

## Phase 8

Animation Polish

Add tasteful animations

page transitions

button presses

card hover

reward entrance

modal transitions

Do not overuse animations.

---

## Phase 9

Parent Insights

Generate UI components for

Most Played Theme

Weekly Progress

Average Accuracy

Time Learning

Favourite Activity

Recent Sessions

Keep data mocked if backend is unavailable.

---

## Phase 10

Analytics Layer

Create services for

activity_attempts

session_history

analytics

Do not change existing services.

Create additive services only.

---

# Refactoring Rules

Whenever touching code

extract repeated UI

remove duplication

improve naming

improve typing

split oversized components

add comments only where necessary

Never rewrite entire files unnecessarily.

---

# Code Quality

Prefer

const

readonly types

strict typing

small hooks

reusable utilities

Avoid

any

ts-ignore

duplicate interfaces

duplicate services

---

# Styling Rules

Always use existing globals.css variables.

Never introduce hardcoded colours.

Always use

background

foreground

primary

secondary

muted

border

ring

card

tokens.

Continue using shadcn.

---

# Images

Images are loaded from

/public/images/

Example

/images/dinosaur/dinosaur1.png

Never hardcode absolute URLs.

---

# Audio

Future files

/public/audio/

Keep paths configurable.

---

# Supabase

Never modify existing tables destructively.

Only add new services.

Assume future migrations will create

achievement_progress

daily_streaks

mood_logs

reward_history

activity_attempts

session_history

---

# Documentation

Whenever you create

a hook

a service

a reusable component

append a short explanation in comments describing its responsibility.

---

# If Something Is Missing

If backend data is unavailable

Create mock data.

Create interfaces.

Create TODO comments.

Do not stop development.

The project should always remain runnable.

---

# Definition of Done

A feature is considered complete only when

✓ Fully typed

✓ Uses existing design system

✓ Accessible

✓ Responsive

✓ Reusable

✓ No duplicated logic

✓ Builds successfully

✓ Integrates naturally with current architecture

Never sacrifice architecture for speed.

Think like you're building software that children and parents will trust every day.
