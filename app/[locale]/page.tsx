import { availableLocaleCodes, defaultLocale } from "@/next.locales.mjs";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import React from "react";

export default function HomePage({
  params: { locale },
}: Readonly<{
  params: { locale: string };
}>) {
  if (!availableLocaleCodes.includes(locale)) {
    // Forces the current locale to be the Default Locale
    unstable_setRequestLocale(defaultLocale.code);

    return notFound();
  }

  unstable_setRequestLocale(locale);

  return <div className="container mb-3">HomePage</div>;
}
