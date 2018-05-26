/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import concatenateReducers from 'redux-concatenate-reducers'
import filteredReducer from './filteredReducer'
import createDynamicReducer from './createDynamicReducer'
import flattenReducers from './flattenReducers'

const dynamicReducersEnhancer = () => createHandlers => (store, reducer, ...rest) => {
  let dynamicReducers = []

  const createReducer = () => {
    const reducers = [filteredReducer(reducer), filteredReducer(createDynamicReducer(dynamicReducers))]

    return concatenateReducers(reducers)
  }

  const attachReducers = reducers => {
    dynamicReducers = [...dynamicReducers, ...flattenReducers(reducers)]
    store.replaceReducer(createReducer())
  }

  const handlers = createHandlers(store, reducer, ...rest)

  return {
    ...handlers,
    attachReducers
  }
}

export default dynamicReducersEnhancer
