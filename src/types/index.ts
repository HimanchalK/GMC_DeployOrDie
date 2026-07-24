// -----------------------------
// Common Types
// -----------------------------

export type Interest = "dinosaur" | "vehicle" | "animal";

export type ActivityType = "matching" | "counting" | "sequencing";

export type ProgressStatus = "locked" | "current" | "completed";

// -----------------------------
// Database Models
// -----------------------------

export type InterestTag = "dinosaur" | "vehicle" | "animal";

export interface Child {
  id: string;
  name: string;
  interest_tag: InterestTag;
  parent_id: string | null;
  created_at: string;
}

export interface Lesson {
  id: string;

  activity_type: ActivityType;

  interest_tag: Interest | null;

  title_np: string;

  description_np: string | null;

  sort_order: number;
}

export interface LessonItem {
  id: string;

  lesson_id: string;

  prompt_np: string;

  image_url: string;

  options: string[] | null;

  correct_answer: string;

  sort_order: number;
}

export interface ChildProgress {
  id: string;

  child_id: string;

  lesson_id: string;

  status: ProgressStatus;

  completed_at: string | null;
}

export interface ParentLesson {
  id: string;

  title_np: string;

  body_np: string;

  created_at: string;
}

export interface SocialStory {
  id: string;

  child_id: string | null;

  prompt: string;

  generated_text: string;

  is_ai_generated: boolean;

  created_at: string;
}

export interface ProgressLesson {
  lesson_id: string;
  status: "locked" | "current" | "completed";
  completed_at: string | null;

  lessons: {
    id: string;
    title_np: string;
    description_np: string;
    activity_type: "matching" | "counting" | "sequencing";
    interest_tag: InterestTag | null;
    sort_order: number;
  };
}
// -----------------------------
// UI Types
// -----------------------------

export interface ThemeOption {
  id: Interest;

  title: string;

  image: string;
}

export interface AccessibilitySettings {
  calmMode: boolean;

  dyslexiaFont: boolean;

  colorblindMode: boolean;
}
