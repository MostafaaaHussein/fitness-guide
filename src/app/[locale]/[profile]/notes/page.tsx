import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ProfileShell } from "@/components/layout/ProfileShell";
import { NotesView } from "@/components/notes/NotesView";
import { getNotes, isValidProfile } from "@/lib/data";
import type { ProfileId } from "@/lib/types";

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

  return (
    <ProfileShell profile={profile as ProfileId} title={t("title")}>
      <NotesView
        profile={profile as ProfileId}
        defaultNotes={notes.defaultNotes}
      />
    </ProfileShell>
  );
}
