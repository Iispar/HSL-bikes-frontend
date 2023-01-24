module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    'cypress/globals': true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:cypress/recommended'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'cypress/globals'
  ],
  rules: {
    'react/function-component-definition': [0],
    'no-underscore-dangle': [0],
    'import/ignore': [0],
    'import/no-extraneous-dependencies': [0],
  },
};
