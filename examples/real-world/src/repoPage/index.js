import dynamic from '@redux-dynostore/react-redux'
import subspaced from '@redux-dynostore/react-redux-subspace'
import { attachReducer } from '@redux-dynostore/redux-subspace'

import RepoPage from './RepoPage'
import reducer from './reducer'

export default dynamic('repoPage', attachReducer(reducer), subspaced())(RepoPage)
