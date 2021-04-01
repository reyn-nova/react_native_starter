module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'comma-dangle': ['error', 'never'],
    'consistent-this': 'off',
    'eol-last': ['error', 'always'],
    'max-depth': ['error', 3],
    'max-len': ['error', { 'code': 200 }],
    'max-lines': ['error', 2000],
    'no-alert': 'off',
    'no-confusing-arrow': 'error',
    'no-console': 'warn',
    'no-shadow': 'off',
    'no-trailing-spaces': ['warn', { 'ignoreComments': true }],
    'object-shorthand': ['error', 'always'],
    'operator-assignment': ['error', 'always'],
    'prefer-const': 'warn',
    'prettier/prettier': 0,
    'react-native/no-inline-styles': 'off',
    'spaced-comment': ['error', 'always'],
    eqeqeq: 'off',
    semi: ['error', 'never'],
    quotes: ['warn', 'single'],
    'no-return-assign': 'off',
    radix: 'off',
    '@typescript-eslint/no-unused-vars': 'warn'
  }
}
