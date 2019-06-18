/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { deepStateHandler } from '../utils/stateHandlers'

export const enhanceRootReducer = (
  reducer,
  { stateHandler: { createEmpty, getKeys, getValue, setValue } = deepStateHandler, rootEnhancers = [] } = {}
) => {
  const rootEnhancer = (state, action) => {
    let newReducer = reducer
    rootEnhancers.map(rootEnhancer => {
      newReducer = rootEnhancer(newReducer)
    })
    const newState = newReducer(state, action)
    return newState
  }
  return rootEnhancer
}

export default enhanceRootReducer
