/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const createInitialStateReducer = reducers => (action) =>
  reducers.reduce((nextState, reducer) => ({ ...nextState, ...reducer(undefined, action) }), {})

const createUpdateStateReducer = reducers => (state, action) =>
  reducers.reduce((nextState, reducer) => {
    const newState = reducer(nextState, action)
    return newState === nextState ? nextState : newState
  }, state)

const removeUndefinedValues = state => {
  const nextState = Object.entries(state).reduce((nextState, [key, value]) => {
    if (value !== undefined) {
      nextState[key] = value
    }
    return nextState
  }, {})

  return Object.keys(state).length !== Object.keys(nextState).length ? nextState : state
}

const mergeReducers = reducers => {
  const initialStateReducer = createInitialStateReducer(reducers)
  const updateStateReducer = createUpdateStateReducer([...reducers, removeUndefinedValues])
  return (state, action) =>
    state === undefined ? initialStateReducer(action) : updateStateReducer(state, action)
}

export default mergeReducers
