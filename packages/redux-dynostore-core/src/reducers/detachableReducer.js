/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const DETACH_TYPE = '@@DYNOSTORE/DETACH_REDUCER'

export const detach = identifier => ({ type: DETACH_TYPE, identifier })

export const detachable = identifier => reducer => (state, action) => {
  return action.type !== DETACH_TYPE || action.identifier !== identifier ? reducer(state, action) : undefined
}
