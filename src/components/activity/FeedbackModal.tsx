import { FeedbackState } from "@/types/activity";

interface FeedbackModalProps {
  state: FeedbackState;
  onContinue: () => void;
  isSaving?: boolean;
}

export function FeedbackModal({
  state,
  onContinue,
  isSaving,
}: FeedbackModalProps) {
  if (state === "idle") return null;

  const isCorrect = state === "correct";

  return (
    <div className="fixed inset-0 flex items-end sm:items-center justify-center bg-black/20">
      <div className="bg-card rounded-t-3xl sm:rounded-3xl p-6 w-full sm:max-w-sm flex flex-col items-center gap-4">
        <p className="text-3xl">{isCorrect ? "🎉" : "🙂"}</p>
        <p className="text-xl text-center">
          {isCorrect ? "एकदम राम्रो!" : "फेरि प्रयास गरौं"}
        </p>
        <button
          onClick={onContinue}
          disabled={isSaving}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground text-lg"
        >
          {isSaving ? "..." : isCorrect ? "अर्को" : "फेरि प्रयास"}
        </button>
      </div>
    </div>
  );
}
