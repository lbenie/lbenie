module.exports = {
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    'prettier',
    'prettier/vue',
    'plugin:gridsome/recommended',
  ],
  plugins: ['prettier', 'gridsome'],
  rules: {
    'prettier/prettier': ['error'],
  },
  env: {
    browser: true,
    node: true,
  },
}
