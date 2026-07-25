import { createClient } from "@/lib/supabase/client";
import { getChild } from "@/services/children";

const supabase = createClient();

export async function initializeProgress(childId: string) {
  const child = await getChild(childId);

  const interestTag = child.interest_tag;

  const { data: lessons, error } = await supabase
    .from("lessons")
    .select("id, sort_order")
    .or(
      interestTag
        ? `interest_tag.eq.${interestTag},interest_tag.is.null`
        : `interest_tag.is.null`,
    )
    .order("sort_order", { ascending: true });

  if (error) throw error;

  if (!lessons || lessons.length === 0) return;

  const progress = lessons.map((lesson, index) => ({
    child_id: childId,
    lesson_id: lesson.id,
    status: index === 0 ? "current" : "locked",
  }));

  const { error: insertError } = await supabase
    .from("child_progress")
    .insert(progress);

  if (insertError) throw insertError;
}

export async function getProgress(childId: string) {
  const { data, error } = await supabase
    .from("child_progress")
    .select(
      `
  *,
  lessons (
    id,
    title_np,
    description_np,
    activity_type,
    sort_order,
    interest_tag
  )
`,
    )
    .eq("child_id", childId)
    .order("lessons(sort_order)");

  if (error) throw error;

  return data;
}

export async function completeLesson(childId: string, lessonId: string) {
  const { data: existing, error: checkError } = await supabase
    .from("child_progress")
    .select("status")
    .eq("child_id", childId)
    .eq("lesson_id", lessonId)
    .single();

  if (checkError) throw checkError;

  if (existing?.status === "completed") return;

  const { error } = await supabase
    .from("child_progress")
    .update({
      status: "completed",
      completed_at: new Date().toISOString(),
    })
    .eq("child_id", childId)
    .eq("lesson_id", lessonId);

  if (error) throw error;

  const { data: progress, error: progressError } = await supabase
    .from("child_progress")
    .select(
      `
      lesson_id,
      status,
      lessons (
        sort_order
      )
    `,
    )
    .eq("child_id", childId);

  if (progressError) throw progressError;

  const nextLesson = progress
    ?.filter((p) => p.status === "locked")
    .sort((a, b) => {
      const aLessons = a.lessons as unknown as { sort_order: number }[];
      const bLessons = b.lessons as unknown as { sort_order: number }[];
      const aOrder = aLessons[0]?.sort_order ?? 0;
      const bOrder = bLessons[0]?.sort_order ?? 0;
      return aOrder - bOrder;
    })[0];

  if (!nextLesson) return;

  const { error: unlockError } = await supabase
    .from("child_progress")
    .update({
      status: "current",
    })
    .eq("child_id", childId)
    .eq("lesson_id", nextLesson.lesson_id);

  if (unlockError) throw unlockError;
}

export async function resetProgress(childId: string) {
  const child = await getChild(childId);

  const interestTag = child.interest_tag;

  const { data: lessons, error } = await supabase
    .from("lessons")
    .select("id")
    .or(
      interestTag
        ? `interest_tag.eq.${interestTag},interest_tag.is.null`
        : `interest_tag.is.null`,
    )
    .order("sort_order");

  if (error) throw error;

  for (let i = 0; i < lessons.length; i++) {
    await supabase
      .from("child_progress")
      .update({
        status: i === 0 ? "current" : "locked",
        completed_at: null,
      })
      .eq("child_id", childId)
      .eq("lesson_id", lessons[i].id);
  }
}
