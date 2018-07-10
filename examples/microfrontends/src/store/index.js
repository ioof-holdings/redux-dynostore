import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import dynostore, { dynamicReducers } from '@redux-dynostore/core'
import { applyMiddleware } from 'redux-subspace'
import thunk from 'redux-thunk'
import reducer from './reducer'

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk), dynostore(dynamicReducers())))

export default store
