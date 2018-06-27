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

const escape = string => string.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')

const makeRegex = map => {
  const regexString = Object.keys(map)
    .map(escape)
    .join('|')
  return new RegExp(regexString, 'g')
}

const makeConverter = map => ({ lookup: map, regex: makeRegex(map) })

const invertMap = map => Object.keys(map).reduce((c, k) => ({ ...c, [map[k]]: k }), {})
const replaceAll = (string, converter) => string.replace(converter.regex, match => converter.lookup[match])

const escapeConverter = makeConverter(ESCAPE_TABLE)
const unescapeConverter = makeConverter(invertMap(ESCAPE_TABLE))
const splitRegex = makeRegex(ESCAPE_TABLE)

export const escapeIdentifier = identifier => replaceAll(identifier, escapeConverter)
export const unescapeIdentifier = identifier => replaceAll(identifier, unescapeConverter)

export const escapeIdentifiers = object =>
  isPlainObject(object)
    ? Object.keys(object).reduce((c, k) => ({ ...c, [escapeIdentifier(k)]: escapeIdentifiers(object[k]) }), {})
    : object

export const splitIdentifier = string => string.split(splitRegex)
