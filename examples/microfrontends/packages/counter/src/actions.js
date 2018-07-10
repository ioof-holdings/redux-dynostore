export const increment = () => ({ type: 'INCREMENT' })

export const incrementIfOdd = () => (dispatch, getState) => {
  if (getState() % 2 !== 0) {
    dispatch(increment())
  }
}

export const incrementAsync = () => dispatch => {
  setTimeout(() => dispatch(increment()), 1000)
}

export const decrement = () => ({ type: 'DECREMENT' })
