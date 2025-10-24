#!/usr/bin/env tsx
import fs from "node:fs";
import path from "node:path";
import { defaultContent } from "../src/data/fixtures";
import { templateIndex } from "../src/data/templates";

const [, , templateKey = "default", outputArg] = process.argv;

const snapshot = templateKey === "default"
  ? { key: "default", content: defaultContent }
  : templateIndex[templateKey];

if (!snapshot) {
  console.error(`Unknown template: ${templateKey}`);
  process.exit(1);
}

const payload = JSON.stringify(snapshot.content, null, 2);

if (outputArg) {
  const outputPath = path.resolve(process.cwd(), outputArg);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, payload, "utf8");
  console.log(`Wrote fixture to ${outputPath}`);
} else {
  process.stdout.write(payload);
}
