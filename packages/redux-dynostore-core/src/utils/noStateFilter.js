/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const noStateFilter = () => {
  return {
    filter: (state) => state,
    merge: (_, newState) => newState
  }
}

export default noStateFilter
