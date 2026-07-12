import { mkdtempSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { Client } from "@modelcontextprotocol/sdk/client/index.js"
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js"
import { bundleData } from "../../scripts/bundle-data.mjs"
import { loadBundledData, type BundledData } from "../data"
import { createServer } from "../server"

export function createTestData(): { data: BundledData; cleanup: () => void } {
  const outDir = mkdtempSync(join(tmpdir(), "tfds-mcp-fixture-"))
  bundleData({ repoRoot: join(__dirname, "..", "..", "..", ".."), outDir })
  return {
    data: loadBundledData(outDir),
    cleanup: () => {
      rmSync(outDir, { recursive: true, force: true })
    },
  }
}

export async function createTestClient(data: BundledData): Promise<Client> {
  const server = createServer(data)
  const client = new Client({ name: "test-client", version: "0.0.0" })
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair()
  await Promise.all([server.connect(serverTransport), client.connect(clientTransport)])
  return client
}

export function textOf(result: unknown): string {
  const content = (result as { content?: { type: string; text: string }[] }).content
  const first = content?.[0]
  if (first?.type !== "text") {
    throw new Error("expected text content")
  }
  return first.text
}
