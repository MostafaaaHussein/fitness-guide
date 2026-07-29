"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocalStorage, storageKey } from "@/hooks/useLocalStorage";
import { todayKey } from "@/lib/helpers";
import type { ProfileId, WaterProgress } from "@/lib/types";
import { WATER_GOAL_ML } from "@/lib/types";

export function WaterView({ profile }: { profile: ProfileId }) {
  const t = useTranslations("water");
  const tc = useTranslations("common");
  const goal = WATER_GOAL_ML[profile];
  const date = todayKey();

  const [data, setData] = useLocalStorage<WaterProgress>(
    storageKey(profile, "water", date),
    { ml: 0, date }
  );

  const ml = data.date === date ? data.ml : 0;
  const pct = Math.min(100, Math.round((ml / goal) * 100));
  const liters = (ml / 1000).toFixed(2);
  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  const add = (amount: number) => {
    setData({ ml: Math.max(0, ml + amount), date });
  };

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-8 py-4">
      <p className="text-center text-sm text-muted-foreground">
        {t("keepHydrated")}
      </p>

      <div className="relative">
        <svg width="220" height="220" className="-rotate-90">
          <circle
            cx="110"
            cy="110"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            className="text-muted/60"
          />
          <motion.circle
            cx="110"
            cy="110"
            r={radius}
            fill="none"
            stroke="var(--profile-accent)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: offset }}
            initial={false}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Droplets
            className="mb-1 size-6"
            style={{ color: "var(--profile-accent)" }}
          />
          <p className="text-3xl font-semibold tabular-nums tracking-tight">
            {liters}
            <span className="ms-1 text-base font-normal text-muted-foreground">
              {t("liters")}
            </span>
          </p>
          <p className="text-xs text-muted-foreground">{pct}%</p>
        </div>
      </div>

      <div className="grid w-full grid-cols-2 gap-3 text-center text-sm">
        <div className="rounded-xl border border-border/60 bg-card/50 p-3">
          <p className="text-muted-foreground">{t("current")}</p>
          <p className="font-semibold tabular-nums">{ml} ml</p>
        </div>
        <div className="rounded-xl border border-border/60 bg-card/50 p-3">
          <p className="text-muted-foreground">{t("goal")}</p>
          <p className="font-semibold tabular-nums">
            {(goal / 1000).toFixed(1)} {t("liters")}
          </p>
        </div>
      </div>

      <div className="flex w-full flex-wrap justify-center gap-2">
        <Button size="lg" onClick={() => add(250)} className="flex-1 min-w-28">
          {t("add250")}
        </Button>
        <Button
          size="lg"
          variant="secondary"
          onClick={() => add(500)}
          className="flex-1 min-w-28"
        >
          {t("add500")}
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => setData({ ml: 0, date })}
          className="flex-1 min-w-28"
        >
          {tc("reset")}
        </Button>
      </div>
    </div>
  );
}
