import { useState } from "react";
import { cn } from "@/lib/utils";
import { Bot, Brain, ChevronDown, User } from "lucide-react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export interface ChatMessageType {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  reasoningContent?: string;
  reasoningDurationMs?: number;
  reasoningExpanded?: boolean;
}

interface ChatMessageProps {
  message: ChatMessageType;
  reasoningDefaultOpen?: boolean;
  reasoningOpen?: boolean;
  onReasoningOpenChange?: (open: boolean) => void;
}

function formatReasoningDuration(durationMs?: number) {
  if (!durationMs || durationMs <= 0) {
    return "Thought process";
  }

  const seconds = durationMs / 1000;
  const formattedSeconds = seconds < 10 ? seconds.toFixed(1) : Math.round(seconds).toString();
  return `Thought for ${formattedSeconds}s`;
}

const markdownComponents: Components = {
  p: ({ children }) => <p className="my-4 leading-8 first:mt-0 last:mb-0">{children}</p>,
  h1: ({ children }) => <h1 className="mt-6 mb-4 text-xl font-semibold leading-tight first:mt-0">{children}</h1>,
  h2: ({ children }) => <h2 className="mt-6 mb-4 text-lg font-semibold leading-tight first:mt-0">{children}</h2>,
  h3: ({ children }) => <h3 className="mt-5 mb-3 text-base font-semibold leading-tight first:mt-0">{children}</h3>,
  ul: ({ children }) => <ul className="my-4 list-disc space-y-2 pl-6">{children}</ul>,
  ol: ({ children }) => <ol className="my-4 list-decimal space-y-2 pl-6">{children}</ol>,
  li: ({ children }) => <li className="leading-8 marker:text-muted-foreground">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  table: ({ children }) => (
    <div className="my-5 overflow-x-auto rounded-lg border border-border bg-background">
      <table className="w-full border-collapse text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-muted/60">{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => <tr className="border-b border-border last:border-b-0">{children}</tr>,
  th: ({ children }) => (
    <th className="px-4 py-3 align-top text-sm font-semibold text-foreground">{children}</th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 align-top leading-7 text-foreground">{children}</td>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-4 border-l-2 border-border pl-4 italic text-muted-foreground">
      {children}
    </blockquote>
  ),
};

export function ChatMessage({
  message,
  reasoningDefaultOpen = false,
  reasoningOpen,
  onReasoningOpenChange,
}: ChatMessageProps) {
  const isUser = message.role === "user";
  const hasReasoning = !isUser && Boolean(message.reasoningContent?.trim());
  const hasAnswer = Boolean(message.content.trim());
  const [internalReasoningOpen, setInternalReasoningOpen] = useState(
    message.reasoningExpanded ?? reasoningDefaultOpen,
  );
  const isReasoningOpen = reasoningOpen ?? internalReasoningOpen;

  const handleReasoningOpenChange = (open: boolean) => {
    if (reasoningOpen === undefined) {
      setInternalReasoningOpen(open);
    }
    onReasoningOpenChange?.(open);
  };

  return (
    <div
      className={cn(
        "flex gap-3",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted"
        )}
      >
        {isUser ? (
          <User className="h-4 w-4" />
        ) : (
          <Bot className="h-4 w-4" />
        )}
      </div>

      {/* Message Bubble */}
      <div
        className={cn(
          "space-y-2",
          isUser ? "max-w-[80%]" : "w-full max-w-[80%]",
        )}
      >
        {hasReasoning && (
          <Collapsible open={isReasoningOpen} onOpenChange={handleReasoningOpenChange}>
            <div className="w-full overflow-hidden rounded-lg border border-border bg-background/80">
              <CollapsibleTrigger className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-muted/40 transition-colors">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Brain className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{formatReasoningDuration(message.reasoningDurationMs)}</span>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-muted-foreground transition-transform",
                    isReasoningOpen && "rotate-180",
                  )}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="border-t border-border px-4 py-3">
                <p className="text-sm whitespace-pre-wrap text-muted-foreground leading-relaxed">
                  {message.reasoningContent}
                </p>
              </CollapsibleContent>
            </div>
          </Collapsible>
        )}

        {hasAnswer && (
          <div
            className={cn(
              "w-full rounded-lg px-4 py-2.5",
              isUser
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            )}
          >
            {isUser ? (
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            ) : (
              <div className="max-w-none text-[15px] leading-8 text-foreground [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkBreaks]}
                  components={markdownComponents}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
