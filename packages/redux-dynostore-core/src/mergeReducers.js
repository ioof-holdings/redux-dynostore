/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const mergeState = (oldState = {}, newState) => {
  const updatedState = Object.entries(newState)
    .filter(([key]) => oldState[key] === undefined || newState[key] !== oldState[key])
    .reduce((nextState, [key, value]) => {
      nextState[key] = value
      return nextState
    }, {})
  return Object.keys(updatedState).length ? { ...oldState, ...updatedState } : oldState
}

const mergeReducers = reducers => (state, action) => {
  return reducers.reduce((nextState, reducer) => mergeState(nextState, reducer(state, action)), state)
}

export default mergeReducers
