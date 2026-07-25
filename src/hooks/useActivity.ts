// useActivity.ts
import { useState } from "react";
import { LessonItem, FeedbackState } from "@/types/activity";

export function useActivityEngine(
  items: LessonItem[],
  onComplete: (result: { score: number; total: number }) => void,
) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackState>("idle");

  const currentItem = items[currentIndex];
  const totalItems = items.length;
  const isLastItem = currentIndex === totalItems - 1;

  function submitAnswer(isCorrect: boolean) {
    if (isCorrect) {
      setScore((s) => s + 1);
      setFeedback("correct");
    } else {
      // No penalties — just prompt a retry, score untouched
      setFeedback("retry");
    }
  }

  function nextQuestion() {
    if (feedback === "retry") {
      // let them try the same question again
      setFeedback("idle");
      return;
    }

    setFeedback("idle");
    if (isLastItem) {
      onComplete({ score, total: totalItems });
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }

  return {
    currentItem,
    currentIndex,
    totalItems,
    score,
    feedback,
    submitAnswer,
    nextQuestion,
  };
}
