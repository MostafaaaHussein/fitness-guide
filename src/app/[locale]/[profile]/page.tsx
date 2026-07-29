import { notFound, redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { isValidProfile } from "@/lib/data";

export default async function ProfileIndexPage({
  params,
}: {
  params: Promise<{ locale: string; profile: string }>;
}) {
  const { locale, profile } = await params;
  setRequestLocale(locale);
  if (!isValidProfile(profile)) notFound();
  redirect(`/${locale}/${profile}/nutrition`);
}
