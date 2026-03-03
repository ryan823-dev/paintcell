import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ArrayEditorField {
  key: string;
  label: string;
  labelZh?: string;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
  placeholderZh?: string;
}

interface ArrayEditorProps {
  items: Record<string, string>[];
  onChange: (items: Record<string, string>[]) => void;
  fields: ArrayEditorField[];
  addLabel?: string;
  bilingual?: boolean;
  className?: string;
  maxItems?: number;
  minItems?: number;
}

export function ArrayEditor({
  items,
  onChange,
  fields,
  addLabel = "Add Item",
  bilingual = false,
  className,
  maxItems,
  minItems = 0,
}: ArrayEditorProps) {
  const handleFieldChange = (index: number, key: string, value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [key]: value };
    onChange(newItems);
  };

  const handleAdd = () => {
    if (maxItems && items.length >= maxItems) return;
    const newItem: Record<string, string> = {};
    fields.forEach((field) => {
      newItem[field.key] = "";
      if (bilingual) {
        newItem[`${field.key}_zh`] = "";
      }
    });
    onChange([...items, newItem]);
  };

  const handleRemove = (index: number) => {
    if (items.length <= minItems) return;
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newItems = [...items];
    [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    onChange(newItems);
  };

  const handleMoveDown = (index: number) => {
    if (index === items.length - 1) return;
    const newItems = [...items];
    [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    onChange(newItems);
  };

  const renderField = (
    field: ArrayEditorField,
    item: Record<string, string>,
    index: number,
    isZh: boolean = false
  ) => {
    const key = isZh ? `${field.key}_zh` : field.key;
    const value = item[key] || "";
    const InputComponent = field.multiline ? Textarea : Input;
    const placeholder = isZh
      ? field.placeholderZh || "输入中文..."
      : field.placeholder || "Enter text...";

    return (
      <div className="space-y-1.5" key={key}>
        <Label className="text-xs text-muted-foreground font-normal">
          {isZh ? (field.labelZh || `${field.label} (中文)`) : field.label}
        </Label>
        <InputComponent
          value={value}
          onChange={(e) => handleFieldChange(index, key, e.target.value)}
          placeholder={placeholder}
          {...(field.multiline ? { rows: field.rows || 2 } : {})}
        />
      </div>
    );
  };

  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item, index) => (
        <div
          key={index}
          className="relative border border-border rounded-lg p-4 bg-card"
        >
          {/* Item header with controls */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground">
              #{index + 1}
            </span>
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleMoveUp(index)}
                disabled={index === 0}
                className="h-7 w-7 p-0"
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleMoveDown(index)}
                disabled={index === items.length - 1}
                className="h-7 w-7 p-0"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleRemove(index)}
                disabled={items.length <= minItems}
                className="h-7 w-7 p-0 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Fields */}
          <div className="space-y-4">
            {fields.map((field) => (
              <div key={field.key}>
                {bilingual ? (
                  <div className="grid md:grid-cols-2 gap-3">
                    {renderField(field, item, index, false)}
                    {renderField(field, item, index, true)}
                  </div>
                ) : (
                  renderField(field, item, index, false)
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Add button */}
      {(!maxItems || items.length < maxItems) && (
        <Button
          type="button"
          variant="outline"
          onClick={handleAdd}
          className="w-full border-dashed"
        >
          <Plus className="h-4 w-4 mr-2" />
          {addLabel}
        </Button>
      )}

      {items.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">
          No items yet. Click the button above to add one.
        </p>
      )}
    </div>
  );
}
