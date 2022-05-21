module.exports = {
  root: true,
  env: {
    browser: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
  ],
  rules: {
    '@typescript-eslint/semi': ['error', 'never'],
    '@typescript-eslint/no-explicit-any': 'off',
    quotes: ['error', 'single', {avoidEscape: true}],
    'object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    '@next/next/no-img-element': 'off',
  },
  overrides: [{ files: ['**/*.ts', '**/*.test.ts'] }],
}
