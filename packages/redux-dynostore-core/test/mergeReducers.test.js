/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createStore } from 'redux'
import mergeReducers from 'src/mergeReducers'

describe('mergeReducers Tests', () => {

  const primative = (state = { primative: 0 }) => state
  const plainObject = (state = { plainObject: { test: "value" } }) => state
  const array = (state = { array: [ "value" ] }) => state
  const changingState = (state = {}, action) => {
    if (action.type == 'ADD_STATE') {
      return { ...state, changingState: "value" }
    } else if (action.type === 'DELETE_STATE') {
      return {...state, changingState: undefined}
    } else {
      return state
    }
  }

  test('should merge reducers', () => {
    const store = createStore(mergeReducers([
      primative,
      plainObject,
      array,
      changingState
    ]))

    expect(store.getState()).toEqual({
      primative: 0,
      plainObject: {
        test: "value"
      },
      array: ["value"]
    })
  })

  test('should handle actions' , () => {
    const store = createStore(mergeReducers([
      primative,
      plainObject,
      array,
      changingState
    ]))

    const initialState = store.getState()

    store.dispatch({ type: 'ADD_STATE' })

    const state = store.getState()

    expect(store.getState()).toEqual({
      primative: 0,
      plainObject: {
        test: "value"
      },
      array: ["value"],
      changingState: "value"
    })

    expect(state.primative).toBe(initialState.primative)
    expect(state.plainObject).toBe(initialState.plainObject)
    expect(state.array).toBe(initialState.array)
    expect(state.changingState).not.toBe(initialState.changingState)
  })

  test('should not change reference for noop' , () => {
    const store = createStore(mergeReducers([
      primative,
      plainObject,
      array,
      changingState
    ]))

    const initialState = store.getState()

    store.dispatch({ type: 'NOOP' })

    const state = store.getState()

    expect(state).toBe(initialState)

    expect(state.primative).toBe(initialState.primative)
    expect(state.plainObject).toBe(initialState.plainObject)
    expect(state.array).toBe(initialState.array)
  })

  test('should delete the key if next state of it is undefined' , () => {
    const store = createStore(mergeReducers([
      primative,
      plainObject,
      array,
      changingState
    ]))

    const initialState = store.getState()

    store.dispatch({ type: 'ADD_STATE' })

    expect(Object.keys(store.getState()).length).toBe(4)

    store.dispatch({ type: 'DELETE_STATE' })

    expect(Object.keys(store.getState()).length).toBe(3)

    const state = store.getState()

    expect(state.primative).toBe(initialState.primative)
    expect(state.plainObject).toBe(initialState.plainObject)
    expect(state.array).toBe(initialState.array)
  })
})
