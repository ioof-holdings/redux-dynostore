/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import combineReducers from './combineReducers'
import mergeReducers from './mergeReducers'

const expandReducers = reducers => {
  const expandedReducers = { children: {} }

  for (let key in reducers) {
    let path = key.split('.')
    let currentNode = expandedReducers

    for (let element of path) {
      if (!currentNode.children[element]) {
        currentNode.children[element] = { children: {} }
      }

      currentNode = currentNode.children[element]
    }
    currentNode.reducer = reducers[key]
  }

  return expandedReducers
}

const collapseReducers = node => {
  const { reducer, children } = node

  const childrenKeys = Object.keys(children)

  if (!childrenKeys.length) {
    return reducer
  }

  const reducersToCombine = childrenKeys.reduce(
    (reducerMap, key) => ({ ...reducerMap, [key]: collapseReducers(children[key]) }),
    {}
  )

  const childrenReducer = combineReducers(reducersToCombine)

  return reducer ? mergeReducers([reducer, childrenReducer]) : childrenReducer
}

const createDynamicReducer = reducers => {
  const expandedReducers = expandReducers(reducers)
  return collapseReducers(expandedReducers)
}

export default createDynamicReducer
