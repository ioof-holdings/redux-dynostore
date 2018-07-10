import dynamic from '@redux-dynostore/react-redux'
import subspaced from '@redux-dynostore/react-redux-subspace'
import { attachReducer } from '@redux-dynostore/redux-subspace'

import TodoApp from './components/TodoApp'
import reducer from './reducers'

export default dynamic('todo', attachReducer(reducer), subspaced())(TodoApp)
