module.exports = {
    extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "plugin:react/recommended"
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["prettier"],
    settings: {
      react: {
          version: "18"
      }
    },
    rules: {
        "@typescript-eslint/no-empty-function": "off",
        "prettier/prettier": [
            "error",
            {
                endOfLine: "auto",
            },
        ],
        "react/react-in-jsx-scope": "off"
    },
};
