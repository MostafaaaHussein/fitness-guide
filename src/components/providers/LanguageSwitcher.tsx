"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

const LOCALES = [
  { code: "ar", label: "ع" },
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
] as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-0.5 rounded-lg border border-border/60 bg-muted/40 p-0.5">
      {LOCALES.map((l) => (
        <Button
          key={l.code}
          variant={locale === l.code ? "secondary" : "ghost"}
          size="xs"
          className="min-w-8"
          onClick={() => router.replace(pathname, { locale: l.code })}
        >
          {l.label}
        </Button>
      ))}
    </div>
  );
}
