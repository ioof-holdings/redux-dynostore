/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { shallowMerge, deepMerge } from 'src/utils/merge'

describe('merge tests', () => {
  describe('shallowMerge tests', () => {
    ;[{}, [], 0, true, 'new'].forEach(newState => {
      test(`should return ${Array.isArray(newState) ? 'array' : typeof newState} if oldState is missing`, () => {
        expect(shallowMerge(undefined, newState)).toBe(newState)
        expect(shallowMerge(null, newState)).toBe(newState)
      })

      test(`should return identity if ${
        Array.isArray(newState) ? 'array' : typeof newState
      } and oldState are the same reference`, () => {
        expect(shallowMerge(newState, newState)).toBe(newState)
      })
    })

    test('should merge objects', () => {
      const oldState = Object.freeze({ key1: 'value1', key2: 'nope' })
      const newState = Object.freeze({ key2: 'value2', key3: 'value3' })

      expect(shallowMerge(oldState, newState)).toEqual({
        key1: 'value1',
        key2: 'value2',
        key3: 'value3'
      })
    })

    test('should merge arrays', () => {
      const oldState = Object.freeze(['value1', 'value2'])
      const newState = Object.freeze(['value3', 'value4'])

      expect(shallowMerge(oldState, newState)).toEqual(['value3', 'value4'])
    })

    test('should merge primatives', () => {
      expect(shallowMerge(1, 2)).toBe(2)
      expect(shallowMerge(true, false)).toBe(false)
      expect(shallowMerge('old', 'new')).toBe('new')
    })

    test('should keep identity when merging the same object values', () => {
      const oldState = Object.freeze({ key1: 'value1', key2: 'value2' })
      const newState = Object.freeze({ key1: 'value1', key2: 'value2' })

      expect(shallowMerge(oldState, newState)).toBe(oldState)
    })

    test('should keep identity when merging a subset of object values', () => {
      const oldState = Object.freeze({ key1: 'value1', key2: 'value2', key3: 'value3' })
      const newState = Object.freeze({ key1: 'value1', key3: 'value3' })

      expect(shallowMerge(oldState, newState)).toBe(oldState)
    })

    ;[
      [{}, 1],
      [{}, true],
      [{}, 'new'],
      [{}, []],
      [[], 1],
      [[], true],
      [[], 'new'],
      [[], {}],
      [1, 'new'],
      [1, true],
      [1, {}],
      [1, []],
      [true, 1],
      [true, 'new'],
      [true, {}],
      [true, []],
      ['old', 1],
      ['old', true],
      ['old', {}],
      ['old', []]
    ].forEach(([oldState, newState]) => {
      const oldStateType = Array.isArray(oldState) ? 'array' : typeof oldState
      const newStateType = Array.isArray(newState) ? 'array' : typeof newState
      test(`should return newState when types are not same type for merging: ${oldStateType} -> ${newStateType}`, () => {
        expect(shallowMerge(oldState, newState)).toBe(newState)
      })
    })
  })

  describe('deepMerge tests', () => {
    ;[{}, [], 0, true, 'new'].forEach(newState => {
      test(`should return ${Array.isArray(newState) ? 'array' : typeof newState} if oldState is missing`, () => {
        expect(deepMerge(undefined, newState)).toBe(newState)
        expect(deepMerge(null, newState)).toBe(newState)
      })

      test(`should return identity if ${
        Array.isArray(newState) ? 'array' : typeof newState
      } and oldState are the same reference`, () => {
        expect(deepMerge(newState, newState)).toBe(newState)
      })
    })

    test('should merge objects', () => {
      const oldState = Object.freeze({ key1: 'value1', key2: 'value1' })
      const newState = Object.freeze({ key2: 'value2', key3: 'value3' })

      expect(deepMerge(oldState, newState)).toEqual({
        key1: 'value1',
        key2: 'value2',
        key3: 'value3'
      })
    })

    test('should merge arrays', () => {
      const oldState = Object.freeze(['value1', 'value2'])
      const newState = Object.freeze(['value3', 'value4'])

      expect(deepMerge(oldState, newState)).toEqual(['value3', 'value4'])
    })

    test('should merge primatives', () => {
      expect(deepMerge(1, 2)).toBe(2)
      expect(deepMerge(true, false)).toBe(false)
      expect(deepMerge('old', 'new')).toBe('new')
    })

    test('should deep merge objects', () => {
      const oldState = Object.freeze({
        group1: Object.freeze({ key1: 'value1', key2: 'value2' }),
        group2: Object.freeze({ key1: 'value3', key2: 'value4' })
      })
      const newState = Object.freeze({
        group2: Object.freeze({ key2: 'value5', key3: 'value6' }),
        group3: Object.freeze({ key1: 'value7', key2: 'value8' })
      })

      expect(deepMerge(oldState, newState)).toEqual({
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

    test('should keep identity when merging the same object values', () => {
      const object = Object.freeze({ key: 'value' })
      const array = Object.freeze(['value'])

      const oldState = Object.freeze({
        key1: object,
        key2: array,
        compositeObject: Object.freeze({ key1: object, key2: array })
      })
      const newState = Object.freeze({
        key1: object,
        key2: array,
        compositeObject: Object.freeze({ key1: object, key2: array })
      })

      expect(deepMerge(oldState, newState)).toBe(oldState)
    })

    test('should keep identity when merging a subset of object values', () => {
      const object = Object.freeze({ key: 'value' })
      const array = Object.freeze(['value'])

      const oldState = Object.freeze({
        key1: object,
        key2: array,
        compositeObject: Object.freeze({ key1: object, key2: array })
      })
      const newState = Object.freeze({ key2: array, compositeObject: Object.freeze({ key1: object }) })

      expect(deepMerge(oldState, newState)).toBe(oldState)
    })
    
    ;[
      [{}, 1],
      [{}, true],
      [{}, 'new'],
      [{}, []],
      [[], 1],
      [[], true],
      [[], 'new'],
      [[], {}],
      [1, 'new'],
      [1, true],
      [1, {}],
      [1, []],
      [true, 1],
      [true, 'new'],
      [true, {}],
      [true, []],
      ['old', 1],
      ['old', true],
      ['old', {}],
      ['old', []]
    ].forEach(([oldState, newState]) => {
      const oldStateType = Array.isArray(oldState) ? 'array' : typeof oldState
      const newStateType = Array.isArray(newState) ? 'array' : typeof newState
      test(`should return newState when types are not same type for merging: ${oldStateType} -> ${newStateType}`, () => {
        expect(deepMerge(oldState, newState)).toBe(newState)
      })
    })
  })
})
