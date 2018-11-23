/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import deepMerge from '../utils/deepMerge'

const mergeReducers = (reducers, { mergeFunction = deepMerge } = {}) => (state, action) => {
  
  const nextState = reducers.reduce((nextState, reducer) => {
    const newState = reducer(state !== undefined ? nextState : undefined, action)
    return mergeFunction(nextState, newState)
  }, state)

  return nextState || {}
}

export default mergeReducers
