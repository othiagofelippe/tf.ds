import { describe, expect, it } from "vitest"
import { validateTokenFiles } from "../build.js"

const fixture = (name: string) => `test/fixtures/tokens/${name}.tokens.json`

describe("validateTokenFiles", () => {
  it("passes for valid DTCG tokens with a resolvable cross-file alias", async () => {
    await expect(
      validateTokenFiles([fixture("valid-a"), fixture("valid-b-with-alias")]),
    ).resolves.toBeUndefined()
  })

  it("fails with the file and token path when $type is missing", async () => {
    await expect(validateTokenFiles([fixture("invalid-missing-type")])).rejects.toThrow(
      /invalid-missing-type\.tokens\.json.*"color\.brand".*\$type/,
    )
  })

  it("fails with the file, token and alias target when an alias is broken", async () => {
    await expect(validateTokenFiles([fixture("invalid-broken-alias")])).rejects.toThrow(
      /invalid-broken-alias\.tokens\.json.*"color\.action\.primary".*color\.deleted/,
    )
  })

  it("fails with a clear message on malformed JSON", async () => {
    await expect(validateTokenFiles([fixture("invalid-json")])).rejects.toThrow(
      /invalid-json\.tokens\.json/,
    )
  })

  it("passes for the real source token files (no schema/alias regressions)", async () => {
    await expect(validateTokenFiles()).resolves.toBeUndefined()
  })
})
