//  /src/services/lessons.ts
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function getLessons(interest: string) {
  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .or(`interest_tag.eq.${interest},interest_tag.is.null`)
    .order("sort_order");

  if (error) throw error;
  return data;
}

export async function getLessonById(lessonId: string) {
  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", lessonId)
    .single();

  if (error) throw error;
  return data;
}

export async function getLessonItems(
  lessonId: string,
  interestTag?: string | null,
) {
  let query = supabase
    .from("lesson_items")
    .select("*")
    .eq("lesson_id", lessonId)
    .order("sort_order");

  if (interestTag) {
    query = query.or(`theme.eq.${interestTag},theme.eq.universal`);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
}
