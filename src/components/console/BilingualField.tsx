import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface BilingualFieldProps {
  label: string;
  valueEn?: string | null;
  valueZh?: string | null;
  onChangeEn: (value: string) => void;
  onChangeZh: (value: string) => void;
  multiline?: boolean;
  rows?: number;
  hint?: string;
  className?: string;
}

export function BilingualField({
  label,
  valueEn,
  valueZh,
  onChangeEn,
  onChangeZh,
  multiline = false,
  rows = 3,
  hint,
  className,
}: BilingualFieldProps) {
  const InputComponent = multiline ? Textarea : Input;

  return (
    <div className={cn("space-y-3", className)}>
      <div>
        <Label className="text-sm font-medium">{label}</Label>
        {hint && <p className="text-xs text-muted-foreground mt-0.5">{hint}</p>}
      </div>
      
      <div className="grid md:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground font-normal">
            English (EN)
          </Label>
          <InputComponent
            value={valueEn || ""}
            onChange={(e) => onChangeEn(e.target.value)}
            placeholder="Enter English text..."
            {...(multiline ? { rows } : {})}
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground font-normal">
            中文 (ZH)
          </Label>
          <InputComponent
            value={valueZh || ""}
            onChange={(e) => onChangeZh(e.target.value)}
            placeholder="输入中文..."
            {...(multiline ? { rows } : {})}
          />
        </div>
      </div>
    </div>
  );
}
