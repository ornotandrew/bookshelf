module.exports = {
  root: true,
  env: {
    browser: true
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    "next/core-web-vitals"
  ],
  rules: {
    '@typescript-eslint/semi': ['error', 'never'],
    'quotes': ['error', 'single'],
    'object-curly-spacing': ['error', 'always']
  },
  overrides: [{ files: ['**/*.ts', '**/*.test.ts'] }]
};
