/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { escapeIdentifier, escapeIdentifiers, unescapeIdentifier, splitIdentifier } from 'src/escapeIdentifier'

describe('escapeIdentifier tests', () => {
  test('should escape identifier', () => {
    expect(escapeIdentifier('test')).toBe('test')
    expect(escapeIdentifier('dot.test')).toBe('dot%%DOT_TOKEN%%test')
    expect(escapeIdentifier('slash/test')).toBe('slash%%FORWARD_SLASH_TOKEN%%test')
    expect(escapeIdentifier('multiple.dot.test')).toBe('multiple%%DOT_TOKEN%%dot%%DOT_TOKEN%%test')
    expect(escapeIdentifier('multiple/slash/test')).toBe(
      'multiple%%FORWARD_SLASH_TOKEN%%slash%%FORWARD_SLASH_TOKEN%%test'
    )
    expect(escapeIdentifier('multiple/mixed.delimeter/test')).toBe(
      'multiple%%FORWARD_SLASH_TOKEN%%mixed%%DOT_TOKEN%%delimeter%%FORWARD_SLASH_TOKEN%%test'
    )
  })

  test('should escape identifiers in object structure', () => {
    const inputStructure = {
      ['top.level']: jest.fn(),
      nested: {
        ['nested/level']: jest.fn()
      },
      multiple: {
        nested: {
          ['mutliple.nested/level']: jest.fn()
        },
        ['mid/level']: {
          test: jest.fn()
        }
      }
    }

    expect(escapeIdentifiers(inputStructure)).toEqual({
      ['top%%DOT_TOKEN%%level']: inputStructure['top.level'],
      nested: {
        ['nested%%FORWARD_SLASH_TOKEN%%level']: inputStructure.nested['nested/level']
      },
      multiple: {
        nested: {
          ['mutliple%%DOT_TOKEN%%nested%%FORWARD_SLASH_TOKEN%%level']:
            inputStructure.multiple.nested['mutliple.nested/level']
        },
        ['mid%%FORWARD_SLASH_TOKEN%%level']: {
          test: inputStructure.multiple['mid/level'].test
        }
      }
    })
  })

  test('should unescape identifier', () => {
    expect(unescapeIdentifier('test')).toBe('test')
    expect(unescapeIdentifier('dot%%DOT_TOKEN%%test')).toBe('dot.test')
    expect(unescapeIdentifier('slash%%FORWARD_SLASH_TOKEN%%test')).toBe('slash/test')
    expect(unescapeIdentifier('multiple%%DOT_TOKEN%%dot%%DOT_TOKEN%%test')).toBe('multiple.dot.test')
    expect(unescapeIdentifier('multiple%%FORWARD_SLASH_TOKEN%%slash%%FORWARD_SLASH_TOKEN%%test')).toBe(
      'multiple/slash/test'
    )
    expect(
      unescapeIdentifier('multiple%%FORWARD_SLASH_TOKEN%%mixed%%DOT_TOKEN%%delimeter%%FORWARD_SLASH_TOKEN%%test')
    ).toBe('multiple/mixed.delimeter/test')
  })

  test('should split identifier', () => {
    expect(splitIdentifier('test')).toEqual(['test'])
    expect(splitIdentifier('dot.test')).toEqual(['dot', 'test'])
    expect(splitIdentifier('slash/test')).toEqual(['slash', 'test'])
    expect(splitIdentifier('multiple.dot.test')).toEqual(['multiple', 'dot', 'test'])
    expect(splitIdentifier('multiple/slash/test')).toEqual(['multiple', 'slash', 'test'])
    expect(splitIdentifier('multiple/mixed.delimeter/test')).toEqual(['multiple', 'mixed', 'delimeter', 'test'])
  })
})
