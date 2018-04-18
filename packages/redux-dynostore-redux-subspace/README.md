# @redux-dynostore/redux-subspace

[![build status](https://img.shields.io/travis/ioof-holdings/redux-dynostore/master.svg?style=flat-square)](https://travis-ci.org/ioof-holdings/redux-dynostore)
[![npm version](https://img.shields.io/npm/v/@redux-dynostore/redux-subspace.svg?style=flat-square)](https://www.npmjs.com/package/redux-dynostore-redux-subspace)
[![npm downloads](https://img.shields.io/npm/dm/@redux-dynostore/redux-subspace.svg?style=flat-square)](https://www.npmjs.com/package/@redux-dynostore/redux-subspace)
[![License: BSD-3-Clause](https://img.shields.io/npm/l/@redux-dynostore/redux-subspace.svg?style=flat-square)](/LICENSE.md)

Enhancers for integrating redux-dynostore with [redux-subspace](https://github.com/ioof-holdings/redux-subspace).

## Enhancers

### `attachReducer`

```javascript
import dynamic from '@redux-dynostore/react-redux'
import { attachReducer }  from '@redux-dynostore/redux-subspace'

export default dynamic('identifier', attachReducer(myReducer))(MyComponent)
```

### `dispatchAction`

This enhancer is similar to the base [`dispatchAction` enhancer](/package/react-redux-dynostore), except the action is namespaces with the `dynamic` component's identifier:

```javascript
import dynamic from '@redux-dynostore/react-redux'
import subspaced, { dispatchAction } from '@redux-dynostore/redux-subspace'

export default dynamic('identifier', subspaced(), dispatchAction({ type: 'MY_ACTION' }))(MyComponent)
```
