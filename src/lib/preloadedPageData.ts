export function readPreloadedJson<T>(id: string): T | null {
  if (typeof document === "undefined") {
    return null;
  }

  const element = document.getElementById(id);
  const raw = element?.textContent?.trim();

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function serializeJsonForScript(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
