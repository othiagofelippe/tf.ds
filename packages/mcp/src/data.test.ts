import { mkdtempSync, readFileSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { afterAll, describe, expect, it } from "vitest"
import { bundleData } from "../scripts/bundle-data.mjs"
import { loadBundledData } from "./data"

const repoRoot = join(__dirname, "..", "..", "..")
const outDir = mkdtempSync(join(tmpdir(), "tfds-mcp-data-"))

afterAll(() => {
  rmSync(outDir, { recursive: true, force: true })
})

describe("bundle-data + loadBundledData", () => {
  it("bundles the 9 component metas and the loader reads them back", () => {
    bundleData({ repoRoot, outDir })
    const data = loadBundledData(outDir)

    expect(data.components).toHaveLength(9)
    const names = data.components.map((c) => c.name)
    for (const expected of [
      "Button",
      "Typography",
      "Label",
      "Badge",
      "Input",
      "VStack",
      "HStack",
      "Grid",
      "Card",
    ]) {
      expect(names).toContain(expected)
    }
  })

  it("bundles resolved tokens for the 3 themes", () => {
    const data = loadBundledData(outDir)
    expect(Object.keys(data.tokens).sort()).toEqual(["dark", "light", "ocean-sunset"])
  })

  it("bundles guardrails with the native-tag matrix and exceptions", () => {
    const data = loadBundledData(outDir)
    const rule = data.guardrails.rules.find((r) => r.id === "no-native-tag")
    expect(rule?.matrix["button"]).toEqual(["Button"])
    expect(rule?.exceptions).toEqual(["a", "img", "li", "svg", "form", "table"])
  })

  it("manifest reports the DS versions the data came from", () => {
    const data = loadBundledData(outDir)
    const reactVersion = (
      JSON.parse(readFileSync(join(repoRoot, "packages", "react", "package.json"), "utf8")) as {
        version: string
      }
    ).version
    const tokensVersion = (
      JSON.parse(readFileSync(join(repoRoot, "packages", "tokens", "package.json"), "utf8")) as {
        version: string
      }
    ).version

    expect(data.manifest.dsVersions).toEqual({
      "@tfds/react": reactVersion,
      "@tfds/tokens": tokensVersion,
    })
    expect(data.manifest.componentCount).toBe(9)
  })
})
