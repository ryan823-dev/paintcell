import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, FileWarning } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function IndustryPageEditor() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isNew = id === "new";

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => navigate("/console/industry-pages")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">
            {isNew ? "New industry page" : "Industry page editor"}
          </h1>
          <p className="text-sm text-muted-foreground">
            Temporary placeholder to keep the admin build healthy while the full editor is restored.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileWarning className="h-5 w-5 text-amber-500" />
            Editor not yet restored
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            This route was referenced by the admin router, but the original module was missing from the
            workspace. A lightweight fallback is in place so production builds can complete safely.
          </p>
          <p>
            Requested record: <span className="font-mono text-foreground">{id || "unknown"}</span>
          </p>
          <div className="flex gap-3">
            <Button onClick={() => navigate("/console/industry-pages")}>Back to industry pages</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
