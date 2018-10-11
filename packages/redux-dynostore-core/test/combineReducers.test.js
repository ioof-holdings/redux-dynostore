/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createStore } from 'redux'
import combineReducers from 'src/combineReducers'

describe('combineReducers Tests', () => {

  const primative = (state = 0) => state
  const plainObject = (state = { test: "value" }) => state
  const array = (state = [ "value" ]) => state
  const changingState = (state = {}, action) => action.type == 'ADD_STATE' ? { ...state, test: "value" } : state

  test('should combine reducers', () => {
    const store = createStore(combineReducers({
      primative,
      plainObject,
      array,
      changingState
    }))

    const state = store.getState()

    expect(state).toEqual({
      primative: 0,
      plainObject: {
        test: "value"
      },
      array: ["value"],
      changingState: {}
    })
  })

  test('should handle actions' , () => {
    const store = createStore(combineReducers({
      primative,
      plainObject,
      array,
      changingState
    }))

    const initialState = store.getState()

    store.dispatch({ type: 'ADD_STATE' })

    const state = store.getState()

    expect(state).toEqual({
      primative: 0,
      plainObject: {
        test: "value"
      },
      array: ["value"],
      changingState: { test: "value" }
    })

    expect(state.primative).toBe(initialState.primative)
    expect(state.plainObject).toBe(initialState.plainObject)
    expect(state.array).toBe(initialState.array)
    expect(state.changingState).not.toBe(initialState.changingState)
  })

  test('should not change reference for noop' , () => {
    const store = createStore(combineReducers({
      primative,
      plainObject,
      array,
      changingState
    }))

    const initialState = store.getState()

    store.dispatch({ type: 'NOOP' })

    const state = store.getState()

    expect(state).toBe(initialState)

    expect(state.primative).toBe(initialState.primative)
    expect(state.plainObject).toBe(initialState.plainObject)
    expect(state.array).toBe(initialState.array)
    expect(state.changingState).toBe(initialState.changingState)
  })
})