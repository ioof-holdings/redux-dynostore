/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import mergeReducers from './mergeReducers'
import filtered from './filteredReducer'
import createDynamicReducer from './createDynamicReducer'
import flattenReducers from './flattenReducers'
import { detachable, detach } from './detachableReducer'

const dynamicReducersEnhancer = () => createHandlers => (store, reducer, ...rest) => {
  let dynamicReducers = {}

  const createReducer = () => {
    const reducers = [filtered(reducer)]

    if (Object.keys(dynamicReducers).length) {
      reducers.push(createDynamicReducer(dynamicReducers));
    }

    return mergeReducers(reducers)
  }

  const attachReducers = reducers => {
    Object.entries(flattenReducers(reducers)).forEach(([identifier, reducer]) => {
      dynamicReducers[identifier] = detachable(identifier)(reducer)
    })
    store.replaceReducer(createReducer())
  }

  const detachReducers = identifiers => {
    identifiers.filter(identifier => dynamicReducers[identifier]).forEach(identifier => {
      delete dynamicReducers[identifier]
      store.dispatch(detach(identifier))
    })

    store.replaceReducer(createReducer())
  }

  const handlers = createHandlers(store, reducer, ...rest)

  return {
    ...handlers,
    attachReducers,
    detachReducers
  }
}

export default dynamicReducersEnhancer
