import dynamic from '@redux-dynostore/react-redux'
import subspaced from '@redux-dynostore/react-redux-subspace'
import { attachReducer } from '@redux-dynostore/redux-subspace'

import Footer from './components/Footer'
import reducer from './reducers'

export default dynamic('visibilityFilter', attachReducer(reducer), subspaced())(Footer)
