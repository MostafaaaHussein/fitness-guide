"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExerciseCard } from "@/components/workout/ExerciseCard";
import { RestTimer } from "@/components/workout/RestTimer";
import { WorkoutSummary } from "@/components/workout/WorkoutSummary";
import { ExportButtons } from "@/components/export/ExportButtons";
import { useLocalStorage, storageKey } from "@/hooks/useLocalStorage";
import { todayKey } from "@/lib/helpers";
import type {
  AccessoriesPlan,
  DayWorkoutProgress,
  ExerciseProgress,
  ProfileId,
  WorkoutPlan,
} from "@/lib/types";
import { suggestedWorkoutDay } from "@/lib/helpers";

function emptySets(count: number) {
  return Array.from({ length: count }, () => ({
    weight: "",
    reps: "",
    completed: false,
  }));
}

function ensureExercise(
  exerciseId: string,
  sets: number,
  existing?: ExerciseProgress
): ExerciseProgress {
  if (existing && existing.sets.length === sets) return existing;
  return {
    selectedOptionIndex: existing?.selectedOptionIndex ?? 0,
    sets: emptySets(sets),
  };
}

export function WorkoutView({
  profile,
  plan,
  accessories,
}: {
  profile: ProfileId;
  plan: WorkoutPlan;
  accessories: AccessoriesPlan;
}) {
  const t = useTranslations("workout");
  const defaultDay = String(suggestedWorkoutDay());
  const [activeDay, setActiveDay] = useLocalStorage(
    storageKey(profile, "activeWorkoutDay"),
    defaultDay
  );

  const dayNum = Number(activeDay) || 1;
  const day = plan.days.find((d) => d.day === dayNum) ?? plan.days[0];

  const progressKey = storageKey(profile, "workout", dayNum);
  const [raw, setRaw, hydrated] = useLocalStorage<DayWorkoutProgress>(
    progressKey,
    {
      exercises: {},
      cardioCompleted: false,
      date: todayKey(),
    }
  );

  const progress = useMemo(() => {
    if (!hydrated) return raw;
    // Reset cardio/progress date tracking — keep weights across days but
    // optionally roll daily; we keep history per day number permanently.
    return raw;
  }, [hydrated, raw]);

  const getExerciseProgress = (id: string, sets: number) =>
    ensureExercise(id, sets, progress.exercises[id]);

  const updateExercise = (id: string, next: ExerciseProgress) => {
    setRaw((prev) => ({
      ...prev,
      date: todayKey(),
      exercises: { ...prev.exercises, [id]: next },
    }));
  };

  const stats = useMemo(() => {
    const exercises = day.exercises;
    let exercisesCompleted = 0;
    let setsCompleted = 0;
    let setsTotal = 0;
    let totalReps = 0;

    for (const ex of exercises) {
      const p = getExerciseProgress(ex.id, ex.sets);
      setsTotal += ex.sets;
      const done = p.sets.filter((s) => s.completed);
      setsCompleted += done.length;
      if (done.length === ex.sets && ex.sets > 0) exercisesCompleted += 1;
      for (const s of done) {
        totalReps += Number(s.reps) || 0;
      }
    }

    const progressPct =
      setsTotal === 0 ? 0 : Math.round((setsCompleted / setsTotal) * 100);

    return {
      exercisesCompleted,
      exercisesTotal: exercises.length,
      setsCompleted,
      setsTotal,
      totalReps,
      progress: progressPct,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day, progress]);

  return (
    <div className="space-y-6" id="workout-print-area">
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <ExportButtons
          printLabel={t("printWorkout")}
          targetId="workout-print-area"
          filename={`${profile}-workout-day-${dayNum}`}
        />
      </div>

      <Tabs
        value={String(dayNum)}
        onValueChange={(v) => {
          if (v != null) setActiveDay(String(v));
        }}
        className="print:hidden"
      >
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 bg-muted/50 p-1">
          {plan.days.map((d) => (
            <TabsTrigger
              key={d.day}
              value={String(d.day)}
              className="flex-none px-3 py-1.5 text-xs sm:text-sm"
            >
              {d.day}. {t(`focuses.${d.focus}` as "focuses.Push")}
            </TabsTrigger>
          ))}
        </TabsList>

        {plan.days.map((d) => (
          <TabsContent key={d.day} value={String(d.day)} className="mt-0" />
        ))}
      </Tabs>

      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("dayHeading", {
            day: day.day,
            focus: t(`focuses.${day.focus}` as "focuses.Push"),
          })}
        </h2>
      </div>

      {day.exercises.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/80 bg-muted/30 p-10 text-center text-muted-foreground">
          {t("restDayMessage")}
        </div>
      ) : (
        <>
          <div className="grid gap-4 print:hidden sm:grid-cols-2">
            <WorkoutSummary {...stats} />
            <RestTimer />
          </div>

          <div className="space-y-4">
            {day.exercises.map((ex) => (
              <ExerciseCard
                key={ex.id}
                exercise={ex}
                progress={getExerciseProgress(ex.id, ex.sets)}
                onChange={(next) => updateExercise(ex.id, next)}
              />
            ))}
          </div>

          <div className="rounded-2xl border border-border/60 bg-card/50 p-4 print:hidden">
            <div className="flex items-center gap-3">
              <Checkbox
                id="cardio"
                checked={progress.cardioCompleted}
                onCheckedChange={(checked) =>
                  setRaw((prev) => ({
                    ...prev,
                    cardioCompleted: checked === true,
                    date: todayKey(),
                  }))
                }
              />
              <div>
                <Label htmlFor="cardio" className="font-medium">
                  {t("cardio")}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {t("cardioLabel")}
                </p>
              </div>
            </div>
          </div>

          <section className="space-y-3 print:hidden">
            <div>
              <h3 className="font-semibold">{t("accessories")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("accessoriesHint")}
              </p>
            </div>
            <div className="space-y-3">
              {accessories.exercises.map((ex) => (
                <ExerciseCard
                  key={ex.id}
                  exercise={{
                    id: `acc-${ex.id}`,
                    muscle: ex.muscle,
                    options: ex.options,
                    sets: ex.sets,
                    reps: ex.reps,
                    notes: ex.placement,
                  }}
                  progress={getExerciseProgress(`acc-${ex.id}`, ex.sets)}
                  onChange={(next) => updateExercise(`acc-${ex.id}`, next)}
                />
              ))}
            </div>
          </section>

          <div className="print:hidden">
            <Button
              variant="outline"
              onClick={() =>
                setRaw({
                  exercises: {},
                  cardioCompleted: false,
                  date: todayKey(),
                })
              }
            >
              {t("resetDay")}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
