import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, FileText, Settings2, GripHorizontal } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useLocalizedNavigate as useNavigate } from "@/hooks/useLocalizedNavigate";
import { ChatMessage, ChatMessageType } from "./ChatMessage";
import { RequirementSummary } from "./RequirementSummary";
import { ContactFormModal } from "./ContactFormModal";
import { QuoteFormData, initialFormData } from "@/types/quote";
import type { PageContext } from "./FloatingAssistantButton";
import { ChatStatusIndicator } from "./ChatStatusIndicator";

interface AIChatPanelProps {
  onClose: () => void;
  initialMessage?: string | null;
  pageContext?: PageContext;
  customStreamChat?: (
    messages: ChatMessageType[],
    handlers: {
      onReasoningChunk?: (chunk: string) => void;
      onContentChunk: (chunk: string) => void;
    },
  ) => Promise<void>;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-presales-chat`;

export function AIChatPanel({ onClose, initialMessage, pageContext, customStreamChat }: AIChatPanelProps) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      role: "assistant",
      content: "Thank you for starting this consultation. I'll help you evaluate your painting application and prepare a structured summary for our engineering team.\n\nLet me understand your project better. Could you tell me more about the parts or products you're looking to paint?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<'idle' | 'thinking' | 'typing' | 'processing' | 'generating-summary' | 'completed'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState("");
  const [extractedRequirements, setExtractedRequirements] = useState<Partial<QuoteFormData>>({});
  const [showContactForm, setShowContactForm] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const [pendingReasoningOpen, setPendingReasoningOpen] = useState(false);
  const [pendingAssistant, setPendingAssistant] = useState<{
    content: string;
    reasoningContent: string;
    reasoningStartedAt: number | null;
    reasoningEndedAt: number | null;
  } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const shouldAutoScrollRef = useRef(true);
  const shouldShowStatusIndicator =
    currentStatus !== 'idle' &&
    (!customStreamChat || !pendingAssistant || (!pendingAssistant.reasoningContent && !pendingAssistant.content));

  const getReadableChatError = (error: unknown) => {
    if (!(error instanceof Error)) {
      return "Something went wrong while contacting PaintCell AI. Please try again.";
    }

    const message = error.message || "";

    if (message.includes("401") || message.toLowerCase().includes("unauthorized")) {
      return "PaintCell AI could not authenticate the request. Please check the API configuration and try again.";
    }

    if (message.includes("403") || message.toLowerCase().includes("forbidden")) {
      return "PaintCell AI rejected the request. Please verify the API access settings and try again.";
    }

    if (message.includes("429") || message.toLowerCase().includes("rate")) {
      return "PaintCell AI is temporarily rate-limited. Please wait a moment and try again.";
    }

    return "PaintCell AI could not generate a response right now. Please try again.";
  };

  const getScrollViewport = useCallback(() => {
    return scrollRef.current?.querySelector("[data-radix-scroll-area-viewport]") as HTMLDivElement | null;
  }, []);

  const scrollToBottom = useCallback((force = false) => {
    if (!force && !shouldAutoScrollRef.current) {
      return;
    }

    const viewport = getScrollViewport();
    if (!viewport) {
      return;
    }

    viewport.scrollTop = viewport.scrollHeight;
  }, [getScrollViewport]);

  // Auto-scroll to bottom
  useEffect(() => {
    requestAnimationFrame(() => {
      scrollToBottom();
    });
  }, [messages, pendingAssistant, showSummary, chatError, currentStatus, scrollToBottom]);

  useEffect(() => {
    const viewport = getScrollViewport();
    if (!viewport) {
      return;
    }

    const handleScroll = () => {
      const distanceFromBottom = viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight;
      shouldAutoScrollRef.current = distanceFromBottom <= 32;
    };

    handleScroll();
    viewport.addEventListener("scroll", handleScroll, { passive: true });
    return () => viewport.removeEventListener("scroll", handleScroll);
  }, [getScrollViewport]);

  // Send initial message if provided
  useEffect(() => {
    if (initialMessage && messages.length === 1) {
      streamChat(initialMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialMessage]);

  // Count turns for summary suggestion
  const userTurnCount = messages.filter(m => m.role === "user").length;

  // Update status helper
  const updateStatus = useCallback((status: 'idle' | 'thinking' | 'typing' | 'processing' | 'generating-summary' | 'completed', message?: string) => {
    setCurrentStatus(status);
    setStatusMessage(message || '');
    if (status === 'idle') {
      setTimeout(() => {
        if (currentStatus !== 'idle') {
          setCurrentStatus('idle');
        }
      }, 1000); // Keep completion status visible for a moment before going idle
    }
  }, [currentStatus]);

  // Stream chat response
  const streamChat = useCallback(async (userMessage: string) => {
    const userMsg: ChatMessageType = {
      role: "user",
      content: userMessage,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    setChatError(null);
    setPendingAssistant(null);
    setPendingReasoningOpen(false);
    shouldAutoScrollRef.current = true;
    updateStatus('processing', "Sending your message to PaintCell AI...");
    requestAnimationFrame(() => {
      scrollToBottom(true);
    });

    let assistantContent = "";
    
    try {
      if (customStreamChat) {
        let reasoningContent = "";
        let reasoningStartedAt: number | null = null;
        let reasoningEndedAt: number | null = null;
        let hasClearedProcessingStatus = false;

        await customStreamChat([...messages, userMsg], {
          onReasoningChunk: (chunk) => {
            if (!hasClearedProcessingStatus) {
              hasClearedProcessingStatus = true;
              updateStatus('idle');
            }
            if (reasoningStartedAt === null) {
              reasoningStartedAt = Date.now();
            }
            reasoningContent += chunk;
            setPendingAssistant({
              content: assistantContent,
              reasoningContent,
              reasoningStartedAt,
              reasoningEndedAt,
            });
          },
          onContentChunk: (content) => {
            if (!hasClearedProcessingStatus) {
              hasClearedProcessingStatus = true;
              updateStatus('idle');
            }
            if (reasoningStartedAt !== null && reasoningEndedAt === null) {
              reasoningEndedAt = Date.now();
            }

            assistantContent += content;
            setPendingAssistant({
              content: assistantContent,
              reasoningContent,
              reasoningStartedAt,
              reasoningEndedAt,
            });
          },
        });

        if (reasoningStartedAt !== null && reasoningEndedAt === null) {
          reasoningEndedAt = Date.now();
        }

        if (assistantContent.trim() || reasoningContent.trim()) {
          setMessages(prev => [
            ...prev,
            {
              role: "assistant",
              content: assistantContent,
              reasoningContent: reasoningContent || undefined,
              reasoningDurationMs:
                reasoningStartedAt !== null && reasoningEndedAt !== null
                  ? reasoningEndedAt - reasoningStartedAt
                  : undefined,
              reasoningExpanded: pendingReasoningOpen,
              timestamp: new Date(),
            },
          ]);
        }
        setPendingAssistant(null);
      } else {
        updateStatus('thinking', "PaintCell AI is analyzing your question...");
        
        // Add assistant message placeholder
        setMessages(prev => [...prev, { role: "assistant", content: "", timestamp: new Date() }]);
        updateStatus('typing', "PaintCell AI is preparing a response...");

        const response = await fetch(CHAT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
            pageContext,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || "Failed to get response");
        }

        if (!response.body) throw new Error("No response body");

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let textBuffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          textBuffer += decoder.decode(value, { stream: true });
          
          let newlineIndex: number;
          while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
            let line = textBuffer.slice(0, newlineIndex);
            textBuffer = textBuffer.slice(newlineIndex + 1);

            if (line.endsWith("\r")) line = line.slice(0, -1);
            if (line.startsWith(":") || line.trim() === "") continue;
            if (!line.startsWith("data: ")) continue;

            const jsonStr = line.slice(6).trim();
            if (jsonStr === "[DONE]") break;

            try {
              const parsed = JSON.parse(jsonStr);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                assistantContent += content;
                setMessages(prev => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    ...updated[updated.length - 1],
                    content: assistantContent,
                  };
                  return updated;
                });
              }
            } catch {
              // Incomplete JSON, put back
              textBuffer = line + "\n" + textBuffer;
              break;
            }
          }
        }
      }

      if (!customStreamChat) {
        updateStatus('completed', "Response received");
      }
    } catch (error) {
      // Log error without exposing details to console in production
      if (import.meta.env.DEV) {
        console.error("Chat error:", error);
      }
      setChatError(getReadableChatError(error));
      toast.error("Failed to send message. Please try again.");
      // Remove any empty assistant placeholder if error
      setMessages(prev => prev.filter(m => !(m.role === "assistant" && m.content === "")));
      setPendingAssistant(null);
      updateStatus('idle');
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        updateStatus('idle');
      }, 500); // Brief delay to show completion state
    }
  }, [customStreamChat, messages, pageContext, updateStatus]);

  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    setInput("");
    streamChat(trimmed);
  }, [input, isLoading, streamChat]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Generate summary
  const handleGenerateSummary = async () => {
    setIsLoading(true);
    setChatError(null);
    updateStatus('generating-summary', "Compiling project requirements and generating summary...");
    try {
      // Get both summary and extracted requirements
      const [summaryRes, extractRes] = await Promise.all([
        fetch(CHAT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            messages: messages.map(m => ({ role: m.role, content: m.content })),
            action: "generate_summary",
            pageContext,
          }),
        }),
        fetch(CHAT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            messages: messages.map(m => ({ role: m.role, content: m.content })),
            action: "extract_requirements",
            pageContext,
          }),
        }),
      ]);

      if (!summaryRes.ok || !extractRes.ok) {
        throw new Error("Failed to generate summary");
      }

      const summaryData = await summaryRes.json();
      const extractData = await extractRes.json();

      setSummary(summaryData.summary || "");
      setExtractedRequirements(extractData.requirements || {});
      setShowSummary(true);
      updateStatus('completed', "Summary generated successfully");
    } catch (error) {
      // Log error without exposing details to console in production
      if (import.meta.env.DEV) {
        console.error("Summary error:", error);
      }
      toast.error("Failed to generate summary. Please try again.");
      updateStatus('idle');
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        updateStatus('idle');
      }, 500); // Brief delay to show completion state
    }
  };

  // Navigate to configurator
  const handleGoToConfigurator = () => {
    onClose();
    navigate("/quote");
  };

  // Handle submit inquiry
  const handleSubmitInquiry = () => {
    setShowContactForm(true);
  };

  // Build full form data for submission
  const buildFormData = (): QuoteFormData => {
    return {
      ...initialFormData,
      ...extractedRequirements,
      // Ensure arrays are properly typed
      project_primary_goal: extractedRequirements.project_primary_goal || [],
      compliance_requirements: extractedRequirements.compliance_requirements || [],
      utilities_availability: extractedRequirements.utilities_availability || [],
      paint_type: extractedRequirements.paint_type || [],
    } as QuoteFormData;
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Chat Messages */}
      <ScrollArea 
        ref={scrollRef}
        className="flex-1 px-4 py-4"
      >
        <div className="space-y-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}

          {pendingAssistant && (pendingAssistant.reasoningContent.trim() || pendingAssistant.content.trim()) && (
            <ChatMessage
              key="pending-assistant"
              message={{
                role: "assistant",
                content: pendingAssistant.content,
                reasoningContent: pendingAssistant.reasoningContent || undefined,
                reasoningDurationMs:
                  pendingAssistant.reasoningStartedAt !== null
                    ? (pendingAssistant.reasoningEndedAt ?? Date.now()) - pendingAssistant.reasoningStartedAt
                    : undefined,
                timestamp: new Date(),
              }}
              reasoningOpen={pendingReasoningOpen}
              onReasoningOpenChange={setPendingReasoningOpen}
            />
          )}
          
          {shouldShowStatusIndicator && (
            <ChatStatusIndicator 
              status={currentStatus} 
              message={statusMessage} 
            />
          )}

          {chatError && (
            <Alert variant="destructive" className="border-destructive/40 bg-destructive/5">
              <AlertDescription>{chatError}</AlertDescription>
            </Alert>
          )}

          {/* Summary Section */}
          {showSummary && (
            <RequirementSummary 
              summary={summary}
              onSubmit={handleSubmitInquiry}
              onBack={() => setShowSummary(false)}
            />
          )}
        </div>
      </ScrollArea>

      {/* Action Buttons */}
      {!showSummary && userTurnCount >= 2 && (
        <div className="px-4 py-2 border-t bg-muted/20 flex gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={handleGenerateSummary}
            disabled={isLoading}
            className="gap-1.5 text-xs"
          >
            <FileText className="h-3.5 w-3.5" />
            Generate Summary
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleGoToConfigurator}
            className="gap-1.5 text-xs"
          >
            <Settings2 className="h-3.5 w-3.5" />
            26-Step Configurator
          </Button>
        </div>
      )}

      {/* Draggable resize handle */}
      {!showSummary && (
        <div className="relative group cursor-row-resize select-none touch-none flex items-center justify-center py-1 border-t border-primary-foreground/15 hover:border-accent/40 transition-colors"
          onMouseDown={(e) => {
            e.preventDefault();
            const startY = e.clientY;
            const inputEl = (e.currentTarget.nextElementSibling as HTMLElement);
            const startHeight = inputEl?.offsetHeight || 56;

            const onMouseMove = (ev: MouseEvent) => {
              const delta = startY - ev.clientY;
              const newHeight = Math.max(56, Math.min(300, startHeight + delta));
              if (inputEl) inputEl.style.height = `${newHeight}px`;
            };
            const onMouseUp = () => {
              document.removeEventListener('mousemove', onMouseMove);
              document.removeEventListener('mouseup', onMouseUp);
            };
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
          }}
          onTouchStart={(e) => {
            const startY = e.touches[0].clientY;
            const inputEl = (e.currentTarget.nextElementSibling as HTMLElement);
            const startHeight = inputEl?.offsetHeight || 56;

            const onTouchMove = (ev: TouchEvent) => {
              ev.preventDefault();
              const delta = startY - ev.touches[0].clientY;
              const newHeight = Math.max(56, Math.min(300, startHeight + delta));
              if (inputEl) inputEl.style.height = `${newHeight}px`;
            };
            const onTouchEnd = () => {
              document.removeEventListener('touchmove', onTouchMove);
              document.removeEventListener('touchend', onTouchEnd);
            };
            document.addEventListener('touchmove', onTouchMove, { passive: false });
            document.addEventListener('touchend', onTouchEnd);
          }}
        >
          <GripHorizontal className="h-4 w-4 text-primary-foreground/20 group-hover:text-accent/60 transition-colors" />
        </div>
      )}

      {/* Input Area */}
      {!showSummary && (
        <div className="p-4 bg-background min-h-[80px]">
          <div className="flex gap-2 h-full">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question..."
              disabled={isLoading}
              className="flex-1 resize-none h-full min-h-0"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              size="icon"
              className="shrink-0 self-end"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Contact Form Modal */}
      <ContactFormModal
        open={showContactForm}
        onOpenChange={setShowContactForm}
        formData={buildFormData()}
        chatTranscript={messages}
        summary={summary}
        onSuccess={() => {
          setShowContactForm(false);
          onClose();
        }}
      />
    </div>
  );
}
