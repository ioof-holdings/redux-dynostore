/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const flattenReducers = (reducers, parentKey) => {
  if (typeof reducers === 'function') {
    return { [parentKey.replace(/\//g, '.')]: reducers }
  }

  return Object.keys(reducers).reduce(
    (reducerMap, key) => ({
      ...reducerMap,
      ...flattenReducers(reducers[key], parentKey ? `${parentKey}.${key}` : key)
    }),
    {}
  )
}

export default flattenReducers
