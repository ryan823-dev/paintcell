import { readFile } from "node:fs/promises";
import path from "node:path";

interface PublicCmsCheck {
  flag: string;
  label: string;
  table: string;
  route: string;
}

const ENV_PATH = path.resolve(".env");

const publicCmsChecks: PublicCmsCheck[] = [
  {
    flag: "VITE_ENABLE_PUBLIC_PRODUCTS_CMS",
    label: "public products CMS",
    table: "products_posts",
    route: "/products/catalog",
  },
  {
    flag: "VITE_ENABLE_PUBLIC_VIDEOS_CMS",
    label: "public videos CMS",
    table: "videos",
    route: "/videos",
  },
];

function normalizeEnvValue(value: string): string {
  const trimmed = value.trim();

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

async function readDotEnvFile(filePath: string): Promise<Record<string, string>> {
  try {
    const raw = await readFile(filePath, "utf8");
    const entries: Record<string, string> = {};

    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) {
        continue;
      }

      const separatorIndex = trimmed.indexOf("=");
      if (separatorIndex === -1) {
        continue;
      }

      const key = trimmed.slice(0, separatorIndex).trim();
      const value = normalizeEnvValue(trimmed.slice(separatorIndex + 1));

      if (key) {
        entries[key] = value;
      }
    }

    return entries;
  } catch {
    return {};
  }
}

function getEnvValue(env: Record<string, string>, key: string): string | undefined {
  const processValue = process.env[key];
  if (typeof processValue === "string" && processValue.trim()) {
    return normalizeEnvValue(processValue);
  }

  const fileValue = env[key];
  if (typeof fileValue === "string" && fileValue.trim()) {
    return normalizeEnvValue(fileValue);
  }

  return undefined;
}

function isEnabled(value: string | undefined): boolean {
  return value?.trim().toLowerCase() === "true";
}

async function assertPublicCmsTableAvailable(
  env: Record<string, string>,
  check: PublicCmsCheck,
): Promise<void> {
  const supabaseUrl = getEnvValue(env, "VITE_SUPABASE_URL");
  const publishableKey = getEnvValue(env, "VITE_SUPABASE_PUBLISHABLE_KEY");

  if (!supabaseUrl || !publishableKey) {
    throw new Error(
      `Cannot validate ${check.label}: missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY.`,
    );
  }

  const probeUrl = new URL(`/rest/v1/${check.table}`, supabaseUrl);
  probeUrl.searchParams.set("select", "id");
  probeUrl.searchParams.set("limit", "1");

  const response = await fetch(probeUrl, {
    method: "GET",
    headers: {
      apikey: publishableKey,
      Authorization: `Bearer ${publishableKey}`,
      Accept: "application/json",
    },
  });

  if (response.ok) {
    console.log(`  OK ${check.table} is reachable for ${check.route}`);
    return;
  }

  const responseText = await response.text();
  let details = responseText;

  try {
    const parsed = JSON.parse(responseText) as { message?: string; code?: string; hint?: string | null };
    const segments = [parsed.code, parsed.message, parsed.hint].filter(Boolean);
    if (segments.length > 0) {
      details = segments.join(" | ");
    }
  } catch {
    // Keep raw text when the response is not JSON.
  }

  throw new Error(
    [
      `Public CMS check failed for ${check.label}.`,
      `Flag ${check.flag}=true expects table public.${check.table} to be available before build.`,
      `Route: ${check.route}`,
      `HTTP ${response.status}: ${details}`,
      "Either deploy the matching Supabase migration first or disable the public CMS flag for this build.",
    ].join("\n"),
  );
}

async function main() {
  const envFromFile = await readDotEnvFile(ENV_PATH);
  const enabledChecks = publicCmsChecks.filter((check) =>
    isEnabled(getEnvValue(envFromFile, check.flag)),
  );

  if (enabledChecks.length === 0) {
    console.log("Public CMS check skipped: no public CMS flags are enabled.");
    return;
  }

  console.log("Validating public CMS tables before build...");

  for (const check of enabledChecks) {
    console.log(`- ${check.label}`);
    await assertPublicCmsTableAvailable(envFromFile, check);
  }
}

main().catch((error) => {
  console.error("Public CMS validation failed.");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
