/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import isPlainObject from 'lodash.isplainobject'

const DOT_TOKEN = '%%DOT_TOKEN%%'
const FORWARD_SLASH_TOKEN = '%%FORWARD_SLASH_TOKEN%%'

export const escapeIdentifier = identifier => {
  return identifier.replace(/\./g, DOT_TOKEN).replace(/\//g, FORWARD_SLASH_TOKEN)
}

export const escapeIdentifiers = object => {
  if (!isPlainObject(object)) {
    return object
  }

  return Object.keys(object).reduce(
    (current, key) => ({ ...current, [escapeIdentifier(key)]: escapeIdentifiers(object[key]) }),
    {}
  )
}

export const unescapeIdentifier = identifier => {
  return identifier.replace(new RegExp(DOT_TOKEN, 'g'), '.').replace(new RegExp(FORWARD_SLASH_TOKEN, 'g'), '/')
}
