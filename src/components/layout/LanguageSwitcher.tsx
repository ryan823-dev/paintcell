import { useI18n, locales, localeNames, localeFlags, Locale } from "@/i18n";
import { useNavigate, useLocation } from "react-router-dom";
import { isValidLocale } from "@/i18n/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

/**
 * Strip the locale prefix from a pathname.
 * e.g. "/en/industries" → "/industries", "/ja" → "/"
 */
function stripLocale(pathname: string): string {
  const seg = pathname.split("/")[1];
  if (seg && isValidLocale(seg)) {
    const rest = pathname.slice(seg.length + 1); // +1 for the leading "/"
    return rest || "/";
  }
  return pathname;
}

export function LanguageSwitcher() {
  const { locale } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;
    const pathWithoutLocale = stripLocale(location.pathname);
    navigate(`/${newLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}${location.search}${location.hash}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium text-body hover:text-heading hover:bg-muted rounded-md transition-colors">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{localeFlags[locale]}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {locales.map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => switchLocale(l)}
            className={`gap-2 cursor-pointer ${l === locale ? "bg-accent/10 text-accent" : ""}`}
          >
            <span>{localeFlags[l]}</span>
            <span>{localeNames[l]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
