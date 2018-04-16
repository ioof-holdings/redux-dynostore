import dynamic from '@redux-dynostore/react-redux'
import subspaced from '@redux-dynostore/react-redux-subspace'
import { attachReducer }  from '@redux-dynostore/redux-subspace'

import UserPage from './UserPage'
import reducer from './reducer'

export default dynamic('userPage', attachReducer(reducer), subspaced())(UserPage)
