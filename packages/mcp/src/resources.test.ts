import { afterAll, beforeAll, describe, expect, it } from "vitest"
import type { Client } from "@modelcontextprotocol/sdk/client/index.js"
import type { BundledData } from "./data"
import { createTestClient, createTestData } from "./test/fixture"

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

function firstText(result: unknown): string {
  const text = (result as { contents?: Array<{ text?: unknown }> }).contents?.[0]?.text
  if (typeof text !== "string") throw new Error("expected text resource contents")
  return text
}

describe("resources (MCP-04)", () => {
  it("lists the 9 component metas, 3 token themes, guardrails and manifest", async () => {
    const { resources } = await client.listResources()
    const uris = resources.map((r) => r.uri)

    expect(uris.filter((u) => u.startsWith("tfds://components/"))).toHaveLength(9)
    expect(uris.filter((u) => u.startsWith("tfds://tokens/"))).toHaveLength(3)
    expect(uris).toContain("tfds://guardrails")
    expect(uris).toContain("tfds://manifest")
  })

  it("reads a component meta resource", async () => {
    const result = await client.readResource({ uri: "tfds://components/button" })
    const parsed = JSON.parse(firstText(result)) as { name: string; componentName: string }
    expect(parsed.name).toBe("Button")
    expect(parsed.componentName).toBe("button")
  })

  it("reads resolved tokens for a theme", async () => {
    const result = await client.readResource({ uri: "tfds://tokens/ocean-sunset" })
    const parsed = JSON.parse(firstText(result)) as Record<string, unknown>
    expect(parsed["color"]).toBeDefined()
  })

  it("reads the manifest with the DS versions", async () => {
    const result = await client.readResource({ uri: "tfds://manifest" })
    const parsed = JSON.parse(firstText(result)) as { dsVersions: Record<string, string> }
    expect(parsed.dsVersions).toEqual(data.manifest.dsVersions)
  })

  it("rejects an unknown component uri with the valid names", async () => {
    await expect(client.readResource({ uri: "tfds://components/tooltip" })).rejects.toThrow(
      /Unknown component "tooltip"/,
    )
  })
})

describe("setup_project prompt (MCP-04)", () => {
  it("is listed and returns setup instructions grounded in the bundled data", async () => {
    const { prompts } = await client.listPrompts()
    expect(prompts.map((p) => p.name)).toContain("setup_project")

    const result = await client.getPrompt({ name: "setup_project" })
    const message = result.messages[0]
    if (message?.content.type !== "text") throw new Error("expected text prompt message")

    expect(message.content.text).toContain("npm install @tfds/react @tfds/tokens @tfds/icons")
    expect(message.content.text).toContain('@import "@tfds/tokens/css";')
    expect(message.content.text).toContain("@source")
    expect(message.content.text).toContain("ocean-sunset")
  })
})
