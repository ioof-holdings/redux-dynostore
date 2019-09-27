/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defaultStateHandler } from '../utils/stateHandlers'

const combineReducers = (reducers, { stateHandler: { createEmpty, getValue, setValue } = defaultStateHandler } = {}) => {
  const reducerEntries = Object.entries(reducers)

  const combiner = (state = createEmpty(), action) => {
    let nextState = createEmpty()
    let hasChanged = false
    reducerEntries.forEach(([key, reducer]) => {
      const oldValue = getValue(state, key)
      const newValue = reducer(oldValue, action)
      nextState = setValue(nextState, key, newValue)
      hasChanged = hasChanged || newValue !== oldValue
    })

    return hasChanged ? nextState : state
  }
  return combiner
}

export default combineReducers
