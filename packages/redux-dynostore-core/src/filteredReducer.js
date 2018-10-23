/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import isPlainObject from 'lodash.isplainobject'

const FILTER_INIT = { type: '@@FILTER/INIT' }

const filteredReducer = reducer => {
  let knownKeys = Object.keys(reducer(undefined, FILTER_INIT))

  return (state, action) => {
    let filteredState = state

    if (knownKeys.length && state !== undefined) {
      filteredState = knownKeys.reduce((current, key) => {
        current[key] = state[key]
        return current
      }, {})
    }

    let newState = reducer(filteredState, action)

    if (newState === filteredState) {
      return state
    }

    if (isPlainObject(newState)) {
      knownKeys = Object.keys(newState)
      return {
        ...state,
        ...newState
      }
    } else {
      return newState
    }
  }
}

export default filteredReducer
