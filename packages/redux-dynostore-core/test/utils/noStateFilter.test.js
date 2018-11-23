/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import noStateFilter from 'src/utils/noStateFilter'

describe('noStateFilter tests', () => {
  test('should not modify state in filter', () => {
    const input = Object.freeze({ value: 'keep' })
    const filter = noStateFilter()

    const output = filter.filter(input)
    expect(output).toBe(input)
  })

  test('should not modify new state when merging', () => {
    const oldState = Object.freeze({ value1: 'dont keep 1', value2: 'dont keep 2' })
    const newState = Object.freeze({ value1: 'keep 1', value3: 'keep 3' })
    const filter = noStateFilter()

    const output = filter.merge(oldState, newState)
    expect(output).toBe(newState)
  })
})
