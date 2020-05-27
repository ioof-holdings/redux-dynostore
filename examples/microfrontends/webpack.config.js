const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'microfrontends-example.js',
    path: path.resolve(__dirname, 'build')
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
        query: {
          presets: [['@babel/env', { modules: false, useBuiltIns: 'usage', corejs: 3 }], '@babel/react']
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './externals', to: 'externals' }
      ]
    })
  ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDom',
    redux: 'Redux',
    'react-redux': 'ReactRedux',
    'redux-subspace': 'ReduxSubspace',
    '@redux-dynostore/core': 'ReduxDynostoreCore',
    '@redux-dynostore/react-redux': 'ReduxDynostoreReactRedux',
    '@redux-dynostore/react-redux-subspace': 'ReduxDynostoreReactReduxSubspace',
    '@redux-dynostore/redux-subspace': 'ReduxDynostoreReduxSubspace',
    '@reach/router': 'ReachRouter'
  },
  devServer: {
    port: 3000,
    historyApiFallback: true
  }
}
