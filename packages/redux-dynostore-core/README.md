# @redux-dynostore/core

[![build status](https://img.shields.io/travis/ioof-holdings/redux-dynostore/master.svg?style=flat-square)](https://travis-ci.org/ioof-holdings/redux-dynostore)
[![npm version](https://img.shields.io/npm/v/@redux-dynostore/core.svg?style=flat-square)](https://www.npmjs.com/package/@redux-dynostore/core)
[![npm downloads](https://img.shields.io/npm/dm/@redux-dynostore/core.svg?style=flat-square)](https://www.npmjs.com/package/@redux-dynostore/core)
[![License: BSD-3-Clause](https://img.shields.io/npm/l/@redux-dynostore/core.svg?style=flat-square)](/LICENSE.md)

Core library to add dynamic enhancers to redux stores.

## Usage

```javascript
import dynostore from '@redux-dynostore/core'

const store = createStore(reducer, dynostore(dynamicEnhancer(), dynamicEnhancer2('with parameters')))
```

## Options

An optional options object can be passed as the final parameter to the `dynostore` function:

```javascript
import dynostore, { dynamicReducers } from '@redux-dynostore/core'

const store = createStore(
  reducer,
  dynostore(dynamicReducers(), {
    /* options */
  })
)
```

When provided, the options are available to enhancers to use as default options or for handling common options between multiple enhancers. How options are used will depend of the specific enhancer implementations, so refer to their individual documentation for details.

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

#### Detaching reducers

If you need to remove a reducer from the store, the `detachReducers` function that can be used:

```javascript
store.detachReducers(['dynamicReducer'])
```

Multiple reducers can be detached at the same time as well:

```javascript
store.detachReducers(['dynamicReducer1', 'dynamicReducer2'])
```

Nested reducers can also be removed by using the full path to the reducer. The following formats are supported:

```javascript
store.detachReducers(['some.path.to.dynamicReducer'])
```

```javascript
store.detachReducers(['some/path/to/dynamicReducer'])
```

_Note:_ only reducers that were added using an the `attachReducer` function can be detached. Static reducers cannot be detached from the store.

#### Options

`dynamicReducers` accepts options to modify it's behaviour. Default options can be overriden when creating the `dynamicReducers` enhancer:

```javascript
import dynostore, { dynamicReducers } from '@redux-dynostore/core'

const store = createStore(
  reducer,
  dynostore(
    dynamicReducers({
      /* options */
    })
  )
)
```

Options can also be overridden for specific reducers when attaching them to the store:

```javascript
store.attachReducers(
  { 'some.path.to': dynamicReducer },
  {
    /* options */
  }
)
```

_Note:_ All the reducers being attached in a single `attachReducers` call will use the same provided options.

##### `stateHandler`

```javascript
const store = createStore(reducer, dynostore(dynamicReducers(), { stateHandler: customStateHandler }))
```

```javascript
const store = createStore(reducer, dynostore(dynamicReducers({ stateHandler: customStateHandler })))
```

```javascript
store.attachReducers({ 'some.path.to': dynamicReducer }, { stateHandler: customStateHandler })
```

The `stateHandler` option is used to modify the behaviour of `dynamicReducers` when interacting with the state tree. They can be used to optimize for different goals, such as accuracy or performace, or to support alternative state structures, such as [`ImmutableJS`](<(http://facebook.github.io/immutable-js/docs/#/)>).

State handlers are provided as an object with the following functions:

| Name                          | Description                                         | Example                                                                  |
| ----------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------ |
| `createEmpty()`               | Create an empty container for the state             | `() => ({})`                                                             |
| `getKeys(state)`              | Get the avaialble keys of the state                 | `(state) => Object.keys(state)`                                          |
| `getValue(state, key)`        | Selects a value from the state                      | `(state, key) => state[key]`                                             |
| `setValue(state, key, value)` | Sets a value in the state and return the new state  | `(state, key, value) => ({ ...state, [key]: value }`                     |
| `canMerge(state)`             | Check if the state is of a mergable type            | `(state) => state && typeof state === 'object' && !Array.isArray(state)` |
| `merge(oldState, newState)`   | Merges the new state and old state into a new state | `(oldState, newState) => ({ ...oldState, newState })`                    |

`redux-dynostore` provides the following built-in state handlers:

- `deepStateHandler` _(default)_: handles plain Javascript types and deep merges the state when combining the state from different reducers
- `shallowStateHandler`: handles plain Javascript types and shallow merges the state when combining the state from different reducers
- `defaultStateHandler`: an alias for `deepStateHandler`

The `deepStateHandler` will generally create more accurate state trees and allows for dynamic reducers to attach to node of the state tree owned by a static reducer, but at the cost of performance. Using the `shallowStateHandler` will generally be more performant, but comes with the previosly mentioned contraints.

### Custom Enhancers

Dynamic enhancers can be created for many use cases by implementing the following interface:

```javascript
const enhancer = createHandlers => (store, reducer, preloadedState) => ({ ...handlers })
```

`handlers` is an object with all the functions you want your enhancer to add to the store. You should only ever append your handlers to the object and not remove any added by other dynamic handlers.

## Utilities

### `attachReducer`

An enhancer compatible with [`react-redux-dynostore`](/packages/react-redux-dynostore) to attach the reducer when activated:

```javascript
import dynamic from '@redux-dynostore/react-redux'
import { attachReducer } from '@redux-dynostore/core'

export default dynamic('identifier', attachReducer(myReducer))(MyComponent)
```

The same options that can be provided to `store.attachReducers` (above) can also be provided to the `attachReducer` enhancer as the second parameter:

```javascript
export default dynamic('identifier', attachReducer(myReducer, { stateHandler: customStateHandler }))(MyComponent)
```

### `dispatchAction`

An enhancer compatible with [`react-redux-dynostore`](/packages/react-redux-dynostore) to dispatch an action when activated:

```javascript
import dynamic from '@redux-dynostore/react-redux'
import { dispatchAction } from '@redux-dynostore/core'

export default dynamic('identifier', dispatchAction({ type: 'MY_ACTION' }))(MyComponent)
```
