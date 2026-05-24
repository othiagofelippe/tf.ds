import config from "@tfds/eslint-config";

export default [
  ...config,
  {
    ignores: ["src/index.ts"],
  },
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
