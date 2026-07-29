import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ProfileShell } from "@/components/layout/ProfileShell";
import { WorkoutView } from "@/components/workout/WorkoutView";
import { getAccessories, getWorkout, isValidProfile } from "@/lib/data";
import type { ProfileId } from "@/lib/types";

export default async function WorkoutPage({
  params,
}: {
  params: Promise<{ locale: string; profile: string }>;
}) {
  const { locale, profile } = await params;
  setRequestLocale(locale);
  if (!isValidProfile(profile)) notFound();

  const t = await getTranslations("workout");
  const plan = getWorkout(profile as ProfileId);
  const accessories = getAccessories(profile as ProfileId);

  return (
    <ProfileShell profile={profile as ProfileId} title={t("title")}>
      <WorkoutView
        profile={profile as ProfileId}
        plan={plan}
        accessories={accessories}
      />
    </ProfileShell>
  );
}
