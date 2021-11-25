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
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off', 
    // 'prettier/prettier': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'prefer-const': 'off',
    'react/display-name': 'off',
    '@typescript-eslint/no-unused-vars-experimental': [
      'warn',
      { ignoreArgsIfArgsAfterAreUsed: false },
    ],
    'arrow-body-style': [
      'error',
      'as-needed'
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
    'react/jsx-key': [
      'warn',
      { checkFragmentShorthand: false }
    ],
    'react/jsx-first-prop-new-line': [
      'warn',
      'multiline'
    ],
    'react/jsx-max-props-per-line': [
      'warn',
      { when: 'multiline' }
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
    
  }
};
