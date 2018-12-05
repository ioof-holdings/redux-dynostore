/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import mergeReducers from './reducers/mergeReducers'
import filtered from './reducers/filteredReducer'
import createDynamicReducer from './reducers/createDynamicReducer'
import flattenReducers from './utils/flattenReducers'
import { detachable, detach } from './reducers/detachableReducer'
import deepMerge from './utils/deepMerge'
import objectKeyStateResolver from './utils/objectKeyStateResolver'
import shallowCombine from './utils/shallowCombine'
import cleanState from './utils/cleanState'
import plainStateFilter from './utils/plainStateFilter'

const dynamicReducersEnhancer = ({
  mergeFunction = deepMerge,
  resolveStateFunction = objectKeyStateResolver,
  combineFunction = shallowCombine,
  cleanStateFunction = cleanState,
  stateFilter = plainStateFilter
} = {}) => {
  return createHandlers => (store, reducer, ...rest) => {
    const defaultReducerOptions = {
      mergeFunction,
      resolveStateFunction,
      combineFunction,
      cleanStateFunction,
      stateFilter
    }

    const dynamicReducers = {}
    const dynamicReducerOptions = {}

    const createReducer = () => {
      const reducers = [filtered(reducer, defaultReducerOptions)]

      if (Object.keys(dynamicReducers).length) {
        reducers.push(createDynamicReducer(dynamicReducers, dynamicReducerOptions, defaultReducerOptions))
      }

      return mergeReducers(reducers, defaultReducerOptions)
    }

    const attachReducers = (
      reducers,
      {
        mergeFunction = defaultReducerOptions.mergeFunction,
        resolveStateFunction = defaultReducerOptions.resolveStateFunction,
        combineFunction = defaultReducerOptions.combineFunction,
        cleanStateFunction = defaultReducerOptions.cleanStateFunction,
        stateFilter = defaultReducerOptions.stateFilter
      } = {}
    ) => {
      Object.entries(flattenReducers(reducers)).forEach(([identifier, reducer]) => {
        dynamicReducers[identifier] = detachable(identifier)(reducer)
        dynamicReducerOptions[identifier] = {
          mergeFunction,
          resolveStateFunction,
          combineFunction,
          cleanStateFunction,
          stateFilter
        }
      })
      store.replaceReducer(createReducer())
    }

    const detachReducers = identifiers => {
      identifiers
        .filter(identifier => dynamicReducers[identifier])
        .forEach(identifier => {
          delete dynamicReducers[identifier]
          delete dynamicReducerOptions[identifier]
          store.dispatch(detach(identifier))
        })

      store.replaceReducer(createReducer())
    }

    const handlers = createHandlers(store, reducer, ...rest)

    return {
      ...handlers,
      attachReducers,
      detachReducers
    }
  }
}

export default dynamicReducersEnhancer
