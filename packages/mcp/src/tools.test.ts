import { afterAll, beforeAll, describe, expect, it } from "vitest"
import type { Client } from "@modelcontextprotocol/sdk/client/index.js"
import type { BundledData } from "./data"
import { createTestClient, createTestData, textOf } from "./test/fixture"

let data: BundledData
let client: Client
let cleanup: () => void

beforeAll(async () => {
  const fixture = createTestData()
  data = fixture.data
  cleanup = fixture.cleanup
  client = await createTestClient(data)
})

afterAll(async () => {
  await client.close()
  cleanup()
})

describe("tool listing (MCP-02)", () => {
  it("exposes exactly the 5 v1 tools", async () => {
    const { tools } = await client.listTools()
    expect(tools.map((t) => t.name).sort()).toEqual([
      "get_component",
      "get_examples",
      "get_guardrails",
      "list_components",
      "search_tokens",
    ])
  })
})

describe("list_components", () => {
  it("returns the 9 components with status and the DS versions", async () => {
    const result = await client.callTool({ name: "list_components", arguments: {} })
    const parsed = JSON.parse(textOf(result)) as {
      dsVersions: Record<string, string>
      components: { name: string; status: string }[]
    }
    expect(parsed.components).toHaveLength(9)
    expect(parsed.components.map((c) => c.name)).toContain("Button")
    expect(parsed.dsVersions["@tfds/react"]).toBe(data.manifest.dsVersions["@tfds/react"])
  })
})

describe("get_component", () => {
  it("returns the full meta for a known component (case-insensitive)", async () => {
    const result = await client.callTool({ name: "get_component", arguments: { name: "button" } })
    expect(result.isError).toBeFalsy()
    const parsed = JSON.parse(textOf(result)) as {
      name: string
      componentName: string
      props: unknown[]
    }
    expect(parsed.name).toBe("Button")
    expect(parsed.componentName).toBe("button")
    expect(parsed.props.length).toBeGreaterThan(0)
  })

  it("returns a structured error with valid names for an unknown component (MCP-03)", async () => {
    const result = await client.callTool({ name: "get_component", arguments: { name: "Tooltip" } })
    expect(result.isError).toBe(true)
    const text = textOf(result)
    expect(text).toContain('Unknown component "Tooltip"')
    expect(text).toContain("Button")
    expect(text).toContain("Grid")
  })
})

describe("search_tokens", () => {
  it("finds tokens by path substring within a single theme", async () => {
    const result = await client.callTool({
      name: "search_tokens",
      arguments: { query: "color.action", theme: "light" },
    })
    const parsed = JSON.parse(textOf(result)) as {
      total: number
      matches: { theme: string; token: string; value: string }[]
    }
    expect(parsed.total).toBeGreaterThan(0)
    for (const match of parsed.matches) {
      expect(match.theme).toBe("light")
      expect(match.token).toContain("color.action")
      expect(match.value.length).toBeGreaterThan(0)
    }
  })

  it("searches across all themes when no theme is given", async () => {
    const result = await client.callTool({
      name: "search_tokens",
      arguments: { query: "color.text.primary" },
    })
    const parsed = JSON.parse(textOf(result)) as { matches: { theme: string }[] }
    const themes = new Set(parsed.matches.map((m) => m.theme))
    expect(themes).toEqual(new Set(["light", "dark", "ocean-sunset"]))
  })

  it("returns a structured error for an unknown theme", async () => {
    const result = await client.callTool({
      name: "search_tokens",
      arguments: { query: "color", theme: "sepia" },
    })
    expect(result.isError).toBe(true)
    expect(textOf(result)).toContain('Unknown theme "sepia"')
    expect(textOf(result)).toContain("ocean-sunset")
  })
})

describe("get_guardrails", () => {
  it("returns the native-tag matrix and exceptions", async () => {
    const result = await client.callTool({ name: "get_guardrails", arguments: {} })
    const parsed = JSON.parse(textOf(result)) as {
      rules: { id: string; matrix: Record<string, string[]>; exceptions: string[] }[]
    }
    const rule = parsed.rules.find((r) => r.id === "no-native-tag")
    expect(rule?.matrix.button).toEqual(["Button"])
    expect(rule?.exceptions).toEqual(["a", "img", "li", "svg", "form", "table"])
  })
})

describe("get_examples", () => {
  it("returns examples with dos/donts for a known component", async () => {
    const result = await client.callTool({ name: "get_examples", arguments: { name: "Button" } })
    const parsed = JSON.parse(textOf(result)) as {
      name: string
      examples: unknown[]
      dos: string[]
      donts: string[]
    }
    expect(parsed.name).toBe("Button")
    expect(parsed.examples.length).toBeGreaterThan(0)
    expect(parsed.dos.length).toBeGreaterThan(0)
  })

  it("returns a structured error with valid names for an unknown component (MCP-03)", async () => {
    const result = await client.callTool({ name: "get_examples", arguments: { name: "Modal" } })
    expect(result.isError).toBe(true)
    expect(textOf(result)).toContain('Unknown component "Modal"')
    expect(textOf(result)).toContain("Card")
  })
})
