export const setupCommonPackages = () => {
  window.ReactDom = require('react-dom')
  window.React = require('react')
  window.Redux = require('redux')
  window.ReactRedux = require('react-redux')
  window.ReduxSubspace = require('redux-subspace')
  window.ReduxDynostoreCore = require('@redux-dynostore/core')
  window.ReduxDynostoreReactRedux = require('@redux-dynostore/react-redux')
  window.ReduxDynostoreReactReduxSubspace = require('@redux-dynostore/react-redux-subspace')
  window.ReduxDynostoreReduxSubspace = require('@redux-dynostore/redux-subspace')
  window.ReachRouter = require('@reach/router')
}
