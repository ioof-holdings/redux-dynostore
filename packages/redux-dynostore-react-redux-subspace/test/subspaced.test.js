/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import configureStore from 'redux-mock-store'
import { Provider, connect } from 'react-redux'
import { SubspaceProvider } from 'react-redux-subspace'
import { mount } from 'enzyme'

import subspaced from 'src/subspaced'

describe('subspaced tests', () => {
  const mockStore = configureStore([])
  let store

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
    store = mockStore({
      testId: {
        testKey: 'root value'
      },
      parentId: {
        testId: {
          testKey: 'nested value'
        }
      }
    })
  })

  test('should create subspaced enhanced component', () => {
    const SubspacedComponent = subspaced()('testId')()(ConnectedTestComponent)
    const wrapper = mount(
      <Provider store={store}>
        <SubspaceProvider mapState={state => state.parentId} namespace="parentId">
          <SubspacedComponent />
        </SubspaceProvider>
      </Provider>
    )

    expect(wrapper.html()).toBe('<p>nested value</p>')

    const actions = store.getActions()
    expect(actions.length).toEqual(1)
    expect(actions[0]).toEqual({ type: 'parentId/testId/TEST_DISPATCH' })
  })
})
