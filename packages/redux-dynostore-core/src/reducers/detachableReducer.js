/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defaultStateHandler } from '../utils/stateHandlers'

const DETACH_TYPE = '@@DYNOSTORE/DETACH_REDUCER'

export const detach = identifier => ({ type: DETACH_TYPE, identifier })

export const detachableReducer = identifier => reducer => {
  const detacher = (state, action) => {
    return action.type !== DETACH_TYPE || action.identifier !== identifier ? reducer(state, action) : undefined
  }
  return detacher
}

export const cleanupDetachedReducer = (
  reducer,
  { stateHandler: { createEmpty, getKeys, getValue, setValue } = defaultStateHandler } = {}
) => {
  const cleaner = (state, action) => {
    const newState = reducer(state, action)
    if (action.type == DETACH_TYPE && newState !== state) {
      let hasChanged = false
      let nextState = createEmpty()

      getKeys(newState).forEach(key => {
        const value = getValue(newState, key)
        if (value !== undefined) {
          nextState = setValue(nextState, key, value)
        } else {
          hasChanged = true
        }
      })

      return hasChanged ? nextState : newState
    } else {
      return newState
    }
  }

  return cleaner
}
