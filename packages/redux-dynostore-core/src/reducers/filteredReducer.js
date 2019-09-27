/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defaultStateHandler } from '../utils/stateHandlers'

const FILTER_INIT = { type: '@@FILTER/INIT' }

const filteredReducer = (
  reducer,
  { stateHandler: { createEmpty, getKeys, getValue, setValue } = defaultStateHandler } = {}
) => {
  const initialState = reducer(undefined, FILTER_INIT)
  let knownKeys = getKeys(initialState)

  const filter = (state, action) => {
    if (state === undefined) {
      return initialState
    }

    let filteredState = state

    if (knownKeys.length) {
      filteredState = createEmpty()
      knownKeys.forEach(key => {
        const oldValue = getValue(state, key)
        filteredState = setValue(filteredState, key, oldValue)
      })
    }

    let newState = reducer(filteredState, action)

    if (newState === filteredState) {
      return state
    }

    knownKeys = getKeys(newState)

    getKeys(state).forEach(key => {
      if (!knownKeys.includes(key)) {
        const oldValue = getValue(state, key)
        newState = setValue(newState, key, oldValue)
      }
    })

    return newState
  }

  return filter
}

export default filteredReducer
