/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This newState code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this newState tree.
 */

import shallowCombine from 'src/utils/shallowCombine'

describe('shallowCombine tests', () => {

  [{}, [], 0, true, "new"].forEach(newState => {
    test(`should return ${Array.isArray(newState) ? 'array' : typeof newState} newState if oldState is missing`, () => {
      expect(shallowCombine(undefined, 'test', newState)).toEqual({ test: newState })
      expect(shallowCombine(null, 'test', newState)).toEqual({ test: newState })
    })
  })

  test('should shallow combine objects', () => {
    const oldState = Object.freeze({ key1: 'value1', key2: 'value2' })
    const newState = 'value3'

    expect(shallowCombine(oldState, 'key1', newState)).toEqual({
      key1: 'value3',
      key2: 'value2'
    })
  })

  test('should return identity when merging the same object values', () => {
    const oldState = Object.freeze({ key1: 'value1', key2: 'value2' })
    const newState = 'value1'

    expect(shallowCombine(oldState, 'key1', newState)).toBe(oldState)
  })
})