/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import runSaga from 'src/runSaga'

describe('runSaga tests', () => {
  let store

  const saga = jest.fn()

  beforeEach(() => {
    store = {
      runSagas: jest.fn()
    }
  })

  test('should run saga on non namespaced store', () => {
    runSaga(saga)('testId')(store)

    expect(store.runSagas.mock.calls[0][0]['testId']).toBeTruthy()
    expect(store.runSagas.mock.calls[0][0]['parentId/testId']).toBeUndefined()
    expect(store.runSagas).toHaveBeenCalledTimes(1)
  })

  test('should run saga on namespaced store', () => {
    store.namespace = 'parentId'

    runSaga(saga)('testId')(store)

    expect(store.runSagas.mock.calls[0][0]['parentId/testId']).toBeTruthy()
    expect(store.runSagas.mock.calls[0][0]['testId']).toBeUndefined()
    expect(store.runSagas).toHaveBeenCalledTimes(1)
  })
})
