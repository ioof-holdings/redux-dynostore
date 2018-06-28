/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import isPlainObject from 'lodash.isplainobject'
import { subspaced } from 'react-redux-subspace'

const subspacedEnhancer = ({ mapExtraState = () => null } = {}) => identifier => {
  const mapState = (state, rootState) => {
    const componentState = state[identifier]
    if (!isPlainObject(componentState)) {
      return componentState
    }

    const extraState = mapExtraState(state, rootState)
    if (!isPlainObject(extraState)) {
      if (process.env.NODE_ENV !== 'production' && extraState !== null) {
        throw new TypeError(`extra state must be a plain object but received ${extraState}`)
      }
      return componentState
    }

    return { ...extraState, ...componentState }
  }
  const subspaceEnhancer = subspaced(mapState, identifier)
  return () => Component => subspaceEnhancer(Component)
}

export default subspacedEnhancer