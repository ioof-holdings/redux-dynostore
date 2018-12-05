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

1. Reducers - dynamically attach reducers
2. [Sagas](/packages/redux-dynostore-redux-saga) - dynamically run sagas

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

Reducers can also be added to nested locations in the store.  The following formats are supported:

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

#### Detaching reducers

If you need to remove a reducer from the store, the `detachReducers` function that can be used:

```javascript
store.detachReducers(['dynamicReducer'])
```

Multiple reducers can be detached at the same time as well:

```javascript
store.detachReducers(['dynamicReducer1', 'dynamicReducer2'])
```

Nested reducers can also be removed by using the full path to the reducer.  The following formats are supported:

```javascript
store.detachReducers(['some.path.to.dynamicReducer'])
```

```javascript
store.detachReducers(['some/path/to/dynamicReducer'])
```

_Note:_ only reducers that were added using an the `attachReducer` function can be detached.  Static reducers cannot be detached from the store.

#### Options

`dynamicReducers` accepts options to modify it's behaviour.  These can be used to optimize for different goals, such as accuracy or performace, or to support alternative state structures, such as `ImmutableJS`.

| Key | Description | Default | Inbuilt Options | Interface |
| --- | ----------- | ------- | --------------- | --------- |
| mergeFunction | Function used to merge a dynamic reducer's state with the state produced by it's dynamic children.  This function is also used when merging the dynamic reducer's state with the static reducer's state when the default is overridden.  | `deepMerge` | `deepMerge|shallowMerge` | `(state, newState) => nextState` |
| combineFunction | Function used to combine the child state together before merging. | `shallowCombine` | `shallowCombine` | `(state, key, value) => nextState` |
| resolveStateFunction | Function used to resolve a key in the state. | `objectKeyStateResolver` | `objectKeyStateResolver` | `(state, key) => subState` |
| cleanStateFunction | Function used to sanitize the state after merging, e.g. remove `undefined` values caused by detaching a reducer. | `cleanState` | `cleanState` | `(state) => nextState` |
| stateFilter | Function used to filter the input state into the provided reducers.  This is most commonly used to avoid warnings produced by having additional keys in the reducer state by filtering them out of the state, such as those produced by Redux's `combineReducers` implementation. | `plainStateFilter` | `plainStateFilter|noStateFilter` | `(intialState) => ({ filter: (state) => state, merge(state, newState) => nextState` |

Default options can be overriden when creating the `dynamicReducers` enhancer:

```javascript
import dynostore, { dynamicReducers, shallowMerge } from '@redux-dynostore/core'

const store = createStore(reducer, dynostore(
  dynamicReducers({ mergeFunction: shallowMerge })
))
```

Options can also be overridden for specific reducers when attaching them to the store:

```javascript
store.attachReducers({ 'some.path.to': dynamicReducer }, { combineFunction: mySpecialCombiner })
```

_Note:_ All the reducers being attached in a single `attachReducers` call will use the same provided options.

### Custom Enhancers

Dynamic enhancers can be created for many use cases by implementing the following interface:

```javascript
const enhancer = createHandlers => (store, reducer, preloadedState) => ({ ...handlers })
```

`handlers` is an object with all the functions you want your enhancer to add to the store.  You should only ever append your handlers to the object and not remove any added by other dynamic handlers.

## Utilities

### `attachReducer`

An enhancer compatible with [`react-redux-dynostore`](/packages/react-redux-dynostore) to attach the reducer when activated:

```javascript
import dynamic from '@redux-dynostore/react-redux'
import { attachReducer } from '@redux-dynostore/core'

export default dynamic('identifier', attachReducer(myReducer))(MyComponent)
```

The same options that can be provided to `store.attachReducers` (above) can also be provided to the `attachReducer` enhancer as the second parameter:

import dynamic from '@redux-dynostore/react-redux'
import { attachReducer, shallowMerge } from '@redux-dynostore/core'

export default dynamic('identifier', attachReducer(myReducer, { shallowMerge }))(MyComponent)

### `dispatchAction`

An enhancer compatible with [`react-redux-dynostore`](/packages/react-redux-dynostore) to dispatch an action when activated:

```javascript
import dynamic from '@redux-dynostore/react-redux'
import { dispatchAction } from '@redux-dynostore/core'

export default dynamic('identifier', dispatchAction({ type: 'MY_ACTION' }))(MyComponent)
```
