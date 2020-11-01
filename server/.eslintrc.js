const schemaJson = require('./src/graphql/graphql.schema.json');

module.exports = {
  env: {
    node: true,
  },
  extends: ['../.eslintrc.js'],
  plugins: ['graphql'],
  root: true,
  rules: {
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'graphql/template-strings': ['error', { env: 'apollo', schemaJson }],
    'graphql/required-fields': 'off',
  },
};
