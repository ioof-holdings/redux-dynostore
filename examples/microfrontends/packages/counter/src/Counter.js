import React from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'

const Counter = ({ value, increment, decrement, incrementIfOdd, incrementAsync }) => (
  <p>
    Clicked: {value} times <button onClick={increment}>+</button> <button onClick={decrement}>-</button>{' '}
    <button onClick={incrementIfOdd}>Increment if odd</button> <button onClick={incrementAsync}>Increment async</button>
  </p>
)

const mapState = state => ({ value: state })

export default connect(
  mapState,
  actions
)(Counter)
