/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const DETACH_TYPE = 'DYNOSTORE/DETACH_REDUCER'

const detachable = (identifier) => (reducer) => (state, action) => {
  return (action.identifier === identifier && action.type === DETACH_TYPE)
    ? null
    : reducer(state, action)
}

export default detachable
