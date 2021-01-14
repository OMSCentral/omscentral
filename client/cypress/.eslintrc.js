module.exports = {
  extends: ['../.eslintrc.js'],
  globals: {
    Cypress: true,
    cy: true,
  },
  ignorePatterns: ['*.d.ts'],
  rules: {
    '@typescript-eslint/triple-slash-reference': 'off',
    'security/detect-non-literal-regexp': 'off',
  },
};
