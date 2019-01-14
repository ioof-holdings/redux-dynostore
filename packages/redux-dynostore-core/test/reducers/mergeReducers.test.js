/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import mergeReducers from 'src/reducers/mergeReducers'

describe('mergeReducers Tests', () => {
  const primative = (state = { primative: 0 }) => state
  const plainObject = (state = { plainObject: { test: 'value' } }) => state
  const array = (state = { array: ['value'] }) => state
  const changingState = (state = {}, action) =>
    action.type == 'ADD_STATE' ? { ...state, changingState: 'value' } : state
  const overlappingState1 = (state = { overlapping: { key1: true, key2: false } }) => state
  const overlappingState2 = (state = { overlapping: { key2: true, key3: true } }) => state

  test('should merge reducers', () => {
    const reducer = mergeReducers([primative, plainObject, array, changingState, overlappingState1, overlappingState2])

    const state = reducer(undefined, {})

    expect(state).toEqual({
      primative: 0,
      plainObject: {
        test: 'value'
      },
      array: ['value'],
      overlapping: {
        key1: true,
        key2: true,
        key3: true
      }
    })
  })

  test('should handle actions', () => {
    const reducer = mergeReducers([primative, plainObject, array, changingState, overlappingState1, overlappingState2])

    const initialState = {
      primative: 0,
      plainObject: {
        test: 'value'
      },
      array: ['value'],
      overlapping: {
        key1: true,
        key2: true,
        key3: true
      }
    }

    const state = reducer(initialState, { type: 'ADD_STATE' })

    expect(state).toEqual({
      primative: 0,
      plainObject: {
        test: 'value'
      },
      array: ['value'],
      changingState: 'value',
      overlapping: {
        key1: true,
        key2: true,
        key3: true
      }
    })

    expect(state.primative).toBe(initialState.primative)
    expect(state.plainObject).toBe(initialState.plainObject)
    expect(state.array).toBe(initialState.array)
    expect(state.changingState).not.toBe(initialState.changingState)
    expect(state.overlapping).toBe(initialState.overlapping)
  })

  test('should not change reference for noop', () => {
    const reducer = mergeReducers([primative, plainObject, array, changingState, overlappingState1, overlappingState2])

    const initialState = {
      primative: 0,
      plainObject: {
        test: 'value'
      },
      array: ['value'],
      overlapping: {
        key1: true,
        key2: true,
        key3: true
      }
    }

    const state = reducer(initialState, { type: 'NOOP' })

    expect(state).toBe(initialState)

    expect(state.primative).toBe(initialState.primative)
    expect(state.plainObject).toBe(initialState.plainObject)
    expect(state.array).toBe(initialState.array)
    expect(state.overlapping).toBe(initialState.overlapping)
  })

  test('should return empty object for reducers that do not return state', () => {
    const reducer = mergeReducers([() => undefined, () => undefined])

    const state = reducer(undefined, {})

    expect(state).toEqual({})
  })

  test('should override state handler', () => {
    const stateHandler = {
      createEmpty: () => ({}),
      merge: (oldState, newState) => ({ ...oldState, ...newState, called: true })
    }

    const reducer = mergeReducers([
      primative,
      plainObject,
      array,
      changingState,
      overlappingState1,
      overlappingState2
    ], { stateHandler })

    const state = reducer(undefined, {})

    expect(state).toEqual({
      primative: 0,
      plainObject: {
        test: 'value'
      },
      array: ['value'],
      overlapping: {
        key2: true,
        key3: true
      },
      called: true
    })
  })
})
