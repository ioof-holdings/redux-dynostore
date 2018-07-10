import React from 'react'
import { Router, Link } from '@reach/router'
import Home from '../pages/Home'
import Counter from '../pages/Counter'
import Todos from '../pages/Todos'

const App = () => (
  <div>
    <nav>
      <Link to="/">Home</Link> <Link to="counter">Counter</Link> <Link to="todos">Todos</Link>
    </nav>
    <Router>
      <Home path="/" />
      <Counter path="counter" />
      <Todos path="todos" />
    </Router>
  </div>
)

export default App
