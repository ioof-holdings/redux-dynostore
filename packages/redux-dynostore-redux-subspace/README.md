# @redux-dynostore/redux-subspace

## Deprecated

**This library is no longer being actively maintained.**

IOOF has been slowly moving away from the ubiquitous use of Redux as a core piece of our micro-frontend architecture and have been actively replacing
the usage of this library with more standard React and JavaScript patterns.  Due to some technical constraints, we've also been unable to upgrade to
the latest version of the library ourselves for quite some time now, further fuelling our desire to move away from this solution.

At this time, we will be ceasing all maintenance tasks and we recommend that you consider using an alternative library:

* [`redux-dynamic-modules`](https://www.npmjs.com/package/redux-dynamic-modules)
* [`redux-injectors`](https://www.npmjs.com/package/redux-injectors)
* [`redux-injector`](https://www.npmjs.com/package/redux-injector)
* [`redux-reducers-injector`](https://www.npmjs.com/package/redux-reducers-injector)
* [`paradux`](https://www.npmjs.com/package/paradux)

If you want to continue using this library, we encourage you to fork this repo and take over maintenance yourself.

---

[![build status](https://img.shields.io/travis/ioof-holdings/redux-dynostore/master.svg?style=flat-square)](https://travis-ci.org/ioof-holdings/redux-dynostore)
[![npm version](https://img.shields.io/npm/v/@redux-dynostore/redux-subspace.svg?style=flat-square)](https://www.npmjs.com/package/@redux-dynostore/redux-subspace)
[![npm downloads](https://img.shields.io/npm/dm/@redux-dynostore/redux-subspace.svg?style=flat-square)](https://www.npmjs.com/package/@redux-dynostore/redux-subspace)
[![License: BSD-3-Clause](https://img.shields.io/npm/l/@redux-dynostore/redux-subspace.svg?style=flat-square)](/LICENSE.md)

Enhancers for integrating redux-dynostore with [redux-subspace](https://github.com/ioof-holdings/redux-subspace).

## Enhancers

### `attachReducer`

This enhancer is similar to the base [`attachReducer` enhancer](/packages/redux-dynostore-core), except the reducer is namespaced with the `dynamic` component's identifier:

```javascript
import dynamic from '@redux-dynostore/react-redux'
import subspaced from '@redux-dynostore/react-redux-subspace'
import { attachReducer }  from '@redux-dynostore/redux-subspace'

export default dynamic('identifier', subspaced(), attachReducer(myReducer))(MyComponent)
```

The same options can also be provided.

### `dispatchAction`

This enhancer is similar to the base [`dispatchAction` enhancer](/packages/react-redux-dynostore), except the action is namespaces with the `dynamic` component's identifier:

```javascript
import dynamic from '@redux-dynostore/react-redux'
import subspaced from '@redux-dynostore/react-redux-subspace'
import { dispatchAction } from '@redux-dynostore/redux-subspace'

export default dynamic('identifier', subspaced(), dispatchAction({ type: 'MY_ACTION' }))(MyComponent)
```
