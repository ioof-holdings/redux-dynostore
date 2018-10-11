/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createStore } from 'redux'
import { detachable, detach } from 'src/detachableReducer'

describe('detachableReducer Tests', () => {
  const identifier = 'fooBar'

  test('should forward the dispatched action to the intial reducer and return the expected state', () => {
      const intialState = { foo: "bar" }

      const reducer = detachable(identifier)((state = intialState) => state)
      const store = createStore(reducer)

      store.dispatch({ type: "FOO", identifier })

      expect(store.getState()).toEqual(intialState)
  })

  test('should intercept the action and return a null state for this reducer', () => {
      const intialState = { foo: "bar" }
      const reducer = detachable(identifier)((state = intialState) => state)
      const store = createStore(reducer)

      store.dispatch(detach(identifier))

      expect(store.getState()).toEqual(undefined)
  })

  test('should ignore the action if the identifier does not match', () => {
    const intialState = { foo: "bar" }
    const reducer = detachable(identifier)((state = intialState) => state)
    const store = createStore(reducer)

    store.dispatch(detach('notFooBar'))

    expect(store.getState()).toEqual(intialState)
  })
})
