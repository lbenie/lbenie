module.exports = {
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    'prettier',
    'plugin:gridsome/recommended',
  ],
  plugins: ['prettier', 'vue', 'gridsome'],
  rules: {
    'prettier/prettier': ['error'],
  },
  env: {
    browser: true,
    node: true,
  },
}
