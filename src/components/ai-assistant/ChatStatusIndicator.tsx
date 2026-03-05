import { Loader2, Clock, Bot, FileText, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatStatusIndicatorProps {
  status: 'idle' | 'thinking' | 'typing' | 'processing' | 'generating-summary' | 'completed';
  message?: string;
}

export function ChatStatusIndicator({ status, message }: ChatStatusIndicatorProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'thinking':
        return {
          icon: Loader2,
          text: message || "Analyzing your question...",
          className: "text-blue-600",
          iconClassName: "animate-spin"
        };
      case 'typing':
        return {
          icon: Bot,
          text: message || "PaintCell AI is typing...",
          className: "text-green-600",
          iconClassName: "animate-pulse"
        };
      case 'processing':
        return {
          icon: Clock,
          text: message || "Processing your request...",
          className: "text-amber-600",
          iconClassName: "animate-pulse"
        };
      case 'generating-summary':
        return {
          icon: FileText,
          text: message || "Generating project summary...",
          className: "text-purple-600",
          iconClassName: "animate-pulse"
        };
      case 'completed':
        return {
          icon: CheckCircle2,
          text: message || "Response completed",
          className: "text-emerald-600",
          iconClassName: ""
        };
      case 'idle':
      default:
        return {
          icon: null,
          text: "",
          className: "",
          iconClassName: ""
        };
    }
  };

  const { icon: Icon, text, className, iconClassName } = getStatusConfig();

  if (status === 'idle') {
    return null;
  }

  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      {Icon && (
        <Icon 
          className={cn("h-4 w-4", className, iconClassName)} 
        />
      )}
      <span className={cn("text-sm", className)}>
        {text}
      </span>
    </div>
  );
}
