import React from 'react'
import Counter from './components/Counter'

const Counter1 = Counter.createInstance('counter1')
const Counter2 = Counter.createInstance('counter2')

const App = () => (
  <div>
    <Counter1 />
    <Counter2 />
  </div>
)

export default App
