"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExportButtons } from "@/components/export/ExportButtons";
import { useLocalStorage, storageKey } from "@/hooks/useLocalStorage";
import { planDayIndex, todayKey } from "@/lib/helpers";
import type { DayMealProgress, NutritionPlan, ProfileId } from "@/lib/types";
import { cn } from "@/lib/utils";

export function NutritionView({
  profile,
  plan,
}: {
  profile: ProfileId;
  plan: NutritionPlan;
}) {
  const t = useTranslations("nutrition");
  const tc = useTranslations("common");
  const defaultDay = plan.days[planDayIndex()]?.day ?? plan.days[0].day;

  const [activeDay, setActiveDay] = useLocalStorage(
    storageKey(profile, "activeNutritionDay"),
    defaultDay
  );

  const day =
    plan.days.find((d) => d.day === activeDay) ?? plan.days[0];

  const [progress, setProgress] = useLocalStorage<DayMealProgress>(
    storageKey(profile, "meals", day.day),
    { meals: {}, date: todayKey() }
  );

  const completedCount = day.meals.filter((m) => progress.meals[m.id]).length;
  const mealProgress = Math.round((completedCount / day.meals.length) * 100);

  const totals = useMemo(() => {
    return day.meals.reduce(
      (acc, m) => ({
        calories: acc.calories + m.calories,
        protein: acc.protein + m.protein,
        carbs: acc.carbs + m.carbs,
        fat: acc.fat + m.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [day]);

  const toggleMeal = (id: string, checked: boolean) => {
    setProgress((prev) => ({
      date: todayKey(),
      meals: { ...prev.meals, [id]: checked },
    }));
  };

  return (
    <div className="space-y-6" id="nutrition-print-area">
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <ExportButtons
          printLabel={t("printNutrition")}
          targetId="nutrition-print-area"
          filename={`${profile}-nutrition-${day.day}`}
        />
      </div>

      <div className="rounded-2xl border border-border/60 bg-card/60 p-4 shadow-sm">
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {t("goals")} · {t("phase")}: {plan.phase}
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            {
              label: tc("calories"),
              value: String(plan.goals.calories),
            },
            { label: tc("protein"), value: `${plan.goals.protein}g` },
            { label: tc("carbs"), value: `${plan.goals.carbs}g` },
            { label: tc("fat"), value: `${plan.goals.fat}g` },
          ].map((g) => (
            <div key={g.label}>
              <p className="text-lg font-semibold tabular-nums">{g.value}</p>
              <p className="text-xs text-muted-foreground">{g.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          {t("waterGoal")}: {plan.goals.water}
          {plan.goals.training ? ` · ${t("training")}: ${plan.goals.training}` : ""}
        </p>
      </div>

      <Tabs
        value={day.day}
        onValueChange={(v) => {
          if (v != null) setActiveDay(String(v));
        }}
        className="print:hidden"
      >
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 bg-muted/50 p-1">
          {plan.days.map((d) => (
            <TabsTrigger
              key={d.day}
              value={d.day}
              className="flex-none px-2.5 py-1.5 text-xs sm:text-sm"
            >
              {t(`weekdays.${d.day}` as "weekdays.Saturday")}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium">{t("mealsProgress")}</span>
          <span className="tabular-nums text-muted-foreground">
            {completedCount}/{day.meals.length} · {mealProgress}%
          </span>
        </div>
        <Progress value={mealProgress} className="h-2" />
        <p className="text-xs text-muted-foreground">
          {t("dayTotals", {
            calories: totals.calories,
            protein: totals.protein,
            carbs: totals.carbs,
            fat: totals.fat,
          })}
        </p>
      </div>

      <ol className="relative space-y-4 border-s border-border/70 ms-3 ps-6">
        {day.meals.map((meal, idx) => {
          const done = !!progress.meals[meal.id];
          return (
            <li key={meal.id} className="relative">
              <span
                className={cn(
                  "absolute -start-[1.9rem] top-4 flex size-5 items-center justify-center rounded-full border text-[10px]",
                  done
                    ? "border-[var(--profile-accent)] bg-[var(--profile-accent)] text-white"
                    : "border-border bg-background text-muted-foreground"
                )}
              >
                {done ? <Check className="size-3" /> : idx + 1}
              </span>

              <article
                className={cn(
                  "rounded-2xl border border-border/60 bg-card/50 p-4 shadow-sm transition-colors",
                  done &&
                    "border-[var(--profile-accent)]/40 bg-[var(--profile-accent)]/5"
                )}
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold tracking-tight">
                      {t(`meals.${meal.id}` as "meals.breakfast")}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {meal.ingredients}
                    </p>
                  </div>
                  <Checkbox
                    checked={done}
                    onCheckedChange={(c) => toggleMeal(meal.id, c === true)}
                    aria-label={t(`meals.${meal.id}` as "meals.breakfast")}
                    className="print:hidden"
                  />
                </div>

                {meal.grams && (
                  <p className="mb-2 text-xs text-muted-foreground">
                    {tc("grams")}: {meal.grams}
                  </p>
                )}

                <div className="mb-3 flex flex-wrap gap-1.5">
                  <Badge variant="secondary">
                    {meal.calories} {tc("calories")}
                  </Badge>
                  <Badge variant="outline">
                    {tc("protein")} {meal.protein}g
                  </Badge>
                  <Badge variant="outline">
                    {tc("carbs")} {meal.carbs}g
                  </Badge>
                  <Badge variant="outline">
                    {tc("fat")} {meal.fat}g
                  </Badge>
                </div>

                {meal.alternatives?.length > 0 && (
                  <div>
                    <p className="mb-1 text-xs font-medium text-muted-foreground">
                      {tc("alternatives")}
                    </p>
                    <ul className="space-y-0.5 text-sm text-muted-foreground">
                      {meal.alternatives.map((alt) => (
                        <li key={alt}>· {alt}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            </li>
          );
        })}
      </ol>

      {plan.notes && plan.notes.length > 0 && (
        <div className="rounded-2xl border border-border/60 bg-muted/30 p-4">
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            {plan.notes.map((n) => (
              <li key={n}>· {n}</li>
            ))}
          </ul>
        </div>
      )}

      <section className="space-y-3">
        <h3 className="font-semibold">{t("substitutions")}</h3>
        {Object.entries(plan.substitutions).map(([key, items]) => {
          if (!items || items.length === 0) return null;
          return (
            <div key={key} className="rounded-xl border border-border/50 p-3">
              <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground">
                {t(`subGroups.${key}` as "subGroups.protein")}
              </p>
              <ul className="space-y-1.5 text-sm">
                {items.map((item, i) => (
                  <li key={`${item.source}-${i}`}>
                    <span className="font-medium">{item.source}</span>
                    {item.amount ? ` — ${item.amount}` : ""}
                    {item.alternatives && item.alternatives.length > 0
                      ? ` → ${item.alternatives.join(" / ")}`
                      : ""}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>
    </div>
  );
}
