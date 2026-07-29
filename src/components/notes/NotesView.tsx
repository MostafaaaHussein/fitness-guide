"use client";

import { useTranslations } from "next-intl";
import { Textarea } from "@/components/ui/textarea";
import { useLocalStorage, storageKey } from "@/hooks/useLocalStorage";
import type { ProfileId } from "@/lib/types";

export function NotesView({
  profile,
  defaultNotes,
}: {
  profile: ProfileId;
  defaultNotes: string;
}) {
  const t = useTranslations("notes");
  const [notes, setNotes, hydrated] = useLocalStorage(
    storageKey(profile, "notes"),
    defaultNotes
  );

  return (
    <div className="mx-auto max-w-2xl space-y-3">
      <Textarea
        value={hydrated ? notes : defaultNotes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder={t("placeholder")}
        className="min-h-[360px] resize-y rounded-2xl border-border/60 bg-card/60 p-4 text-base leading-relaxed shadow-sm"
      />
      <p className="text-xs text-muted-foreground">{t("saved")}</p>
    </div>
  );
}
