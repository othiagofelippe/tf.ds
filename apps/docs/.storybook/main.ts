import path from "path"
import { fileURLToPath } from "url"
import type { StorybookConfig } from "@storybook/react-vite"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-themes", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal: async (config) => {
    config.resolve = config.resolve ?? {}
    config.resolve.alias = {
      ...config.resolve.alias,
      // Import components from source in dev — no build step required
      "@tfds/components": path.resolve(__dirname, "../../../packages/components/src/index.ts"),
    }
    return config
  },
}

export default config
