/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import ReactDomServer from 'react-dom/server'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import dynamic, { DynamicProvider } from 'src/dynamic'

describe('dynamic tests', () => {
  test('should create dynamic component', () => {

    const fakeStore = {
      getState: () => {},
      dispatch: () => {},
      subscribe: () => {}
    }

    const TestComponent = () => <p>Hello World</p>
    const DynamicComponent = dynamic('testId')(TestComponent)

    const { getByText } = render(<Provider store={fakeStore}><DynamicComponent /></Provider>)

    expect(getByText('Hello World')).toBeDefined()
  })

  test('should create dynamic component with enhancer', () => {
    const callback = jest.fn()

    const fakeStore = {
      getState: () => {},
      dispatch: () => {},
      subscribe: () => {}
    }

    const testEnhancer = identifier => store => {
      expect(identifier).toBe('testId')
      expect(store).toBe(fakeStore)
      callback()
    }

    const TestComponent = () => <p>Hello World</p>
    const DynamicComponent = dynamic('testId', testEnhancer)(TestComponent)

    const { getByText } = render(<Provider store={fakeStore}><DynamicComponent /></Provider>)

    expect(getByText('Hello World')).toBeDefined()
    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('should create dynamic component with multiple enhancers', () => {
    const callback = jest.fn()

    const fakeStore = {
      getState: () => {},
      dispatch: () => {},
      subscribe: () => {}
    }

    const testEnhancer = instance => identifier => store => {
      expect(identifier).toBe('testId')
      expect(store).toBe(fakeStore)
      callback(instance)
    }

    const TestComponent = () => <p>Hello World</p>
    const DynamicComponent = dynamic('testId', testEnhancer(1), testEnhancer(2))(TestComponent)

    const { getByText } = render(<Provider store={fakeStore}><DynamicComponent /></Provider>)

    expect(getByText('Hello World')).toBeDefined()
    expect(callback).toHaveBeenCalledWith(1)
    expect(callback).toHaveBeenCalledWith(2)
    expect(callback).toHaveBeenCalledTimes(2)
  })

  test('should create instance of dynamic component with enhancer', () => {
    const callback = jest.fn()

    const fakeStore = {
      getState: () => {},
      dispatch: () => {},
      subscribe: () => {}
    }

    const testEnhancer = identifier => store => {
      expect(identifier).toBe('testId')
      expect(store).toBe(fakeStore)
      callback()
    }

    const TestComponent = () => <p>Hello World</p>
    const DynamicComponent = dynamic('baseId', testEnhancer)(TestComponent).createInstance('testId')

    const { getByText } = render(<Provider store={fakeStore}><DynamicComponent /></Provider>)

    expect(getByText('Hello World')).toBeDefined()
    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('should create instance of dynamic component with enhancer and instance enhancer', () => {
    const callback = jest.fn()

    const fakeStore = {
      getState: () => {},
      dispatch: () => {},
      subscribe: () => {}
    }

    const testEnhancer = instance => identifier => store => {
      expect(identifier).toBe('testId')
      expect(store).toBe(fakeStore)
      callback(instance)
    }

    const TestComponent = () => <p>Hello World</p>
    const DynamicComponent = dynamic('baseId', testEnhancer(1))(TestComponent).createInstance('testId', testEnhancer(2))

    const { getByText } = render(<Provider store={fakeStore}><DynamicComponent /></Provider>)

    expect(getByText('Hello World')).toBeDefined()
    expect(callback).toHaveBeenCalledWith(1)
    expect(callback).toHaveBeenCalledWith(2)
    expect(callback).toHaveBeenCalledTimes(2)
  })

  test('should recreate dynamic component if store changes', () => {

    const fakeStore1 = {
      getState: () => {},
      dispatch: () => {},
      subscribe: () => {}
    }

    const fakeStore2 = {
      getState: () => {},
      dispatch: () => {},
      subscribe: () => {}
    }

    const stores = []

    const testEnhancer = () => store => {
      stores.push(store)
    }

    const TestComponent = () => <p>Hello World</p>
    const DynamicComponent = dynamic('testId', testEnhancer)(TestComponent)

    const { rerender } = render(<Provider store={fakeStore1}><DynamicComponent /></Provider>)

    rerender(<Provider store={fakeStore2}><DynamicComponent /></Provider>)

    expect(stores[0]).toBe(fakeStore1)
    expect(stores[1]).toBe(fakeStore2)
  })

  test('should create dynamic component with custom context', () => {
    const callback = jest.fn()

    const fakeStore = {
      getState: () => {},
      dispatch: () => {},
      subscribe: () => {}
    }

    const testEnhancer = identifier => store => {
      expect(identifier).toBe('testId')
      expect(store).toBe(fakeStore)
      callback()
    }

    const context = React.createContext()

    const TestComponent = () => <p>Hello World</p>
    const DynamicComponent = dynamic('testId', testEnhancer, { context })(TestComponent)

    const { getByText } = render(<Provider store={fakeStore} context={context}><DynamicComponent /></Provider>)

    expect(getByText('Hello World')).toBeDefined()
    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('should create dynamic component on first pass when server rendering', () => {
    const callback = jest.fn()

    const fakeStore = {
      getState: () => {},
      dispatch: () => {},
      subscribe: () => {}
    }

    const testEnhancer = identifier => store => {
      expect(identifier).toBe('testId')
      expect(store).toBe(fakeStore)
      callback()
    }

    const TestComponent = () => <p>Hello World</p>
    const DynamicComponent = dynamic('testId', testEnhancer)(TestComponent)

    const output = ReactDomServer.renderToString((
      <Provider store={fakeStore}>
        <DynamicProvider>
          <DynamicComponent />
        </DynamicProvider>
      </Provider>
    ))

    expect(output).toEqual(expect.stringMatching(/Hello World/))
    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('should hydrate dynamic component after server rendering', () => {
    const callback = jest.fn()

    const fakeStore = {
      getState: () => {},
      dispatch: () => {},
      subscribe: () => {}
    }

    const testEnhancer = identifier => store => {
      expect(identifier).toBe('testId')
      expect(store).toBe(fakeStore)
      callback()
    }

    const TestComponent = () => <p>Hello World</p>
    const DynamicComponent = dynamic('testId', testEnhancer)(TestComponent)

    const output = ReactDomServer.renderToString((
      <Provider store={fakeStore}>
        <DynamicProvider>
          <DynamicComponent />
        </DynamicProvider>
      </Provider>
    ))

    const container = document.createElement('div')
    container.innerHTML = output

    const { getByText } = render((
      <Provider store={fakeStore}>
        <DynamicProvider>
          <DynamicComponent />
        </DynamicProvider>
      </Provider>
    ), { container, hydrate: true })

    expect(getByText('Hello World')).toBeDefined()
    expect(callback).toHaveBeenCalledTimes(2)
  })
})
