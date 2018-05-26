/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import flattenReducers from 'src/flattenReducers'

describe('flattenReducers tests', () => {
  test('should flatten object structure', () => {
    const inputStructure = {
      test: jest.fn(),
      nested: {
        test: jest.fn()
      },
      multiple: {
        test: jest.fn(),
        nested: {
          test: jest.fn()
        }
      }
    }

    const flattenedStructure = flattenReducers(inputStructure)

    expect(flattenedStructure[0].path).toEqual(['test'])
    expect(flattenedStructure[0].reducer).toBe(inputStructure.test)
    expect(flattenedStructure[1].path).toEqual(['nested', 'test'])
    expect(flattenedStructure[1].reducer).toBe(inputStructure.nested.test)
    expect(flattenedStructure[2].path).toEqual(['multiple', 'test'])
    expect(flattenedStructure[2].reducer).toBe(inputStructure.multiple.test)
    expect(flattenedStructure[3].path).toEqual(['multiple', 'nested', 'test'])
    expect(flattenedStructure[3].reducer).toBe(inputStructure.multiple.nested.test)
  })

  test('should normalize delimeters', () => {
    const inputStructure = {
      test: jest.fn(),
      'dot.test': jest.fn(),
      'slash/test': jest.fn(),
      'multiple.dot.test': jest.fn(),
      'multiple/slash/test': jest.fn(),
      'multiple/mixed.delimeter/test': jest.fn()
    }

    const flattenedStructure = flattenReducers(inputStructure)

    expect(flattenedStructure[0].path).toEqual(['test'])
    expect(flattenedStructure[0].reducer).toBe(inputStructure['test'])
    expect(flattenedStructure[1].path).toEqual(['dot', 'test'])
    expect(flattenedStructure[1].reducer).toBe(inputStructure['dot.test'])
    expect(flattenedStructure[2].path).toEqual(['slash', 'test'])
    expect(flattenedStructure[2].reducer).toBe(inputStructure['slash/test'])
    expect(flattenedStructure[3].path).toEqual(['multiple', 'dot', 'test'])
    expect(flattenedStructure[3].reducer).toBe(inputStructure['multiple.dot.test'])
    expect(flattenedStructure[4].path).toEqual(['multiple', 'slash', 'test'])
    expect(flattenedStructure[4].reducer).toBe(inputStructure['multiple/slash/test'])
    expect(flattenedStructure[5].path).toEqual(['multiple', 'mixed', 'delimeter', 'test'])
    expect(flattenedStructure[5].reducer).toBe(inputStructure['multiple/mixed.delimeter/test'])
  })
})
