import { useTranslations } from "next-intl";
import type { FC } from "react";
import type { LocaleConfig } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { LanguagesIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type SimpleLocaleConfig = Pick<LocaleConfig, "name" | "code">;

type LanguageDropDownProps = {
  onChange?: (newLocale: SimpleLocaleConfig) => void;
  currentLanguage: string;
  availableLanguages: Array<SimpleLocaleConfig>;
};

const LanguageDropdown: FC<LanguageDropDownProps> = ({
  onChange = () => {},
  currentLanguage,
  availableLanguages,
}) => {
  const t = useTranslations();

  const ariaLabel = t("components.common.languageDropdown.label");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button aria-label={ariaLabel}>
          <LanguagesIcon height="20" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent align="start" sideOffset={5}>
          <div>
            {availableLanguages.map(({ name, code }) => (
              <DropdownMenuItem
                key={code}
                onClick={() => onChange({ name, code })}
              >
                {name}
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

export default LanguageDropdown;
