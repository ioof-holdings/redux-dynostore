import Loadable from 'react-loadable'
import loadExternal from '../utils/loadExternal'
import Loader from '../components/Loader'

const External = (id, selector) =>
  Loadable({
    loader: () => loadExternal(id, selector),
    loading: Loader
  })

export default External
