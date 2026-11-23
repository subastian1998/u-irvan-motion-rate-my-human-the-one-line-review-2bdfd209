import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Copies entry.txt verbatim to the grader's output directory: the review
// text itself is the entry, so no word is added, removed, or reflowed.
const here = dirname(fileURLToPath(import.meta.url));
const entry = readFileSync(join(here, "entry.txt"), "utf8");
const text = entry.replace(/\r\n/g, "\n");
const chars = [...text].length;
if (chars < 1 || chars > 200 || text.trim().length === 0) {
  console.error(`entry.txt must be 1-200 non-whitespace characters, got ${chars}`);
  process.exit(1);
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text);
console.log(`wrote ${chars}-character review to ${join(outDir, "entry.txt")}`);
