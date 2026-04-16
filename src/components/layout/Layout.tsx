import { ReactNode, Suspense, lazy } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SeoLocaleEnforcer } from "@/components/seo";
import { stripLocalePrefix } from "@/lib/seo";

const FloatingAssistantButton = lazy(() =>
  import("@/components/ai-assistant/FloatingAssistantButton").then((module) => ({
    default: module.FloatingAssistantButton,
  })),
);

interface LayoutProps {
  children?: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const currentPublicPath = stripLocalePrefix(location.pathname);
  const shouldRenderFloatingAssistant = currentPublicPath !== "/";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SeoLocaleEnforcer />
      <Header />
      <main className="flex-1">{children || <Outlet />}</main>
      <Footer />
      {shouldRenderFloatingAssistant ? (
        <Suspense fallback={null}>
          <FloatingAssistantButton />
        </Suspense>
      ) : null}
    </div>
  );
}
