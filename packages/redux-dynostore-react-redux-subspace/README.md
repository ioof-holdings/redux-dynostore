# @redux-dynostore/react-redux-subspace

[![build status](https://img.shields.io/travis/ioof-holdings/redux-dynostore/master.svg?style=flat-square)](https://travis-ci.org/ioof-holdings/redux-dynostore)
[![npm version](https://img.shields.io/npm/v/@redux-dynostore/react-redux-subspace.svg?style=flat-square)](https://www.npmjs.com/package/redux-dynostore-react-redux-subspace)
[![npm downloads](https://img.shields.io/npm/dm/@redux-dynostore/react-redux-subspace.svg?style=flat-square)](https://www.npmjs.com/package/@redux-dynostore/react-redux-subspace)
[![License: BSD-3-Clause](https://img.shields.io/npm/l/@redux-dynostore/react-redux-subspace.svg?style=flat-square)](/LICENSE.md)

Enhancer for mounting React components within subspaces when using redux-dynostore.

## Usage

```javascript
import dynamic from '@redux-dynostore/react-redux'
import subspaced from '@redux-dynostore/react-redux-subspace'

export default dynamic('identifier', subspaced())(MyComponent)
```

## With extra state

```javascript
export default dynamic('identifier', subspaced({ mapExtraState: (state, rootState) => ({ /* ... */ }) }))(MyComponent)
```

When mounted, `MyComponent` will be wrapped in a [`SubspaceProvider`](https://ioof-holdings.github.io/redux-subspace/packages/react-redux-subspace/docs/api/SubspaceProvider.html).

If you are attaching a reducer dynamically, you should use the [redux-subspace variant](/packages/redux-dynostore-redux-subspace) to ensure it will receive the namespaced actions.

## Options

`subspaced` accepts options to modify it's behaviour.  These can be used to optimize for different goals, such as accuracy or performace, or to support alternative state structures, such as `ImmutableJS`.

| Key | Description | Default | Inbuilt Options | Interface |
| --- | ----------- | ------- | --------------- | --------- |
| mergeFunction | Function used to merge a dynamic reducer's state with the state produced by it's dynamic children.  This function is also used when merging the dynamic reducer's state with the static reducer's state when the default is overridden.  | `shallowMerge` | `deepMerge|shallowMerge` | `(state, newState) => nextState` |
| resolveStateFunction | Function used to resolve a key in the state. | `objectKeyStateResolver` | `objectKeyStateResolver` | `(state, key) => subState` |
