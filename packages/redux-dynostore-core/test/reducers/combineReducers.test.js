/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import combineReducers from 'src/reducers/combineReducers'

describe('combineReducers Tests', () => {
  const primative = (state = 0) => state
  const plainObject = (state = { test: 'value' }) => state
  const array = (state = ['value']) => state
  const changingState = (state = {}, action) => (action.type == 'ADD_STATE' ? { ...state, test: 'value' } : state)

  test('should combine reducers', () => {
    const reducer = combineReducers({
      primative,
      plainObject,
      array,
      changingState
    })

    const state = reducer(undefined, {})

    expect(state).toEqual({
      primative: 0,
      plainObject: {
        test: 'value'
      },
      array: ['value'],
      changingState: {}
    })
  })

  test('should handle actions', () => {
    const reducer = combineReducers({
      primative,
      plainObject,
      array,
      changingState
    })

    const initialState = {
      primative: 0,
      plainObject: {
        test: 'value'
      },
      array: ['value'],
      changingState: {}
    }

    const state = reducer(initialState, { type: 'ADD_STATE' })

    expect(state).toEqual({
      primative: 0,
      plainObject: {
        test: 'value'
      },
      array: ['value'],
      changingState: { test: 'value' }
    })

    expect(state.primative).toBe(initialState.primative)
    expect(state.plainObject).toBe(initialState.plainObject)
    expect(state.array).toBe(initialState.array)
    expect(state.changingState).not.toBe(initialState.changingState)
  })

  test('should not change reference for noop', () => {
    const reducer = combineReducers({
      primative,
      plainObject,
      array,
      changingState
    })

    const initialState = {
      primative: 0,
      plainObject: {
        test: 'value'
      },
      array: ['value'],
      changingState: {}
    }

    const state = reducer(initialState, { type: 'NOOP' })

    expect(state).toBe(initialState)

    expect(state.primative).toBe(initialState.primative)
    expect(state.plainObject).toBe(initialState.plainObject)
    expect(state.array).toBe(initialState.array)
    expect(state.changingState).toBe(initialState.changingState)
  })

  test('should override state handler', () => {
    const stateHandler = {
      createEmpty: () => ({ called: true }),
      getValue: (state, key) => state[key],
      setValue: (state, key, value) => {
        state[key] = value
        return state
      }
    }
    const reducer = combineReducers({
      primative,
      plainObject,
      array,
      changingState
    }, { stateHandler })

    const state = reducer(undefined, {})

    expect(state).toEqual({
      plainObject: {
        test: 'value'
      },
      array: ['value'],
      changingState: {},
      primative: 0,
      called: true
    })
  })
})
