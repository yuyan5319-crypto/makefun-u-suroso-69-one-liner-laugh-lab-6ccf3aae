// One-Liner Laugh Lab — a robot vacuum's excuse for eating a sock.
//
// Writes one original, hand-written funny line (1-200 characters, no
// trailing newline) to <MAKEFUN_OUTPUT_DIR|/output>/entry.txt.
// Node 22, standard library only, no dependencies.
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

// The line itself: a deadpan legal-defence twist on the vacuum's excuse.
// Tightened in revision: "is mine" and "didn't write it" land harder.
const LINE =
  "In my defence, the sock was on the floor, and everything on the floor is mine. That is the rule. I didn't write it — I just enforce it.";

// The gate requires 1-200 characters; refuse to write an invalid entry.
if ([...LINE].length < 1 || [...LINE].length > 200) {
  throw new Error(`entry line must be 1-200 characters, got ${[...LINE].length}`);
}

function writeLine(dir: string): void {
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), LINE, "utf8");
}

const preferred = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
try {
  writeLine(resolve(preferred));
} catch {
  // Running by hand outside the grading sandbox (e.g. /output not
  // writable): fall back to a local ./output directory.
  writeLine(resolve("output"));
}
