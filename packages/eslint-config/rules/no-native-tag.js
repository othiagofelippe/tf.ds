import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// guardrails.json is the single source of truth (AD-004); it lives at the repo
// root docs/ dir, resolved relative to this rule inside the monorepo.
const guardrailsPath = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../../../docs/guardrails.json"
);

const guardrails = JSON.parse(readFileSync(guardrailsPath, "utf8"));
const noNativeTagConfig = guardrails.rules.find(
  (rule) => rule.id === "no-native-tag"
);

const matrix = noNativeTagConfig.matrix;
const exceptions = new Set(noNativeTagConfig.exceptions);

export const noNativeTag = {
  meta: {
    type: "problem",
    docs: {
      description: noNativeTagConfig.description,
    },
    messages: {
      nativeTag:
        "Native <{{tag}}> is not allowed. Use {{replacement}} from @tfds/react instead.",
    },
    schema: [],
  },
  create(context) {
    return {
      JSXOpeningElement(node) {
        if (node.name.type !== "JSXIdentifier") {
          return;
        }

        const tag = node.name.name;

        if (exceptions.has(tag)) {
          return;
        }

        const replacements = matrix[tag];

        if (!replacements) {
          return;
        }

        context.report({
          node,
          messageId: "nativeTag",
          data: { tag, replacement: replacements.join(" or ") },
        });
      },
    };
  },
};
