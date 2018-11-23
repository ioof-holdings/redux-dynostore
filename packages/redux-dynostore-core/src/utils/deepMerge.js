/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import isPlainObject from 'lodash.isplainobject'

const isMergable = value => isPlainObject(value) || Array.isArray(value)

const mergeArray = (target, source) => {
  let changed = false
  const destination = [ ...target ]

  for (let i = 0; i < source.length; i++) {
    const newItem = deepMerge(target[i], source[i])

    destination.splice(i, 1, newItem)

    if (newItem !== target[i]) {
      changed = true
    }
  }

  return changed ? destination : target
}

const mergeObject = (target, source) => {
  let changed = false
  const destination = { ...target }

  Object.keys(source).forEach(key => {
    if (isMergable(source[key]) && target[key]) {
      destination[key] = deepMerge(target[key], source[key])
    } else {
      destination[key] = source[key]
    }

    if (destination[key] !== target[key]) {
      changed = true
    }
  })

  return changed ? destination : target
}

const deepMerge = (target, source) => {
  if (target === undefined || target === null || target === source) {
    return source
  }

  const isSourceArray = Array.isArray(source)

  if (typeof source === typeof target && isSourceArray === Array.isArray(target)) {
    if (isSourceArray) {
      return mergeArray(target, source)
    } else if (isPlainObject(source)) {
      return mergeObject(target, source)
    }
  }

  return source
}

export default deepMerge
