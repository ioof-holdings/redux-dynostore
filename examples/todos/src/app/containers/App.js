import { connect } from 'react-redux'
import App from '../components/App'

const mapStateToProps = state => ({
  filter: state.visibilityFilter || 'SHOW_ALL'
})

export default connect(mapStateToProps)(App)
