import { createClient } from "@/lib/supabase/client";
import { InterestTag } from "@/types";

const supabase = createClient();
interface CreateChildData {
  name: string;
  interest_tag: InterestTag;
}

export async function createChild(data: CreateChildData) {
  const { data: child, error } = await supabase
    .from("children")
    .insert({
      name: data.name,
      interest_tag: data.interest_tag,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return child;
}

export async function getChild(id: string) {
  const { data, error } = await supabase
    .from("children")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

export async function updateChild(
  id: string,
  values: Partial<CreateChildData>,
) {
  const { data, error } = await supabase
    .from("children")
    .update(values)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteChild(id: string) {
  const { error } = await supabase.from("children").delete().eq("id", id);

  if (error) throw error;
}
