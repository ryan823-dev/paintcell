import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface RequirementSummaryProps {
  summary: string;
  onSubmit: () => void;
  onBack: () => void;
}

export function RequirementSummary({ summary, onSubmit, onBack }: RequirementSummaryProps) {
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          📋 Requirement Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="prose prose-sm dark:prose-invert max-w-none text-sm">
          <ReactMarkdown>{summary}</ReactMarkdown>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 pt-0">
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="gap-1.5"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Chat
        </Button>
        <Button
          size="sm"
          onClick={onSubmit}
          className="gap-1.5 bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          <Send className="h-3.5 w-3.5" />
          Submit Inquiry
        </Button>
      </CardFooter>
    </Card>
  );
}
