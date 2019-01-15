import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import Counter from './counter'

const Counter1 = Counter.createInstance('counter1')
const Counter2 = Counter.createInstance('counter2')

ReactDOM.render(
  <Provider store={store}>
    <React.Fragment>
      <Counter1 />
      <Counter2 />
    </React.Fragment>
  </Provider>,
  document.getElementById('root')
)
