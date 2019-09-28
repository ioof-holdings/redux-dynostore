/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'

import dynostore from '@redux-dynostore/core'
import dynamic from 'src'

describe('integration tests', () => {
  let store

  const TestComponent = () => <div>expected</div>

  const testDynamicEnhancer = mockFn => identifier => store => Component => {
    mockFn(identifier, store, Component)
    return Component
  }

  beforeEach(() => {
    store = createStore((state = {}) => state, dynostore())
  })

  test('should enhance component with dynamic enhaners', () => {
    const mockFn = jest.fn()
    const DynamicComponent = dynamic('testId', testDynamicEnhancer(mockFn))(TestComponent)
    const { getByText } = render(
      <Provider store={store}>
        <DynamicComponent />
      </Provider>
    )

    expect(getByText('expected')).toBeDefined()
    expect(mockFn).toBeCalledWith('testId', store, TestComponent)
  })
})
