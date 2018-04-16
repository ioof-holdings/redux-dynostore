import dynamic from '@redux-dynostore/react-redux'
import subspaced from '@redux-dynostore/react-redux-subspace'
import { attachReducer } from '@redux-dynostore/redux-subspace'

import App from './App'
import reducer from './reducer'

export default dynamic('app', attachReducer(reducer), subspaced())(App)
