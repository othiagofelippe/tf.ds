import { describe, expect, it } from "vitest"
import { createTestClient, createTestData } from "./test/fixture"

describe("tfds-mcp server", () => {
  it("completes MCP initialization and reports server identity", async () => {
    const { data, cleanup } = createTestData()
    const client = await createTestClient(data)
    const serverInfo = client.getServerVersion()

    expect(serverInfo?.name).toBe("tfds-mcp")
    expect(serverInfo?.version).toBe("0.0.0")

    await client.close()
    cleanup()
  })
})
