import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const scriptDir = dirname(fileURLToPath(import.meta.url))

export function bundleData({
  repoRoot = join(scriptDir, "..", "..", ".."),
  outDir = join(scriptDir, "..", "dist", "data"),
} = {}) {
  const componentsSrc = join(repoRoot, "packages", "react", "src", "components")
  const tokensSrc = join(repoRoot, "packages", "tokens", "dist", "json")
  const guardrailsSrc = join(repoRoot, "docs", "guardrails.json")

  for (const [label, path] of [
    ["components source", componentsSrc],
    ["tokens resolved JSON (run @tfds/tokens build first)", tokensSrc],
    ["guardrails", guardrailsSrc],
  ]) {
    if (!existsSync(path)) {
      throw new Error(`bundle-data: missing ${label} at ${path}`)
    }
  }

  rmSync(outDir, { recursive: true, force: true })
  mkdirSync(join(outDir, "components"), { recursive: true })
  mkdirSync(join(outDir, "tokens"), { recursive: true })

  const componentNames = readdirSync(componentsSrc, { withFileTypes: true })
    .filter(
      (entry) => entry.isDirectory() && existsSync(join(componentsSrc, entry.name, "meta.json")),
    )
    .map((entry) => entry.name)

  if (componentNames.length === 0) {
    throw new Error(`bundle-data: no meta.json found under ${componentsSrc}`)
  }

  for (const name of componentNames) {
    cpSync(join(componentsSrc, name, "meta.json"), join(outDir, "components", `${name}.json`))
  }

  for (const file of readdirSync(tokensSrc).filter((f) => f.endsWith(".json"))) {
    cpSync(join(tokensSrc, file), join(outDir, "tokens", file))
  }

  cpSync(guardrailsSrc, join(outDir, "guardrails.json"))

  const readVersion = (pkg) =>
    JSON.parse(readFileSync(join(repoRoot, "packages", pkg, "package.json"), "utf8")).version

  const manifest = {
    dsVersions: {
      "@tfds/react": readVersion("react"),
      "@tfds/tokens": readVersion("tokens"),
    },
    componentCount: componentNames.length,
    generatedAt: new Date().toISOString(),
  }
  writeFileSync(join(outDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`)

  return manifest
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const manifest = bundleData()
  console.error(
    `bundle-data: bundled ${manifest.componentCount} components (react ${manifest.dsVersions["@tfds/react"]}, tokens ${manifest.dsVersions["@tfds/tokens"]})`,
  )
}
