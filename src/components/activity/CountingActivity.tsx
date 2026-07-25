import { useState } from "react";
import { LessonItem } from "@/types/activity";
import { CountDisplay } from "@/components/activity/CountDisplay";

interface CountingActivityProps {
  item: LessonItem;
  onAnswer: (isCorrect: boolean) => void;
}

export function CountingActivity({ item, onAnswer }: CountingActivityProps) {
  const [count, setCount] = useState(0);
  const target = Number(item.correct_answer);

  const handleTap = () => {
    if (count >= target) return; // no over-counting once reached

    const next = count + 1;
    setCount(next);

    if (next === target) {
      onAnswer(true);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 flex-1 justify-center">
      <p className="text-2xl text-center">{item.prompt_np}</p>

      <CountDisplay count={count} target={target} />

      <button
        onClick={handleTap}
        className="active:scale-95 transition-transform"
      >
        <img
          src={`/images/${item.image_name}`}
          alt=""
          className="w-40 h-40 object-contain"
        />
      </button>
    </div>
  );
}
