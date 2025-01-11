/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
    "plugin:import/recommended",
    "plugin:import/electron",
    "plugin:import/typescript",
    "plugin:eslint-comments/recommended",
  ],
  settings: {
    "import/resolver": {
      typescript: true,
    },
    react: {
      version: "detect",
    },
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"],
    tsconfigRootDir: __dirname,
  },
  plugins: ["eslint-comments"],
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
    "react/jsx-sort-props": [
      "error",
      {
        reservedFirst: ["key", "dangerouslySetInnerHTML", "ref"],
      },
    ],
    "import/no-unresolved": "error",
    "import/no-default-export": "error",
    "import/order": "error",
    "import/no-named-as-default": "off",
    "eslint-comments/require-description": "error",
    "object-shorthand": "warn",
    "no-console": ["error", { allow: ["info", "error", "warn"] }],
  },
  overrides: [
    {
      files: ["*.config.ts"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
  ignorePatterns: [".eslintrc.cjs"],
};
