/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { namespaced } from 'redux-subspace'
import { attachReducer } from '@redux-dynostore/core'

const attachNamespacedReducerEnhancer = (reducer, options) => identifier => {
  const namespacedReducer = namespaced(identifier)(reducer)

  return store => {
    const storeNamespace = store.namespace
    const namespacedIdentifier = storeNamespace ? `${storeNamespace}/${identifier}` : identifier

    const reducerToAttach = storeNamespace ? namespaced(storeNamespace)(namespacedReducer) : namespacedReducer

    return attachReducer(reducerToAttach, options)(namespacedIdentifier)(store)
  }
}

export default attachNamespacedReducerEnhancer
