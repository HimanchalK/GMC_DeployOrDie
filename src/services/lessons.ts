import { supabase } from "@/lib/supabase/client";

export async function getLessons(interest: string) {
  return supabase
    .from("lessons")
    .select("*")
    .or(`interest_tag.eq.${interest},interest_tag.is.null`)
    .order("sort_order");
}
