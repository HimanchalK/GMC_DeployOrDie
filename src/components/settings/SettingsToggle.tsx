// components/settings/SettingsToggle.tsx
// Responsibility: accessible, large tap-target toggle row used by the
// accessibility settings panel. Uses a native checkbox for semantics and
// shows bilingual labels (English + Nepali) for clarity.

import { cn } from "@/lib/utils";

interface SettingsToggleProps {
  /** Primary English label shown bold. */
  label: string;
  /** Optional Nepali label shown under the English one. */
  labelNp?: string;
  /** English description (muted). */
  description?: string;
  /** Optional Nepali description shown under the English one. */
  descriptionNp?: string;
  checked: boolean;
  onChange: (next: boolean) => void;
  className?: string;
}

export function SettingsToggle({
  label,
  labelNp,
  description,
  descriptionNp,
  checked,
  onChange,
  className,
}: SettingsToggleProps) {
  return (
    <label
      className={cn(
        "flex items-center justify-between gap-4 rounded-2xl bg-card px-5 py-4 ring-1 ring-border",
        "transition-all hover:bg-muted/40 focus-within:bg-muted/40",
        className,
      )}
    >
      <span className="space-y-0.5">
        <span className="block text-sm font-medium text-foreground">
          {label}
          {labelNp ? <span className="ml-2 text-foreground/80">· {labelNp}</span> : null}
        </span>
        {description ? (
          <span className="block text-sm text-muted-foreground">
            {description}
            {descriptionNp ? <span className="ml-2">· {descriptionNp}</span> : null}
          </span>
        ) : null}
      </span>
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="size-6 accent-primary"
        aria-label={label}
      />
    </label>
  );
}
