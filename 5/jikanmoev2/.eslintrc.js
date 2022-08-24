module.exports = {
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["react", "@typescript-eslint", "jest", "import"],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
    project: ["./tsconfig.json"],
  },
  rules: {
    "@typescript-eslint/no-unused-vars": "warn",
    "linebreak-style": "off",
    "react/function-component-definition": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "import/prefer-default-export": "off",
    "no-plusplus": "off",
    "default-param-last": "off",
    "@typescript-eslint/default-param-last": "off",
    "react-hooks/exhaustive-deps": "warn",
    "react/destructuring-assignment": "off",
    "react/require-default-props": "off",
    "no-nested-ternary": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
