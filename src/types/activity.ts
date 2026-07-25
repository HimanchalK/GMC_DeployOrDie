export type ActivityType = "matching" | "counting" | "sequencing";

export interface Lesson {
  id: string;
  activity_type: ActivityType;
  interest_tag: string | null;
  title_np: string;
  description_np: string;
  sort_order: number;
}

export interface LessonItem {
  id: string;
  lesson_id: string;
  prompt_np: string;
  image_name: string;
  correct_answer: string;
  options: string[];
  sort_order: number;
}

export type FeedbackState = "idle" | "correct" | "retry";
