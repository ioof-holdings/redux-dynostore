/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const updateState = (oldState, key, newState) => {
  return oldState[key] !== newState ? { ...oldState, [key]: newState } : oldState
}

const combineReducers = reducers => (state = {}, action) => {
  return Object.entries(reducers).reduce(
    (nextState, [key, reducer]) => updateState(nextState, key, reducer(nextState[key], action)),
    state
  )
}

export default combineReducers
