"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Timer, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function playBeep() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    gain.gain.value = 0.15;
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    osc.stop(ctx.currentTime + 0.6);
  } catch {
    // ignore audio errors
  }
}

export function RestTimer() {
  const t = useTranslations("workout");
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const endRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running || seconds <= 0) return;
    const id = window.setInterval(() => {
      if (endRef.current == null) return;
      const left = Math.max(0, Math.ceil((endRef.current - Date.now()) / 1000));
      setSeconds(left);
      if (left === 0) {
        setRunning(false);
        endRef.current = null;
        playBeep();
      }
    }, 200);
    return () => clearInterval(id);
  }, [running, seconds]);

  const start = useCallback((duration: number) => {
    endRef.current = Date.now() + duration * 1000;
    setSeconds(duration);
    setRunning(true);
  }, []);

  const cancel = () => {
    setRunning(false);
    setSeconds(0);
    endRef.current = null;
  };

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="rounded-2xl border border-border/60 bg-card/60 p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2 text-sm font-medium">
        <Timer className="size-4 text-[var(--profile-accent)]" />
        {t("restTimer")}
      </div>

      <div
        className={cn(
          "mb-4 text-center font-mono text-4xl font-semibold tracking-wider tabular-nums transition-colors",
          running && "text-[var(--profile-accent)]"
        )}
      >
        {mm}:{ss}
      </div>

      <p className="mb-4 text-center text-sm text-muted-foreground">
        {t("restTip")}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {[180, 240, 300].map((d) => (
          <Button
            key={d}
            variant={running && seconds > 0 ? "outline" : "secondary"}
            size="sm"
            onClick={() => start(d)}
          >
            {Math.floor(d / 60)}m
          </Button>
        ))}
        {running && (
          <Button variant="ghost" size="sm" onClick={cancel}>
            <X className="size-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
}
