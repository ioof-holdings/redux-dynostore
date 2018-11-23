/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const cleanState = (state) => {
  const stateEntries = Object.entries(state)
  const nextState = stateEntries.reduce((nextState, [key, value]) => {
    if (value !== undefined) {
      nextState[key] = value
    }
    return nextState
  }, {})

  return Object.keys(nextState).length !== stateEntries.length ? nextState : state
}

export default cleanState
