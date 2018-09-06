/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const DELETE_TYPE = 'DYNOSTORE/DELETE_REDUCER'

const deletableReducer = (reducer) => (state, action) => {
  switch (action.type) {
    case DELETE_TYPE:
      return null
    default:
      return reducer(state, action)
  }
}

export default deletableReducer
