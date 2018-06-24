/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import isPlainObject from 'lodash.isplainobject'

const ESCAPE_TABLE = {
  '.': '%%DOT_TOKEN%%',
  '/': '%%FORWARD_SLASH_TOKEN%%'
}

const makeConverter = map => {
  const escapedKeys = Object.keys(map).map(escape)
  return {
    lookup: map,
    regex: new RegExp(escapedKeys.join('|'), 'g')
  }
}

const invertMap = map => Object.keys(map).reduce((c, k) => ({ ...c, [map[k]]: k }), {})
const escape = string => string.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
const replaceAll = (string, converter) => string.replace(converter.regex, match => converter.lookup[match])

const escapeConverter = makeConverter(ESCAPE_TABLE)
const unescapeConverter = makeConverter(invertMap(ESCAPE_TABLE))

export const escapeIdentifier = identifier => replaceAll(identifier, escapeConverter)
export const unescapeIdentifier = identifier => replaceAll(identifier, unescapeConverter)

export const escapeIdentifiers = object =>
  isPlainObject(object)
    ? Object.keys(object).reduce((c, k) => ({ ...c, [escapeIdentifier(k)]: escapeIdentifiers(object[k]) }), {})
    : object
