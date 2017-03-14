import React from 'react'
import Relay from 'react-relay'
import ReactDOM from 'react-dom'
import BusinessPage from './views/BusinessPage'
import ListPage from './views/ListPage'
import { Router, Route, browserHistory, applyRouterMiddleware } from 'react-router'
import useRelay from 'react-router-relay'
import './index.css'

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:3000/graphql')
)

const ViewerQueries = { viewer: () => Relay.QL`query { viewer }` }

ReactDOM.render(
  <Router
    forceFetch
    environment={Relay.Store}
    render={applyRouterMiddleware(useRelay)}
    history={browserHistory}
  >
    <Route path='/' component={ListPage} queries={ViewerQueries} />
    <Route path='/create' component={BusinessPage} queries={ViewerQueries} />
    <Route path='/view/:id' component={BusinessPage} queries={ViewerQueries} />
  </Router>
  , document.getElementById('root')
)
