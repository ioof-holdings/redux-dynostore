/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

export { default } from './dynostore'
export { default as dynamicReducers } from './dynamicReducers'

export { default as attachReducer } from './attachReducer'
export { default as dispatchAction } from './dispatchAction'

export { default as createDynamicTarget } from './createDynamicTarget'

export { default as mergeReducers } from './reducers/mergeReducers'
export { default as combineReducers } from './reducers/combineReducers'
export { default as filteredReducer } from './reducers/filteredReducer'

export { shallowMerge, deepMerge } from './utils/merge'

export { shallowStateHandler, deepStateHandler, deepStateHandler as defaultStateHandler } from './utils/stateHandlers'
