import { describe, expect, it } from "vitest"
import { Client } from "@modelcontextprotocol/sdk/client/index.js"
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js"
import { createServer } from "./server"

async function connectedClient(): Promise<Client> {
  const server = createServer()
  const client = new Client({ name: "test-client", version: "0.0.0" })
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair()
  await Promise.all([server.connect(serverTransport), client.connect(clientTransport)])
  return client
}

describe("tfds-mcp server", () => {
  it("completes MCP initialization and reports server identity", async () => {
    const client = await connectedClient()
    const serverInfo = client.getServerVersion()

    expect(serverInfo?.name).toBe("tfds-mcp")
    expect(serverInfo?.version).toBe("0.0.0")

    await client.close()
  })
})
