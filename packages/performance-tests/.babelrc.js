module.exports = {
  presets: [
    ['@babel/env', { loose: true, modules: false }]
  ],
  plugins: [
    '@babel/proposal-object-rest-spread',
    'annotate-pure-calls',
    '@babel/transform-modules-commonjs',
    ['module-resolver', { alias: { src: './src' } }]
  ].filter(Boolean)
}
