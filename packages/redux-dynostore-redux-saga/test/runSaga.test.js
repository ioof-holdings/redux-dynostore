/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import runSaga from 'src/runSaga'

describe('runSaga tests', () => {
  test('should run saga', () => {
    const saga = jest.fn()
    const store = { runSagas: jest.fn() }

    runSaga(saga)('testId')(store)

    expect(store.runSagas).toBeCalledWith({ testId: saga })
  })

  test('should raise error if store has invalid runSagas', () => {
    const saga = jest.fn()
    const store = { runSagas: {} }

    expect(() => runSaga(saga)('testId')(store)).toThrow(TypeError)
  })
})
