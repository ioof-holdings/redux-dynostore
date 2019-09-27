/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defaultStateHandler } from '../utils/stateHandlers'

const mergeReducers = (reducers, { stateHandler: { createEmpty, merge } = defaultStateHandler } = {}) => {
  const merger = (state, action) => {
    const nextState = reducers.reduce((nextState, reducer) => {
      const newState = reducer(state !== undefined ? nextState : undefined, action)
      return merge(nextState, newState)
    }, state)

    return nextState || createEmpty()
  }

  return merger
}

export default mergeReducers
