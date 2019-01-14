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
import { cleanupDetachedReducer } from './detachableReducer'

const expandReducers = (staticReducer, dynamicReducers, options, defaultOptions) => {
  const expandedReducers = { reducer: staticReducer, children: {}, options: defaultOptions }

  Object.entries(dynamicReducers).forEach(([key, dynamicReducer]) => {
    let path = key.split('.')
    let currentNode = expandedReducers

    path.forEach(element => {
      if (!currentNode.children[element]) {
        currentNode.children[element] = { children: {}, options: defaultOptions }
      }

      currentNode = currentNode.children[element]
    })

    currentNode.reducer = dynamicReducer
    currentNode.options = options[key]
  })

  return expandedReducers
}

const collapseReducers = node => {
  const { reducer, children, options } = node

  const childrenEntries = Object.entries(children)

  if (!childrenEntries.length) {
    return reducer
  }

  const reducersToCombine = {}

  childrenEntries.forEach(([key, childNode]) => {
    reducersToCombine[key] = collapseReducers(childNode)
  })

  const childrenReducer = combineReducers(reducersToCombine, options)

  if (!reducer) {
    return childrenReducer
  }

  const filtered = filteredReducer(reducer, options)
  const merged = mergeReducers([filtered, childrenReducer], options)
  const cleaned = cleanupDetachedReducer(merged, options)

  return cleaned
}

const createDynamicReducer = (staticReducer, dynamicReducers, options = {}, defaultOptions) => {
  const expandedReducers = expandReducers(staticReducer, dynamicReducers, options, defaultOptions)
  return collapseReducers(expandedReducers)
}

export default createDynamicReducer
