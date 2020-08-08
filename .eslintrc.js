const path = require("path");

module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    project: path.join(__dirname, "tsconfig.json"),
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "import", "jest", "prettier", "react"],
  rules: {
    "@typescript-eslint/array-type": "error",
    "@typescript-eslint/consistent-type-definitions": "error",
    "@typescript-eslint/member-ordering": "error",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "interface",
        format: ["PascalCase"],
        custom: { regex: "^I[A-Z]", match: true },
      },
    ],
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-empty-interface": [
      "error",
      { allowSingleExtends: true },
    ],
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-require-imports": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/prefer-readonly": "error",
    "arrow-body-style": "error",
    "import/no-cycle": "error",
    "import/no-default-export": "error",
    "import/no-unused-modules": "error",
    "import/order": ["error", { alphabetize: { order: "asc" } }],
    "no-duplicate-imports": "error",
    "no-else-return": "error",
    "no-return-await": "error",
    "no-unused-vars": "off",
    "no-useless-return": "error",
    "react/jsx-curly-brace-presence": "error",
    "react/jsx-sort-props": "error",
    "sort-keys": "error",
  },
  env: {
    browser: true,
    es6: true,
    "jest/globals": true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
