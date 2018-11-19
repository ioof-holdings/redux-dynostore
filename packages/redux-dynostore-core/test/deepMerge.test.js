/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import deepMerge from 'src/deepMerge'

describe('deepMerge tests', () => {

  [{}, [], 0, true, "new"].forEach(source => {
    test(`should return ${Array.isArray(source) ? 'array' : typeof source} source if target is missing`, () => {
      expect(deepMerge(undefined, source)).toBe(source)
      expect(deepMerge(null, source)).toBe(source)
    })

    test(`should return ${Array.isArray(source) ? 'array' : typeof source} source if target is missing`, () => {
      expect(deepMerge(undefined, source)).toBe(source)
      expect(deepMerge(null, source)).toBe(source)
    })

    test(`should return identity if ${Array.isArray(source) ? 'array' : typeof source} source and target are the same reference`, () => {
      expect(deepMerge(source, source)).toBe(source)
    })
  })

  test('should shallow merge objects', () => {
    const target = Object.freeze({ key1: 'value1', key2: 'value2' })
    const source = Object.freeze({ key1: 'value1', key3: 'value3' })

    expect(deepMerge(target, source)).toEqual({
      key1: 'value1',
      key2: 'value2',
      key3: 'value3'
    })
  })

  test('should shallow merge arrays', () => {
    const target = Object.freeze(['value1', 'value2'])
    const source = Object.freeze(['value1', 'value3'])

    expect(deepMerge(target, source)).toEqual([
      'value1',
      'value3'
    ])
  })

  test('should shallow merge primatives', () => {
    expect(deepMerge(1, 2)).toBe(2)
    expect(deepMerge(true, false)).toBe(false)
    expect(deepMerge("old", "new")).toBe("new")
  })

  test('should deep merge objects', () => {
    const target = Object.freeze({ group1: { key1: 'value1', key2: 'value2' }, group2: { key1: 'value3', key2: 'value4' } })
    const source = Object.freeze({ group2: { key2: 'value5', key3: 'value6' }, group3: { key1: 'value7', key2: 'value8' } })

    expect(deepMerge(target, source)).toEqual({
      group1: {
        key1: 'value1',
        key2: 'value2'
      },
      group2: {
        key1: 'value3',
        key2: 'value5',
        key3: 'value6'
      },
      group3: {
        key1: 'value7',
        key2: 'value8'
      }
    })
  })

  test('should deep merge arrays of arrays', () => {
    const target = Object.freeze([['value1', 'value2']])
    const source = Object.freeze([['value1', 'value3'], ['value4', 'value5']])

    expect(deepMerge(target, source)).toEqual([
      ['value1', 'value3'],
      ['value4', 'value5']
    ])
  })

  test('should deep merge arrays of objects', () => {
    const target = Object.freeze([{ key1: 'value1', key2: 'value2' }, { key1: 'value3', key2: 'value4' }])
    const source = Object.freeze([{ key2: 'value5', key3: 'value6' }])

    expect(deepMerge(target, source)).toEqual([
      { key1: 'value1', key2: 'value5', key3: 'value6' },
      { key1: 'value3', key2: 'value4' }
    ])
  })

  test('should keep identity when merging the same object values', () => {
    const object = Object.freeze({ key: 'value' })
    const array = Object.freeze(['value'])

    const target = Object.freeze({ key1: object, key2: array, compositeObject: { key1: object, key2: array }, compositeArray: [object, array] })
    const source = Object.freeze({ key1: object, key2: array, compositeObject: { key1: object, key2: array }, compositeArray: [object, array] })

    expect(deepMerge(target, source)).toBe(target)
  })

  test('should keep identity when merging the same array values', () => {
    const object = Object.freeze({ key: 'value' })
    const array = Object.freeze(['value'])

    const target = Object.freeze([object, array, { key1: object, key2: array }, [object, array]])
    const source = Object.freeze([object, array, { key1: object, key2: array }, [object, array]])

    expect(deepMerge(target, source)).toBe(target)
  })

  ;[
    [{}, 1], [{}, true], [{}, "new"], [{}, []],
    [[], 1], [[], true], [[], "new"], [[], {}],
    [1, "new"], [1, true], [1, {}], [1, []],
    [true, 1], [true, "new"], [true, {}], [true, []],
    ["old", 1], ["old", true], ["old", {}], ["old", []]
  ].forEach(([target, source]) => {
    test(`should return source when source type is ${Array.isArray(source) ? 'array' : typeof source} and target type is ${Array.isArray(target) ? 'array' : typeof target}`, () => {
      expect(deepMerge(target, source)).toBe(source)
    })
  })
})