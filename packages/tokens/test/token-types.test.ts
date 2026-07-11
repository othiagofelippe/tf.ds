import { execFile } from "child_process"
import { promisify } from "util"
import { beforeAll, describe, expect, it } from "vitest"
import { flattenTokenNames, main } from "../build.js"

const exec = promisify(execFile)

beforeAll(async () => {
  await main()
})

async function typeCheck(fixture: string) {
  try {
    await exec("npx", ["tsc", "--noEmit", `test/fixtures/${fixture}.ts`, "--strict"], {
      cwd: process.cwd(),
    })
    return { ok: true, output: "" }
  } catch (error) {
    const err = error as { stdout?: string; stderr?: string }
    return { ok: false, output: `${err.stdout ?? ""}${err.stderr ?? ""}` }
  }
}

describe("flattenTokenNames", () => {
  it("flattens a nested token tree into dot-path names", () => {
    const names = flattenTokenNames({
      color: { text: { primary: "oklch(0 0 0)" } },
      space: { "1": "0.25rem" },
    })

    expect(names).toEqual(["color.text.primary", "space.1"])
  })
})

describe("TokenName union", () => {
  it("accepts a valid token name", async () => {
    const result = await typeCheck("valid-token-name")
    expect(result.output).toBe("")
    expect(result.ok).toBe(true)
  }, 20000)

  it("rejects an invalid token name at type-check", async () => {
    const result = await typeCheck("invalid-token-name")
    expect(result.ok).toBe(false)
    expect(result.output).toMatch(/color\.does\.not\.exist/)
  }, 20000)
})
