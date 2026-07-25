import { LessonItem } from "@/types/activity";
import { ImageOption } from "@/components/activity/ImageOption";

interface MatchingActivityProps {
  item: LessonItem;
  onAnswer: (isCorrect: boolean) => void;
}

export function MatchingActivity({ item, onAnswer }: MatchingActivityProps) {
  return (
    <div className="flex flex-col items-center gap-8 flex-1 justify-center">
      <p className="text-2xl text-center">{item.prompt_np}</p>

      <img
        src={`/images/${item.image_name}`}
        alt=""
        className="w-40 h-40 object-contain"
      />

      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
        {item.options.map((option) => (
          <ImageOption
            key={option}
            imageName={option}
            onSelect={() => onAnswer(option === item.correct_answer)}
          />
        ))}
      </div>
    </div>
  );
}
