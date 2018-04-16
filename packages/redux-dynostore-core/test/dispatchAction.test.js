/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import dispatchAction from 'src/dispatchAction'

describe('dispatchAction tests', () => {
  test('should dispatch action', () => {
    const action = { type: 'test' }
    const store = { dispatch: jest.fn() }

    dispatchAction(action)()(store)

    expect(store.dispatch).toBeCalledWith(action)
  })
})