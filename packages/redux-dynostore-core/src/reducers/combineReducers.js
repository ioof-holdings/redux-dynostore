/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import objectKeyStateResolver from '../utils/objectKeyStateResolver'
import shallowCombine from '../utils/shallowCombine'

const combineReducers = (
  reducers,
  { resolveStateFunction = objectKeyStateResolver, combineFunction = shallowCombine } = {}
) => (state = {}, action) => {
  return Object.entries(reducers).reduce((nextState, [key, reducer]) => {
    const newState = reducer(resolveStateFunction(nextState, key), action)
    return combineFunction(nextState, key, newState)
  }, state)
}

export default combineReducers
