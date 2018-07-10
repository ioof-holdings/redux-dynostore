import React from 'react'
import External from '../components/External'

const ExternalTodos = External('todos')

const Todos = () => (
  <main>
    <h2>Todos</h2>
    <ExternalTodos />
  </main>
)

export default Todos
