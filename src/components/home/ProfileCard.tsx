"use client";

import { motion } from "framer-motion";
import { Mars, Venus, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import type { ProfileId } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProfileCardProps {
  profile: ProfileId;
  name: string;
  description: string;
  theme: "blue" | "pink";
  index: number;
}

export function ProfileCard({
  profile,
  name,
  description,
  theme,
  index,
}: ProfileCardProps) {
  const t = useTranslations("home");
  const isBlue = theme === "blue";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.15 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="w-full max-w-sm"
    >
      <Link
        href={`/${profile}/nutrition`}
        className={cn(
          "group relative block overflow-hidden rounded-3xl border p-8 backdrop-blur-xl transition-shadow duration-300",
          "shadow-[0_8px_40px_-12px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)]",
          isBlue
            ? "border-sky-400/30 bg-gradient-to-br from-sky-500/15 via-background/80 to-blue-600/10"
            : "border-rose-400/30 bg-gradient-to-br from-rose-500/15 via-background/80 to-pink-600/10"
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute -end-10 -top-10 size-40 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-80",
            isBlue ? "bg-sky-400/30 opacity-50" : "bg-rose-400/30 opacity-50"
          )}
        />

        <div
          className={cn(
            "mb-6 flex size-14 items-center justify-center rounded-2xl",
            isBlue
              ? "bg-sky-500/15 text-sky-600 dark:text-sky-400"
              : "bg-rose-500/15 text-rose-600 dark:text-rose-400"
          )}
        >
          {isBlue ? <Mars className="size-7" /> : <Venus className="size-7" />}
        </div>

        <h2 className="mb-2 text-3xl font-semibold tracking-tight">{name}</h2>
        <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        <span
          className={cn(
            "inline-flex items-center gap-2 text-sm font-medium transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1",
            isBlue
              ? "text-sky-600 dark:text-sky-400"
              : "text-rose-600 dark:text-rose-400"
          )}
        >
          {t("enter")}
          <ArrowRight className="size-4 rtl:rotate-180" />
        </span>
      </Link>
    </motion.div>
  );
}
