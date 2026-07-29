import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ProfileShell } from "@/components/layout/ProfileShell";
import { NutritionView } from "@/components/nutrition/NutritionView";
import { getNutrition, isValidProfile } from "@/lib/data";
import type { ProfileId } from "@/lib/types";

export default async function NutritionPage({
  params,
}: {
  params: Promise<{ locale: string; profile: string }>;
}) {
  const { locale, profile } = await params;
  setRequestLocale(locale);
  if (!isValidProfile(profile)) notFound();

  const t = await getTranslations("nutrition");
  const plan = getNutrition(profile as ProfileId);

  return (
    <ProfileShell profile={profile as ProfileId} title={t("title")}>
      <NutritionView profile={profile as ProfileId} plan={plan} />
    </ProfileShell>
  );
}
