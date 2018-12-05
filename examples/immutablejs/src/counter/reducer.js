import { Map } from 'immutable'

export default (state = Map({ value: 0 }), action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state.update('value', v => v + 1)
    case 'DECREMENT':
      return state.update('value', v => v - 1)
    default:
      return state
  }
}
