import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { AIChatPanel } from "./AIChatPanel";

interface AIChatDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AIChatDrawer({ open, onOpenChange }: AIChatDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-lg p-0 flex flex-col"
      >
        <SheetHeader className="px-6 pt-6 pb-4 border-b bg-muted/30">
          <SheetTitle className="text-lg font-semibold flex items-center gap-2">
            <span className="h-2 w-2 bg-accent rounded-full animate-pulse" />
            AI Pre-Sales Engineer
          </SheetTitle>
          <SheetDescription className="text-xs text-muted-foreground">
            No pricing. Human engineers confirm final scope.
          </SheetDescription>
        </SheetHeader>
        
        <AIChatPanel onClose={() => onOpenChange(false)} />
      </SheetContent>
    </Sheet>
  );
}
