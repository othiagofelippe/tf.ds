import { build } from "esbuild"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const packageRoot = resolve(__dirname, "..")
const distEntry = resolve(packageRoot, "dist/index.js")

const FIFTY_ICONS = [
  "Search",
  "Home",
  "User",
  "Settings",
  "Bell",
  "Heart",
  "Star",
  "Mail",
  "Phone",
  "Camera",
  "Lock",
  "Unlock",
  "Eye",
  "EyeOff",
  "Download",
  "Upload",
  "Trash",
  "Edit",
  "Plus",
  "Minus",
  "X",
  "Check",
  "ChevronUp",
  "ChevronDown",
  "ChevronLeft",
  "ChevronRight",
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "Menu",
  "Grid",
  "List",
  "Map",
  "Globe",
  "Link",
  "Clipboard",
  "Copy",
  "Scissors",
  "Folder",
  "File",
  "Image",
  "Video",
  "Music",
  "Mic",
  "Volume",
  "Wifi",
  "Bluetooth",
  "Battery",
  "Sun",
]

function makeStdin(icons: string[]): string {
  const named = icons.join(", ")
  return `import { ${named} } from "${distEntry}"; export { ${named} };`
}

async function measureBundle(label: string, icons: string[]): Promise<number> {
  const result = await build({
    stdin: {
      contents: makeStdin(icons),
      resolveDir: packageRoot,
      loader: "ts",
    },
    bundle: true,
    minify: true,
    platform: "browser",
    format: "esm",
    write: false,
    external: ["react", "react-dom", "react/jsx-runtime"],
  })

  const bytes = result.outputFiles[0]?.contents.byteLength ?? 0
  const kb = (bytes / 1024).toFixed(2)
  process.stdout.write(`  ${label}: ${kb} KB\n`)
  return bytes
}

async function main(): Promise<void> {
  process.stdout.write("\nMeasuring @tfds/icons tree-shaking...\n\n")

  const bytesOne = await measureBundle("1 icon  (Search)  ", ["Search"])
  const bytesMany = await measureBundle("50 icons          ", FIFTY_ICONS)

  const ratio = bytesOne / bytesMany
  const pct = (ratio * 100).toFixed(1)

  process.stdout.write(`\n  Ratio: ${pct}% (1-icon bundle vs 50-icon bundle)\n`)

  if (ratio > 0.2) {
    process.stdout.write(
      `\n  RESULT: FAIL — tree-shaking is broken\n` +
        `  The 1-icon bundle is ${pct}% of the 50-icon bundle.\n` +
        `  Expected: < 20%. All icons are likely being included.\n\n`,
    )
    process.exit(1)
  } else {
    process.stdout.write(
      `\n  RESULT: PASS — tree-shaking is working\n` +
        `  The 1-icon bundle is only ${pct}% of the 50-icon bundle.\n\n`,
    )
  }
}

main().catch((err: unknown) => {
  process.stderr.write(`Error: ${String(err)}\n`)
  process.exit(1)
})
