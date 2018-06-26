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
