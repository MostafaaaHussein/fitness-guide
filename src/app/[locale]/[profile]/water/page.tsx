import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ProfileShell } from "@/components/layout/ProfileShell";
import { WaterView } from "@/components/water/WaterView";
import { isValidProfile } from "@/lib/data";
import type { ProfileId } from "@/lib/types";

export default async function WaterPage({
  params,
}: {
  params: Promise<{ locale: string; profile: string }>;
}) {
  const { locale, profile } = await params;
  setRequestLocale(locale);
  if (!isValidProfile(profile)) notFound();

  const t = await getTranslations("water");

  return (
    <ProfileShell profile={profile as ProfileId} title={t("title")}>
      <WaterView profile={profile as ProfileId} />
    </ProfileShell>
  );
}
