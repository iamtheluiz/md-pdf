import React from 'react'
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import AppProvider from './contexts'

import Main from './screens/Main'
import Convert from './screens/Convert'

const Routes: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/convert" exact component={Convert} />
        </Switch>
      </Router>
    </AppProvider>
  )
}

export default Routes
