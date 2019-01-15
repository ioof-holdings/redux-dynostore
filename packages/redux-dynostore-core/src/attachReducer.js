/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const attachReducerEnhancer = (reducer, options) => identifier => store => {
  if (process.env.NODE_ENV !== 'production' && typeof store.attachReducers !== 'function') {
    throw new TypeError(`'store.attachReducers' function is missing: Unable to attach reducer '${identifier}'.`)
  }

  store.attachReducers({ [identifier]: reducer }, options)
}

export default attachReducerEnhancer
