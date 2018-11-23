/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import plainStateFilter from '../utils/plainStateFilter'

const FILTER_INIT = { type: '@@FILTER/INIT' }

const filteredReducer = (reducer, { stateFilter = plainStateFilter } = {}) => {
  const initialState = reducer(undefined, FILTER_INIT)
  const filterInstance = stateFilter(initialState)

  return (state, action) => {
    if (state === undefined) {
      return initialState
    }

    const filteredState = filterInstance.filter(state)

    const newState = reducer(filteredState, action)

    if (newState === filteredState) {
      return state
    }

    return filterInstance.merge(state, newState)
  }
}

export default filteredReducer
