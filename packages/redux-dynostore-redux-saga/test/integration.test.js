/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { takeEvery, put } from 'redux-saga/effects'
import dynostore, { createDynamicTarget } from '@redux-dynostore/core'
import { dynamicSagas, runSaga } from 'src'

describe('integration tests', () => {
  const makeTestReducer = id => (state = `${id} - initialValue`, { type, newValue }) => {
    return type === 'CHANGE_VALUE' ? `${id} - ${newValue}` : state
  }

  const changeValue = newValue => ({ type: 'CHANGE_VALUE', newValue })

  const createSaga = (newValue) => function* saga() {
    yield takeEvery('MAKE_CHANGE', function* () {
      yield put(changeValue(newValue))
    })
  }

  const mockTarget = (enhancers, id, store, mockFn) => {
    return createDynamicTarget(enhancers)(id)(store)(mockFn)
  }

  test('should run sagas', () => {
    const reducer = combineReducers({
      static1: makeTestReducer('static1'),
      static2: makeTestReducer('static2')
    })

    const sagaMiddleware = createSagaMiddleware()

    const store = createStore(reducer, compose(
      applyMiddleware(sagaMiddleware),
      dynostore(dynamicSagas(sagaMiddleware))
    ))

    const target = mockTarget([runSaga(createSaga('newValue'))], 'dynamic', store, jest.fn())

    store.dispatch({ type: 'MAKE_CHANGE' })

    expect(store.getState()).toEqual({
      static1: 'static1 - newValue',
      static2: 'static2 - newValue'
    })

    expect(target).not.toHaveBeenCalled()
  })

  test('should cancel sagas', () => {
    const reducer = combineReducers({
      static1: makeTestReducer('static1'),
      static2: makeTestReducer('static2')
    })

    const sagaMiddleware = createSagaMiddleware()

    const store = createStore(reducer, compose(
      applyMiddleware(sagaMiddleware),
      dynostore(dynamicSagas(sagaMiddleware))
    ))

    const target = mockTarget([runSaga(createSaga('newValue'))], 'dynamic', store, jest.fn())

    store.cancelSagas(['static2', 'dynamic'])

    store.dispatch({ type: 'MAKE_CHANGE' })

    expect(store.getState()).toEqual({
      static1: 'static1 - initialValue',
      static2: 'static2 - initialValue'
    })

    expect(target).not.toHaveBeenCalled()
  })
})
