import { createRequire } from "node:module"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"

const require = createRequire(import.meta.url)
const { version } = require("../package.json") as { version: string }

export function createServer(): McpServer {
  return new McpServer({ name: "tfds-mcp", version })
}
