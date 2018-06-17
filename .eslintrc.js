module.exports = {
  root: true,
  plugins: ['prettier'],
  extends: ['@webpack-contrib/eslint-config-webpack'],
  rules: {
    'prettier/prettier': [
      'error',
      { singleQuote: true, trailingComma: 'es5', arrowParens: 'always' },
    ],
    'prefer-destructuring': ['error', {'object': true, 'array': false}],
    'newline-per-chained-call': ['error', { 'ignoreChainWithDepth': 4 }],
    'line-comment-position': ['off'],
  },
  overrides: [{
    files: ['*.test.*', 'on.js'],
    rules: {
      'semi': ['error', 'always', { 'omitLastInOneLineBlock': true }],
      'quotes': ['error', 'single'],
      'comma-dangle': ['error', 'always-multiline'],
      'arrow-parens': ['error', 'as-needed'],
      'prettier/prettier': 'off',
    }
  }]
};
