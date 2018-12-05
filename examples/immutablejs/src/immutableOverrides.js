import { noStateFilter }  from '@redux-dynostore/core'

const mergeFunction = (oldState, newState) => oldState.merge(newState)
const resolveStateFunction = (state, identifier) => state.get(identifier)
const combineFunction = (state, key, value) => mergeFunction(state, { [key]: value })
const cleanStateFunction = (state) => state

export default {
  mergeFunction,
  resolveStateFunction,
  combineFunction,
  cleanStateFunction,
  stateFilter: noStateFilter
}
