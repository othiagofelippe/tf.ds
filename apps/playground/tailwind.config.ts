import type { Config } from "tailwindcss"
import tokensPreset from "../../packages/tokens/dist/tailwind/preset.js"

const config: Config = {
  presets: [tokensPreset],
  content: ["./src/**/*.{ts,tsx}", "../../packages/components/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      transitionDuration: {
        fast: "var(--tfds-duration-fast)",
        normal: "var(--tfds-duration-normal)",
        slow: "var(--tfds-duration-slow)",
      },
      transitionTimingFunction: {
        default: "var(--tfds-ease-default)",
        in: "var(--tfds-ease-in)",
        out: "var(--tfds-ease-out)",
      },
      opacity: {
        disabled: "var(--tfds-opacity-disabled, 0.4)",
        loading: "var(--tfds-opacity-loading, 0.7)",
      },
    },
  },
}

export default config
