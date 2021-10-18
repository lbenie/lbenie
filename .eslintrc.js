/* eslint-disable functional/immutable-data */
/**
 * @type {import('eslint').CLIEngine.Options}
 */
module.exports = {
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:lit/recommended',
    'plugin:lit-a11y/recommended',
    'plugin:functional/no-mutations',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  parser: '@typescript-eslint/parser',
  plugins: ['prettier', '@typescript-eslint', 'lit', 'lit-a11y', 'functional'],
  rules: {
    'prettier/prettier': ['error'],
    '@typescript-eslint/consistent-type-imports': ['error'],
    '@typescript-eslint/prefer-readonly': ['error', { ignoreClass: true }],
    'functional/immutable-data': ['error', { ignoreClass: true }],
    'functional/prefer-readonly-type': ['error', { ignoreClass: true }],
  },
  env: {
    browser: true,
    node: true,
  },
}
