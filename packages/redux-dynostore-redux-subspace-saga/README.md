# @redux-dynostore/redux-subspace-saga

## Deprecated

**This library is no longer being actively maintained.**

IOOF has been slowly moving away from the ubiquitous use of Redux as a core piece of our micro-frontend architecture and have been actively replacing
the usage of this library with more standard React and JavaScript patterns.  Due to some technical constraints, we've also been unable to upgrade to
the latest version of the library ourselves for quite some time now, further fuelling our desire to move away from this solution.

At this time, we will be ceasing all maintenance tasks and we recommend that you consider using an alternative library:

* [`redux-dynamic-modules`](https://www.npmjs.com/package/redux-dynamic-modules)
* [`redux-injectors`](https://www.npmjs.com/package/redux-injectors)
* [`redux-sagas-injector`](https://www.npmjs.com/package/redux-sagas-injector)

If you want to continue using this library, we encourage you to fork this repo and take over maintenance yourself.

---

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
