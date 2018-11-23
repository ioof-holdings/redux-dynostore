/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import isPlainObject from 'lodash.isplainobject'

const shallowDiffers = (oldState, newState) => {
  for (let [key, newValue] of Object.entries(newState)) {
    const oldValue = oldState[key]
    if (oldValue === undefined || oldValue !== newValue) {
      return true
    }
  }

  return false
}

const shallowMerge = (oldState, newState) => {
  if (
    oldState === undefined ||
    oldState === null ||
    oldState === newState ||
    typeof oldState !== typeof newState ||
    !isPlainObject(oldState) ||
    !isPlainObject(newState)
  ) {
    return newState
  }

  return shallowDiffers(oldState, newState) ? { ...oldState, ...newState } : oldState
}

export default shallowMerge
