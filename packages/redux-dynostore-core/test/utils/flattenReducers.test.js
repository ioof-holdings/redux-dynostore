/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import flattenReducers from 'src/utils/flattenReducers'

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

    expect(flattenedStructure['test']).toBe(inputStructure.test)
    expect(flattenedStructure['nested.test']).toBe(inputStructure.nested.test)
    expect(flattenedStructure['multiple.test']).toBe(inputStructure.multiple.test)
    expect(flattenedStructure['multiple.nested.test']).toBe(inputStructure.multiple.nested.test)
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

    expect(flattenedStructure['test']).toBe(inputStructure['test'])
    expect(flattenedStructure['dot.test']).toBe(inputStructure['dot.test'])
    expect(flattenedStructure['slash.test']).toBe(inputStructure['slash/test'])
    expect(flattenedStructure['multiple.dot.test']).toBe(inputStructure['multiple.dot.test'])
    expect(flattenedStructure['multiple.slash.test']).toBe(inputStructure['multiple/slash/test'])
    expect(flattenedStructure['multiple.mixed.delimeter.test']).toBe(inputStructure['multiple/mixed.delimeter/test'])
  })
})
