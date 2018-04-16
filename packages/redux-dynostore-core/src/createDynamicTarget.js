/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { compose } from 'redux'

const createDynamicTarget = enhancers => identifier => {
  const enhancerChain = enhancers.map(enhancer => enhancer(identifier))
  return store => {
    const storeEnhancedChain = enhancerChain.map(enhancer => enhancer(store))
    return target => {
      const targetEnhancerChain = storeEnhancedChain.filter(enhancer => enhancer)
      return compose(...targetEnhancerChain)(target)
    }
  }
}

export default createDynamicTarget
