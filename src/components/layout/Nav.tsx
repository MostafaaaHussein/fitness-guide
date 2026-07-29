"use client";

import {
  Apple,
  Droplets,
  Dumbbell,
  Home,
  StickyNote,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import type { ProfileId } from "@/lib/types";
import { cn } from "@/lib/utils";

const links = [
  { href: "nutrition", icon: Apple, key: "nutrition" as const },
  { href: "workout", icon: Dumbbell, key: "workout" as const },
  { href: "water", icon: Droplets, key: "water" as const },
  { href: "notes", icon: StickyNote, key: "notes" as const },
];

export function Sidebar({ profile }: { profile: ProfileId }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const accent =
    profile === "bedo"
      ? "bg-sky-500/15 text-sky-700 dark:text-sky-300"
      : "bg-rose-500/15 text-rose-700 dark:text-rose-300";
  const activeBar =
    profile === "bedo" ? "bg-sky-500" : "bg-rose-500";

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-e border-border/60 bg-sidebar/80 px-4 py-6 backdrop-blur-md lg:flex">
      <Link
        href="/"
        className="mb-8 flex items-center gap-2 px-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <Home className="size-4" />
        {t("home")}
      </Link>

      <p
        className={cn(
          "mb-4 rounded-xl px-3 py-2 text-sm font-semibold capitalize",
          accent
        )}
      >
        {profile}
      </p>

      <nav className="flex flex-1 flex-col gap-1">
        {links.map(({ href, icon: Icon, key }) => {
          const full = `/${profile}/${href}`;
          const active = pathname.includes(`/${profile}/${href}`);
          return (
            <Link
              key={href}
              href={full}
              className={cn(
                "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              )}
            >
              {active && (
                <span
                  className={cn(
                    "absolute start-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-e-full",
                    activeBar
                  )}
                />
              )}
              <Icon className="size-4" />
              {t(key)}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export function BottomNav({ profile }: { profile: ProfileId }) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/90 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden">
      <div className="mx-auto flex max-w-lg items-stretch justify-around py-2">
        {links.map(({ href, icon: Icon, key }) => {
          const full = `/${profile}/${href}`;
          const active = pathname.includes(`/${profile}/${href}`);
          return (
            <Link
              key={href}
              href={full}
              className={cn(
                "flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl px-1 py-1.5 text-[11px] font-medium transition-colors",
                active
                  ? profile === "bedo"
                    ? "text-sky-600 dark:text-sky-400"
                    : "text-rose-600 dark:text-rose-400"
                  : "text-muted-foreground"
              )}
            >
              <Icon className="size-5" />
              <span className="truncate">{t(key)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
