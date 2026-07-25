import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SequenceCardProps {
  id: string;
  imageName: string;
}

export function SequenceCard({ id, imageName }: SequenceCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 shrink-0 rounded-xl border-2 border-border bg-card p-2 shadow-sm touch-none cursor-grab active:cursor-grabbing"
    >
      <img
        src={`/images/${imageName}`}
        alt=""
        className="w-full h-full object-contain pointer-events-none select-none"
        draggable={false}
      />
    </div>
  );
}
