/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

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

  const overlappingState1 = (state = { overlapping1: true, overlapping2: false }) => state
  const overlappingState2 = (state = { overlapping2: true, overlapping3: true }) => state

  test('should merge reducers', () => {
    const reducer = mergeReducers([
      primative,
      plainObject,
      array,
      changingState,
      overlappingState1,
      overlappingState2
    ])

    const state = reducer(undefined, {})

    expect(state).toEqual({
      primative: 0,
      plainObject: {
        test: "value"
      },
      array: ["value"],
      overlapping1: true,
      overlapping2: true,
      overlapping3: true,
    })
  })

  test('should handle actions' , () => {
    const reducer = mergeReducers([
      primative,
      plainObject,
      array,
      changingState,
      overlappingState1,
      overlappingState2
    ])

    const initialState = {
      primative: 0,
      plainObject: {
        test: "value"
      },
      array: ["value"],
      overlapping1: true,
      overlapping2: true,
      overlapping3: true
    }

    const state = reducer(initialState, { type: 'ADD_STATE' })

    expect(state).toEqual({
      primative: 0,
      plainObject: {
        test: "value"
      },
      array: ["value"],
      changingState: "value",
      overlapping1: true,
      overlapping2: true,
      overlapping3: true
    })

    expect(state.primative).toBe(initialState.primative)
    expect(state.plainObject).toBe(initialState.plainObject)
    expect(state.array).toBe(initialState.array)
    expect(state.changingState).not.toBe(initialState.changingState)
    expect(state.overlapping1).toBe(initialState.overlapping1)
    expect(state.overlapping2).toBe(initialState.overlapping2)
    expect(state.overlapping3).toBe(initialState.overlapping3)
  })

  test('should not change reference for noop' , () => {
    const reducer = mergeReducers([
      primative,
      plainObject,
      array,
      changingState,
      overlappingState1,
      overlappingState2
    ])

    const initialState = {
      primative: 0,
      plainObject: {
        test: "value"
      },
      array: ["value"],
      overlapping1: true,
      overlapping2: true,
      overlapping3: true
    }

    const state = reducer(initialState, { type: 'NOOP' })

    expect(state).toBe(initialState)

    expect(state.primative).toBe(initialState.primative)
    expect(state.plainObject).toBe(initialState.plainObject)
    expect(state.array).toBe(initialState.array)
    expect(state.overlapping1).toBe(initialState.overlapping1)
    expect(state.overlapping2).toBe(initialState.overlapping2)
    expect(state.overlapping3).toBe(initialState.overlapping3)
  })

  test('should delete the key if next state of it is undefined' , () => {
    const reducer = mergeReducers([
      primative,
      plainObject,
      array,
      changingState,
      overlappingState1,
      overlappingState2
    ])

    const initialState = {
      primative: 0,
      plainObject: {
        test: "value"
      },
      array: ["value"],
      changingState: "value",
      overlapping1: true,
      overlapping2: true,
      overlapping3: true
    }

    const state = reducer(initialState, { type: 'DELETE_STATE' })

    expect(state.primative).toBe(initialState.primative)
    expect(state.plainObject).toBe(initialState.plainObject)
    expect(state.array).toBe(initialState.array)
    expect(state.overlapping1).toBe(initialState.overlapping1)
    expect(state.overlapping2).toBe(initialState.overlapping2)
    expect(state.overlapping3).toBe(initialState.overlapping3)
    expect(Object.keys(state).length).toBe(6)
  })

  test('should return empty object for reducers that do not return state', () => {
    const reducer = mergeReducers([
      () => undefined,
      () => undefined,
    ])

    const state = reducer(undefined, {})

    expect(state).toEqual({})
  })
})
