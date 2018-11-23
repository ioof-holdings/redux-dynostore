/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This newState code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this newState tree.
 */

import shallowMerge from 'src/utils/shallowMerge'

describe('shallowMerge tests', () => {

  [{}, [], 0, true, "new"].forEach(newState => {
    test(`should return ${Array.isArray(newState) ? 'array' : typeof newState} newState if oldState is missing`, () => {
      expect(shallowMerge(undefined, newState)).toBe(newState)
      expect(shallowMerge(null, newState)).toBe(newState)
    })

    test(`should return identity if ${Array.isArray(newState) ? 'array' : typeof newState} newState and oldState are the same reference`, () => {
      expect(shallowMerge(newState, newState)).toBe(newState)
    })
  })

  test('should shallow merge objects', () => {
    const oldState = Object.freeze({ key1: 'value1', key2: 'value2' })
    const newState = Object.freeze({ key1: 'value3', key3: 'value4' })

    expect(shallowMerge(oldState, newState)).toEqual({
      key1: 'value3',
      key2: 'value2',
      key3: 'value4'
    })
  })

  test('should shallow merge arrays', () => {
    const oldState = Object.freeze(['value1', 'value2', 'value3'])
    const newState = Object.freeze(['value1', 'value3'])

    expect(shallowMerge(oldState, newState)).toEqual([
      'value1',
      'value3'
    ])
  })

  test('should shallow merge primatives', () => {
    expect(shallowMerge(1, 2)).toBe(2)
    expect(shallowMerge(true, false)).toBe(false)
    expect(shallowMerge("old", "new")).toBe("new")
  })

  test('should return identity when merging the same object values', () => {
    const oldState = Object.freeze({ key1: 'value1', key2: 'value2' })
    const newState = Object.freeze({ key1: 'value1', key2: 'value2' })

    expect(shallowMerge(oldState, newState)).toBe(oldState)
  })

  test('should return identity when merging a subset of object values', () => {
    const oldState = Object.freeze({ key1: 'value1', key2: 'value2', key3: 'value3' })
    const newState = Object.freeze({ key1: 'value1', key3: 'value3' })

    expect(shallowMerge(oldState, newState)).toBe(oldState)
  })

  ;[
    [{}, 1], [{}, true], [{}, "new"], [{}, []],
    [[], 1], [[], true], [[], "new"], [[], {}],
    [1, "new"], [1, true], [1, {}], [1, []],
    [true, 1], [true, "new"], [true, {}], [true, []],
    ["old", 1], ["old", true], ["old", {}], ["old", []]
  ].forEach(([oldState, newState]) => {
    const oldStateType = Array.isArray(oldState) ? 'array' : typeof oldState
    const newStateType = Array.isArray(newState) ? 'array' : typeof newState
    test(`should return newState when types are not same type for merging: ${oldStateType} -> ${newStateType}`, () => {
      expect(shallowMerge(oldState, newState)).toBe(newState)
    })
  })
})