import { useEffect, useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { BilingualField, ContentCard, SaveButton } from "@/components/console";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface WhyCard {
  id: string;
  title: string;
  card_gray_line: string;
  modal_engineering_anchor: string | null;
  modal_typical_use_case: string | null;
  modal_key_constraints: string[] | null;
  modal_what_we_need_to_assess: string[] | null;
  sort_order: number;
  is_visible: boolean;
}

const arrayToText = (items: string[] | null) => (items || []).join("\n");
const textToArray = (value: string) => value.split("\n").map((item) => item.trim()).filter(Boolean);

export default function WhyCardsEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [cards, setCards] = useState<WhyCard[]>([]);
  const [constraintsText, setConstraintsText] = useState<Record<string, string>>({});
  const [assessText, setAssessText] = useState<Record<string, string>>({});

  useEffect(() => {
    void fetchCards();
  }, []);

  const fetchCards = async () => {
    const { data, error } = await supabase
      .from("why_cards")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      toast({
        title: "Load Error",
        description: "Failed to load cards.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const nextCards = (data || []) as WhyCard[];
    setCards(nextCards);
    setConstraintsText(
      Object.fromEntries(nextCards.map((card) => [card.id, arrayToText(card.modal_key_constraints)])),
    );
    setAssessText(
      Object.fromEntries(
        nextCards.map((card) => [card.id, arrayToText(card.modal_what_we_need_to_assess)]),
      ),
    );
    setLoading(false);
  };

  const updateCard = (id: string, field: keyof WhyCard, value: string | boolean | number | null) => {
    setCards((previous) =>
      previous.map((card) => (card.id === id ? { ...card, [field]: value } : card)),
    );
  };

  const handleSave = async () => {
    setSaving(true);
    let hasError = false;

    for (const card of cards) {
      const payload = {
        title: card.title,
        card_gray_line: card.card_gray_line,
        modal_engineering_anchor: card.modal_engineering_anchor,
        modal_typical_use_case: card.modal_typical_use_case,
        modal_key_constraints: textToArray(constraintsText[card.id] || ""),
        modal_what_we_need_to_assess: textToArray(assessText[card.id] || ""),
        sort_order: card.sort_order,
        is_visible: card.is_visible,
      };

      const { error } = await supabase
        .from("why_cards")
        .update(payload)
        .eq("id", card.id);

      if (error) {
        hasError = true;
        console.error("Error saving why card", card.id, error);
      }
    }

    toast(
      hasError
        ? {
            title: "Partial Save Error",
            description: "Some cards could not be saved.",
            variant: "destructive",
          }
        : {
            title: "Saved",
            description: "All why cards updated.",
          },
    );

    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Why Cards</h1>
        <p className="text-muted-foreground">Edit the home page “Why Choose Us” cards.</p>
      </div>

      {cards.map((card, index) => (
        <ContentCard key={card.id} title={`Card ${index + 1}: ${card.title}`}>
          <div className="mb-4 flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-2 text-sm">
              {card.is_visible ? (
                <>
                  <Eye className="h-4 w-4 text-green-500" />
                  Visible
                </>
              ) : (
                <>
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                  Hidden
                </>
              )}
            </div>
            <Switch
              checked={card.is_visible}
              onCheckedChange={(checked) => updateCard(card.id, "is_visible", checked)}
            />
          </div>

          <BilingualField
            label="Card Title"
            valueEn={card.title}
            onChangeEn={(value) => updateCard(card.id, "title", value)}
          />

          <BilingualField
            label="Card Subtitle"
            hint="Shown on the card surface."
            valueEn={card.card_gray_line}
            onChangeEn={(value) => updateCard(card.id, "card_gray_line", value)}
            multiline
            rows={2}
          />

          <div className="mt-6 border-t pt-4">
            <h4 className="mb-4 text-sm font-medium">Modal Details</h4>

            <BilingualField
              label="Engineering Anchor"
              valueEn={card.modal_engineering_anchor}
              onChangeEn={(value) => updateCard(card.id, "modal_engineering_anchor", value)}
              multiline
              rows={2}
            />

            <BilingualField
              label="Typical Use Case"
              valueEn={card.modal_typical_use_case}
              onChangeEn={(value) => updateCard(card.id, "modal_typical_use_case", value)}
              multiline
              rows={2}
            />

            <div className="mt-4 space-y-3">
              <div>
                <Label className="text-sm font-medium">Key Constraints</Label>
                <p className="mt-0.5 text-xs text-muted-foreground">One item per line.</p>
              </div>
              <Textarea
                value={constraintsText[card.id] || ""}
                onChange={(event) =>
                  setConstraintsText((previous) => ({
                    ...previous,
                    [card.id]: event.target.value,
                  }))
                }
                rows={4}
                placeholder="Enter constraints, one per line..."
              />
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <Label className="text-sm font-medium">What We Need to Assess</Label>
                <p className="mt-0.5 text-xs text-muted-foreground">One item per line.</p>
              </div>
              <Textarea
                value={assessText[card.id] || ""}
                onChange={(event) =>
                  setAssessText((previous) => ({
                    ...previous,
                    [card.id]: event.target.value,
                  }))
                }
                rows={4}
                placeholder="Enter assessment items, one per line..."
              />
            </div>
          </div>

          <div className="mt-4 border-t pt-4">
            <div className="flex items-center gap-4">
              <Label className="text-sm">Sort Order</Label>
              <Input
                type="number"
                value={card.sort_order}
                onChange={(event) =>
                  updateCard(card.id, "sort_order", Number.parseInt(event.target.value, 10) || 0)
                }
                className="w-24"
              />
            </div>
          </div>
        </ContentCard>
      ))}

      <div className="sticky bottom-4 flex justify-end border-t bg-background/95 py-4 backdrop-blur">
        <SaveButton saving={saving} onClick={handleSave} />
      </div>
    </div>
  );
}
