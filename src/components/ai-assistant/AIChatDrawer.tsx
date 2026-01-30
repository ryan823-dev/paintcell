import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { AIChatPanel } from "./AIChatPanel";
import { ConsultationIntroScreen } from "./ConsultationIntroScreen";

interface AIChatDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AIChatDrawer({ open, onOpenChange }: AIChatDrawerProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [initialMessage, setInitialMessage] = useState<string | null>(null);

  const handleSelectOption = (option: string) => {
    setInitialMessage(option);
    setHasStarted(true);
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset state when drawer closes
    setTimeout(() => {
      setHasStarted(false);
      setInitialMessage(null);
    }, 300);
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-lg p-0 flex flex-col"
      >
        {hasStarted ? (
          <>
            <SheetHeader className="px-6 pt-6 pb-4 border-b bg-muted/30">
              <SheetTitle className="text-lg font-semibold flex items-center gap-2">
                <span className="h-2 w-2 bg-accent rounded-full animate-pulse" />
                Project Consultation
              </SheetTitle>
              <SheetDescription className="text-xs text-muted-foreground">
                No pricing. Human engineers confirm final scope.
              </SheetDescription>
            </SheetHeader>
            <AIChatPanel onClose={handleClose} initialMessage={initialMessage} />
          </>
        ) : (
          <ConsultationIntroScreen onSelectOption={handleSelectOption} />
        )}
      </SheetContent>
    </Sheet>
  );
}
