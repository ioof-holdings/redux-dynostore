import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import configuration from './configuration'

export default combineReducers({
  configuration,
  routing
})
