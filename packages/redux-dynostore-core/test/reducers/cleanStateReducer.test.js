/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cleanStateReducer from 'src/reducers/cleanStateReducer'

describe('cleanStateReducer Tests', () => {
  const deletableState = (state = { key1: 'value1', key2: 'value2' }, action) => {
    return action.type === 'DELETE_STATE' ? { ...state, key1: undefined } : state
  }

  test('should delete the key if next state of it is undefined', () => {
    const reducer = cleanStateReducer(deletableState)

    const initialState = {
      key1: 'value1',
      key2: 'value2'
    }

    const state = reducer(initialState, { type: 'DELETE_STATE' })

    expect(state).toEqual({ key2: 'value2' })
    expect(Object.keys(state).length).toBe(1)
  })

  test('should not change reference for noop', () => {
    const reducer = cleanStateReducer(deletableState)

    const initialState = {
      key1: 'value1',
      key2: 'value2'
    }

    const state = reducer(initialState, { type: 'NOOP' })

    expect(state).toBe(initialState)
  })

  test('should use overridden clean state function', () => {
    const reducer = cleanStateReducer(deletableState, { cleanStateFunction: state => state })

    const initialState = {
      key1: 'value1',
      key2: 'value2'
    }

    const state = reducer(initialState, { type: 'DELETE_STATE' })

    expect(state).toEqual({ key1: undefined, key2: 'value2' })
    expect(Object.keys(state).length).toBe(2)
  })
})
