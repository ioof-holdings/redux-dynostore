import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import dynostore, { dynamicReducers } from '@redux-dynostore/core'
import { Provider } from 'react-redux'
import App from './app'

const store = createStore((state = {}) => state, dynostore(dynamicReducers()))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
