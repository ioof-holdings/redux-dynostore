const path = require('path')
const packageJson = require('./package.json')

const outputFileName = packageJson.name.match(/^(.+)-microfrontend$/)[1]

module.exports = {
  entry: './src/index.js',
  output: {
    library: outputFileName,
    libraryTarget: 'assign',
    filename: `${outputFileName}.js`,
    path: path.join(__dirname, 'bundle')
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
        query: {
          presets: [['@babel/env', { modules: false, useBuiltIns: 'usage' }], '@babel/react']
        }
      }
    ]
  },
  externals: {
    react: 'React',
    redux: 'Redux',
    'react-redux': 'ReactRedux',
    '@redux-dynostore/core': 'ReduxDynostoreCore',
    '@redux-dynostore/react-redux': 'ReduxDynostoreReactRedux',
    '@redux-dynostore/react-redux-subspace': 'ReduxDynostoreReactReduxSubspace',
    '@redux-dynostore/redux-subspace': 'ReduxDynostoreReduxSubspace'
  }
}
