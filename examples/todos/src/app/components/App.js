import React from 'react'
import TodoApp from '../../todos'
import Footer from '../../footer'

const App = ({ filter }) => (
  <div>
    <TodoApp filter={filter} />
    <Footer />
  </div>
)

export default App
