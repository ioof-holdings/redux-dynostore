# @redux-dynostore/react-redux-subspace

[![build status](https://img.shields.io/travis/ioof-holdings/redux-dynostore/master.svg?style=flat-square)](https://travis-ci.org/ioof-holdings/redux-dynostore)
[![npm version](https://img.shields.io/npm/v/@redux-dynostore/react-redux-subspace.svg?style=flat-square)](https://www.npmjs.com/package/@redux-dynostore/react-redux-subspace)
[![npm downloads](https://img.shields.io/npm/dm/@redux-dynostore/react-redux-subspace.svg?style=flat-square)](https://www.npmjs.com/package/@redux-dynostore/react-redux-subspace)
[![License: BSD-3-Clause](https://img.shields.io/npm/l/@redux-dynostore/react-redux-subspace.svg?style=flat-square)](/LICENSE.md)

Enhancer for mounting React components within subspaces when using redux-dynostore.

## Usage

```javascript
import dynamic from '@redux-dynostore/react-redux'
import subspaced from '@redux-dynostore/react-redux-subspace'

export default dynamic('identifier', subspaced())(MyComponent)
```

## Options

`subspaced` accepts options to modify it's behaviour. Default options can be overridden when using the `subspaced` handler:

```javascript
import dynamic from '@redux-dynostore/react-redux'
import subspaced from '@redux-dynostore/react-redux-subspace'

export default dynamic(
  'identifier',
  subspaced({
    /* options */
  })
)(MyComponent)
```

### `withExtraState`

```javascript
export default dynamic(
  'identifier',
  subspaced({
    mapExtraState: (state, rootState) => ({
      /* ... */
    })
  })
)(MyComponent)
```

When mounted, `MyComponent` will be wrapped in a [`SubspaceProvider`](https://ioof-holdings.github.io/redux-subspace/packages/react-redux-subspace/docs/api/SubspaceProvider.html).

If you are attaching a reducer dynamically, you should use the [redux-subspace variant](/packages/redux-dynostore-redux-subspace) to ensure it will receive the namespaced actions.

### `stateHandler`

```javascript
const store = createStore(reducer, dynostore(dynamicReducers(), { stateHandler: customStateHandler }))
```

```javascript
export default dynamic('identifier', subspaced({ stateHandler: customStateHandler }))(MyComponent)
```

The `stateHandler` option is used to modify the behaviour of `subspaced` when interacting with the state (accessing it's own state and merging in state returned from the `mapExtraState` option). They can be used to optimize for different goals, such as accuracy or performance, or to support alternative state structures, such as [`ImmutableJS`](<(http://facebook.github.io/immutable-js/docs/#/)>).

State handlers are provided as an object with the following functions:

| Name                        | Description                                         | Example                                                                  |
| --------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------ |
| `getValue(state, key)`      | Selects a value from the state                      | `(state, key) => state[key]`                                             |
| `canMerge(state)`           | Check if the state is of a mergable type            | `(state) => state && typeof state === 'object' && !Array.isArray(state)` |
| `merge(oldState, newState)` | Merges the new state and old state into a new state | `(oldState, newState) => ({ ...oldState, newState })`                    |

_Note, this is a subset of [the `stateHandler` option of `dynamicReducers`](/packages/redux-dynostore-core#stateHandler)._

By default, `subspaced` will use the `defaultStateHandler` exported from the core package.

### Additional Subspace Options

Any additional options provided to `subspaced` will be passed through as the [options argument to the underlying `react-redux-subspace` library](https://ioof-holdings.github.io/redux-subspace/packages/react-redux-subspace/docs/api/subspaced.html#arguments).  This is most commonly used to provide a custom context to locate the Redux store to use:

```javascript
const CustomContext = React.createContext

// ...

export default dynamic('identifier', subspaced({ context: CustomContext }))(MyComponent)
```
