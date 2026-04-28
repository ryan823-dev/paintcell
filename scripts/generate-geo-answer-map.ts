import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { buildGeoAuthorityMapPayload } from "../src/data/geoAuthorityMap";

const OUTPUT_PATH = path.resolve("public/geo-answer-map.json");

async function main() {
  const payload = buildGeoAuthorityMapPayload();

  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  console.log(`Generated GEO answer map with ${payload.entries.length} entries at ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error("Failed to generate GEO answer map.");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
