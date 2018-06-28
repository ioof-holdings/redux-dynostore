# @redux-dynostore/react-redux

[![build status](https://img.shields.io/travis/ioof-holdings/redux-dynostore/master.svg?style=flat-square)](https://travis-ci.org/ioof-holdings/redux-dynostore)
[![npm version](https://img.shields.io/npm/v/@redux-dynostore/react-redux.svg?style=flat-square)](https://www.npmjs.com/package/redux-dynostore-react-redux)
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
