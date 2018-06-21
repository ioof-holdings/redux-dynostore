import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, compose } from 'redux'
import { Provider } from 'react-redux'
import { applyMiddleware } from 'redux-subspace'
import createSagaMiddleware from 'redux-subspace-saga'
import dynostore, { dynamicReducers } from '@redux-dynostore/core'
import { dynamicSagas } from '@redux-dynostore/redux-saga'

import App from './App'
import { allCountersReducer } from './reducers'

const rootReducer = combineReducers({ counters: allCountersReducer }) // all static reducers here
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    dynostore(dynamicReducers(), dynamicSagas(sagaMiddleware)),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
