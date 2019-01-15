/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { detachableReducer, cleanupDetachedReducer, detach } from 'src/reducers/detachableReducer'

describe('detachableReducer Tests', () => {
  const identifier = 'fooBar'

  test('should forward the dispatched action to the intial reducer and return the expected state', () => {
    const intialState = { foo: 'bar' }

    const reducer = detachableReducer(identifier)((state = intialState) => state)
    const state = reducer(intialState, { type: 'FOO', identifier })

    expect(state).toEqual(intialState)
  })

  test('should intercept the action and return an undefined state for this reducer', () => {
    const intialState = { foo: 'bar' }
    const reducer = detachableReducer(identifier)((state = intialState) => state)
    const state = reducer(intialState, detach(identifier))

    expect(state).toEqual(undefined)
  })

  test('should ignore the action if the identifier does not match', () => {
    const intialState = { foo: 'bar' }
    const reducer = detachableReducer(identifier)((state = intialState) => state)
    const state = reducer(intialState, detach('notFooBar'))

    expect(state).toBe(intialState)
  })

  test('should clean up detatched reducer', () => {
    const reducer = cleanupDetachedReducer(state => ({ ...state }))
    const state = reducer({ foo: undefined, bar: 'baz' }, detach(identifier))

    expect(state).toEqual({ bar: 'baz' })
    expect(Object.keys(state).length).toBe(1)
  })

  test('should not alter state on noop', () => {
    const intialState = { foo: 'bar' }
    const reducer = cleanupDetachedReducer((state = intialState) => state)
    const state = reducer(intialState, detach(identifier))

    expect(state).toBe(intialState)
  })

  test('should not alter state if no undefined values', () => {
    const intialState = { foo: 'bar' }
    const reducer = cleanupDetachedReducer((state = intialState) => state)
    const state = reducer(undefined, detach(identifier))

    expect(state).toBe(intialState)
  })
})
