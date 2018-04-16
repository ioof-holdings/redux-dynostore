/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const flattenSagas = (sagas, parentKey) => {
  if (typeof sagas === 'function') {
    return { [parentKey.replace(/\//g, '.')]: sagas }
  }

  return Object.keys(sagas).reduce(
    (sagaMap, key) => ({
      ...sagaMap,
      ...flattenSagas(sagas[key], parentKey ? `${parentKey}.${key}` : key)
    }),
    {}
  )
}

export default flattenSagas
