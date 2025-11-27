import rules from '@lbenie/linting/eslint'

export default [
  ...rules,
  {
    ignores: ['src/types/contentful-graphql.ts'],
  },
]
