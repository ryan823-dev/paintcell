import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AIChatDrawer } from "./AIChatDrawer";

export function FloatingAssistantButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [projectMessage, setProjectMessage] = useState<string | null>(null);
  const location = useLocation();

  const isHomepage = location.pathname === "/";

  useEffect(() => {
    const animated = sessionStorage.getItem("assistant-animated");
    if (!animated) {
      sessionStorage.setItem("assistant-animated", "true");
    } else {
      setHasAnimated(true);
    }
  }, []);

  // Listen for programmatic trigger from homepage panel
  useEffect(() => {
    const handleTrigger = () => {
      const msg = sessionStorage.getItem("project-init-message");
      if (msg) {
        setProjectMessage(msg);
        sessionStorage.removeItem("project-init-message");
      }
      setIsOpen(true);
    };

    const btn = document.querySelector('[data-assistant-trigger]') as HTMLButtonElement;
    if (btn) {
      btn.addEventListener('click', handleTrigger);
      return () => btn.removeEventListener('click', handleTrigger);
    }
  }, []);

  return (
    <>
      {/* Hidden trigger element for programmatic opening */}
      <button data-assistant-trigger className="hidden" onClick={() => {
        const msg = sessionStorage.getItem("project-init-message");
        if (msg) {
          setProjectMessage(msg);
          sessionStorage.removeItem("project-init-message");
        }
        setIsOpen(true);
      }} />

      {/* Floating CTA — hidden on homepage since the panel IS the entry */}
      <AnimatePresence>
        {!isOpen && !isHomepage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.div
              initial={!hasAnimated ? { scale: 1 } : false}
              animate={!hasAnimated ? { scale: [1, 1.03, 1] } : {}}
              transition={!hasAnimated ? { duration: 2, repeat: 1, ease: "easeInOut" } : {}}
              onAnimationComplete={() => setHasAnimated(true)}
            >
              <Button
                onClick={() => setIsOpen(true)}
                className={cn(
                  "h-auto py-3.5 px-6 rounded-full",
                  "bg-accent hover:bg-accent/90",
                  "text-accent-foreground font-semibold text-sm",
                  "shadow-lg hover:shadow-xl",
                  "transition-all duration-200"
                )}
              >
                Start a project consultation
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
      <AIChatDrawer
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) setProjectMessage(null);
        }}
        initialProjectMessage={projectMessage}
      />
    </>
  );
}
