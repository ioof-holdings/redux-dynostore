/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { subspace } from 'redux-subspace'
import { dispatchAction } from '@redux-dynostore/core'

const dispatchNamespacedActionEnhancer = action => identifier => {
  const dispatchActionEnhancer = dispatchAction(action)(identifier)
  const subspaceEnhancer = subspace(identifier)

  return store => dispatchActionEnhancer(subspaceEnhancer(store))
}

export default dispatchNamespacedActionEnhancer
