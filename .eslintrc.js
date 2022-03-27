module.exports = {
  extends: "next/core-web-vitals",
  env: {
    browser: true
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/semi': ['error', 'never'],
    'quotes': ['error', 'single'],
    'object-curly-spacing': ['error', 'always']
  },
  overrides: [{ files: ['**/*.ts', '**/*.test.ts'] }]
}
