import * as lucide from "lucide-react"
import { writeFileSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

const CHUNK_SIZE = 100

const isIconName = (key: string): boolean =>
  /^[A-Z]/.test(key) &&
  !key.endsWith("Icon") &&
  key !== "createIcons" &&
  typeof (lucide as Record<string, unknown>)[key] === "object"

const iconNames = Object.keys(lucide).filter(isIconName)

function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

const chunks = chunk(iconNames, CHUNK_SIZE)

const importBlocks = chunks.map((names) => {
  const entries = names.map((name) => `  ${name} as Tfds${name}`).join(",\n")
  return `import {\n${entries},\n} from "lucide-react"`
})

const exportLines = iconNames.map((name) => `export const ${name} = createIcon(Tfds${name})`)

const lines = [
  `import { createIcon } from "./create-icon.js"`,
  ...importBlocks,
  ``,
  ...exportLines,
  ``,
]

const output = lines.join("\n")
const outPath = resolve(__dirname, "../src/index.ts")

writeFileSync(outPath, output, "utf-8")

process.stdout.write(`Generated ${iconNames.length} icons → src/index.ts\n`)
