import { createStore, compose } from 'redux'
import dynostore, { dynamicReducers } from '@redux-dynostore/core'
import { applyMiddleware } from 'redux-subspace'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import wormhole from 'redux-subspace-wormhole'
import api from '../../common/middleware/api'
import createRootReducer from '../reducers'

const configureStore = history =>
  createStore(
    createRootReducer(history),
    compose(
      applyMiddleware(thunk, api, routerMiddleware(history), wormhole(state => state.configuration, 'configuration')),
      dynostore(dynamicReducers())
    )
  )

export default configureStore
