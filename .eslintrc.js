  module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  "extends": "xo",
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
      "max-len": [2 , 200],
      'dot-notation': [0, { "allowKeywords": false }],
      "indent": ["error", "tab"],
      "@typescript-eslint/no-unused-vars": 2,
      "no-new": "off",
      "no-undef": "off", // отключил так как использую TS, а в нем есть HTMLElement и тд
      "radix": "off",
      "no-constructor-return": "off", // для синглтонов
      "default-param-last": "off"
  }

  }