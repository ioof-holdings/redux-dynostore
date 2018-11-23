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
export { default as cleanStateReducer } from './reducers/cleanStateReducer'

export { default as deepMerge } from './utils/deepMerge'
export { default as shallowMerge } from './utils/shallowMerge'

export { default as shallowCombine } from './utils/shallowCombine'

export { default as cleanState } from './utils/cleanState'

export { default as plainStateFilter } from './utils/plainStateFilter'
export { default as noStateFilter } from './utils/noStateFilter'
