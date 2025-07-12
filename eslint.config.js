// eslint.config.js
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
    rules: {
      '@typescript-eslint/no-require-imports': ['error', { allowConditionalRequires: true }],
    },
  },
]);
