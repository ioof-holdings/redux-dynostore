# @redux-dynostore/react-redux

[![build status](https://img.shields.io/travis/ioof-holdings/redux-dynostore/master.svg?style=flat-square)](https://travis-ci.org/ioof-holdings/redux-dynostore)
[![npm version](https://img.shields.io/npm/v/@redux-dynostore/react-redux.svg?style=flat-square)](https://www.npmjs.com/package/@redux-dynostore/react-redux)
[![npm downloads](https://img.shields.io/npm/dm/@redux-dynostore/react-redux.svg?style=flat-square)](https://www.npmjs.com/package/@redux-dynostore/react-redux)
[![License: BSD](https://img.shields.io/npm/l/@redux-dynostore/react-redux.svg?style=flat-square)](/LICENSE.md)

React bindings for redux-dynostore to provide dynamic redux features when a component is mounted.

## Usage

```javascript
import dynamic from '@redux-dynostore/react-redux'

export default dynamic('identifier', somethingDynamic(), somethingElseDynamic('with parameters'))(MyComponent)
```

### Multiple Instances

The `'identifier'` shown above is the key that will be used for all instances of the component.  If multiple instances are required to not share dynamic features (i.e. redux reducers), the the `createInstance` function can be used:

```javascript
import MyComponent from './MyComponent'

const MyComponent1 = MyComponent.createInstance('instance1')
const MyComponent2 = MyComponent.createInstance('instance2')
```

### Options

An optional options object can be passed as the final parameter to the `dynamic` function:

```javascript
export default dynamic('identifier', somethingDynamic(), { /* options */ })(MyComponent)
```

#### context

```javascript
import CustomReactReduxContext from './CustomReactReduxContext'

export default dynamic('identifier', somethingDynamic(), { context: CustomReactReduxContext })(MyComponent)
```

This option overrides the `context` used for accessing the store in the React context.  If you are overriding this value, you should also be overriding the context passed to any `Provider` and/or `connect` components as well.  Please refer to the [Redux documentation](https://react-redux.js.org/using-react-redux/accessing-store#providing-custom-context) for more details on this use case.

### `DynamicProvider`

`dynamic` components will not render when server-side rendering (SSR) your app unless you add a `DynamicProvider` somewhere near the root of of your component tree (anywhere above the the first `dynamic` component).
This will allow the component to call their enhancers synchronously in the first render pass.  You must also ensure that the `DynamicProvider` is also rendered when hydrating that app on the client.

```js
import ReactDom from 'react'
import { Provider } from 'react-redux'
import dynamic, { DynamicProvider } from '@redux-dynostore/react-redux'

import store from './store'
import MyDynamicComponent from './MyDynamicComponent

ReactDom.render((
  <Provider store={store}>
    <DynamicProvider>
      <MyDynamicComponent />
    </DynamicProvider>
  </Provider>
), document.getElementById('root'))
```

You can also nest multiple `DynamicProvider` components within each other.

```js
ReactDom.render((
  <Provider store={store}>
    <DynamicProvider>
      <ParentDynamicComponent>
        <DynamicProvider>
          <ChildDynamicComponent />
        </DynamicProvider>
      </ParentDynamicComponent>
    </DynamicProvider>
  </Provider>
), document.getElementById('root'))
```

One example of when you might do this is when composing multiple sub-apps together into a parent-app and each app could have their own `DynamicProvider` instance.
However, it is important to that the root `DynamicProvider` does not get unmounted and remounted as this will another synchronous render pass to occur after the first render, which will produce warnings from React about cross component
updates.

While not required for client-side rendering (CSR), `DynamicProvider`, it can also slightly improve performance of the first render pass, however, due to limited testing, there might be unforeseen impacts of using this in an a CSR
context, so use it at your own risk.

## Enhancers

Enhancers are used to provide additional wrappers around the passed component when it is mounted. The following enhancers are provided:

1. [Reducers](/packages/redux-dynostore-core) - dynamically attach reducers
2. [Sagas](/packages/redux-dynostore-redux-saga) - dynamically run sagas
3. [Dispatch Action](/packages/redux-dynostore-core) - dispatch actions when the component is mounted
4. [Subspaced](/packages/redux-dynostore-react-redux-subspace) - mounts the component is in a subspace for the components identifier
   1. [Namespaced Reducers](/packages/redux-dynostore-redux-subspace) - dynamically attach reducers that are namespaced with the component's identifier
   2. [Subspaced Sagas](/packages/redux-dynostore-redux-subspace-saga) - dynamically run sagas that are subspaced for the component's identifier
   3. [Dispatch Namepsaced Action](/packages/redux-dynostore-redux-subspace) - dispatch actions when the component is mounted that are namespaced with the component's identifier

### Custom Enhancers

Enahncers can be created for many use cases by implementing the following interface:

```javascript
const enhancer = identifier => store => Component => EnhancedComponent
```

### Instance Enhancers

Additional enhancers can be injected on a specific instance of a dynamic component 

```javascript
const MyComponent1 = MyComponent.createInstance('instance1', subspaced())
```
