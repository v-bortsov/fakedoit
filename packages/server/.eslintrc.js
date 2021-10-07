module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended',],
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      'impliedStrict': true
    },
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars-experimental': ['warn', { ignoreArgsIfArgsAfterAreUsed: false }],
    'arrow-body-style': ['error', 'as-needed'],
    'max-statements-per-line': ['error', { 'max': 2 }],
    'newline-per-chained-call': ['error', { 'ignoreChainWithDepth': 1 }],
    'indent': [
      'error',
      2,
      { 'ImportDeclaration': 1, 'ArrayExpression': 1, 'ObjectExpression': 1 }
    ],
    'implicit-arrow-linebreak': ['error', 'beside'],
    'quotes': [
      'warn',
      'single',
      { avoidEscape: true }
    ],
    'function-paren-newline': ['error', { 'minItems': 2}],
    'function-call-argument-newline': ['error', 'always'],
    'array-bracket-newline': ['error',  { 'multiline': true }],
    'array-element-newline': ['error', {'ArrayExpression': { 'minItems': 3 },'ArrayPattern': { 'minItems': 3 }}],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': [
        '.ts',
        '.tsx',
        '.d.ts'
      ]
    },
    'propWrapperFunctions': [
      // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
      'forbidExtraProps',
      {'property': 'freeze', 'object': 'Object'},
      {'property': 'myFavoriteWrapper'}
    ],
    'linkComponents': [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      'Hyperlink', {'name': 'Link', 'linkAttribute': 'to'}
    ]
  }
}
