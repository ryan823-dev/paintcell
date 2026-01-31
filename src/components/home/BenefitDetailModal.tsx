import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare } from "lucide-react";

export interface BenefitModalContent {
  title: string;
  engineeringAnchor: string;
  typicalUseCase: string;
  keyConstraints: string;
  whatWeNeedToAssess: string;
}

interface BenefitDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: BenefitModalContent | null;
  onStartConsultation: () => void;
}

export function BenefitDetailModal({
  open,
  onOpenChange,
  content,
  onStartConsultation,
}: BenefitDetailModalProps) {
  if (!content) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-semibold text-foreground">
            {content.title}
          </DialogTitle>
          <p className="text-sm text-muted-foreground/70 italic mt-2">
            {content.engineeringAnchor}
          </p>
        </DialogHeader>
        
        <ScrollArea className="flex-1 px-6">
          <div className="space-y-5 pb-6">
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-1.5">
                Typical use case:
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {content.typicalUseCase}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-1.5">
                Key constraints:
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {content.keyConstraints}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-1.5">
                What we need to assess:
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {content.whatWeNeedToAssess}
              </p>
            </div>
          </div>
        </ScrollArea>

        <div className="p-6 pt-4 border-t border-border">
          <Button
            onClick={onStartConsultation}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Start a project consultation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
