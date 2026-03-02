import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, FileText, Settings2, Loader2, GripHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useLocalizedNavigate as useNavigate } from "@/hooks/useLocalizedNavigate";
import { ChatMessage, ChatMessageType } from "./ChatMessage";
import { RequirementSummary } from "./RequirementSummary";
import { ContactFormModal } from "./ContactFormModal";
import { QuoteFormData, initialFormData } from "@/types/quote";
import type { PageContext } from "./FloatingAssistantButton";

interface AIChatPanelProps {
  onClose: () => void;
  initialMessage?: string | null;
  pageContext?: PageContext;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-presales-chat`;

export function AIChatPanel({ onClose, initialMessage, pageContext }: AIChatPanelProps) {
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
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState("");
  const [extractedRequirements, setExtractedRequirements] = useState<Partial<QuoteFormData>>({});
  const [showContactForm, setShowContactForm] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, showSummary]);

  // Send initial message if provided
  useEffect(() => {
    if (initialMessage && messages.length === 1) {
      streamChat(initialMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialMessage]);

  // Count turns for summary suggestion
  const userTurnCount = messages.filter(m => m.role === "user").length;

  // Stream chat response
  const streamChat = useCallback(async (userMessage: string) => {
    const userMsg: ChatMessageType = {
      role: "user",
      content: userMessage,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    let assistantContent = "";
    
    try {
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

      // Add assistant message placeholder
      setMessages(prev => [...prev, { role: "assistant", content: "", timestamp: new Date() }]);

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
    } catch (error) {
      // Log error without exposing details to console in production
      if (import.meta.env.DEV) {
        console.error("Chat error:", error);
      }
      toast.error("Failed to send message. Please try again.");
      // Remove the empty assistant message if error
      setMessages(prev => prev.filter(m => m.content !== ""));
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

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
    } catch (error) {
      // Log error without exposing details to console in production
      if (import.meta.env.DEV) {
        console.error("Summary error:", error);
      }
      toast.error("Failed to generate summary. Please try again.");
    } finally {
      setIsLoading(false);
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
          
          {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Thinking...</span>
            </div>
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
        <div className="relative group cursor-row-resize select-none flex items-center justify-center py-1 border-t border-primary-foreground/15 hover:border-accent/40 transition-colors"
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
        >
          <GripHorizontal className="h-4 w-4 text-primary-foreground/20 group-hover:text-accent/60 transition-colors" />
        </div>
      )}

      {/* Input Area */}
      {!showSummary && (
        <div className="p-4 bg-background" style={{ height: 80 }}>
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
