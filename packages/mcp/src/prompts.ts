import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import type { BundledData } from "./data"

export function registerPrompts(server: McpServer, data: BundledData): void {
  server.registerPrompt(
    "setup_project",
    {
      description:
        "Guide an agent through installing and configuring tf.ds in a React + Tailwind v4 project",
    },
    () => {
      const versions = Object.entries(data.manifest.dsVersions)
        .map(([pkg, version]) => `${pkg}@${version}`)
        .join(", ")
      const components = data.components.map((c) => c.name).join(", ")
      const themes = Object.keys(data.tokens).join(", ")

      const text = [
        `Set up the tf.ds design system (${versions}) in this project:`,
        "",
        "1. Install: `npm install @tfds/react @tfds/tokens @tfds/icons`",
        "2. In the global CSS, import the tokens and register the package source for Tailwind v4:",
        '   `@import "@tfds/tokens/css";`',
        '   `@source "../node_modules/@tfds/react/dist";`',
        `3. Themes are applied via class on the root element: ${themes} (light is \`:root\`).`,
        `4. Use DS components instead of native tags — available: ${components}.`,
        "5. Call the `get_guardrails` tool for the native-tag matrix and exceptions, and `get_component` for props/variants before using a component.",
      ].join("\n")

      return { messages: [{ role: "user" as const, content: { type: "text" as const, text } }] }
    },
  )
}
