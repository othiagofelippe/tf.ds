import { readFileSync, readdirSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

export interface ComponentMetaProp {
  name: string
  type: string
  default?: string
  description: string
}

export interface ComponentMeta {
  name: string
  componentName: string
  status: "experimental" | "stable" | "deprecated"
  description: string
  props: ComponentMetaProp[]
  variants: Record<string, string[]>
  tokensUsed: string[]
  examples: Array<{ title: string; code: string }>
  dos: string[]
  donts: string[]
  analytics: {
    analyticsDefault: "on" | "off" | "excluded"
    supportedEvents: string[]
    piiRisk: "low" | "medium" | "high"
  }
}

export interface GuardrailRule {
  id: string
  description: string
  severity: "critical" | "major" | "minor"
  matrix: Record<string, string[]>
  exceptions: string[]
  examples: { wrong: string; right: string }
}

export interface Guardrails {
  rules: GuardrailRule[]
}

export type TokenTree = { [key: string]: string | TokenTree }

export interface DataManifest {
  dsVersions: Record<string, string>
  componentCount: number
  generatedAt: string
}

export interface BundledData {
  manifest: DataManifest
  components: ComponentMeta[]
  tokens: Record<string, TokenTree>
  guardrails: Guardrails
}

function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(path, "utf8")) as T
}

export function defaultDataDir(): string {
  return join(dirname(fileURLToPath(import.meta.url)), "data")
}

export function loadBundledData(dataDir: string = defaultDataDir()): BundledData {
  const componentsDir = join(dataDir, "components")
  const tokensDir = join(dataDir, "tokens")

  const components = readdirSync(componentsDir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => readJson<ComponentMeta>(join(componentsDir, file)))
    .sort((a, b) => a.name.localeCompare(b.name))

  const tokens: Record<string, TokenTree> = {}
  for (const file of readdirSync(tokensDir).filter((f) => f.endsWith(".json"))) {
    tokens[file.replace(/\.json$/, "")] = readJson<TokenTree>(join(tokensDir, file))
  }

  return {
    manifest: readJson<DataManifest>(join(dataDir, "manifest.json")),
    components,
    tokens,
    guardrails: readJson<Guardrails>(join(dataDir, "guardrails.json")),
  }
}
