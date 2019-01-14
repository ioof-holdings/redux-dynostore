/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { subspaced } from 'react-redux-subspace'
import { shallowStateHandler } from '@redux-dynostore/core'

const subspacedEnhancer = ({
  stateHandler: { getValue, canMerge, merge } = shallowStateHandler,
  mapExtraState = () => null
} = {}) => identifier => {
  const mapState = (state, rootState) => {
    const componentState = getValue(state, identifier)
    if (!canMerge(componentState)) {
      return componentState
    }

    const extraState = mapExtraState(state, rootState)
    if (!canMerge(extraState)) {
      if (process.env.NODE_ENV !== 'production' && extraState !== null) {
        throw new TypeError(`extra state must be a mergable with the component state but received ${extraState}`)
      }
      return componentState
    }

    return merge(extraState, componentState)
  }
  const subspaceEnhancer = subspaced(mapState, identifier)
  return () => Component => subspaceEnhancer(Component)
}

export default subspacedEnhancer
