/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import dynostore from 'src/dynostore'

describe('dynostore tests', () => {
  test('should add dynamic handler', () => {

    const baseStore = { getState: jest.fn(), dispatch: jest.fn() }
    const rootReducer = jest.fn()
    const initialState = { key: 'value' }
    const createStore = jest.fn()

    createStore.mockReturnValue(baseStore)

    const testHandler = jest.fn()

    const dynamicTest = (createHandlers) => (store, reducer, preloadedState) => {
      expect(store).toBe(baseStore)
      expect(reducer).toBe(rootReducer)
      expect(preloadedState).toBe(initialState)

      return {
        ...createHandlers(store, reducer, preloadedState),
        testHandler
      }
    }

    const store = dynostore(dynamicTest)(createStore)(rootReducer, initialState)

    expect(store.getState).toBe(baseStore.getState)
    expect(store.dispatch).toBe(baseStore.dispatch)
    expect(store.testHandler).toBe(testHandler)
  })

  test('should add multiple dynamic handlers', () => {

    const baseStore = { getState: jest.fn(), dispatch: jest.fn() }
    const createStore = jest.fn()

    createStore.mockReturnValue(baseStore)

    const testHandler1 = jest.fn()
    const testHandler2 = jest.fn()

    const dynamicTest1 = (createHandlers) => (store, reducer, preloadedState) => {
      return {
        ...createHandlers(store, reducer, preloadedState),
        testHandler1
      }
    }
    const dynamicTest2 = (createHandlers) => (store, reducer, preloadedState) => {
      return {
        ...createHandlers(store, reducer, preloadedState),
        testHandler2
      }
    }

    const store = dynostore(dynamicTest1, dynamicTest2)(createStore)(jest.fn())

    expect(store.getState).toBe(baseStore.getState)
    expect(store.dispatch).toBe(baseStore.dispatch)
    expect(store.testHandler1).toBe(testHandler1)
    expect(store.testHandler2).toBe(testHandler2)
  })
})