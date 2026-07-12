import { beforeAll, describe, expect, it } from "vitest"
import { main } from "../build.js"

beforeAll(async () => {
  await main()
})

describe("./js export", () => {
  it("dist/js/index.js re-exports the primitive tokens", async () => {
    const mod = await import("../dist/js/index.js")

    expect(mod.ColorOcean50).toBe("oklch(0.96 0.01 205)")
  })
})
