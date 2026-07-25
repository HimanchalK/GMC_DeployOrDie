import { useEffect, useMemo, useState } from "react";
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

  useEffect(() => {
    setOrder(shuffle(item.options));
  }, [item.id]);

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
    <div className="flex flex-col items-center gap-6 flex-1 justify-center px-4">
      <p className="text-xl sm:text-2xl text-center font-medium">
        {item.prompt_np}
      </p>

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <SortableContext items={order} strategy={horizontalListSortingStrategy}>
          <div className="flex gap-2 sm:gap-3 flex-wrap justify-center max-w-md sm:max-w-lg mx-auto">
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
        className="w-full max-w-xs py-3 rounded-2xl bg-primary text-primary-foreground text-base font-medium active:scale-95 transition-transform"
      >
        जाँच गर्नुहोस्
      </button>
    </div>
  );
}
