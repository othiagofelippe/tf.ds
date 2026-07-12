import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { loadBundledData } from "./data"
import { createServer } from "./server"

async function main(): Promise<void> {
  const server = createServer(loadBundledData())
  const transport = new StdioServerTransport()
  await server.connect(transport)
}

main().catch((error: unknown) => {
  console.error(error)
  process.exit(1)
})
