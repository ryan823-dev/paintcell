import { locales, localeNames, localeFlags, Locale } from "@/i18n";
import { useNavigate, useLocation } from "react-router-dom";
import { stripLocalePrefix } from "@/lib/seo";
import { useRouteLocale } from "@/hooks/useRouteLocale";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const locale = useRouteLocale();
  const navigate = useNavigate();
  const location = useLocation();

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;
    try {
      localStorage.setItem("locale", newLocale);
    } catch {
      // Ignore storage failures; navigation still updates the URL.
    }
    const pathWithoutLocale = stripLocalePrefix(location.pathname);
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
