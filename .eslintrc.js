module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  plugins: ['react'],
  parserOptions: {
    jsx: 'react',
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      impliedStrict: true,
    },
    // sourceType: 'module',
    useJSXTextNode: true,
    // tsconfigRootDir: __dirname,
    // project: ['./tsconfig.json'],
    sourceType: 'module',
    project: [
      './tsconfig.eslint.json',
      './packages/*/tsconfig.json'
    ],
    allowAutomaticSingleRunInference: true,
    tsconfigRootDir: __dirname,
    warnOnUnsupportedTypeScriptVersion: false,
    EXPERIMENTAL_useSourceOfProjectReferenceRedirect: false,
  },
  rules: {
    'no-prototype-builtins': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off', 
    // 'prettier/prettier': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'prefer-const': 'off',
    'react/display-name': 'off',
    '@typescript-eslint/no-unused-vars-experimental': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'arrow-body-style': [
      'error',
      'as-needed',
      { 'requireReturnForObjectLiteral': false }
    ],
    'max-statements-per-line': [
      'error',
      { max: 2 }
    ],
    'newline-per-chained-call': [
      'error',
      { ignoreChainWithDepth: 1 }
    ],
    indent: [
      'error',
      2
    ],
    'implicit-arrow-linebreak': [
      'error',
      'beside'
    ],
    quotes: [
      'warn',
      'single',
      { avoidEscape: true }
    ],
    'no-case-declarations': 'off',
    'react/jsx-key': 'off',
    'react/jsx-first-prop-new-line': [
      'warn',
      'multiline'
    ],
    'react/jsx-max-props-per-line': [
      'warn',
      { when: 'multiline' }
    ],
    'react/jsx-closing-bracket-location': [
      1,
      {selfClosing: 'tag-aligned'}
    ],
    'react/jsx-wrap-multilines': [
      'warn',
      {
        'declaration': 'parens-new-line',
        'assignment': 'parens',
        'return': 'parens-new-line',
        'arrow': 'parens-new-line',
        'condition': 'parens-new-line',
        'logical': 'parens-new-line',
        'prop': 'parens-new-line'
      }
    ],
    'function-paren-newline': [
      'error',
      { minItems: 2 }
    ],
    'function-call-argument-newline': [
      'error',
      'always'
    ],
    'array-bracket-newline': [
      'error',
      { multiline: true }
    ],
    'array-element-newline': [
      'error',
      { ArrayExpression: 'always', ArrayPattern: { minItems: 3 } },
    ],
    'object-curly-newline': 'off',
    'arrow-parens': [
      'error',
      'always'
    ]
  }
};
