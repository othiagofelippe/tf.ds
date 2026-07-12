import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { RuleTester } from "eslint";
import { describe, it } from "vitest";
import { noNativeTag } from "./no-native-tag.js";

RuleTester.describe = describe;
RuleTester.it = it;

const guardrailsPath = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../../../docs/guardrails.json"
);
const config = JSON.parse(readFileSync(guardrailsPath, "utf8")).rules.find(
  (rule) => rule.id === "no-native-tag"
);

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
});

ruleTester.run("no-native-tag", noNativeTag, {
  valid: [
    { code: "<Button>Click</Button>" },
    { code: "<VStack><Typography>Hi</Typography></VStack>" },
    ...config.exceptions.map((tag) => ({ code: `<${tag} />` })),
  ],
  invalid: Object.keys(config.matrix).map((tag) => ({
    code: `<${tag} />`,
    errors: [
      {
        messageId: "nativeTag",
        data: { tag, replacement: config.matrix[tag].join(" or ") },
      },
    ],
  })),
});
