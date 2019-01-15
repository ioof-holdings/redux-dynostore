import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import configuration from './configuration'

export default history =>
  combineReducers({
    router: connectRouter(history),
    configuration
  })
