import dynamic from '@redux-dynostore/react-redux'
import subspaced from '@redux-dynostore/react-redux-subspace'
import { attachReducer } from '@redux-dynostore/redux-subspace'

import App from './components/App'
import reducer from './reducers'

export default dynamic('todos', attachReducer(reducer), subspaced())(App)
