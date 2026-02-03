import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2, Sparkles, AlertCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface GenerateDraftButtonProps {
  contentType: "resource_post" | "case_study";
  recordId: string;
  title: string;
  keywords?: string[];
  lastGeneratedAt?: string | null;
  onGenerated?: () => void;
}

export function GenerateDraftButton({
  contentType,
  recordId,
  title,
  keywords = [],
  lastGeneratedAt,
  onGenerated,
}: GenerateDraftButtonProps) {
  const [loading, setLoading] = useState(false);
  const [showRateLimitDialog, setShowRateLimitDialog] = useState(false);
  const [rateLimitSeconds, setRateLimitSeconds] = useState(0);

  const handleGenerate = async (force = false) => {
    if (!recordId || !title) {
      toast({
        title: "Missing information",
        description: "Please save the record with a title before generating.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setShowRateLimitDialog(false);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Not authenticated",
          description: "Please log in again.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const response = await supabase.functions.invoke("ai-generate-draft", {
        body: {
          content_type: contentType,
          record_id: recordId,
          language: "en",
          title,
          keywords,
          audience: "engineering-led robotic spray painting projects",
          constraints_note: "liquid spray painting only; do not mention powder coating; avoid marketing fluff",
          force,
        },
      });

      if (response.error) {
        throw new Error(response.error.message || "Failed to generate draft");
      }

      const data = response.data;

      if (data.rate_limited) {
        setRateLimitSeconds(data.retry_after_seconds || 120);
        setShowRateLimitDialog(true);
        return;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      toast({
        title: "Draft generated",
        description: "AI-generated content has been saved to the draft.",
      });

      onGenerated?.();
    } catch (error) {
      const message = error instanceof Error ? error.message : "An unexpected error occurred";
      toast({
        title: "Generation failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatLastGenerated = (dateStr: string | null | undefined) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleString();
  };

  return (
    <>
      <div className="flex flex-col gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleGenerate(false)}
          disabled={loading}
          className="gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Generate Draft (n8n)
            </>
          )}
        </Button>
        {lastGeneratedAt && (
          <span className="text-xs text-muted-foreground">
            Last generated: {formatLastGenerated(lastGeneratedAt)}
          </span>
        )}
      </div>

      <AlertDialog open={showRateLimitDialog} onOpenChange={setShowRateLimitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              Rate Limit
            </AlertDialogTitle>
            <AlertDialogDescription>
              This draft was generated recently. Please wait {rateLimitSeconds} seconds 
              before generating again, or click "Generate Anyway" to override.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Wait</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleGenerate(true)}>
              Generate Anyway
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
