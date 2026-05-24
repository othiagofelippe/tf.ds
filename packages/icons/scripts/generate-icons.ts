import * as lucide from "lucide-react"
import { writeFileSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"
import { CURATED_ICONS } from "./curated-icons.js"

const __dirname = dirname(fileURLToPath(import.meta.url))
const outputPath = resolve(__dirname, "../src/index.ts")

const lucideExports = lucide as unknown as Record<string, unknown>

const missing = CURATED_ICONS.filter((name) => !(name in lucideExports))

if (missing.length > 0) {
  process.stderr.write(
    `\nError: the following icons are in CURATED_ICONS but do not exist in lucide-react:\n` +
      missing.map((n) => `  - ${n}`).join("\n") +
      `\n\nUpdate curated-icons.ts or upgrade lucide-react.\n\n`,
  )
  process.exit(1)
}

const importLines = CURATED_ICONS.map(
  (name) => `import { ${name} as Lucide${name} } from "lucide-react"`,
)

const exportLines = CURATED_ICONS.map((name) => `export const ${name} = createIcon(Lucide${name})`)

const lines: string[] = [
  `import { createIcon } from "./create-icon.js"`,
  ...importLines,
  ``,
  ...exportLines,
  ``,
]

writeFileSync(outputPath, lines.join("\n"), "utf-8")
process.stdout.write(`Generated ${CURATED_ICONS.length} icons\n`)
