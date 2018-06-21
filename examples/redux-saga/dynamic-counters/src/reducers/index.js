import { combineReducers } from 'redux'

import {
  INCREMENT,
  DECREMENT,
  INCREMENT_IF_ODD,
  INCREMENT_ASYNC,
  CANCEL_INCREMENT_ASYNC,
  COUNTDOWN_TERMINATED,
  ADD_COUNTER
} from '../actionTypes'

function countdown(state = 0, action) {
  switch (action.type) {
    case INCREMENT_ASYNC:
      return action.value
    case COUNTDOWN_TERMINATED:
    case CANCEL_INCREMENT_ASYNC:
      return 0
    default:
      return state
  }
}

function counter(state = 0, action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1
    case DECREMENT:
      return state - 1
    case INCREMENT_IF_ODD:
      return state % 2 ? state + 1 : state
    default:
      return state
  }
}

export const counterInstanceReducer = combineReducers({
  countdown,
  counter
})

export const allCountersReducer = (state = { allIds: ['Counter one', 'Counter two'] }, action) => {
  switch (action.type) {
    case ADD_COUNTER:
      return { ...state, allIds: [...state.allIds, action.value] }
    default:
      return state
  }
}
