/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { subspaced } from 'redux-subspace-saga'
import { runSaga } from '@redux-dynostore/redux-saga'

const getParentState = (state, namespace) => {
  return namespace.split('/').reduce((subState, pathPart) => subState[pathPart], state)
}

const runSubspacedSagaEnhancer = saga => identifier => {
  const subspacedSaga = subspaced(identifier)(saga)

  return store => {
    const storeNamespace = store.namespace
    const namespacedIdentifier = storeNamespace ? `${storeNamespace}/${identifier}` : identifier

    const sagaToRun = storeNamespace
      ? subspaced(state => getParentState(state, storeNamespace), storeNamespace)(subspacedSaga)
      : subspacedSaga

    return runSaga(sagaToRun)(namespacedIdentifier)(store)
  }
}

export default runSubspacedSagaEnhancer
