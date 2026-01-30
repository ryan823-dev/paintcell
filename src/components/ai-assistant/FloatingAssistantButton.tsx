import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AIChatDrawer } from "./AIChatDrawer";

export function FloatingAssistantButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Only animate on first page load
  useEffect(() => {
    const animated = sessionStorage.getItem("assistant-animated");
    if (!animated) {
      sessionStorage.setItem("assistant-animated", "true");
    } else {
      setHasAnimated(true);
    }
  }, []);

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.div
              initial={!hasAnimated ? { scale: 1 } : false}
              animate={!hasAnimated ? { 
                scale: [1, 1.05, 1],
              } : {}}
              transition={!hasAnimated ? { 
                duration: 2,
                repeat: 2,
                ease: "easeInOut"
              } : {}}
              onAnimationComplete={() => setHasAnimated(true)}
            >
              <Button
                onClick={() => setIsOpen(true)}
                className={cn(
                  "h-auto py-3 px-5 rounded-full",
                  "bg-primary hover:bg-primary/90",
                  "text-primary-foreground font-medium",
                  "shadow-lg hover:shadow-xl",
                  "transition-all duration-200",
                  "flex items-center gap-2"
                )}
              >
                <MessageSquare className="h-5 w-5" />
                <span className="hidden sm:inline">Ask an Automation Engineer</span>
                <span className="sm:hidden">Ask Engineer</span>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Close button when drawer is open */}
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
      <AIChatDrawer open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
