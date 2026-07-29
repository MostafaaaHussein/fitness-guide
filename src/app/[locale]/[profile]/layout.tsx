import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { isValidProfile } from "@/lib/data";
import type { ReactNode } from "react";

export default async function ProfileLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string; profile: string }>;
}) {
  const { locale, profile } = await params;
  setRequestLocale(locale);
  if (!isValidProfile(profile)) notFound();
  return children;
}
