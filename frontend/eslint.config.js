import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "no-console": "warn",
      "react/require-default-props": "off",
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": ["error"],
      "react/jsx-props-no-spreading": "off",
      "max-len": [
        "warn",
        {
          code: 120,
          ignoreComments: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],
      "react/function-component-definition": "off",
      "react/jsx-no-duplicate-props": [
        "error",
        {
          ignoreCase: false,
        },
      ],
      "import/no-extraneous-dependencies": "off",
      // "no-magic-numbers": "error"
    },
  },
];
