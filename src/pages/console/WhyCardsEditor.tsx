import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { BilingualField, ContentCard, SaveButton } from "@/components/console";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface WhyCard {
  id: string;
  title: string;
  title_zh: string | null;
  card_gray_line: string;
  card_gray_line_zh: string | null;
  modal_engineering_anchor: string | null;
  modal_engineering_anchor_zh: string | null;
  modal_typical_use_case: string | null;
  modal_typical_use_case_zh: string | null;
  modal_key_constraints: string[] | null;
  modal_key_constraints_zh: string[] | null;
  modal_what_we_need_to_assess: string[] | null;
  modal_what_we_need_to_assess_zh: string[] | null;
  sort_order: number;
  is_visible: boolean;
}

// Helper to convert array to newline-separated text for editing
const arrayToText = (arr: string[] | null): string => (arr || []).join("\n");
// Helper to convert newline-separated text back to array
const textToArray = (text: string): string[] => 
  text.split("\n").map(s => s.trim()).filter(Boolean);

export default function WhyCardsEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [cards, setCards] = useState<WhyCard[]>([]);
  // Local state for textarea editing (arrays as text)
  const [constraintsText, setConstraintsText] = useState<Record<string, { en: string; zh: string }>>({});
  const [assessText, setAssessText] = useState<Record<string, { en: string; zh: string }>>({});

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    const { data, error } = await supabase
      .from("why_cards")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      toast({
        title: "加载失败 / Load Error",
        description: "无法加载Why Cards / Failed to load Why Cards",
        variant: "destructive",
      });
    } else if (data) {
      setCards(data as WhyCard[]);
      // Initialize textarea states
      const cText: Record<string, { en: string; zh: string }> = {};
      const aText: Record<string, { en: string; zh: string }> = {};
      data.forEach((card: WhyCard) => {
        cText[card.id] = {
          en: arrayToText(card.modal_key_constraints),
          zh: arrayToText(card.modal_key_constraints_zh),
        };
        aText[card.id] = {
          en: arrayToText(card.modal_what_we_need_to_assess),
          zh: arrayToText(card.modal_what_we_need_to_assess_zh),
        };
      });
      setConstraintsText(cText);
      setAssessText(aText);
    }
    setLoading(false);
  };

  const updateCard = (id: string, field: keyof WhyCard, value: string | boolean | number | null) => {
    setCards(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const handleSave = async () => {
    setSaving(true);
    let hasError = false;

    for (const card of cards) {
      const payload = {
        title: card.title,
        title_zh: card.title_zh,
        card_gray_line: card.card_gray_line,
        card_gray_line_zh: card.card_gray_line_zh,
        modal_engineering_anchor: card.modal_engineering_anchor,
        modal_engineering_anchor_zh: card.modal_engineering_anchor_zh,
        modal_typical_use_case: card.modal_typical_use_case,
        modal_typical_use_case_zh: card.modal_typical_use_case_zh,
        modal_key_constraints: textToArray(constraintsText[card.id]?.en || ""),
        modal_key_constraints_zh: textToArray(constraintsText[card.id]?.zh || ""),
        modal_what_we_need_to_assess: textToArray(assessText[card.id]?.en || ""),
        modal_what_we_need_to_assess_zh: textToArray(assessText[card.id]?.zh || ""),
        sort_order: card.sort_order,
        is_visible: card.is_visible,
      };

      const { error } = await supabase
        .from("why_cards")
        .update(payload)
        .eq("id", card.id);

      if (error) {
        hasError = true;
        console.error("Error saving card:", card.id, error);
      }
    }

    if (hasError) {
      toast({
        title: "部分保存失败 / Partial Save Error",
        description: "部分卡片未能保存，请重试 / Some cards failed to save",
        variant: "destructive",
      });
    } else {
      toast({
        title: "保存成功 / Saved",
        description: "所有Why Cards已更新 / All Why Cards updated",
      });
    }
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
        <h1 className="text-2xl font-bold">Why Cards 管理 / Why Cards Editor</h1>
        <p className="text-muted-foreground">
          编辑首页"为什么选择我们"卡片内容 / Edit "Why Choose Us" cards on home page
        </p>
      </div>

      {cards.map((card, index) => (
        <ContentCard 
          key={card.id} 
          title={`Card ${index + 1}: ${card.title}`}
          titleZh={card.title_zh || undefined}
        >
          {/* Visibility toggle */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b">
            <div className="flex items-center gap-2">
              {card.is_visible ? (
                <Eye className="h-4 w-4 text-green-500" />
              ) : (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              )}
              <span className="text-sm">
                {card.is_visible ? "显示中 / Visible" : "已隐藏 / Hidden"}
              </span>
            </div>
            <Switch
              checked={card.is_visible}
              onCheckedChange={(checked) => updateCard(card.id, "is_visible", checked)}
            />
          </div>

          {/* Title */}
          <BilingualField
            label="卡片标题 / Card Title"
            valueEn={card.title}
            valueZh={card.title_zh}
            onChangeEn={(v) => updateCard(card.id, "title", v)}
            onChangeZh={(v) => updateCard(card.id, "title_zh", v)}
          />

          {/* Gray line (subtitle) */}
          <BilingualField
            label="卡片副标题 / Card Subtitle"
            hint="显示在卡片上的灰色描述文字 / Gray description shown on card"
            valueEn={card.card_gray_line}
            valueZh={card.card_gray_line_zh}
            onChangeEn={(v) => updateCard(card.id, "card_gray_line", v)}
            onChangeZh={(v) => updateCard(card.id, "card_gray_line_zh", v)}
            multiline
            rows={2}
          />

          {/* Modal content section */}
          <div className="mt-6 pt-4 border-t">
            <h4 className="text-sm font-medium mb-4">弹窗详情 / Modal Details</h4>
            
            {/* Engineering anchor */}
            <BilingualField
              label="技术锚点 / Engineering Anchor"
              hint="弹窗中的技术要点说明 / Technical key point in modal"
              valueEn={card.modal_engineering_anchor}
              valueZh={card.modal_engineering_anchor_zh}
              onChangeEn={(v) => updateCard(card.id, "modal_engineering_anchor", v)}
              onChangeZh={(v) => updateCard(card.id, "modal_engineering_anchor_zh", v)}
              multiline
              rows={2}
            />

            {/* Typical use case */}
            <BilingualField
              label="典型用例 / Typical Use Case"
              valueEn={card.modal_typical_use_case}
              valueZh={card.modal_typical_use_case_zh}
              onChangeEn={(v) => updateCard(card.id, "modal_typical_use_case", v)}
              onChangeZh={(v) => updateCard(card.id, "modal_typical_use_case_zh", v)}
              multiline
              rows={2}
            />

            {/* Key constraints - array as textarea */}
            <div className="space-y-3 mt-4">
              <div>
                <Label className="text-sm font-medium">关键约束条件 / Key Constraints</Label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  每行一条 / One item per line
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground font-normal">English (EN)</Label>
                  <Textarea
                    value={constraintsText[card.id]?.en || ""}
                    onChange={(e) => setConstraintsText(prev => ({
                      ...prev,
                      [card.id]: { ...prev[card.id], en: e.target.value }
                    }))}
                    placeholder="Enter constraints, one per line..."
                    rows={4}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground font-normal">中文 (ZH)</Label>
                  <Textarea
                    value={constraintsText[card.id]?.zh || ""}
                    onChange={(e) => setConstraintsText(prev => ({
                      ...prev,
                      [card.id]: { ...prev[card.id], zh: e.target.value }
                    }))}
                    placeholder="输入约束条件，每行一条..."
                    rows={4}
                  />
                </div>
              </div>
            </div>

            {/* What we need to assess - array as textarea */}
            <div className="space-y-3 mt-4">
              <div>
                <Label className="text-sm font-medium">需要评估的内容 / What We Need to Assess</Label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  每行一条 / One item per line
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground font-normal">English (EN)</Label>
                  <Textarea
                    value={assessText[card.id]?.en || ""}
                    onChange={(e) => setAssessText(prev => ({
                      ...prev,
                      [card.id]: { ...prev[card.id], en: e.target.value }
                    }))}
                    placeholder="Enter assessment items, one per line..."
                    rows={4}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground font-normal">中文 (ZH)</Label>
                  <Textarea
                    value={assessText[card.id]?.zh || ""}
                    onChange={(e) => setAssessText(prev => ({
                      ...prev,
                      [card.id]: { ...prev[card.id], zh: e.target.value }
                    }))}
                    placeholder="输入评估项目，每行一条..."
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sort order */}
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center gap-4">
              <Label className="text-sm">排序顺序 / Sort Order</Label>
              <Input
                type="number"
                value={card.sort_order}
                onChange={(e) => updateCard(card.id, "sort_order", parseInt(e.target.value) || 0)}
                className="w-24"
              />
            </div>
          </div>
        </ContentCard>
      ))}

      <div className="flex justify-end sticky bottom-4 bg-background/95 backdrop-blur py-4 border-t">
        <SaveButton saving={saving} onClick={handleSave} />
      </div>
    </div>
  );
}
