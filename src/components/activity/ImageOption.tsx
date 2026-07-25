interface ImageOptionProps {
  imageName: string;
  onSelect: () => void;
}

export function ImageOption({ imageName, onSelect }: ImageOptionProps) {
  return (
    <button
      onClick={onSelect}
      className="aspect-square rounded-2xl border-2 border-border bg-card p-3 active:scale-95 transition-transform"
    >
      <img
        src={`/images/${imageName}`}
        alt=""
        className="w-full h-full object-contain"
      />
    </button>
  );
}
