/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { unescapeIdentifier, splitIdentifier } from './escapeIdentifier'

const flattenReducers = (reducer, path = []) => {
  if (typeof reducer === 'function') {
    return { path: path.map(p => unescapeIdentifier(p)), reducer }
  }

  return Object.keys(reducer).reduce(
    (current, key) => [...current, ...flattenReducers(reducer[key], [...path, ...splitIdentifier(key)])],
    []
  )
}

export default flattenReducers
