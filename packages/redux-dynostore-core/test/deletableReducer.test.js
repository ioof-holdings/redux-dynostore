/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createStore } from 'redux'
import { default as deletableReducer, DELETE_TYPE } from 'src/deletableReducer'

describe('deletableReducer Tests', () => {

  test('should forward the dispatched action to the intial reducer and return the expected state', () => {
      const intialState = { foo: "bar" }
      const reducer = deletableReducer((state = intialState) => state)
      const store = createStore(reducer)

      store.dispatch({ type: "FOO" })

      expect(store.getState()).toEqual(intialState)
  })

  test('should intercept the action and return a null state for this reducer', () => {
      const intialState = { foo: "bar" }
      const reducer = deletableReducer((state = intialState) => state)
      const store = createStore(reducer)

      store.dispatch({ type: DELETE_TYPE })

      expect(store.getState()).toEqual(null)
  })
})
