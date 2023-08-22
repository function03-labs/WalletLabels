/** @type {import('prettier').Config} */
module.exports = {
  endOfLine: "auto",
  semi: false,
  singleQuote: false,
  printWidth: 80,
  // classNames and attributes should be in the same line
  jsxBracketSameLine: true,
  // no extra white space or white line
  jsxSingleQuote: false,
  // no extra white space or white line
  arrowParens: "avoid",
  // no extra white space or white line
  bracketSpacing: true,
  // no extra white space or white line
  htmlWhitespaceSensitivity: "css",
  // no extra white space or white line
  insertPragma: false,
  tabWidth: 2,
  trailingComma: "es5",
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^types$",
    "^@/types/(.*)$",
    "^@/config/(.*)$",
    "^@/lib/(.*)$",
    "^@/components/(.*)$",
    "^@/styles/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
}
