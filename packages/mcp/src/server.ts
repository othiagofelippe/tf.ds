import { createRequire } from "node:module"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import type { BundledData } from "./data"
import { registerTools } from "./tools"

const require = createRequire(import.meta.url)
const { version } = require("../package.json") as { version: string }

export function createServer(data: BundledData): McpServer {
  const server = new McpServer({ name: "tfds-mcp", version })
  registerTools(server, data)
  return server
}
