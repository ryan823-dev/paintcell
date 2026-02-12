import { Sparkles } from "lucide-react";
import { AIChatPanel } from "@/components/ai-assistant/AIChatPanel";
import { HomepageWizardStrip } from "./HomepageWizardStrip";

interface InlineChatPanelProps {
  initialMessage?: string | null;
  onClose: () => void;
}

export function InlineChatPanel({ initialMessage, onClose }: InlineChatPanelProps) {
  return (
    <section className="bg-primary text-primary-foreground h-[calc(100vh-3.5rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 sm:px-10 lg:px-16 pt-6 pb-4 border-b border-primary-foreground/8">
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent text-[11px] font-semibold tracking-wider uppercase">
            <Sparkles className="h-3 w-3" />
            AI Consultation
          </div>
          <span className="flex items-center gap-2 text-xs text-primary-foreground/40">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            Active
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-xs text-primary-foreground/30 hover:text-primary-foreground/60 transition-colors px-3 py-1.5 rounded-lg hover:bg-primary-foreground/5"
        >
          ← Back to overview
        </button>
      </div>

      {/* Chat area — fills remaining space */}
      <div className="flex-1 min-h-0 flex flex-col [&_.flex-1]:flex-1 [&_input]:bg-primary-foreground/5 [&_input]:border-primary-foreground/15 [&_input]:text-primary-foreground [&_input]:placeholder-primary-foreground/25 [&_.border-t]:border-primary-foreground/8 [&_.bg-background]:bg-transparent [&_.bg-muted\\/20]:bg-primary-foreground/5 [&_.text-muted-foreground]:text-primary-foreground/40">
        <AIChatPanel onClose={onClose} initialMessage={initialMessage} />
      </div>

      {/* Wizard Strip — bottom */}
      <div className="border-t border-primary-foreground/8 flex items-center">
        <div className="px-6 sm:px-10 lg:px-16 w-full py-4">
          <HomepageWizardStrip variant="dark" />
        </div>
      </div>
    </section>
  );
}
