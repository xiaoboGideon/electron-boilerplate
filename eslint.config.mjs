import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import importPlugin from "eslint-plugin-import";
import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import tailwind from "eslint-plugin-tailwindcss";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
  comments.recommended,
  tailwind.configs["flat/recommended"],
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    extends: [
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
      importPlugin.flatConfigs.electron,
    ],
    settings: {
      "import/resolver": {
        typescript: {
          project: ["./tsconfig.app.json", "./tsconfig.node.json"],
          alwaysTryTypes: true,
        },
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
        "error",
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
      "@eslint-community/eslint-comments/require-description": "error",
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
  {
    files: ["eslint.config.mjs", ".prettierrc.mjs"],
    extends: [tseslint.configs.disableTypeChecked],
  },
  {
    ignores: [".vite", "postcss.config.js"],
  },
);
