import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SequenceCardProps {
  id: string;
  imageName: string;
}

export function SequenceCard({ id, imageName }: SequenceCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="aspect-square rounded-2xl border-2 border-border bg-card p-3"
    >
      <img
        src={`/images/${imageName}`}
        alt=""
        className="w-full h-full object-contain pointer-events-none"
      />
    </div>
  );
}
