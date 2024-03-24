"use client";

import { useLocale } from "next-intl";
import { useTheme } from "next-themes";
import type { FC } from "react";

import { useClientContext, useSiteNavigation } from "@/hooks";
import { availableLocales } from "@/next.locales.mjs";
import NavBar from "./layout/nav-bar";
import { usePathname, useRouter } from "@/navigation.mjs";

const WithNavBar: FC = () => {
  const { navigationItems } = useSiteNavigation();
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const { replace } = useRouter();

  const locale = useLocale();

  const toggleCurrentTheme = () =>
    setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <div>
      <NavBar
        onThemeTogglerClick={toggleCurrentTheme}
        languages={{
          currentLanguage: locale,
          availableLanguages: availableLocales,
          onChange: (locale) => replace(pathname!, { locale: locale.code }),
        }}
        navItems={navigationItems.map(([, { label, link }]) => ({
          link,
          text: label,
        }))}
      />
    </div>
  );
};

export default WithNavBar;
