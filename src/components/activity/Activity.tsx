"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { useLesson } from "@/hooks/useLesson";
import { useActivityEngine } from "@/hooks/useActivity";
import { useAudio } from "@/hooks/useAudio";
import { useAchievement } from "@/hooks/useAchievement";
import { useAnalytics } from "@/hooks/useAnalytics";
import { completeLesson } from "@/services/progress";
import { LoadingScreen } from "@/components/activity/LoadingScreen";
import { FeedbackModal } from "@/components/activity/FeedbackModal";
import { CompletionScreen } from "@/components/activity/CompletionScreen";
import { ProgressBar } from "@/components/activity/ProgressBar";
import { MatchingActivity } from "@/components/activity/MatchingActivity";
import { CountingActivity } from "@/components/activity/CountingActivity";
import { SequencingActivity } from "./SequencingActivity";
import { AchievementPopup } from "@/components/achievement/AchievementPopup";
import { getAchievementById } from "@/services/achievement";
import type { Achievement } from "@/types/achievement";
import { EmotionCheck } from "@/components/emotion/EmotionCheck";
import { recordEmotion } from "@/services/emotion";
import { getChild } from "@/services/children";

interface ActivityProps {
  lessonId: string;
  skipEmotionCheck?: boolean;
}

export function Activity({
  lessonId,
  skipEmotionCheck = false,
}: ActivityProps) {
  const router = useRouter();
  const [isComplete, setIsComplete] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [unlockedAchievement, setUnlockedAchievement] =
    useState<Achievement | null>(null);
  const [emotionDone, setEmotionDone] = useState(skipEmotionCheck);

  // const childId = useMemo(() => localStorage.getItem("childId"), []);
  const [childId, setChildId] = useState<string | null>(null);
  const [interestTag, setInterestTag] = useState<string | null | undefined>(
    undefined,
  );

  useEffect(() => {
    const id = localStorage.getItem("childId");
    setChildId(id);
    if (id) {
      getChild(id)
        .then((child) => setInterestTag(child.interest_tag))
        .catch((err) => {
          console.error("Failed to load child interest", err);
          setInterestTag(null);
        });
    } else {
      setInterestTag(null);
    }
  }, []);

  const { lesson, items, loading, error } = useLesson(lessonId, interestTag);
  const audio = useAudio();
  const achievements = useAchievement(childId);
  const analytics = useAnalytics(childId);

  // Start a session once we have a child + lesson loaded.
  useEffect(() => {
    if (!childId || !lesson) return;
    void analytics.startSession({ childId, lessonId });
  }, [childId, lesson, lessonId, analytics]);

  const handleLessonComplete = async ({
    score,
    total,
  }: {
    score: number;
    total: number;
  }) => {
    if (!childId) return;
    setIsSaving(true);
    try {
      await completeLesson(childId, lessonId);
      audio.finish();
      setIsComplete(true);

      // Record session end for Phase 10 analytics (best-effort, idempotent
      // upstream because the analytics service no-ops if the table is absent).
      void analytics.endSession({ score, total });

      // Always increment "first lesson" target (idempotent upstream).
      const firstRow = await achievements.increment(childId, "first_lesson", 1);
      if (firstRow?.status === "unlocked") {
        const meta = getAchievementById("first_lesson");
        if (meta) setUnlockedAchievement(meta);
      }

      // Perfect score earns the perfect_score achievement.
      if (total > 0 && score === total) {
        const perfectRow = await achievements.increment(
          childId,
          "perfect_score",
          1,
        );
        if (perfectRow?.status === "unlocked") {
          const meta = getAchievementById("perfect_score");
          if (meta) setUnlockedAchievement(meta);
        }
      }
    } catch (err) {
      console.error("Failed to complete lesson", err);
    } finally {
      setIsSaving(false);
    }
  };

  const engine = useActivityEngine(items, handleLessonComplete);

  const handleAnswer = (isCorrect: boolean) => {
    engine.submitAnswer(isCorrect);
    // Best-effort attempt logging for analytics.
    if (childId && lesson) {
      void analytics.recordAttempt({
        child_id: childId,
        lesson_id: lessonId,
        activity_type: lesson.activity_type,
        is_correct: isCorrect,
        lesson_item_id: engine.currentItem?.id ?? null,
      });
    }
    if (isCorrect) {
      audio.success();
    } else {
      audio.retry();
    }
  };

  if (loading || !childId) return <LoadingScreen />;
  if (error || !lesson) return <p>Something went wrong loading this lesson.</p>;
  if (items.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-3">
          <h2 className="text-xl font-semibold">No activity data available</h2>

          <p className="text-muted-foreground">
            This lesson has no questions yet.
          </p>
        </div>
      </div>
    );
  }

  if (!emotionDone) {
    return (
      <EmotionCheck
        onChoose={async (emotion) => {
          await recordEmotion(childId, emotion, lessonId);
          setEmotionDone(true);
        }}
      />
    );
  }

  if (isComplete) {
    return (
      <>
        <CompletionScreen
          score={engine.score}
          total={engine.totalItems}
          onContinue={() => router.push("/dashboard")}
        />
        {unlockedAchievement && (
          <AchievementPopup
            achievement={unlockedAchievement}
            onClose={() => setUnlockedAchievement(null)}
          />
        )}
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen p-4">
      <ProgressBar current={engine.currentIndex} total={engine.totalItems} />

      {engine.currentItem && lesson.activity_type === "matching" && (
        <MatchingActivity item={engine.currentItem} onAnswer={handleAnswer} />
      )}

      {engine.currentItem && lesson.activity_type === "counting" && (
        <CountingActivity item={engine.currentItem} onAnswer={handleAnswer} />
      )}

      {engine.currentItem && lesson.activity_type === "sequencing" && (
        <SequencingActivity item={engine.currentItem} onAnswer={handleAnswer} />
      )}

      <FeedbackModal
        state={engine.feedback}
        onContinue={engine.nextQuestion}
        isSaving={isSaving}
      />

      {unlockedAchievement && (
        <AchievementPopup
          achievement={unlockedAchievement}
          onClose={() => setUnlockedAchievement(null)}
        />
      )}
    </div>
  );
}
