import type { ChatMessageType } from "@/components/ai-assistant/ChatMessage";

const DEFAULT_MODEL = "glm-4.7";
const DEFAULT_BASE_URL = "https://open.bigmodel.cn/api/paas/v4/chat/completions";

const HOMEPAGE_CONSULTATION_SYSTEM_PROMPT = `You are the homepage AI consultation assistant for TD Painting Systems.

Your role:
- Help industrial buyers briefly explore robotic painting and coating automation projects.
- Keep responses practical, technical, and concise.
- Ask at most one follow-up question when clarification is useful.
- Do not provide pricing or guarantees.
- When the user is ready for a structured project intake, suggest the 26-step configurator.

Style:
- Professional and helpful.
- Short responses, usually 2-4 sentences.
- Prefer concrete engineering language over marketing language.`;

function getHomepageConsultationConfig() {
  const apiKey = import.meta.env.VITE_HOMEPAGE_AI_API_KEY;
  const model = import.meta.env.VITE_HOMEPAGE_AI_MODEL || DEFAULT_MODEL;
  const baseUrl = import.meta.env.VITE_HOMEPAGE_AI_BASE_URL || DEFAULT_BASE_URL;

  if (!apiKey) {
    throw new Error("Homepage AI API key is not configured.");
  }

  return { apiKey, model, baseUrl };
}

export async function streamHomepageConsultationReply(
  messages: ChatMessageType[],
  onChunk: (chunk: string) => void,
): Promise<string> {
  const { apiKey, model, baseUrl } = getHomepageConsultationConfig();

  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      stream: true,
      temperature: 0.5,
      thinking: {
        type: "disabled",
      },
      messages: [
        {
          role: "system",
          content: HOMEPAGE_CONSULTATION_SYSTEM_PROMPT,
        },
        ...messages.map((message) => ({
          role: message.role,
          content: message.content,
        })),
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(errorText || `Homepage AI request failed with status ${response.status}`);
  }

  if (!response.body) {
    throw new Error("Homepage AI response body is empty.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let fullText = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    let newlineIndex = buffer.indexOf("\n");
    while (newlineIndex !== -1) {
      let line = buffer.slice(0, newlineIndex);
      buffer = buffer.slice(newlineIndex + 1);

      if (line.endsWith("\r")) {
        line = line.slice(0, -1);
      }

      if (!line.startsWith("data: ")) {
        newlineIndex = buffer.indexOf("\n");
        continue;
      }
      const payload = line.slice(6).trim();
      if (!payload || payload === "[DONE]") {
        newlineIndex = buffer.indexOf("\n");
        continue;
      }

      try {
        const parsed = JSON.parse(payload);
        const chunk =
          parsed.choices?.[0]?.delta?.content ??
          parsed.choices?.[0]?.message?.content ??
          "";

        if (chunk) {
          fullText += chunk;
          onChunk(chunk);
        }
      } catch {
        // Skip malformed partial lines and continue parsing the next events.
      }

      newlineIndex = buffer.indexOf("\n");
    }
  }

  const trailingPayload = buffer.trim();
  if (trailingPayload.startsWith("data: ") && trailingPayload !== "data: [DONE]") {
    try {
      const parsed = JSON.parse(trailingPayload.slice(6).trim());
      const chunk =
        parsed.choices?.[0]?.delta?.content ??
        parsed.choices?.[0]?.message?.content ??
        "";

      if (chunk) {
        fullText += chunk;
        onChunk(chunk);
      }
    } catch {
      // Ignore trailing partial payload.
    }
  }

  return fullText.trim();
}
