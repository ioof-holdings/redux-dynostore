/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import dynamicReducers from 'src/dynamicReducers'

describe('dynamicReducers tests', () => {
  test('should create attachReducers and detachReducer handlers', () => {
    const createHandlers = jest.fn()
    const store = {}
    const reducer = (state = {}) => state
    const param = 'test'
    const otherHandlers = { other: jest.fn() }

    createHandlers.mockReturnValue(otherHandlers)

    const handlers = dynamicReducers()(createHandlers)(store, reducer, param)

    expect(handlers.attachReducers).toBeDefined()
    expect(handlers.detachReducer).toBeDefined()
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

    expect(store.replaceReducer.mock.calls[0][0]()).toEqual({
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

    createHandlers.mockReturnValue(otherHandlers)

    const handlers = dynamicReducers()(createHandlers)(store, reducer)

    handlers.attachReducers({ testReducer1, testReducer2 })

    handlers.detachReducer(['testReducer1', 'testReducer2'])

    expect(store.replaceReducer.mock.calls[1][0]()).toEqual({ testReducer2: 'value2' })
    expect(store.dispatch.mock.calls[0][0]).toEqual({
      globalAction: true,
      identifier: 'testReducer1',
      type: 'DYNOSTORE/DETACH_REDUCER'
    })

    expect(store.replaceReducer.mock.calls[2][0]()).toEqual({})
    expect(store.dispatch.mock.calls[1][0]).toEqual({
      globalAction: true,
      identifier: 'testReducer2',
      type: 'DYNOSTORE/DETACH_REDUCER'
    })

  })
})
