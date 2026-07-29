"use client";

import { useTranslations } from "next-intl";
import { Progress } from "@/components/ui/progress";

interface WorkoutSummaryProps {
  exercisesCompleted: number;
  exercisesTotal: number;
  setsCompleted: number;
  setsTotal: number;
  totalReps: number;
  progress: number;
}

export function WorkoutSummary({
  exercisesCompleted,
  exercisesTotal,
  setsCompleted,
  setsTotal,
  totalReps,
  progress,
}: WorkoutSummaryProps) {
  const t = useTranslations("workout");

  const stats = [
    {
      label: t("exercisesCompleted"),
      value: `${exercisesCompleted}/${exercisesTotal}`,
    },
    {
      label: t("setsCompleted"),
      value: `${setsCompleted}/${setsTotal}`,
    },
    {
      label: t("totalReps"),
      value: String(totalReps),
    },
  ];

  return (
    <div className="rounded-2xl border border-border/60 bg-card/60 p-4 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold">{t("summary")}</h3>
      <div className="mb-4 grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-xl font-semibold tabular-nums tracking-tight">
              {s.value}
            </p>
            <p className="mt-1 text-[11px] leading-tight text-muted-foreground">
              {s.label}
            </p>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{t("workoutProgress")}</span>
          <span className="font-medium tabular-nums text-foreground">
            {progress}%
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  );
}
