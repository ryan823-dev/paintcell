import { useState, useEffect, type ComponentType } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { stripLocalePrefix } from "@/lib/seo";
import { useSiteShellContent } from "@/hooks/useSiteShellContent";

export interface PageContext {
  currentPath: string;
  industryContext?: {
    industry: string;
    finish: string;
    throughput: string;
  };
}

interface AIChatDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialProjectMessage?: string | null;
  pageContext?: PageContext;
}

export function FloatingAssistantButton() {
  const location = useLocation();
  const currentPublicPath = stripLocalePrefix(location.pathname);
  const [isOpen, setIsOpen] = useState(false);
  const [ChatDrawer, setChatDrawer] = useState<ComponentType<AIChatDrawerProps> | null>(null);
  const [isLoadingDrawer, setIsLoadingDrawer] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [projectMessage, setProjectMessage] = useState<string | null>(null);
  const [pageContext, setPageContext] = useState<PageContext>({ currentPath: currentPublicPath });
  const shell = useSiteShellContent();

  const isHomepage = currentPublicPath === "/";
  const assistantCta = shell.assistant.cta;

  const openAssistant = async () => {
    const msg = sessionStorage.getItem("project-init-message");
    if (msg) {
      setProjectMessage(msg);
      sessionStorage.removeItem("project-init-message");
    }

    let nextIndustryContext = pageContext.industryContext;
    const ctxRaw = sessionStorage.getItem("industry-context");
    if (ctxRaw) {
      try {
        nextIndustryContext = JSON.parse(ctxRaw);
      } catch {
        nextIndustryContext = pageContext.industryContext;
      }
    }

    setPageContext((prev) => ({
      ...prev,
      currentPath: currentPublicPath,
      ...(nextIndustryContext ? { industryContext: nextIndustryContext } : {}),
    }));

    if (!ChatDrawer) {
      setIsLoadingDrawer(true);

      try {
        const module = await import("./AIChatDrawer");
        setChatDrawer(() => module.AIChatDrawer);
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error("Failed to load AI chat drawer:", error);
        }
        setIsLoadingDrawer(false);
        return;
      }

      setIsLoadingDrawer(false);
    }

    setIsOpen(true);
  };

  useEffect(() => {
    const animated = sessionStorage.getItem("assistant-animated");
    if (!animated) {
      sessionStorage.setItem("assistant-animated", "true");
    } else {
      setHasAnimated(true);
    }
  }, []);

  // Keep pageContext.currentPath in sync with route changes
  useEffect(() => {
    setPageContext((prev) => ({ ...prev, currentPath: currentPublicPath }));
  }, [currentPublicPath]);

  return (
    <>
      {/* Hidden trigger element for programmatic opening */}
      <button data-assistant-trigger className="hidden" onClick={openAssistant} />

      {/* Floating CTA — hidden on homepage since the panel IS the entry */}
      <AnimatePresence>
        {!isOpen && !isHomepage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-6 right-4 sm:right-6 z-50 max-w-[calc(100vw-2rem)]"
          >
            <motion.div
              initial={!hasAnimated ? { scale: 1 } : false}
              animate={!hasAnimated ? { scale: [1, 1.03, 1] } : {}}
              transition={!hasAnimated ? { duration: 2, repeat: 1, ease: "easeInOut" } : {}}
              onAnimationComplete={() => setHasAnimated(true)}
            >
              <Button
                onClick={openAssistant}
                disabled={isLoadingDrawer}
                className={cn(
                  "h-auto py-3.5 px-6 rounded-full",
                  "bg-accent hover:bg-accent/90",
                  "text-accent-foreground font-semibold text-sm",
                  "shadow-lg hover:shadow-xl",
                  "transition-all duration-200"
                )}
              >
                <span className="sm:hidden">{shell.assistant.mobileLabel}</span>
                <span className="hidden sm:inline">{assistantCta}</span>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Close button when drawer is open (mobile) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-6 right-6 z-50 sm:hidden"
          >
            <Button
              onClick={() => setIsOpen(false)}
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 shadow-lg"
            >
              <X className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Drawer */}
      {ChatDrawer ? (
        <ChatDrawer
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) setProjectMessage(null);
          }}
          initialProjectMessage={projectMessage}
          pageContext={pageContext}
        />
      ) : null}
    </>
  );
}
