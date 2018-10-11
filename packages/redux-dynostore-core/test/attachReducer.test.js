/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import attachReducer from 'src/attachReducer'

describe('attachReducer tests', () => {
  test('should attach reducer', () => {
    const reducer = jest.fn()
    const store = { attachReducers: jest.fn() }

    attachReducer(reducer)('testId')(store)

    expect(store.attachReducers).toBeCalledWith({ testId: reducer })
  })

  test('should raise error if store has invalid attachReducers', () => {
    const reducer = jest.fn()
    const store = { attachReducers: {} }

    expect(() => attachReducer(reducer)('testId')(store)).toThrow(TypeError)
  })
})
