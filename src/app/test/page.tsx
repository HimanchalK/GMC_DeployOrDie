"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

export default function TestPage() {
  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("lessons")
        .select("*")
        .order("sort_order");

      console.log(data);
      console.log(error);
    }

    load();
  }, []);

  return <div>Check console</div>;
}
