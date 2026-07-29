"use client";

import type { ReactNode } from "react";
import type { ProfileId } from "@/lib/types";
import { BottomNav, Sidebar } from "@/components/layout/Nav";
import { ThemeToggle } from "@/components/providers/ThemeToggle";
import { LanguageSwitcher } from "@/components/providers/LanguageSwitcher";
import { cn } from "@/lib/utils";

export function ProfileShell({
  profile,
  title,
  children,
  actions,
}: {
  profile: ProfileId;
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex min-h-dvh",
        profile === "bedo" ? "profile-bedo" : "profile-julia"
      )}
    >
      <Sidebar profile={profile} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border/60 bg-background/80 px-4 py-3 backdrop-blur-xl sm:px-6">
          <h1 className="truncate text-lg font-semibold tracking-tight sm:text-xl">
            {title}
          </h1>
          <div className="flex shrink-0 items-center gap-2">
            {actions}
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </header>
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 pb-28 sm:px-6 lg:pb-10">
          {children}
        </main>
      </div>
      <BottomNav profile={profile} />
    </div>
  );
}
