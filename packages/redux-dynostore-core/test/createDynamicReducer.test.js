/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createDynamicReducer from 'src/createDynamicReducer'

describe('createDynamicReducer Tests', () => {
  test('should make reducer', () => {
    const dummyReducer = (state = { value: 0 }, action) =>
      action.type === 'INC' ? { ...state, value: state.value + 1 } : state

    const inputStructure = [
      {
        path: ['foo'],
        reducer: dummyReducer
      },
      {
        path: ['foo', 'bar'],
        reducer: dummyReducer
      },
      {
        path: ['foo', 'bar', 'baz'],
        reducer: dummyReducer
      },
      {
        path: ['foo', 'bar', 'qux'],
        reducer: dummyReducer
      },
      {
        path: ['foo', 'baz'],
        reducer: dummyReducer
      },
      {
        path: ['bar'],
        reducer: dummyReducer
      },
      {
        path: ['bar', 'baz'],
        reducer: dummyReducer
      }
    ]

    const reducer = createDynamicReducer(inputStructure)

    const initialState = reducer(undefined, { type: 'INIT' })

    expect(initialState).toEqual({
      foo: {
        value: 0,
        bar: {
          value: 0,
          baz: {
            value: 0
          },
          qux: {
            value: 0
          }
        },
        baz: {
          value: 0
        }
      },
      bar: {
        value: 0,
        baz: {
          value: 0
        }
      }
    })
  })
})
