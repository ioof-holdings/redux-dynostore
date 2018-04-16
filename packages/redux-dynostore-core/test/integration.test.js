/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createStore, combineReducers } from 'redux'
import dynostore, { dynamicReducers, createDynamicTarget, attachReducer, dispatchAction } from 'src'

describe('integration tests', () => {
  const makeTestReducer = id => (state = `${id} - initialValue`, { type, newValue }) => {
    return type === 'CHANGE_VALUE' ? `${id} - ${newValue}` : state
  }

  const changeValue = newValue => ({ type: 'CHANGE_VALUE', newValue })

  const mockTarget = (enhancers, id, store, mockFn) => {
    return createDynamicTarget(enhancers)(id)(store)(mockFn)
  }

  test('should create dynostore', () => {
    const reducer = combineReducers({
      static1: makeTestReducer('static1'),
      static2: makeTestReducer('static2')
    })

    const store = createStore(reducer, dynostore(dynamicReducers()))

    store.attachReducers({
      dynamic1: makeTestReducer('dynamic1'),
      dynamic2: makeTestReducer('dynamic2')
    })

    expect(store.getState()).toEqual({
      static1: 'static1 - initialValue',
      static2: 'static2 - initialValue',
      dynamic1: 'dynamic1 - initialValue',
      dynamic2: 'dynamic2 - initialValue'
    })
  })

  test('should attach reducer', () => {
    const reducer = combineReducers({
      static1: makeTestReducer('static1'),
      static2: makeTestReducer('static2')
    })

    const store = createStore(reducer, dynostore(dynamicReducers()))

    const target1 = mockTarget([attachReducer(makeTestReducer('dynamic1'))], 'dynamic1', store, jest.fn())
    const target2 = mockTarget([attachReducer(makeTestReducer('dynamic2'))], 'dynamic2', store, jest.fn())

    expect(store.getState()).toEqual({
      static1: 'static1 - initialValue',
      static2: 'static2 - initialValue',
      dynamic1: 'dynamic1 - initialValue',
      dynamic2: 'dynamic2 - initialValue'
    })

    expect(target1).not.toHaveBeenCalled()
    expect(target2).not.toHaveBeenCalled()
  })

  test('should dispatch actions', () => {
    const reducer = combineReducers({
      static1: makeTestReducer('static1'),
      static2: makeTestReducer('static2')
    })

    const store = createStore(reducer, dynostore(dynamicReducers()))

    const target = mockTarget([dispatchAction(changeValue('newValue'))], 'dynamic', store, jest.fn())

    expect(store.getState()).toEqual({
      static1: 'static1 - newValue',
      static2: 'static2 - newValue'
    })

    expect(target).not.toHaveBeenCalled()
  })
})
