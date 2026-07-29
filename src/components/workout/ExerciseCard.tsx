"use client";

import { ExternalLink } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import type { ExerciseProgress, WorkoutExercise } from "@/lib/types";
import { muscleWikiUrl } from "@/lib/helpers";
import type { Locale } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ExerciseCardProps {
  exercise: WorkoutExercise;
  progress: ExerciseProgress;
  onChange: (next: ExerciseProgress) => void;
}

export function ExerciseCard({ exercise, progress, onChange }: ExerciseCardProps) {
  const t = useTranslations("workout");
  const tc = useTranslations("common");
  const locale = useLocale() as Locale;
  const selected = progress.selectedOptionIndex;
  const option = exercise.options[selected] ?? exercise.options[0];
  const allDone = progress.sets.every((s) => s.completed);

  const updateSet = (
    index: number,
    patch: Partial<{ weight: string; reps: string; completed: boolean }>
  ) => {
    const sets = progress.sets.map((s, i) =>
      i === index ? { ...s, ...patch } : s
    );
    onChange({ ...progress, sets });
  };

  return (
    <article
      className={cn(
        "rounded-2xl border border-border/60 bg-card/50 p-4 shadow-sm transition-colors",
        allDone && "border-[var(--profile-accent)]/40 bg-[var(--profile-accent)]/5"
      )}
    >
      <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {exercise.muscle}
            {exercise.region ? ` · ${exercise.region}` : ""}
          </p>
          <a
            href={muscleWikiUrl(option.slug, locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-1.5 text-base font-semibold tracking-tight text-foreground underline-offset-4 hover:underline"
          >
            {option.name}
            <ExternalLink className="size-3.5 shrink-0 opacity-50" />
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="tabular-nums">
            {exercise.sets} × {exercise.reps}
          </Badge>
          {allDone && (
            <Badge className="bg-[var(--profile-accent)] text-white hover:bg-[var(--profile-accent)]">
              {t("exerciseCompleted")}
            </Badge>
          )}
        </div>
      </div>

      {exercise.options.length > 1 && (
        <div className="mt-3">
          <Label className="mb-1.5 text-xs text-muted-foreground">
            {t("chooseExercise")}
          </Label>
          <select
            className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm"
            value={selected}
            onChange={(e) =>
              onChange({
                ...progress,
                selectedOptionIndex: Number(e.target.value),
              })
            }
          >
            {exercise.options.map((opt, i) => (
              <option key={opt.slug} value={i}>
                {opt.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mt-4 space-y-3">
        {progress.sets.map((set, i) => (
          <div
            key={i}
            className="grid grid-cols-[auto_1fr_1fr_auto] items-end gap-2 sm:gap-3"
          >
            <span className="pb-2 text-xs font-medium text-muted-foreground">
              {t("set")} {i + 1}
            </span>
            <div>
              <Label className="mb-1 text-[10px] text-muted-foreground">
                {tc("weight")}
              </Label>
              <Input
                type="number"
                inputMode="decimal"
                min={0}
                step={0.5}
                value={set.weight}
                onChange={(e) => updateSet(i, { weight: e.target.value })}
                className="h-9"
              />
            </div>
            <div>
              <Label className="mb-1 text-[10px] text-muted-foreground">
                {tc("reps")}
              </Label>
              <Input
                type="number"
                inputMode="numeric"
                min={0}
                value={set.reps}
                onChange={(e) => updateSet(i, { reps: e.target.value })}
                className="h-9"
              />
            </div>
            <div className="flex h-9 items-center pb-0.5">
              <Checkbox
                checked={set.completed}
                onCheckedChange={(checked) =>
                  updateSet(i, { completed: checked === true })
                }
                aria-label={`${t("set")} ${i + 1}`}
              />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
