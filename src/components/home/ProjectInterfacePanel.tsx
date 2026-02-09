import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal } from "lucide-react";

const parameters = [
  "material",
  "part size",
  "throughput",
  "environment",
  "automation goal",
];

export function ProjectInterfacePanel() {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmitToAssistant = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) {
      // Open assistant with no pre-filled message
      const assistantButton = document.querySelector('[data-assistant-trigger]') as HTMLButtonElement;
      if (assistantButton) assistantButton.click();
      return;
    }
    // Store the message and open assistant
    sessionStorage.setItem("project-init-message", trimmed);
    const assistantButton = document.querySelector('[data-assistant-trigger]') as HTMLButtonElement;
    if (assistantButton) assistantButton.click();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmitToAssistant();
    }
  };

  return (
    <section className="bg-background border-b border-border">
      <div className="container-wide py-12 md:py-20">
        <div className="max-w-4xl mx-auto">

          {/* System status indicator */}
          <div className="flex items-center gap-2 mb-6">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
              System ready
            </span>
          </div>

          {/* Project Interface Panel */}
          <div className="border border-border rounded-lg bg-card overflow-hidden">
            
            {/* Panel header bar */}
            <div className="flex items-center gap-2 px-5 py-3 bg-muted/50 border-b border-border">
              <Terminal className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                Project Initialization
              </span>
            </div>

            {/* AI system message */}
            <div className="px-6 pt-6 pb-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">AI</span>
                </div>
                <div>
                  <p className="text-base font-medium text-foreground leading-relaxed">
                    Start your robotic painting project.
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Tell me about your application, parts, or production line.
                  </p>
                </div>
              </div>
            </div>

            {/* Large input area */}
            <div className="px-6 pb-4">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your project information…"
                rows={4}
                className="w-full resize-none rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
              />
            </div>

            {/* Action buttons */}
            <div className="px-6 pb-5 flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleSubmitToAssistant}
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium h-11 px-6 gap-2"
              >
                Enter project wizard
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/quote")}
                className="h-11 px-6 font-medium"
              >
                Traditional inquiry entrance
              </Button>
            </div>

            {/* Parameter chips */}
            <div className="px-6 pb-5 border-t border-border pt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-3">
                Project initialization parameters:
              </p>
              <div className="flex flex-wrap gap-2">
                {parameters.map((param) => (
                  <span
                    key={param}
                    className="inline-flex items-center px-3 py-1.5 rounded-md bg-muted text-xs font-medium text-muted-foreground border border-border"
                  >
                    {param}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
