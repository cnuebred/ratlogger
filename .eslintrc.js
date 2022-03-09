module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: [
    '@typescript-eslint',
    'prettier'
  ],
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    indent: 0,
    eqeqeq: 0
  }
}
