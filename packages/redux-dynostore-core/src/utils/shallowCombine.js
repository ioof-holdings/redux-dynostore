/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import shallowMerge from './shallowMerge'

const shallowCombine = (state, key, value) => shallowMerge(state, { [key]: value })

export default shallowCombine
