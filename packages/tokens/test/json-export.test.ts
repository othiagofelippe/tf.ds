import { readFile } from "fs/promises"
import { beforeAll, describe, expect, it } from "vitest"
import { main, themes } from "../build.js"

beforeAll(async () => {
  await main()
})

describe("./json export", () => {
  it.each(themes)("generates a resolved JSON file for theme $name", async (theme) => {
    const raw = await readFile(`dist/json/${theme.name}.json`, "utf-8")
    const json = JSON.parse(raw)

    expect(json.color.text.primary).toBeTypeOf("string")
  })

  it("resolves values instead of leaving alias references", async () => {
    const raw = await readFile("dist/json/light.json", "utf-8")

    expect(raw).not.toMatch(/\{[a-z]+(\.[a-z0-9]+)+\}/i)
  })

  it("exposes the tokens object as the theme's full token tree", async () => {
    const raw = await readFile("dist/json/light.json", "utf-8")
    const json = JSON.parse(raw)

    expect(json.color.action.primary).toBeTypeOf("string")
    expect(json.space).toBeDefined()
  })
})
