// components/dashboard/EmptyState.tsx
import { Card, CardContent } from "@/components/ui/card";
import { PackageOpen } from "lucide-react";

export function EmptyState() {
  return (
    <Card className="w-full rounded-2xl border-dashed border-2 border-border bg-transparent">
      <CardContent className="flex flex-col items-center text-center p-10 sm:p-14 space-y-5">
        <div className="p-4 rounded-full bg-muted">
          <PackageOpen className="h-10 w-10 text-muted-foreground" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-foreground">
            No lessons yet
          </h2>
          <p className="text-sm text-muted-foreground max-w-xs">
            New activities will appear here once they’re ready. Check back soon!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
