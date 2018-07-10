import React from 'react'
import External from '../components/External'

const ExternalCounter = External('counter')

const Counter = () => (
  <main>
    <h2>Counter</h2>
    <ExternalCounter />
  </main>
)

export default Counter
