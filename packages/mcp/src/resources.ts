import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js"
import type { BundledData } from "./data"

function jsonContents(uri: string, value: unknown) {
  return { contents: [{ uri, mimeType: "application/json", text: JSON.stringify(value, null, 2) }] }
}

export function registerResources(server: McpServer, data: BundledData): void {
  server.registerResource(
    "component",
    new ResourceTemplate("tfds://components/{name}", {
      list: () => ({
        resources: data.components.map((c) => ({
          uri: `tfds://components/${c.componentName}`,
          name: c.name,
          description: c.description,
          mimeType: "application/json",
        })),
      }),
    }),
    { description: "Registry entry (meta.json) of a tf.ds component" },
    (uri, variables) => {
      const name = String(variables.name)
      const component = data.components.find((c) => c.componentName === name)
      if (!component) {
        throw new Error(
          `Unknown component "${name}". Valid: ${data.components.map((c) => c.componentName).join(", ")}`,
        )
      }
      return jsonContents(uri.href, component)
    },
  )

  server.registerResource(
    "tokens",
    new ResourceTemplate("tfds://tokens/{theme}", {
      list: () => ({
        resources: Object.keys(data.tokens).map((theme) => ({
          uri: `tfds://tokens/${theme}`,
          name: `tokens (${theme})`,
          description: `Resolved design tokens for the ${theme} theme`,
          mimeType: "application/json",
        })),
      }),
    }),
    { description: "Resolved design tokens per theme" },
    (uri, variables) => {
      const theme = String(variables.theme)
      const tree = data.tokens[theme]
      if (!tree) {
        throw new Error(`Unknown theme "${theme}". Valid: ${Object.keys(data.tokens).join(", ")}`)
      }
      return jsonContents(uri.href, tree)
    },
  )

  server.registerResource(
    "guardrails",
    "tfds://guardrails",
    {
      description: "tf.ds usage guardrails (native-tag matrix, exceptions)",
      mimeType: "application/json",
    },
    (uri) => jsonContents(uri.href, data.guardrails),
  )

  server.registerResource(
    "manifest",
    "tfds://manifest",
    {
      description: "DS versions this server's data was bundled from",
      mimeType: "application/json",
    },
    (uri) => jsonContents(uri.href, data.manifest),
  )
}
