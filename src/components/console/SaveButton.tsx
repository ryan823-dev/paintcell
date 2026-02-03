import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";

interface SaveButtonProps {
  saving: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function SaveButton({ saving, onClick, disabled }: SaveButtonProps) {
  return (
    <Button onClick={onClick} disabled={saving || disabled}>
      {saving ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          保存中... / Saving...
        </>
      ) : (
        <>
          <Save className="mr-2 h-4 w-4" />
          保存更改 / Save Changes
        </>
      )}
    </Button>
  );
}
