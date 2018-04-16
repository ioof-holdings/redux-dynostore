/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import { SubspaceProvider } from 'react-redux-subspace'
import { mount } from 'enzyme'

import dynostore from '@redux-dynostore/core'
import dynamic from '@redux-dynostore/react-redux'
import subspaced from 'src'

describe('integration tests', () => {
  let store
  const initialState = {
    testId: {
      testKey: 'root value'
    },
    parentId: {
      testId: {
        testKey: 'nested value'
      }
    }
  }

  class TestComponent extends React.Component {
    componentDidMount() {
      this.props.testDispatch()
    }

    render() {
      return <p>{this.props.testKey}</p>
    }
  }

  const mapStateToProps = state => ({
    testKey: state.testKey
  })

  const mapDispatchToProps = {
    testDispatch: () => ({ type: 'TEST_DISPATCH' })
  }

  const ConnectedTestComponent = connect(mapStateToProps, mapDispatchToProps)(TestComponent)

  beforeEach(() => {
    store = createStore((state = initialState) => state, dynostore())
  })

  test('should create subspaced enhanced component', () => {
    const SubspacedComponent = dynamic('testId', subspaced())(ConnectedTestComponent)
    const wrapper = mount(
      <Provider store={store}>
        <SubspaceProvider mapState={state => state.parentId} namespace="parentId">
          <SubspacedComponent />
        </SubspaceProvider>
      </Provider>
    )

    expect(wrapper.html()).toBe('<p>nested value</p>')
  })
})
