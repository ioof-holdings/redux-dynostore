/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { subspaced } from 'react-redux-subspace'

const subspacedEnhancer = () => identifier => {
  const subspaceEnhancer = subspaced(identifier)
  return () => Component => subspaceEnhancer(Component)
}

export default subspacedEnhancer
