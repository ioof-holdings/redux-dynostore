/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import combineReducers from './combineReducers'
import mergeReducers from './mergeReducers'
import filteredReducer from './filteredReducer'
import cleanStateReducer from './cleanStateReducer'

const expandReducers = (reducers, options) => {
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
    currentNode.options = options[key]
  }

  return expandedReducers
}

const collapseReducers = (node, defaultOptions) => {
  const { reducer, children, options = defaultOptions } = node

  const childrenKeys = Object.keys(children)

  if (!childrenKeys.length) {
    return reducer
  }

  const reducersToCombine = childrenKeys.reduce(
    (reducerMap, key) => ({ ...reducerMap, [key]: collapseReducers(children[key]) }),
    {}
  )

  const childrenReducer = combineReducers(reducersToCombine, options)

  if (!reducer) {
    return childrenReducer
  }

  const filtered = filteredReducer(reducer, options)
  const merged = mergeReducers([filtered, childrenReducer], options)

  return cleanStateReducer(merged, options)
}

const createDynamicReducer = (reducers, options = {}, defaultOptions = {}) => {
  const expandedReducers = expandReducers(reducers, options)
  return collapseReducers(expandedReducers, defaultOptions)
}

export default createDynamicReducer
