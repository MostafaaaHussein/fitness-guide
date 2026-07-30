import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ProfileShell } from "@/components/layout/ProfileShell";
import { NotesView } from "@/components/notes/NotesView";
import { getNotes, isValidProfile } from "@/lib/data";
import { translateText } from "@/lib/nutritionLocalization";
import type { Locale, ProfileId } from "@/lib/types";

export default async function NotesPage({
  params,
}: {
  params: Promise<{ locale: string; profile: string }>;
}) {
  const { locale, profile } = await params;
  setRequestLocale(locale);
  if (!isValidProfile(profile)) notFound();

  const t = await getTranslations("notes");
  const notes = getNotes(profile as ProfileId);
  const localeKey = (locale === "ar" || locale === "ru" ? locale : "en") as Locale;

  return (
    <ProfileShell profile={profile as ProfileId} title={t("title")}>
      <NotesView
        profile={profile as ProfileId}
        defaultNotes={translateText(notes.defaultNotes, localeKey)}
      />
    </ProfileShell>
  );
}
