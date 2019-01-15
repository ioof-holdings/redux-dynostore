/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { compose } from 'redux'
import isPlainObject from 'lodash.isplainobject'

const createHandlers = (store, reducer, preloadedState, enhancer) => {
  if (typeof enhancer !== 'undefined') {
    return enhancer(createHandlers)(store, reducer, preloadedState)
  }

  return {}
}

const splitOptions = args => {
  const [lastItem] = args.slice(-1)
  return isPlainObject(lastItem) ? [args.slice(0, -1), lastItem] : [args, {}]
}

const dynostore = (...dynamicEnhancers) => createStore => (reducer, preloadedState) => {
  const [enhancers, dynostoreOptions] = splitOptions(dynamicEnhancers)
  const store = { ...createStore(reducer, preloadedState), dynostoreOptions }
  const dynamicHandlers = createHandlers(store, reducer, preloadedState, compose(...enhancers))

  return {
    ...store,
    ...dynamicHandlers,
  }
}

export default dynostore
