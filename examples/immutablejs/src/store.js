import { createStore, compose } from 'redux'
import { applyMiddleware } from 'redux-subspace'
import thunk from 'redux-thunk'
import dynostore, { dynamicReducers }  from '@redux-dynostore/core'
import { Map } from 'immutable'
import immutableOverrides from './immutableOverrides'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore((state = Map()) => state, Map(), composeEnhancers(
  applyMiddleware(thunk),
  dynostore(
    dynamicReducers(immutableOverrides)
  )
))

export default store
