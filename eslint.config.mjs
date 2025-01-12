import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import eslintComments from "eslint-plugin-eslint-comments";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      "**/.eslintrc.cjs",
      ".vite",
      ".prettierrc.mjs",
      "eslint.config.mjs",
      "postcss.config.js",
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "plugin:react/jsx-runtime",
      "plugin:import/recommended",
      "plugin:import/electron",
      "plugin:import/typescript",
      "plugin:eslint-comments/recommended",
      "plugin:tailwindcss/recommended",
    ),
  ),
  {
    plugins: {
      "eslint-comments": fixupPluginRules(eslintComments),
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 5,
      sourceType: "commonjs",

      parserOptions: {
        project: ["./tsconfig.app.json", "./tsconfig.node.json"],
        tsconfigRootDir: "/Users/kimizuy/Documents/dev/electron-boilerplate",
      },
    },

    settings: {
      "import/resolver": {
        typescript: {
          project: ["./tsconfig.app.json", "./tsconfig.node.json"],
          alwaysTryTypes: true,
        },
      },

      react: {
        version: "detect",
      },
    },

    rules: {
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": "off",

      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],

      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
        },
      ],

      "@typescript-eslint/require-await": "off",

      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],

      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "import/no-unresolved": "error",
      "import/no-default-export": "error",
      "import/order": "error",
      "import/no-named-as-default": "off",
      "eslint-comments/require-description": "error",
      "object-shorthand": "warn",

      "no-console": [
        "error",
        {
          allow: ["info", "error", "warn"],
        },
      ],
    },
  },
  {
    files: ["**/*.config.ts"],

    rules: {
      "import/no-default-export": "off",
    },
  },
];
