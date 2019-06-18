/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import enhanceReducer from 'src/reducers/enhanceReducer'
import combineReducers from 'src/reducers/combineReducers'

describe('enhanceReducer Tests', () => {
  // const primative = (state = 0) => state
  // const plainObject = (state = { test: 'value' }) => state
  // const array = (state = ['value']) => state
  const changingState = (state = { test: 'initialValue' }, action) =>
    action.type == 'ADD_STATE' ? { ...state, test: 'value' } : state
  const array = (state = ['value']) => state
  const reducer = combineReducers({ changingState, array })
  const state = reducer(undefined, {})
  expect(state).toEqual({
    array: ['value'],
    changingState: { test: 'initialValue' }
  })

  test('should apply rootEnhancer', () => {
    const rootEnhancer1 = reducer => (state, action) => {
      if (action.type === 'MERGE_OBJECT') {
        return { ...state, [action.key]: { ...state[action.key], ...action.payload } }
      }
      return reducer(state, action)
    }
    const rootEnhancers = [rootEnhancer1]

    const enhancedReducer = enhanceReducer(reducer, { rootEnhancers })

    const testAction = { type: 'MERGE_OBJECT', key: 'changingState', payload: { test: 'newMergedValue' } }
    const stateFromEnhancedReducer = enhancedReducer(state, testAction)
    expect(stateFromEnhancedReducer).toEqual({
      array: ['value'],
      changingState: { test: 'newMergedValue' }
    })
  })
  test('should apply multiple rootEnhancers', () => {
    const rootEnhancer1 = reducer => (state, action) => {
      if (action.type === 'MERGE_OBJECT') {
        return { ...state, [action.key]: { ...state[action.key], ...action.payload } }
      }
      return reducer(state, action)
    }

    const rootEnhancer2 = reducer => (state, action) => {
      if (action.type === 'ADD_TO_LIST') {
        return { ...state, [action.key]: [...state[action.key], action.value] }
      }
      return reducer(state, action)
    }
    const rootEnhancer3 = reducer => (state, action) => {
      return reducer(state, action)
    }
    const rootEnhancers = [rootEnhancer1, rootEnhancer2, rootEnhancer3]

    const enhancedReducer = enhanceReducer(reducer, { rootEnhancers })

    let stateFromEnhancedReducer = enhancedReducer(state, {
      type: 'MERGE_OBJECT',
      key: 'changingState',
      payload: { test: 'newMergedValue' }
    })
    stateFromEnhancedReducer = enhancedReducer(stateFromEnhancedReducer, {
      type: 'ADD_TO_LIST',
      key: 'array',
      value: 'addedValue'
    })

    expect(stateFromEnhancedReducer).toEqual({
      array: ['value', 'addedValue'],
      changingState: { test: 'newMergedValue' }
    })
  })
  test('should work without any rootEnhancer', () => {
    const enhancedReducer = enhanceReducer(reducer)

    const testAction = { type: 'MERGE_OBJECT', key: 'changingState', payload: { test: 'newMergedValue' } }
    const stateFromEnhancedReducer = enhancedReducer(state, testAction)
    expect(stateFromEnhancedReducer).toEqual({
      array: ['value'],
      changingState: { test: 'initialValue' }
    })
  })
})
