# @redux-dynostore/redux-subspace-saga

[![build status](https://img.shields.io/travis/ioof-holdings/redux-dynostore/master.svg?style=flat-square)](https://travis-ci.org/ioof-holdings/redux-dynostore)
[![npm version](https://img.shields.io/npm/v/@redux-dynostore/redux-subspace-saga.svg?style=flat-square)](https://www.npmjs.com/package/@redux-dynostore/redux-subspace-saga)
[![npm downloads](https://img.shields.io/npm/dm/@redux-dynostore/redux-subspace-saga.svg?style=flat-square)](https://www.npmjs.com/package/@redux-dynostore/redux-subspace-saga)
[![License: BSD-3-Clause](https://img.shields.io/npm/l/@redux-dynostore/redux-subspace-saga.svg?style=flat-square)](/LICENSE.md)

Enhancers for integrating redux-dynostore with [redux-subspace-saga](https://github.com/ioof-holdings/redux-subspace/tree/master/packages/redux-subspace-saga).

## Enhancers

### `runSaga`

```javascript
import dynamic from '@redux-dynostore/react-redux'
import runSaga from '@redux-dynostore/redux-subspace-saga'

export default dynamic('identifier', runSaga(mySaga))(MyComponent)
```
