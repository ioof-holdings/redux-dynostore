/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import isObject from './isObject'

const createMerge = overrideFunction => (oldState, newState) => {
  if (
    oldState === undefined ||
    oldState === null ||
    oldState === newState ||
    typeof oldState !== typeof newState ||
    !isObject(oldState) ||
    !isObject(newState)
  ) {
    return newState
  }

  let hasChanged = false
  const nextState = {}
  const usedKeys = new Set()

  Object.keys(newState).forEach(key => {
    const oldValue = oldState[key]
    const newValue = newState[key]
    const nextValue = overrideFunction(oldValue, newValue)
    nextState[key] = nextValue
    usedKeys.add(key)
    hasChanged = hasChanged || nextValue !== oldValue
  })

  if (hasChanged) {
    Object.keys(oldState).forEach(key => {
      if (!usedKeys.has(key)) {
        nextState[key] = oldState[key]
      }
    })

    return nextState
  } else {
    return oldState
  }
}

export const shallowMerge = createMerge((_, newValue) => newValue)
export const deepMerge = createMerge((oldValue, newValue) => deepMerge(oldValue, newValue))
