/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cleanState from 'src/utils/cleanState'

describe('cleanState tests', () => {
  test('should remove undefined values from object', () => {
    const input = Object.freeze({ value1: 'keep', value2: undefined })
    const output = cleanState(input)
    expect(output).toEqual({ value1: 'keep' })
    expect(Object.keys(output)).toEqual(['value1'])
  })

  test('should return identity if all values are defined', () => {
    const input = Object.freeze({ value1: 'keep', value2: 'keep' })
    const output = cleanState(input)
    expect(output).toBe(input)
  })
})
