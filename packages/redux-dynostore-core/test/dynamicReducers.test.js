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
