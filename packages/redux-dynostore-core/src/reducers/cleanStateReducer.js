/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cleanState from '../utils/cleanState'

const mergeReducers = (reducer, { cleanStateFunction = cleanState } = {}) => (state, action) => {
  return cleanStateFunction(reducer(state, action))
}

export default mergeReducers
