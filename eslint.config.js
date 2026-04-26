import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      "@stylistic": stylistic
    }
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "quotes": ["error", "single", { "avoidEscape": true }],
      "@stylistic/semi": ["error", "never"],
      "@stylistic/member-delimiter-style": [
        "error",
        {
          multiline: {
            delimiter: "none",
            requireLast: false
          },
          singleline: {
            delimiter: "comma",
            requireLast: false
          }
        }
      ],
      "array-bracket-newline": ["error", "always"],
      "array-element-newline": ["error", "always"],
      "comma-dangle": [
        "error",
        {
          arrays: "always-multiline",
          objects: "always-multiline",
          imports: "always-multiline",
          exports: "always-multiline",
          functions: "never"
        }
      ],
      "object-curly-newline": [
        "error",
        {
          ObjectExpression: "always",
          ObjectPattern: "always",
          ImportDeclaration: "never",
          ExportDeclaration: "always"
        }
      ],
      "object-property-newline": ["error", { "allowAllPropertiesOnSameLine": false }],
      "multiline-ternary": ["error", "always-multiline"],
      "operator-linebreak": [
        "error",
        "before",
        {
          overrides: {
            "?": "before",
            ":": "before"
          }
        }
      ],
      "no-console": "off",
    },
  },
];
