/* eslint-disable react/display-name */
import React from 'react'
import { Route, Switch } from 'react-router' 
import Loadable from 'react-loadable'

const Loading = () => <p>Loading...</p>

const App = Loadable({
  loader: () => import('../app'),
  loading: Loading,
  render: ({ default: Component }, props) => <Component {...props} />
})

const RepoPage = Loadable({
  loader: () => import('../repoPage'),
  loading: Loading,
  render: ({ default: Component }, props) => <Component {...props} />
})

const UserPage = Loadable({
  loader: () => import('../userPage'),
  loading: Loading,
  render: ({ default: Component }, props) => <Component {...props} />
})

const Routes = () => (
  <Route path="/" render={props => (
    <App {...props}>
      <Switch>
        <Route path="/:login/:name" component={RepoPage} />
        <Route path="/:login" component={UserPage} />
      </Switch>
    </App>
  )} />
)

export default Routes
