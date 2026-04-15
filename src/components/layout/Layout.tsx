import { ReactNode, Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SeoLocaleEnforcer } from "@/components/seo";

const FloatingAssistantButton = lazy(() =>
  import("@/components/ai-assistant").then((module) => ({
    default: module.FloatingAssistantButton,
  })),
);

interface LayoutProps {
  children?: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SeoLocaleEnforcer />
      <Header />
      <main className="flex-1">{children || <Outlet />}</main>
      <Footer />
      <Suspense fallback={null}>
        <FloatingAssistantButton />
      </Suspense>
    </div>
  );
}
