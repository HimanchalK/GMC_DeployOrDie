# Hamro Saathi – Current Context (Activity Progress Fix)

## Project

Hamro Saathi is a web application for autistic and specially challenged children.

Tech Stack:

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase
- LocalStorage (temporary authentication)
- No Zustand / Redux

Current flow:

Landing
→ Child Onboarding
→ Dashboard
→ Activity Engine
→ Lesson Completion
→ Dashboard

---

# Current Status

Completed:

- Landing Page
- Child Onboarding
- Dashboard
- Child creation in Supabase
- Progress initialization
- Activity Engine
- Matching Activity
- Counting Activity
- Sequencing Activity
- Lesson completion logic
- Dashboard progress
- LocalStorage child session

The engine itself works.

The current problem is with lesson progression.

---

# Database

## children

Contains:

- id
- name
- interest_tag

Example:

interest_tag

- dinosaur
- animal
- vehicle

---

## lessons

Columns:

- id
- activity_type
- interest_tag
- sort_order
- title_np
- description_np

Current rows:

Matching | dinosaur | sort_order=1

Matching | animal | sort_order=1

Matching | vehicle | sort_order=1

Counting | dinosaur | sort_order=2

Counting | animal | sort_order=2

Counting | vehicle | sort_order=2

Sequencing | NULL | sort_order=3

Important:

sort_order is intentionally NOT unique.

Each interest has its own progression.

---

## lesson_items

Contains activity data.

Columns:

- lesson_id
- prompt_np
- image_name
- correct_answer
- options (jsonb)
- sort_order
- theme

Image paths are stored relative to /public/images/

Example:

dinosaur/dinosaur1.png

vehicle/vehicle2.png

sequence/sequence1.png

Images are loaded using

src={`/images/${item.image_name}`}

---

## child_progress

Contains

child_id

lesson_id

status

locked

current

completed

completed_at

---

# Current Bug

Current initializeProgress()

loads

ALL lessons

ordered by sort_order.

Because there are three lessons with sort_order=1,

the app unlocks

Matching Dinosaur

↓

Matching Animal

↓

Matching Vehicle

which is WRONG.

The child should only receive lessons matching their chosen interest.

---

# Desired Behaviour

Example:

Child interest = dinosaur

Dashboard should contain ONLY

Matching Dinosaur

↓

Counting Dinosaur

↓

Sequencing

Animal and Vehicle lessons should never appear.

Likewise

Animal child

gets

Matching Animal

↓

Counting Animal

↓

Sequencing

Vehicle child

gets

Matching Vehicle

↓

Counting Vehicle

↓

Sequencing

---

# Required Changes

## 1.

Modify initializeProgress()

Instead of fetching all lessons

fetch

interest_tag = child.interest_tag

OR

interest_tag IS NULL

ordered by sort_order.

Do NOT load lessons from other interests.

---

## 2.

Dashboard

Should only display lessons existing in child_progress.

Nothing else.

---

## 3.

completeLesson()

Currently replaying a completed lesson unlocks another lesson.

Fix.

Before updating,

check status.

If status == completed

return immediately.

This function should be idempotent.

---

## 4.

Completed lessons

should NOT be clickable.

Only lessons with

status == current

should open.

---

## 5.

Activity pages

If lesson_items is empty,

show

"No activity data available"

instead of failing silently.

---

# Current Folder Structure

src/

app/(child)/

dashboard

activity/[lessonId]

onboarding

components/

activity/

dashboard/

onboarding/

hooks/

useLesson.ts

useActivity.ts

useAudio.ts

services/

children.ts

progress.ts

lessons.ts

types/

activity.ts

index.ts

---

# Authentication

Temporary.

Current approach:

Child onboarding

↓

Create child

↓

Save childId in localStorage

↓

Dashboard reads localStorage

↓

Activity reads localStorage

Parent authentication will be added later.

Do NOT implement auth changes.

---

# What Should NOT Change

Do not rewrite architecture.

Do not introduce Zustand.

Do not introduce Redux.

Do not replace Supabase.

Do not change routing.

Keep current hooks.

Keep current component structure.

---

# Goal

Fix lesson progression so that every child only progresses through lessons belonging to their selected interest plus universal lessons.

After the fix,

Dinosaur child:

Matching Dinosaur

↓

Counting Dinosaur

↓

Sequencing

Animal child:

Matching Animal

↓

Counting Animal

↓

Sequencing

Vehicle child:

Matching Vehicle

↓

Counting Vehicle

↓

Sequencing

Everything else should continue working exactly as it currently does.
