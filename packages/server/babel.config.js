const presets = [
  [
    '@babel/env', {
      'targets': {
        'node': true
      }
    }
  ], '@babel/typescript'
];
const plugins = [
  '@babel/plugin-syntax-class-properties',
  '@babel/proposal-object-rest-spread',
  ['@babel/plugin-proposal-class-properties', {'loose': true}]
]

module.exports = { presets, plugins };