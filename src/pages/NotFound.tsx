import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useI18n } from "@/i18n";
import { LocalizedLink as Link } from "@/components/LocalizedLink";

const NotFound = () => {
  const location = useLocation();
  const { t } = useI18n();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">{t.notFound?.title || "404"}</h1>
        <p className="mb-4 text-xl text-muted-foreground">{t.notFound?.message || "Oops! Page not found"}</p>
        <Link to="/" className="text-primary underline hover:text-primary/90">
          {t.notFound?.returnHome || "Return to Home"}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
