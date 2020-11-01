const schemaJson = require('./src/graphql/graphql.schema.json');

module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:security/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'graphql',
    'react',
    'react-hooks',
    'security',
  ],
  root: true,
  settings: {
    'import/resolver': {
      typescript: {},
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
    ],
    '@typescript-eslint/no-var-requires': 'off',
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'graphql/template-strings': ['error', { env: 'literal', schemaJson }],
    'graphql/required-fields': [
      'error',
      { env: 'literal', requiredFields: ['id'], schemaJson },
    ],
    'no-console': 'warn',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-no-bind': [
      'error',
      { allowArrowFunctions: true, allowBind: false, ignoreRefs: true },
    ],
    'react/no-did-update-set-state': 'error',
    'react/no-unknown-property': 'error',
    'react/no-unused-prop-types': 'error',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'error',
    'security/detect-object-injection': 'off',
  },
};
