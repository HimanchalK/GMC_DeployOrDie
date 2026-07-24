"use client";

import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";

export default function Test() {
  async function check() {
    console.log(supabase);
  }

  return (
    <div>
      <Button onClick={check}>Test</Button>
    </div>
  );
}
