/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const runSagaEnhancer = saga => identifier => store => {
  if (process.env.NODE_ENV !== 'production' && typeof store.runSagas !== 'function') {
    throw new TypeError(`'store.runSagas' function is missing: Unable to run saga '${identifier}'.`)
  }

  store.runSagas({ [identifier]: saga })
}

export default runSagaEnhancer
