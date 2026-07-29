"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ProfileCard } from "@/components/home/ProfileCard";
import { ThemeToggle } from "@/components/providers/ThemeToggle";
import { LanguageSwitcher } from "@/components/providers/LanguageSwitcher";

export default function HomePage() {
  const t = useTranslations("home");

  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_oklch(0.92_0.04_250)_0%,_transparent_55%),radial-gradient(ellipse_at_bottom,_oklch(0.92_0.05_350)_0%,_transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top,_oklch(0.25_0.06_250)_0%,_transparent_55%),radial-gradient(ellipse_at_bottom,_oklch(0.22_0.06_350)_0%,_transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <header className="flex items-center justify-between px-4 py-4 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold tracking-[0.08em] uppercase text-foreground/80"
        >
          {t("brand")}
        </motion.p>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 pb-16 pt-6 sm:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-3 text-center text-4xl font-semibold tracking-tight sm:text-5xl"
        >
          {t("title")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mb-12 max-w-md text-center text-muted-foreground"
        >
          {t("subtitle")}
        </motion.p>

        <div className="flex w-full max-w-3xl flex-col items-center justify-center gap-6 sm:flex-row sm:items-stretch">
          <ProfileCard
            profile="bedo"
            name="Bedo"
            description={t("bedoDesc")}
            theme="blue"
            index={0}
          />
          <ProfileCard
            profile="julia"
            name="Julia"
            description={t("juliaDesc")}
            theme="pink"
            index={1}
          />
        </div>
      </main>
    </div>
  );
}
