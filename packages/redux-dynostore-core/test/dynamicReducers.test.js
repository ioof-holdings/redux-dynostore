/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import dynamicReducers from 'src/dynamicReducers'

describe('dynamicReducers tests', () => {
  test('should create attachReducers handler', () => {
    const createHandlers = jest.fn()
    const store = {}
    const reducer = (state = {}) => state
    const param = 'test'
    const otherHandlers = { other: jest.fn() }

    createHandlers.mockReturnValue(otherHandlers)

    const handlers = dynamicReducers()(createHandlers)(store, reducer, param)

    expect(handlers.attachReducers).toBeDefined()
    expect(handlers.other).toBe(otherHandlers.other)
    expect(createHandlers).toBeCalledWith(store, reducer, param)
  })

  test('should attach reducers', () => {
    const createHandlers = jest.fn()
    const store = { replaceReducer: jest.fn() }
    const reducer = (state = {}) => state

    const testReducer1 = (state = 'value1') => state
    const testReducer2 = (state = 'value2') => state

    createHandlers.mockReturnValue({})

    const handlers = dynamicReducers()(createHandlers)(store, reducer)

    handlers.attachReducers({ testReducer1, testReducer2 })

    expect(store.replaceReducer).toHaveBeenCalled()

    expect(store.replaceReducer.mock.calls[0][0]()).toEqual({
      testReducer1: 'value1',
      testReducer2: 'value2'
    })
  })

  test('should override attached reducers with the same key', () => {
    const createHandlers = jest.fn()
    const store = { replaceReducer: jest.fn() }
    const reducer = (state = {}) => state

    const testReducer1 = (state = 'value1') => state
    const testReducer2 = (state = 'value2') => state

    createHandlers.mockReturnValue({})

    const handlers = dynamicReducers()(createHandlers)(store, reducer)

    handlers.attachReducers({ testReducer: testReducer1 })
    handlers.attachReducers({ testReducer: testReducer2 })

    expect(store.replaceReducer).toHaveBeenCalledTimes(2)

    expect(store.replaceReducer.mock.calls[0][0]()).toEqual({
      testReducer: 'value1'
    })

    expect(store.replaceReducer.mock.calls[1][0]()).toEqual({
      testReducer: 'value2'
    })
  })
})
