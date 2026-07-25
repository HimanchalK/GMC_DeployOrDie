import { Activity } from "@/components/activity/Activity";

export default async function ActivityPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;

  return <Activity lessonId={lessonId} />;
}
