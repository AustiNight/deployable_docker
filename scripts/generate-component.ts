#!/usr/bin/env tsx
import fs from "node:fs";
import path from "node:path";

const [, , rawName, rawDir = ""] = process.argv;

if (!rawName) {
  console.error("Usage: npm run generate:component -- <Name> [subdirectory]");
  process.exit(1);
}

const sanitize = (value: string) => value.replace(/[^a-zA-Z0-9]/g, "");
const cleanName = sanitize(rawName);
if (!cleanName) {
  console.error("Component name must include letters or numbers.");
  process.exit(1);
}
const pascalName = `${cleanName.charAt(0).toUpperCase()}${cleanName.slice(1)}`;
const directory = rawDir ? rawDir.replace(/\\|\./g, "/") : "";
const targetDir = path.resolve(process.cwd(), "src", "components", directory);
fs.mkdirSync(targetDir, { recursive: true });

const fileName = `${pascalName}.tsx`;
const targetPath = path.join(targetDir, fileName);
if (fs.existsSync(targetPath)) {
  console.error(`Component ${fileName} already exists in ${targetDir}.`);
  process.exit(1);
}

const template = `type ${pascalName}Props = {\n  // describe props here\n};\n\nexport const ${pascalName} = ({}: ${pascalName}Props) => {\n  return (\n    <div className=\\"rounded-lg border border-border/70 bg-card p-4\\">\n      ${pascalName} component scaffolded.\n    </div>\n  );\n};\n`;

fs.writeFileSync(targetPath, template, "utf8");
console.log(`Created src/components${directory ? `/${directory}` : ""}/${fileName}`);
