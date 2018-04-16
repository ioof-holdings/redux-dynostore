/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import attachReducer from 'src/attachReducer'

describe('attachReducer tests', () => {
  let store

  const reducer = state => state

  beforeEach(() => {
    store = {
      attachReducers: jest.fn()
    }
  })

  test('should attach reducer to non namespaced store', () => {
    attachReducer(reducer)('testId')(store)

    expect(store.attachReducers.mock.calls[0][0]['testId']).toBeTruthy()
    expect(store.attachReducers.mock.calls[0][0]['parentId/testId']).toBeUndefined()
    expect(store.attachReducers).toHaveBeenCalledTimes(1)
  })

  test('should attach reducer to namespaced store', () => {
    store.namespace = 'parentId'

    attachReducer(reducer)('testId')(store)

    expect(store.attachReducers.mock.calls[0][0]['parentId/testId']).toBeTruthy()
    expect(store.attachReducers.mock.calls[0][0]['testId']).toBeUndefined()
    expect(store.attachReducers).toHaveBeenCalledTimes(1)
  })
})
