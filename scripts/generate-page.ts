#!/usr/bin/env tsx
import fs from "node:fs";
import path from "node:path";

const [, , rawName] = process.argv;

if (!rawName) {
  console.error("Usage: npm run generate:page -- <Name>");
  process.exit(1);
}

const sanitize = (value: string) => value.replace(/[^a-zA-Z0-9]/g, "");
const pascalName = `${sanitize(rawName.charAt(0).toUpperCase())}${sanitize(rawName.slice(1))}`;
const fileName = `${pascalName}Page.tsx`;
const targetDir = path.resolve(process.cwd(), "src", "pages");
const targetPath = path.join(targetDir, fileName);

if (fs.existsSync(targetPath)) {
  console.error(`Page ${fileName} already exists.`);
  process.exit(1);
}

const template = `import { Card, CardContent, CardHeader, CardTitle } from \\"@/components/ui/card\\";\n\nexport const ${pascalName}Page = () => {\n  return (\n    <div className=\\"mx-auto w-full max-w-4xl px-4 py-16 md:px-6\\">\n      <Card className=\\"border border-border/70\\">\n        <CardHeader>\n          <CardTitle>${pascalName}</CardTitle>\n        </CardHeader>\n        <CardContent className=\\"space-y-4 text-sm text-muted-foreground\\">\n          <p>Seeded page for ${pascalName}. Build your content here.</p>\n        </CardContent>\n      </Card>\n    </div>\n  );\n};\n`;

fs.writeFileSync(targetPath, template, "utf8");
console.log(`Created src/pages/${fileName}`);

