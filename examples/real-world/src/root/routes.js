import React from 'react'
import { Route } from 'react-router'
import Loadable from 'react-loadable'

const Loading = () => <p>Loading...</p>

const loadRoute = getPromise => {
  const RouteComponent = Loadable({
    loader: () => getPromise(),
    loading: Loading,
    render(loaded, props) {
      const Component = loaded.default
      return <Component {...props} />
    }
  })

  const LoadableRoute = routeProps => <RouteComponent {...routeProps} />
  return LoadableRoute
}

export default (
  <Route path="/" component={loadRoute(() => import('../app'))}>
    <Route path="/:login/:name" component={loadRoute(() => import('../repoPage'))} />
    <Route path="/:login" component={loadRoute(() => import('../userPage'))} />
  </Route>
)
