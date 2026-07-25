import { useMemo, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { LessonItem } from "@/types/activity";
import { SequenceCard } from "@/components/activity/SequenceCard";

interface SequencingActivityProps {
  item: LessonItem;
  onAnswer: (isCorrect: boolean) => void;
}

function shuffle(arr: string[]) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function SequencingActivity({
  item,
  onAnswer,
}: SequencingActivityProps) {
  const correctOrder = item.options;
  const [order, setOrder] = useState(() => shuffle(correctOrder));
  const sensors = useSensors(useSensor(PointerSensor));

  const isCorrect = useMemo(
    () => order.every((img, i) => img === correctOrder[i]),
    [order, correctOrder],
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setOrder((current) => {
      const oldIndex = current.indexOf(active.id as string);
      const newIndex = current.indexOf(over.id as string);
      return arrayMove(current, oldIndex, newIndex);
    });
  }

  function handleCheck() {
    onAnswer(isCorrect);
  }

  return (
    <div className="flex flex-col items-center gap-8 flex-1 justify-center">
      <p className="text-2xl text-center">{item.prompt_np}</p>

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <SortableContext items={order} strategy={horizontalListSortingStrategy}>
          <div className="flex gap-3 flex-wrap justify-center">
            {order.map((imageName) => (
              <SequenceCard
                key={imageName}
                id={imageName}
                imageName={imageName}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <button
        onClick={handleCheck}
        className="w-full max-w-sm py-4 rounded-2xl bg-primary text-primary-foreground text-lg"
      >
        जाँच गर्नुहोस्
      </button>
    </div>
  );
}
