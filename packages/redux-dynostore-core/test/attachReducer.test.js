/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import attachReducer from 'src/attachReducer'
import detach from 'src/detachableReducer'

jest.mock('src/detachableReducer', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(reducer => reducer)
}))

describe('attachReducer tests', () => {
  test('should attach reducer', () => {
    const reducer = jest.fn()
    const store = { attachReducers: jest.fn() }

    attachReducer(reducer)('testId')(store)

    expect(detach).toBeCalledWith('testId')
    expect(store.attachReducers).toBeCalledWith({ testId: reducer })
  })

  test('should raise error if store has invalid attachReducers', () => {
    const reducer = jest.fn()
    const store = { attachReducers: {} }

    expect(() => attachReducer(reducer)('testId')(store)).toThrow(TypeError)
  })
})
