/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createDynamicReducer from './reducers/createDynamicReducer'
import { detachableReducer, detach } from './reducers/detachableReducer'
import flattenReducers from './utils/flattenReducers'
import { defaultStateHandler } from './utils/stateHandlers'

const dynamicReducersEnhancer = ({ stateHandler } = {}) => {
  return createHandlers => (store, staticReducer, ...rest) => {
    const defaultOptions = store.dynostoreOptions || {}
    const defaultReducerOptions = {
      stateHandler: stateHandler || defaultOptions.stateHandler || defaultStateHandler
    }

    const dynamicReducers = {}
    const dynamicReducerOptions = {}

    const createReducer = () => {
      return createDynamicReducer(staticReducer, dynamicReducers, dynamicReducerOptions, defaultReducerOptions)
    }

    const attachReducers = (reducers, options = {}) => {
      Object.entries(flattenReducers(reducers)).forEach(([identifier, reducer]) => {
        dynamicReducers[identifier] = detachableReducer(identifier)(reducer)
        dynamicReducerOptions[identifier] = { ...defaultReducerOptions, ...options }
      })
      store.replaceReducer(createReducer())
    }

    const detachReducers = identifiers => {
      identifiers
        .filter(identifier => dynamicReducers[identifier])
        .forEach(identifier => {
          delete dynamicReducers[identifier]
          delete dynamicReducerOptions[identifier]
          store.dispatch(detach(identifier))
        })

      store.replaceReducer(createReducer())
    }

    const handlers = createHandlers(store, staticReducer, ...rest)

    return {
      ...handlers,
      attachReducers,
      detachReducers
    }
  }
}

export default dynamicReducersEnhancer
