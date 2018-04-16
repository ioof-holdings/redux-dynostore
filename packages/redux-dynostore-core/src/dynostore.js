/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { compose } from 'redux'

const createHandlers = (store, reducer, preloadedState, enhancer) => {
  if (typeof enhancer !== 'undefined') {
    return enhancer(createHandlers)(store, reducer, preloadedState)
  }

  return {}
}

const dynostore = (...dynamicEnhancers) => createStore => (reducer, preloadedState) => {
  const store = createStore(reducer, preloadedState)
  const dynamicHandlers = createHandlers(store, reducer, preloadedState, compose(...dynamicEnhancers))

  return {
    ...store,
    ...dynamicHandlers,
  }
}

export default dynostore
