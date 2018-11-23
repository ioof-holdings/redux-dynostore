/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import plainStateFilter from 'src/utils/plainStateFilter'

describe('plainStateFilter tests', () => {
  [[[], ['drop'], ['keep']], 0, true, "new"].forEach(([initialState, oldState, input]) => {
    test(`should not filter if input is not a plain object: ${Array.isArray(input) ? 'array' : typeof source}`, () => {
      const filter = plainStateFilter(initialState)
  
      const output = filter.filter(input)

      expect(output).toBe(input)
    })

    test(`should not merge if input is not a plain object: ${Array.isArray(input) ? 'array' : typeof source}`, () => {
      const filter = plainStateFilter(initialState)
  
      const output = filter.merge(oldState, input)

      expect(output).toBe(input)
    })
  })

  test('should only return keys from initial state from filter', () => {
    const initialState = Object.freeze({ value1: 'initial 1', value3: 'initial 3' })
    const input = Object.freeze({ value1: 'keep 1', value2: 'drop 2', value3: 'keep 3' })
    const filter = plainStateFilter(initialState)

    const output = filter.filter(input)
    expect(output).toEqual({ value1: 'keep 1', value3: 'keep 3' })
  })

  test('should not modify new state when merging', () => {
    const oldState = Object.freeze({ value1: 'dont keep 1', value2: 'keep 2' })
    const newState = Object.freeze({ value1: 'keep 1', value3: 'keep 3' })
    const filter = plainStateFilter(oldState)

    const output = filter.merge(oldState, newState)
    expect(output).toEqual({ value1: 'keep 1', value2: 'keep 2', value3: 'keep 3' })
  })
})
