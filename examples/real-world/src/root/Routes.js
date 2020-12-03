/* eslint-disable react/display-name */
import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router'
import App from '../app'

const RepoPage = React.lazy(() => import('../repoPage'))
const UserPage = React.lazy(() => import('../userPage'))

const Loading = () => <p>Loading...</p>

const Routes = () => (
  <Suspense fallback={Loading}>
    <Route
      path="/"
      render={props => (
        <App {...props}>
          <Switch>
            <Route path="/:login/:name" component={RepoPage} />
            <Route path="/:login" component={UserPage} />
          </Switch>
        </App>
      )}
    />
  </Suspense>
)

export default Routes
