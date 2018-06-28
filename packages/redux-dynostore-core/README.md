# @redux-dynostore/core

[![build status](https://img.shields.io/travis/ioof-holdings/redux-dynostore/master.svg?style=flat-square)](https://travis-ci.org/ioof-holdings/redux-dynostore)
[![npm version](https://img.shields.io/npm/v/@redux-dynostore/core.svg?style=flat-square)](https://www.npmjs.com/package/redux-dynostore-core)
[![npm downloads](https://img.shields.io/npm/dm/@redux-dynostore/core.svg?style=flat-square)](https://www.npmjs.com/package/@redux-dynostore/core)
[![License: BSD-3-Clause](https://img.shields.io/npm/l/@redux-dynostore/core.svg?style=flat-square)](/LICENSE.md)

Core library to add dynamic enhancers to redux stores.

## Usage

```javascript
import dynostore from '@redux-dynostore/core'

const store = createStore(reducer, dynostore(
  dynamicEnhancer(),
  dynamicEnhancer2('with parameters')
))
```

## Enhancers

Dynamic enhancers are used to make dynamic features available to the store. The following dynamic enhancers are provided:

1.  Reducers - dynamically attach reducers
2.  [Sagas](/packages/redux-dynostore-redux-saga) - dynamically run sagas

### `dynamicReducers`

```javascript
import dynostore, { dynamicReducers } from '@redux-dynostore/core'

const store = createStore(reducer, dynostore(dynamicReducers()))
```

#### Manually attaching reducers

If you aren't using react, or want to attach a reducer outside of the component lifecycle, the store now has an `attachReducers` function that can be used to add additional reducers after the store has been created:

```javascript
store.attachReducers({ dynamicReducer })
```

Multiple reducers can be attached as well:

```javascript
store.attachReducers({ dynamicReducer1, dynamicReducer2 })
```

Reducers can also be added to nested locations in the store. The following formats are supported:

```javascript
store.attachReducers({ 'some.path.to': dynamicReducer })
```

```javascript
store.attachReducers({ 'some/path/to': dynamicReducer })
```

```javascript
store.attachReducers({
  some: {
    path: {
      to: {
        dynamicReducer
      }
    }
  }
})
```

### Custom Enhancers

Dynamic enhancers can be created for many use cases by implementing the following interface:

```javascript
const enhancer = createHandlers => (store, reducer, preloadedState) => ({ ...handlers })
```

`handlers` is an object with all the functions you want your enhancer to add to the store. You should only ever append your handlers to the object and not remove any added by other dynamic handlers.

## Utilities

### `attachReducer`

An enhancer compatible with [`react-redux-dynostore`](/package/react-redux-dynostore) to attach the reducer when activated:

```javascript
import dynamic from '@redux-dynostore/react-redux'
import { attachReducer } from '@redux-dynostore/core'

export default dynamic('identifier', attachReducer(myReducer))(MyComponent)
```

### `dispatchAction`

An enhancer compatible with [`react-redux-dynostore`](/package/react-redux-dynostore) to dispatch an action when activated:

```javascript
import dynamic from '@redux-dynostore/react-redux'
import { dispatchAction } from '@redux-dynostore/core'

export default dynamic('identifier', dispatchAction({ type: 'MY_ACTION' }))(MyComponent)
```

### `escapeIdentifier`

Escapes the given identifier string so that it does not accidentally trigger additional levels of nesting:

```javascript
import dynamic from '@redux-dynostore/react-redux'
import { escapeIdentifier } from '@redux-dynostore/core'

export default dynamic(escapeIdentifier('escaped/identifier'))(MyComponent)
```

### `escapeIdentifiers`

Escapes the keys of the given object so that it does not accidentally trigger additional levels of nesting:

```javascript
import { escapeIdentifiers } from '@redux-dynostore/core'

store.attachReducers(escapeIdentifiers({
  'escaped/identifier': {
    'escaped/nested/identifier': dynamicReducer
  }
})
```

### `unescapeIdentifier`

Reverses the escaping performed by `escapeIdentifier` and `escapeIdentifiers`:

```javascript
import { escapeIdentifier, unescapeIdentifier } from '@redux-dynostore/core'

const escaped = escapeIdentifier('escaped/identifier')
const unexcaped = unescapeIdentifier(escaped)
```
