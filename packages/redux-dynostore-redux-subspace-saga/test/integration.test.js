/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createStore, combineReducers, compose } from 'redux'
import { subspace, applyMiddleware, namespaced } from 'redux-subspace'
import createSagaMiddleware from 'redux-subspace-saga'
import { select, put } from 'redux-saga/effects'
import dynostore, { createDynamicTarget } from '@redux-dynostore/core'
import { dynamicSagas } from '@redux-dynostore/redux-saga'
import runSaga from 'src'

describe('integration tests', () => {
  const makeTestReducer = id => (state = `${id} - initialValue`, { type, newValue }) => {
    return type === 'CHANGE_VALUE' ? `${id} - ${newValue}` : state
  }

  const changeValue = newValue => ({ type: 'CHANGE_VALUE', newValue })

  const createSaga = (expectedValue, newValue) => function* saga() {
    const value = yield select((state) => state)
    expect(value).toBe(expectedValue)
    yield put(changeValue(newValue))
  }

  const mockTarget = (enhancers, id, store, mockFn) => {
    return createDynamicTarget(enhancers)(id)(store)(mockFn)
  }

  test('should run sagas', () => {
    const reducer = combineReducers({
      static1: namespaced('static1')(makeTestReducer('static1')),
      static2: namespaced('static2')(makeTestReducer('static2'))
    })

    const sagaMiddleware = createSagaMiddleware()

    const store = createStore(reducer, compose(
      applyMiddleware(sagaMiddleware),
      dynostore(dynamicSagas(sagaMiddleware))
    ))

    const target = mockTarget([runSaga(createSaga('static2 - initialValue', 'newValue'))], 'static2', store, jest.fn())

    expect(store.getState()).toEqual({
      static1: 'static1 - initialValue',
      static2: 'static2 - newValue'
    })

    expect(target).not.toHaveBeenCalled()
  })

  test('should run nested sagas', () => {
    const reducer = combineReducers({
      static: namespaced('static')(combineReducers({
        static1: namespaced('static1')(makeTestReducer('static1')),
        static2: namespaced('static2')(makeTestReducer('static2'))
      }))
    })

    const sagaMiddleware = createSagaMiddleware()

    const store = createStore(reducer, compose(
      applyMiddleware(sagaMiddleware),
      dynostore(dynamicSagas(sagaMiddleware))
    ))
    const subspacedStore = subspace('static')(store)

    const target = mockTarget([runSaga(createSaga('static2 - initialValue', 'newValue'))], 'static2', subspacedStore, jest.fn())

    expect(store.getState()).toEqual({
      static: {
        static1: 'static1 - initialValue',
        static2: 'static2 - newValue'
      }
    })

    expect(target).not.toHaveBeenCalled()
  })
})
