// ProgressBar.tsx
interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = total > 0 ? ((current + 1) / total) * 100 : 0;

  return (
    <div className="w-full h-3 rounded-full bg-muted mb-6">
      <div
        className="h-full rounded-full bg-primary transition-all"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
