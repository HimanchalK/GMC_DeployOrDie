interface CountDisplayProps {
  count: number;
  target: number;
}

export function CountDisplay({ count, target }: CountDisplayProps) {
  return (
    <p className="text-3xl font-bold">
      {count} / {target}
    </p>
  );
}
