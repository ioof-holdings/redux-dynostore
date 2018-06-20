# Dynamic List of Counters Example

This example extends [Redux Saga's cancellable counter example](https://github.com/redux-saga/redux-saga/tree/master/examples/cancellable-counter), allowing for a dynamic number of counters on the same page.

The redux store contains a `page` slice with a static reducer. The `counterIds` are an array of identifier strings.

Counters are generated with a typical `Array.map()`.

The `DynaCounter` component class in `App.js` is of particular interest. This is where the dynostore dynamic instance is created using identifiers known only at runtime.
