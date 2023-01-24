module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    cyress: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'cypress'
  ],
  rules: {
    'react/function-component-definition': [0],
    'no-underscore-dangle': [0],
    'import/ignore': [0],
    'import/no-extraneous-dependencies': [0],
  },
};
