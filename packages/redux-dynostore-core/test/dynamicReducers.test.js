/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import dynamicReducers from 'src/dynamicReducers'

describe('dynamicReducers tests', () => {
  test('should create attachReducers and detachReducers handlers', () => {
    const createHandlers = jest.fn()
    const store = {}
    const reducer = (state = {}) => state
    const param = 'test'
    const otherHandlers = { other: jest.fn() }

    createHandlers.mockReturnValue(otherHandlers)

    const handlers = dynamicReducers()(createHandlers)(store, reducer, param)

    expect(handlers.attachReducers).toBeDefined()
    expect(handlers.detachReducers).toBeDefined()
    expect(handlers.other).toBe(otherHandlers.other)
    expect(createHandlers).toBeCalledWith(store, reducer, param)
  })

  test('should attach reducers', () => {
    const createHandlers = jest.fn()
    const store = { replaceReducer: jest.fn() }
    const reducer = (state = {}) => state
    const otherHandlers = { other: jest.fn() }

    const testReducer1 = (state = 'value1') => state
    const testReducer2 = (state = 'value2') => state

    createHandlers.mockReturnValue(otherHandlers)

    const handlers = dynamicReducers()(createHandlers)(store, reducer)

    handlers.attachReducers({ testReducer1, testReducer2 })

    expect(store.replaceReducer).toHaveBeenCalled()

    expect(store.replaceReducer.mock.calls[0][0](undefined, {})).toEqual({
      testReducer1: 'value1',
      testReducer2: 'value2'
    })
  })

  test('should override default merge function', () => {
    const createHandlers = jest.fn()
    const store = { replaceReducer: jest.fn() }
    const reducer = (state = {}) => state
    const otherHandlers = { other: jest.fn() }

    const testReducer1 = (state = {}) => state
    const testReducer2 = (state = 'value1') => state

    const mergeFunction2 = (oldState, newState) => ({ ...oldState, ...newState, called: true })

    createHandlers.mockReturnValue(otherHandlers)

    const handlers = dynamicReducers({ mergeFunction: mergeFunction2 })(createHandlers)(store, reducer)

    handlers.attachReducers({ testReducer1 })
    handlers.attachReducers({ 'testReducer1.testReducer2': testReducer2 })

    expect(store.replaceReducer.mock.calls[1][0](undefined, {})).toEqual({
      testReducer1: {
        testReducer2: 'value1',
        called: true
      },
      called: true
    })
  })

  test('should override default combine function', () => {
    const createHandlers = jest.fn()
    const store = { replaceReducer: jest.fn() }
    const reducer = (state = {}) => state
    const otherHandlers = { other: jest.fn() }

    const testReducer1 = (state = {}) => state
    const testReducer2 = (state = 'value2') => state
    const testReducer3 = (state = 'value3') => state

    const combineFunction = (state, key, value) => ({ ...state, [key]: value, called: true })

    createHandlers.mockReturnValue(otherHandlers)

    const handlers = dynamicReducers({ combineFunction })(createHandlers)(store, reducer)

    handlers.attachReducers({ testReducer1 })
    handlers.attachReducers({
      testReducer1: {
        testReducer2,
        testReducer3
      }
    })

    expect(store.replaceReducer.mock.calls[1][0](undefined, {})).toEqual({
      called: true,
      testReducer1: {
        testReducer2: 'value2',
        testReducer3: 'value3',
        called: true
      }
    })
  })

  test('should override default clean state function', () => {
    const createHandlers = jest.fn()
    const store = { replaceReducer: jest.fn() }
    const reducer = (state = {}) => state
    const otherHandlers = { other: jest.fn() }

    const testReducer1 = (state = { value: undefined }) => state
    const testReducer2 = (state = 'value1') => state

    const cleanStateFunction = (state) => ({ ...state, called: true })

    createHandlers.mockReturnValue(otherHandlers)

    const handlers = dynamicReducers({ cleanStateFunction })(createHandlers)(store, reducer)

    handlers.attachReducers({ testReducer1 })
    handlers.attachReducers({ 'testReducer1.testReducer2': testReducer2 })

    expect(store.replaceReducer.mock.calls[1][0](undefined, {})).toEqual({
      testReducer1: {
        testReducer2: 'value1',
        called: true
      }
    })
  })

  test('should override default state filter', () => {
    const createHandlers = jest.fn()
    const store = { replaceReducer: jest.fn() }
    const reducer = (state = {}) => state
    const otherHandlers = { other: jest.fn() }

    const testReducer1 = (state = { value: {} }, action) => action.type === 'SET_VALUE' ? { ...state, value: action.value } : state
    const testReducer2 = (state = 'value1') => state
    
    const stateFilter = () => {
      return {
        filter: (state) => state,
        merge:  (oldState, newState) => ({ ...oldState, ...newState, called: true })
      }
    }

    createHandlers.mockReturnValue(otherHandlers)

    const handlers = dynamicReducers({ stateFilter })(createHandlers)(store, reducer)

    handlers.attachReducers({ testReducer1 })
    handlers.attachReducers({ 'testReducer1.testReducer2': testReducer2 })

    const initialState = {
      testReducer1: {
        testReducer2: 'value1'
      }
    }

    expect(store.replaceReducer.mock.calls[1][0](initialState, { type: 'SET_VALUE', value: 'value3' })).toEqual({
      testReducer1: {
        testReducer2: 'value1',
        value: 'value3',
        called: true
      }
    })
  })

  test('should override default resolve state function', () => {
    const createHandlers = jest.fn()
    const store = { replaceReducer: jest.fn() }
    const reducer = (state = {}) => state
    const otherHandlers = { other: jest.fn() }

    const testReducer1 = (state = {}) => state
    const testReducer2 = (state = { test: 'value' }) => state

    const resolveStateFunction = (state, key) => typeof state[key] === 'object' ? ({ ...state[key], called: true }) : state[key]

    createHandlers.mockReturnValue(otherHandlers)

    const handlers = dynamicReducers({ resolveStateFunction })(createHandlers)(store, reducer)

    handlers.attachReducers({ testReducer1 })
    handlers.attachReducers({
      testReducer1: {
        testReducer2
      }
    })

    const initialState = {
      testReducer1: {
        testReducer2: {
          test: 'value',
        }
      }
    }

    expect(store.replaceReducer.mock.calls[1][0](initialState, {})).toEqual({
      testReducer1: {
        testReducer2: {
          test: 'value',
          called: true
        },
        called: true
      }
    })
  })

  test('should attach reducers with overridden merge function', () => {
    const createHandlers = jest.fn()
    const store = { replaceReducer: jest.fn() }
    const reducer = (state = {}) => state
    const otherHandlers = { other: jest.fn() }

    const testReducer1 = (state = {}) => state
    const testReducer2 = (state = 'value1') => state

    const mergeFunction = (oldState, newState) => ({ ...oldState, ...newState, called: true })

    createHandlers.mockReturnValue(otherHandlers)

    const handlers = dynamicReducers()(createHandlers)(store, reducer)

    handlers.attachReducers({ testReducer1 }, { mergeFunction })
    handlers.attachReducers({ 'testReducer1.testReducer2': testReducer2 })

    expect(store.replaceReducer.mock.calls[1][0](undefined, {})).toEqual({
      testReducer1: {
        testReducer2: 'value1',
        called: true
      }
    })
  })

  test('should attach reducers with overridden clean state function', () => {
    const createHandlers = jest.fn()
    const store = { replaceReducer: jest.fn() }
    const reducer = (state = {}) => state
    const otherHandlers = { other: jest.fn() }

    const testReducer1 = (state = { value: undefined }) => state
    const testReducer2 = (state = 'value1') => state

    const cleanStateFunction = (state) => ({ ...state, called: true })

    createHandlers.mockReturnValue(otherHandlers)

    const handlers = dynamicReducers()(createHandlers)(store, reducer)

    handlers.attachReducers({ testReducer1 }, { cleanStateFunction })
    handlers.attachReducers({ 'testReducer1.testReducer2': testReducer2 })

    expect(store.replaceReducer.mock.calls[1][0](undefined, {})).toEqual({
      testReducer1: {
        testReducer2: 'value1',
        called: true
      }
    })
  })

  test('should attach reducers with overridden state filter', () => {
    const createHandlers = jest.fn()
    const store = { replaceReducer: jest.fn() }
    const reducer = (state = {}) => state
    const otherHandlers = { other: jest.fn() }

    const testReducer1 = (state = { value: {} }, action) => action.type === 'SET_VALUE' ? { ...state, value: action.value } : state
    const testReducer2 = (state = 'value1') => state
    
    const stateFilter = () => {
      return {
        filter: (state) => state,
        merge:  (oldState, newState) => ({ ...oldState, ...newState, called: true })
      }
    }

    createHandlers.mockReturnValue(otherHandlers)

    const handlers = dynamicReducers()(createHandlers)(store, reducer)

    handlers.attachReducers({ testReducer1 }, { stateFilter })
    handlers.attachReducers({ 'testReducer1.testReducer2': testReducer2 })

    const initialState = {
      testReducer1: {
        testReducer2: 'value1'
      }
    }

    expect(store.replaceReducer.mock.calls[1][0](initialState, { type: 'SET_VALUE', value: 'value3' })).toEqual({
      testReducer1: {
        testReducer2: 'value1',
        value: 'value3',
        called: true
      }
    })
  })

  test('should attach reducers with overridden resolve state function', () => {
    const createHandlers = jest.fn()
    const store = { replaceReducer: jest.fn() }
    const reducer = (state = {}) => state
    const otherHandlers = { other: jest.fn() }

    const testReducer1 = (state = {}) => state
    const testReducer2 = (state = { test: 'value' }) => state

    const resolveStateFunction = (state, key) => typeof state[key] === 'object' ? ({ ...state[key], called: true }) : state[key]

    createHandlers.mockReturnValue(otherHandlers)

    const handlers = dynamicReducers()(createHandlers)(store, reducer)

    handlers.attachReducers({ testReducer1 }, { resolveStateFunction })
    handlers.attachReducers({
      testReducer1: {
        testReducer2
      }
    })

    const initialState = {
      testReducer1: {
        testReducer2: {
          test: 'value',
        }
      }
    }

    expect(store.replaceReducer.mock.calls[1][0](initialState, {})).toEqual({
      testReducer1: {
        testReducer2: {
          test: 'value',
          called: true
        }
      }
    })
  })

  test('should detach reducers', () => {
    const createHandlers = jest.fn()
    const store = {
      replaceReducer: jest.fn(),
      dispatch: jest.fn()
    }
    const reducer = (state = {}) => state
    const otherHandlers = { other: jest.fn() }

    const testReducer1 = (state = 'value1') => state
    const testReducer2 = (state = 'value2') => state
    const testReducer3 = (state = 'value3') => state

    createHandlers.mockReturnValue(otherHandlers)

    const handlers = dynamicReducers()(createHandlers)(store, reducer)

    handlers.attachReducers({ testReducer1, testReducer2, testReducer3 })

    handlers.detachReducers(['testReducer1', 'testReducer2'])

    expect(store.dispatch.mock.calls[0][0]).toEqual({
      identifier: 'testReducer1',
      type: '@@DYNOSTORE/DETACH_REDUCER'
    })

    expect(store.dispatch.mock.calls[1][0]).toEqual({
      identifier: 'testReducer2',
      type: '@@DYNOSTORE/DETACH_REDUCER'
    })

    expect(store.replaceReducer.mock.calls[1][0](undefined, {})).toEqual({ testReducer3: 'value3' })

    jest.clearAllMocks()

    handlers.detachReducers(['testReducer3'])

    expect(store.replaceReducer.mock.calls[0].length).toBe(1)
    expect(store.replaceReducer.mock.calls[0][0](undefined, {})).toEqual({})
  })
})
