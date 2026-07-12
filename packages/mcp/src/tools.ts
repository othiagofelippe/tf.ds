import { z } from "zod"
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import type { BundledData, ComponentMeta, TokenTree } from "./data"

interface ToolText {
  [key: string]: unknown
  content: { [key: string]: unknown; type: "text"; text: string }[]
  isError?: boolean
}

function jsonResult(value: unknown): ToolText {
  return { content: [{ type: "text", text: JSON.stringify(value, null, 2) }] }
}

function errorResult(text: string): ToolText {
  return { isError: true, content: [{ type: "text", text }] }
}

function findComponent(data: BundledData, name: string): ComponentMeta | undefined {
  const query = name.toLowerCase()
  return data.components.find(
    (c) => c.name.toLowerCase() === query || c.componentName.toLowerCase() === query,
  )
}

function unknownComponent(data: BundledData, name: string): ToolText {
  const valid = data.components.map((c) => c.name).join(", ")
  return errorResult(`Unknown component "${name}". Valid components: ${valid}`)
}

export function flattenTokens(tree: TokenTree, prefix = ""): { token: string; value: string }[] {
  const entries: { token: string; value: string }[] = []
  for (const [key, value] of Object.entries(tree)) {
    const path = prefix ? `${prefix}.${key}` : key
    if (typeof value === "string") {
      entries.push({ token: path, value })
    } else {
      entries.push(...flattenTokens(value, path))
    }
  }
  return entries
}

const MAX_TOKEN_MATCHES = 100

export function registerTools(server: McpServer, data: BundledData): void {
  server.registerTool(
    "list_components",
    { description: "List all tf.ds components with status and description" },
    () =>
      jsonResult({
        dsVersions: data.manifest.dsVersions,
        components: data.components.map(({ name, componentName, status, description }) => ({
          name,
          componentName,
          status,
          description,
        })),
      }),
  )

  server.registerTool(
    "get_component",
    {
      description:
        "Get the full registry entry (props, variants, tokens used, dos/donts, analytics) for a tf.ds component",
      inputSchema: { name: z.string().describe("Component name, e.g. Button") },
    },
    ({ name }) => {
      const component = findComponent(data, name)
      return component ? jsonResult(component) : unknownComponent(data, name)
    },
  )

  server.registerTool(
    "search_tokens",
    {
      description:
        "Search resolved design tokens by name or value; optionally filter by theme (light, dark, ocean-sunset)",
      inputSchema: {
        query: z.string().describe("Substring matched against token path or value"),
        theme: z.string().optional().describe("Theme to search; defaults to all themes"),
      },
    },
    ({ query, theme }) => {
      const themes = Object.keys(data.tokens)
      if (theme !== undefined && !themes.includes(theme)) {
        return errorResult(`Unknown theme "${theme}". Valid themes: ${themes.join(", ")}`)
      }
      const q = query.toLowerCase()
      const matches = (theme ? [theme] : themes).flatMap((t) => {
        const tree = data.tokens[t]
        if (!tree) return []
        return flattenTokens(tree)
          .filter(
            (entry) =>
              entry.token.toLowerCase().includes(q) || entry.value.toLowerCase().includes(q),
          )
          .map((entry) => ({ theme: t, ...entry }))
      })
      return jsonResult({ total: matches.length, matches: matches.slice(0, MAX_TOKEN_MATCHES) })
    },
  )

  server.registerTool(
    "get_guardrails",
    { description: "Get the tf.ds usage guardrails (native-tag matrix, exceptions, severities)" },
    () => jsonResult(data.guardrails),
  )

  server.registerTool(
    "get_examples",
    {
      description: "Get curated usage examples for a tf.ds component",
      inputSchema: { name: z.string().describe("Component name, e.g. Button") },
    },
    ({ name }) => {
      const component = findComponent(data, name)
      return component
        ? jsonResult({
            name: component.name,
            examples: component.examples,
            dos: component.dos,
            donts: component.donts,
          })
        : unknownComponent(data, name)
    },
  )
}
