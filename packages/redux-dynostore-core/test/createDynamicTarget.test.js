/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createDynamicTarget from 'src/createDynamicTarget'

describe('createDynamicTarget tests', () => {
  const mockTarget = (enhancers, id, store, mockFn) => {
    return createDynamicTarget(enhancers)(id)(store)(mockFn)
  }

  const mockEnhancer = mockFn => identifier => store => {
    mockFn(identifier, store)
  }

  const mockTargetEnhancer = () => identifier => store => mockFn => {
    mockFn(identifier, store)
    return mockFn
  }

  test('should call enhancer', () => {
    const store = { getState: jest.fn(), dispatch: jest.fn() }

    const mockFn = jest.fn()
    const target = mockTarget([mockEnhancer(mockFn)], 'dynamic', store, jest.fn())

    expect(mockFn).toHaveBeenCalledWith('dynamic', store)
    expect(target).not.toHaveBeenCalled()
  })

  test('should wrap target', () => {
    const store = { getState: jest.fn(), dispatch: jest.fn() }

    const target = mockTarget([mockTargetEnhancer()], 'dynamic', store, jest.fn())

    expect(target).toHaveBeenCalledWith('dynamic', store)
  })

  test('should call all enhancers', () => {
    const store = { getState: jest.fn(), dispatch: jest.fn() }

    const mockFn1 = jest.fn()
    const mockFn2 = jest.fn()
    const target = mockTarget(
      [mockEnhancer(mockFn1), mockEnhancer(mockFn2), mockTargetEnhancer(), mockTargetEnhancer()],
      'dynamic',
      store,
      jest.fn()
    )

    expect(mockFn1).toHaveBeenCalledWith('dynamic', store)
    expect(mockFn2).toHaveBeenCalledWith('dynamic', store)
    expect(target).toHaveBeenCalledWith('dynamic', store)
    expect(target).toHaveBeenCalledTimes(2)
  })
})
