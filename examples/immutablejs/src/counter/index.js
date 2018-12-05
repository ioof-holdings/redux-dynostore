import dynamic from '@redux-dynostore/react-redux'
import subspaced from '@redux-dynostore/react-redux-subspace'
import { attachReducer } from '@redux-dynostore/redux-subspace'
import immutableOverrides from '../immutableOverrides'
import Counter from './Counter'
import reducer from './reducer'

export default dynamic('counter', attachReducer(reducer), subspaced(immutableOverrides))(Counter)
