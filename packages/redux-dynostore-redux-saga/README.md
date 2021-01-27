# @redux-dynostore/redux-saga

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
[![npm version](https://img.shields.io/npm/v/@redux-dynostore/redux-saga.svg?style=flat-square)](https://www.npmjs.com/package/@redux-dynostore/redux-saga)
[![npm downloads](https://img.shields.io/npm/dm/@redux-dynostore/redux-saga.svg?style=flat-square)](https://www.npmjs.com/package/@redux-dynostore/redux-saga)
[![License: BSD-3-Clause](https://img.shields.io/npm/l/@redux-dynostore/redux-saga.svg?style=flat-square)](/LICENSE.md)

Enhancer and handler for dynamically running sagas.

## Usage

Include dynamic enhancer with [`redux-dynostore`](/packages/redux-dynostore-core):

```javascript
import dynostore from '@redux-dynostore/core'
import { dynamicSagas } from '@redux-dynostore/redux-saga'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, compose(
  applyMiddleware(sagaMiddleware),
  dynostore(dynamicSagas(sagaMiddleware))
)
```

Run the saga when the [`dynamic`](/packages/redux-dynostore-react-redux) component mounts:

```javascript
import dynamic from '@redux-dynostore/react-redux'
import { runSaga } from '@redux-dynostore/redux-saga'

export default dynamic('identifier', runSaga(mySaga))(MyComponent)
```

### Manually running sagas

If you aren't using react, or want to run a saga outside of the component lifecycle, the store now has an `runSagas` function that can be used to run sagas if you only have access to the store:

```javascript
store.runSagas({ dynamicSaga })
```

Multiple sagas can be run as well:

```javascript
store.runSagas({ dynamicSaga1, dynamicSaga2 })
```

Sagas can also be provided in a nested structure, but this only provides simplified identifier creation:

```javascript
store.runSagas({ 'some/path/to': dynamicSaga })
```

```javascript
store.runSagas({
  some: {
    path: {
      to: {
        dynamicSaga
      }
    }
  }
})
```

Both the above examples are equivalent to calling:

```javascript
store.runSagas({ 'some.path.to': dynamicSaga })
```

### Cancelling sagas

If you need to dynamically cancel a saga, the `cancelSagas` function that can be used:

```javascript
store.cancelSagas(['dynamicSaga'])
```

Multiple sagas can be cancelled at the same time as well:

```javascript
store.cancelSagas(['dynamicSaga1', 'dynamicSaga2'])
```

_Note:_ only sagas that were added using an the `runSagas` function can be cancelled.  Static sagas cannot be cancelled.
