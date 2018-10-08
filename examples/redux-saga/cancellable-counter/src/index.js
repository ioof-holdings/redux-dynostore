import React from 'react'
import { render } from 'react-dom'
import { createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import { applyMiddleware } from 'redux-subspace'
import createSagaMiddleware from 'redux-subspace-saga'
import dynostore, { dynamicReducers } from '@redux-dynostore/core'
import { dynamicSagas } from '@redux-dynostore/redux-saga'

import App from './App'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  (state = {}) => state,
  compose(
    applyMiddleware(sagaMiddleware),
    dynostore(dynamicReducers(), dynamicSagas(sagaMiddleware))
  )
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
