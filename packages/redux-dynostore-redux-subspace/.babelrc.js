const { BABEL_ENV, NODE_ENV } = process.env

const cjs = BABEL_ENV === 'cjs' || NODE_ENV === 'test'

module.exports = {
  presets: [
    ['env', { loose: true, modules: false }],
    'stage-3'
  ],
  plugins: [
    cjs && 'transform-es2015-modules-commonjs', 
    ['module-resolver', { alias: { src: './src' } }]
  ].filter(Boolean),
}
