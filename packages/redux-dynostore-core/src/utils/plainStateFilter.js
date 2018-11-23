/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import isPlainObject from 'lodash.isplainobject'
import shallowMerge from './shallowMerge'

const plainStateFilter = (initialState) => {
  let knownKeys = isPlainObject(initialState) ? Object.keys(initialState) : {}

  return {
    filter: (state) => {
      let filteredState = state

      if (knownKeys.length) {
        filteredState = knownKeys.reduce((current, key) => {
          current[key] = state[key]
          return current
        }, {})
      }

      return filteredState
    },
    merge: (oldState, newState) => {
      knownKeys = isPlainObject(newState) ? Object.keys(newState) : {}
      return shallowMerge(oldState, newState)
    }
  }
}

export default plainStateFilter
