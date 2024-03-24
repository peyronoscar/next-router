"use client";

import { useState } from "react";
import type { FC, ComponentProps } from "react";

import type { FormattedMessage } from "@/types";
import LanguageDropdown from "./locale-dropdown";
import { Link } from "@/navigation.mjs";

type NavbarProps = {
  navItems: Array<{ text: FormattedMessage; link: string }>;
  languages: ComponentProps<typeof LanguageDropdown>;
  onThemeTogglerClick: () => void;
};

const NavBar: FC<NavbarProps> = ({
  navItems,
  languages,
  onThemeTogglerClick,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav>
      {navItems.map(({ text, link }) => (
        <Link key={link} href={link}>
          {text}
        </Link>
      ))}
      <div>
        <LanguageDropdown
          onChange={languages.onChange}
          availableLanguages={languages.availableLanguages}
          currentLanguage={languages.currentLanguage}
        />
      </div>
    </nav>
  );
};

export default NavBar;
