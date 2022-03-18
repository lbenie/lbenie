/**
 * @type {import('eslint').CLIEngine.Options}
 */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
    'plugin:vuejs-accessibility/recommended',
    'plugin:tailwindcss/recommended',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json',
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    'prettier',
    '@typescript-eslint',
    'vuejs-accessibility',
    'tailwindcss',
  ],
  rules: {
    'prettier/prettier': [
      'error',
      { singleQuote: true, semi: false, trailingComma: 'all' },
    ],
    '@typescript-eslint/consistent-type-imports': ['error'],
    '@typescript-eslint/prefer-readonly': ['error', { ignoreClass: true }],
  },
  env: {
    browser: true,
    node: true,
  },
  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      rules: {
        'no-unused-vars': 'off',
        'no-undef': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'vue/max-attributes-per-line': ['warn', { singleline: 5 }],
        'vue/no-v-html': 'off',
        'vue/multi-word-component-names': 'off',
        'tailwindcss/no-custom-classname': 'off',
      },
    },
  ],
}
