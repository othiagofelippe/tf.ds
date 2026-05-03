import StyleDictionary from "style-dictionary"

const themes = [
  { name: "light", selector: ":root" },
  { name: "dark", selector: ".dark" },
  { name: "ocean", selector: ".ocean" },
]

const primitiveFiles = [
  "src/primitive/color.tokens.json",
  "src/primitive/typography.tokens.json",
  "src/primitive/spacing.tokens.json",
  "src/primitive/effect.tokens.json",
]

async function buildPrimitives() {
  const sd = new StyleDictionary({
    usesDtcg: true,
    source: primitiveFiles,
    platforms: {
      css: {
        transformGroup: "css",
        prefix: "tfds",
        buildPath: "dist/css/",
        files: [
          {
            destination: "primitives.css",
            format: "css/variables",
            options: { selector: ":root", outputReferences: false },
          },
        ],
      },
      js: {
        transformGroup: "js",
        buildPath: "dist/js/",
        files: [
          {
            destination: "primitives.js",
            format: "javascript/es6",
          },
        ],
      },
    },
  })

  await sd.buildAllPlatforms()
}

async function buildTheme(theme) {
  const sd = new StyleDictionary({
    usesDtcg: true,
    source: [`src/semantic/${theme.name}.tokens.json`],
    platforms: {
      css: {
        transformGroup: "css",
        prefix: "tfds",
        buildPath: "dist/css/themes/",
        files: [
          {
            destination: `${theme.name}.css`,
            format: "css/variables",
            options: { selector: theme.selector, outputReferences: false },
          },
        ],
      },
      js: {
        transformGroup: "js",
        buildPath: "dist/js/themes/",
        files: [
          {
            destination: `${theme.name}.js`,
            format: "javascript/es6",
          },
        ],
      },
    },
  })

  await sd.buildAllPlatforms()
}

async function buildIndex() {
  const cssImports = [
    `@import './primitives.css';`,
    ...themes.map((t) => `@import './themes/${t.name}.css';`),
  ].join("\n")

  const { writeFile, mkdir } = await import("fs/promises")
  await mkdir("dist/css", { recursive: true })
  await writeFile("dist/css/index.css", cssImports)
}

async function buildTailwindPreset() {
  const preset = `
export default {
  theme: {
    extend: {
      colors: {
        "text-primary":          "var(--tfds-color-text-primary)",
        "text-secondary":        "var(--tfds-color-text-secondary)",
        "text-tertiary":         "var(--tfds-color-text-tertiary)",
        "text-disabled":         "var(--tfds-color-text-disabled)",
        "text-inverse":          "var(--tfds-color-text-inverse)",
        "text-on-brand":         "var(--tfds-color-text-on-brand)",
        "bg-page":               "var(--tfds-color-bg-page)",
        "bg-default":            "var(--tfds-color-bg-default)",
        "bg-subtle":             "var(--tfds-color-bg-subtle)",
        "bg-muted":              "var(--tfds-color-bg-muted)",
        "surface-default":       "var(--tfds-color-surface-default)",
        "surface-raised":        "var(--tfds-color-surface-raised)",
        "surface-sunken":        "var(--tfds-color-surface-sunken)",
        "border-default":        "var(--tfds-color-border-default)",
        "border-subtle":         "var(--tfds-color-border-subtle)",
        "border-strong":         "var(--tfds-color-border-strong)",
        "action-primary":        "var(--tfds-color-action-primary)",
        "action-primary-hover":  "var(--tfds-color-action-primary-hover)",
        "feedback-success":      "var(--tfds-color-feedback-success)",
        "feedback-error":        "var(--tfds-color-feedback-error)",
        "feedback-warning":      "var(--tfds-color-feedback-warning)",
        "interactive-focus":     "var(--tfds-color-interactive-focus)",
      },
      fontFamily: {
        sans:    "var(--tfds-font-family-sans)",
        display: "var(--tfds-font-family-display)",
        mono:    "var(--tfds-font-family-mono)",
      },
      borderRadius: {
        none: "var(--tfds-radius-none)",
        xs:   "var(--tfds-radius-xs)",
        sm:   "var(--tfds-radius-sm)",
        md:   "var(--tfds-radius-md)",
        lg:   "var(--tfds-radius-lg)",
        xl:   "var(--tfds-radius-xl)",
        full: "var(--tfds-radius-full)",
      },
    },
  },
}
`.trim()

  const { writeFile, mkdir } = await import("fs/promises")
  await mkdir("dist/tailwind", { recursive: true })
  await writeFile("dist/tailwind/preset.js", preset)
}

async function main() {
  console.log("Building @tfds/tokens...")

  await buildPrimitives()
  for (const theme of themes) {
    await buildTheme(theme)
  }
  await buildIndex()
  await buildTailwindPreset()

  console.log("Done!")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
