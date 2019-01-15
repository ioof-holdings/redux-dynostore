/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { combineReducers } from 'redux'
import createDynamicReducer from 'src/reducers/createDynamicReducer'

describe('createDynamicReducer Tests', () => {
  test('should make reducer', () => {
    const dummyReducer = (state = { value: 0 }, action) =>
      action.type === 'INC' ? { ...state, value: state.value + 1 } : state

    const staticReducer = combineReducers({ static: dummyReducer })

    const dynamicStructure = {
      foo: dummyReducer,
      'foo.bar': dummyReducer,
      'foo.bar.baz': dummyReducer,
      'foo.bar.qux': dummyReducer,
      'foo.baz': dummyReducer,
      bar: dummyReducer,
      'bar.baz': dummyReducer
    }

    const reducer = createDynamicReducer(staticReducer, dynamicStructure)

    const initialState = reducer(undefined, { type: 'INIT' })

    expect(initialState).toEqual({
      static: {
        value: 0
      },
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
