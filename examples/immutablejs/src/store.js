import { createStore, compose } from 'redux'
import { applyMiddleware } from 'redux-subspace'
import thunk from 'redux-thunk'
import dynostore, { combineReducers, dynamicReducers } from '@redux-dynostore/core'
import { Map } from 'immutable'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const immutableJsStateHandler = {
  createEmpty: () => Map(),
  getKeys: state => state.keySeq(),
  getValue: (state, key) => state.get(key),
  setValue: (state, key, value) => state.set(key, value),
  canMerge: state => Map.isMap(state),
  merge: (oldState, newState) => (oldState ? oldState.merge(newState) : newState)
}

const reducer1 = (state = Map()) => state,
  reducer2 =  (state = Map()) => state;

const store = createStore(
  combineReducers({ reducer1, reducer2 }, { stateHandler: immutableJsStateHandler }),
  composeEnhancers(applyMiddleware(thunk), dynostore(dynamicReducers(), { stateHandler: immutableJsStateHandler }))
)

export default store
